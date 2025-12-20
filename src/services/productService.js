import supabase from './supabaseClient';

const listeners = new Set();

const notifyProductsChanged = (nextProducts) => {
  listeners.forEach((callback) => {
    try {
      callback(nextProducts);
    } catch (error) {
      console.warn('Ürün aboneliği callback hatası', error);
    }
  });
};

export const subscribeProducts = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const normalizeProduct = (product) => ({
  ...product,
  heroImage: product.heroimage,
  oldPrice: product.oldprice,
  gallery: product.gallery || [],
  colors: product.colors || [],
  sizes: product.sizes || [],
  sizeStock: product.size_stock || {}, // Beden bazlı stok
  tags: product.tags || [],
});

export const getProducts = async () => {
  // await seedProductsIfEmpty(); // Seed disabled to avoid mock data
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(normalizeProduct);
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return normalizeProduct(data);
};

export const getProductsByGender = async (gender) => {
  const query = supabase.from('products').select('*');
  if (gender) {
    query.eq('gender', gender);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data.map(normalizeProduct);
};

export const addProduct = async (payload) => {
  // sizeStock'tan sizes array'i oluştur (sadece stokta olan bedenler)
  const sizes = Object.keys(payload.sizeStock || {});

  const product = {
    id: `BG-${Date.now()}`,
    title: payload.title,
    gender: payload.gender,
    category: payload.category,
    description: payload.description,
    heroimage: payload.heroImage,
    gallery: payload.gallery || [],
    colors: payload.colors || [],
    sizes: sizes,
    size_stock: payload.sizeStock || {}, // Beden bazlı stok
    price: Number(payload.price) || 0,
    oldprice: Number(payload.oldPrice) || 0,
    discount: payload.discount ? Number(payload.discount) : null,
    // inventory trigger tarafından otomatik hesaplanacak
    tags: payload.tags || [],
    rating: 4.5,
  };

  const { data, error } = await supabase.from('products').insert(product).select('*').single();
  if (error) throw error;
  const normalized = normalizeProduct(data);
  const refreshed = await getProducts();
  notifyProductsChanged(refreshed);
  return normalized;
};

export const updateProduct = async (id, payload) => {
  // sizeStock'tan sizes array'i oluştur
  const sizes = Object.keys(payload.sizeStock || {});

  const updates = {
    title: payload.title,
    gender: payload.gender,
    category: payload.category,
    description: payload.description,
    heroimage: payload.heroImage,
    gallery: payload.gallery || [],
    colors: payload.colors || [],
    sizes: sizes,
    size_stock: payload.sizeStock || {}, // Beden bazlı stok
    price: Number(payload.price) || 0,
    oldprice: Number(payload.oldPrice) || 0,
    discount: payload.discount ? Number(payload.discount) : null,
    // inventory trigger tarafından otomatik hesaplanacak
    tags: payload.tags || [],
  };

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  const normalized = normalizeProduct(data);
  const refreshed = await getProducts();
  notifyProductsChanged(refreshed);
  return normalized;
};

// Stok kontrolü
export const checkStock = async (productId, size, quantity = 1) => {
  const { data, error } = await supabase.rpc('check_product_stock', {
    p_product_id: productId,
    p_size: size,
    p_quantity: quantity
  });

  if (error) throw error;
  return data;
};

// Stok düşürme (sipariş sonrası)
export const decreaseStock = async (productId, size, quantity) => {
  const { data, error } = await supabase.rpc('decrease_product_stock', {
    p_product_id: productId,
    p_size: size,
    p_quantity: quantity
  });

  if (error) throw error;
  return data;
};

export const getFilters = async () => {
  const products = await getProducts();
  const genders = [...new Set(products.map((product) => product.gender))];
  const categories = [...new Set(products.map((product) => product.category))];
  const colors = [...new Set(products.flatMap((product) => product.colors?.map((color) => color.name) || []))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes || []))];

  return { genders, categories, colors, sizes };
};
