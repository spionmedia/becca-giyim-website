import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiGrid, FiList } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import useProducts from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import categoryMeta from '../constants/categoryMeta';
import { updateSEO, PAGE_SEO } from '../utils/seo';

// Styled Components
const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  max-width: 800px;
`;

const ProductsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isFilterOpen ? 'block' : 'none'};
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0;
`;

const FilterContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const PriceInputs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ColorOption = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0 ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs} 0;
  cursor: pointer;
  border: 2px solid ${props => props.isSelected ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOption = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.isSelected
    ? props.theme.colors.primary
    : props.theme.colors.text.disabled};
  background-color: ${props => props.isSelected
    ? props.theme.colors.primary
    : 'transparent'};
  color: ${props => props.isSelected
    ? 'white'
    : props.theme.colors.text.primary};
  margin: 0 ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs} 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background-color: white;
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const MobileFilterHeader = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const CloseFilterButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductsContent = styled.div`
  flex: 1;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ProductCount = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const SortingOptions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ViewOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const ViewButton = styled.button`
  background: none;
  border: 1px solid ${props => props.active
    ? props.theme.colors.primary
    : props.theme.colors.text.disabled};
  color: ${props => props.active
    ? props.theme.colors.primary
    : props.theme.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  ${props => props.view === 'list' && `
    grid-template-columns: 1fr;
  `}
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ProductListItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 200px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 200px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProductCategory = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const Price = styled.span`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const OldPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: ${props => props.theme.spacing.sm};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active
    ? props.theme.colors.primary
    : props.theme.colors.text.disabled};
  background-color: ${props => props.active
    ? props.theme.colors.primary
    : 'transparent'};
  color: ${props => props.active
    ? 'white'
    : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin: 0 ${props => props.theme.spacing.xs};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const sortProductList = (list, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return [...list].reverse();
    case 'price-low':
      return [...list].sort((a, b) => a.price - b.price);
    case 'price-high':
      return [...list].sort((a, b) => b.price - a.price);
    case 'name-asc':
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return [...list].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return list;
  }
};

const Products = () => {
  const { gender, subcategory } = useParams();
  const genderMeta = gender ? categoryMeta[gender] : null;
  const { addItem } = useCart();
  const { products: baseProducts, filters, loading, error } = useProducts({ gender, category: subcategory });

  const [view, setView] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true
  });
  const [selectedCategories, setSelectedCategories] = useState(subcategory ? [subcategory] : []);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    if (subcategory) {
      setSelectedCategories([subcategory]);
    } else {
      setSelectedCategories([]);
    }

    // SEO güncelle
    const genderLabel = genderMeta?.label || '';
    const subCategoryMeta = genderMeta?.subcategories?.find(sub => sub.slug === subcategory);
    const subCategoryLabel = subCategoryMeta?.label || '';

    let seoTitle = 'Tüm Ürünler';
    let seoDescription = PAGE_SEO.products.description;
    let breadcrumbs = [
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Ürünler', url: '/#/products' }
    ];

    if (gender === 'kadin') {
      seoTitle = subcategory ? `Kadın ${subCategoryLabel}` : 'Kadın Giyim';
      seoDescription = subcategory
        ? `Kadın ${subCategoryLabel} modelleri Becca Giyim'de. En şık ${subCategoryLabel.toLowerCase()} ürünlerini uygun fiyatlarla keşfedin.`
        : PAGE_SEO.kadin.description;
      breadcrumbs.push({ name: 'Kadın', url: '/#/kadin' });
      if (subcategory) {
        breadcrumbs.push({ name: subCategoryLabel, url: `/#/kadin/${subcategory}` });
      }
    } else if (gender === 'erkek') {
      seoTitle = subcategory ? `Erkek ${subCategoryLabel}` : 'Erkek Giyim';
      seoDescription = subcategory
        ? `Erkek ${subCategoryLabel} modelleri Becca Giyim'de. En şık ${subCategoryLabel.toLowerCase()} ürünlerini uygun fiyatlarla keşfedin.`
        : PAGE_SEO.erkek.description;
      breadcrumbs.push({ name: 'Erkek', url: '/#/erkek' });
      if (subcategory) {
        breadcrumbs.push({ name: subCategoryLabel, url: `/#/erkek/${subcategory}` });
      }
    }

    updateSEO({
      title: seoTitle,
      description: seoDescription,
      url: gender ? `/#/${gender}${subcategory ? '/' + subcategory : ''}` : '/#/products',
      breadcrumbs
    });
  }, [subcategory, gender, genderMeta]);

  const toggleFilter = (filter) => {
    setOpenFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      }
      return [...prev, category];
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorSelect = (color) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      }
      return [...prev, color];
    });
  };

  const handleSizeSelect = (size) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      }
      return [...prev, size];
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategories(subcategory ? [subcategory] : []);
    setPriceRange({ min: '', max: '' });
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getCategoryLabel = (product) => {
    const meta = categoryMeta[product.gender];
    const sub = meta?.subcategories?.find(item => item.slug === product.category);
    return sub ? `${meta.label} · ${sub.label}` : meta?.label || product.category;
  };

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    if (selectedCategories.length) {
      list = list.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedColors.length) {
      list = list.filter(product => (product.colors || []).some(color => selectedColors.includes(color.name)));
    }

    if (selectedSizes.length) {
      list = list.filter(product => (product.sizes || []).some(size => selectedSizes.includes(size)));
    }

    if (priceRange.min) {
      list = list.filter(product => product.price >= Number(priceRange.min));
    }

    if (priceRange.max) {
      list = list.filter(product => product.price <= Number(priceRange.max));
    }

    return sortProductList(list, sortBy);
  }, [baseProducts, selectedCategories, selectedColors, selectedSizes, priceRange, sortBy]);

  const pageSize = view === 'grid' ? 12 : 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleAddToCart = (product) => {
    addItem(product, {
      size: product.sizes?.[0] || null,
      color: product.colors?.[0]?.name || null,
      quantity: 1
    });
  };

  const categoryOptions = genderMeta
    ? genderMeta.subcategories
    : filters.categories.map(slug => ({ slug, label: slug }));

  const pageTitle = genderMeta ? genderMeta.hero.title : 'Ürünlerimiz';
  const pageDescription = subcategory
    ? genderMeta?.subcategories?.find(sub => sub.slug === subcategory)?.description
    || 'Becca Giyim koleksiyonlarını keşfedin.'
    : genderMeta?.hero.subtitle || 'Özel tasarım koleksiyonlarımızı keşfedin.';

  if (loading) {
    return <p>Ürünler yükleniyor...</p>;
  }

  if (error) {
    return <p>Ürünler yüklenirken bir hata oluştu.</p>;
  }

  return (
    <>
      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
        <PageDescription>{pageDescription}</PageDescription>
      </PageHeader>

      <ProductsHeader>
        <ProductCount>{filteredProducts.length} ürün bulundu</ProductCount>

        <SortingOptions>
          <MobileFilterButton onClick={() => setIsFilterOpen(true)}>
            <FiFilter /> Filtrele
          </MobileFilterButton>

          <Select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            options={[
              { value: 'featured', label: 'Öne Çıkanlar' },
              { value: 'newest', label: 'En Yeniler' },
              { value: 'price-low', label: 'Fiyat: Düşükten Yükseğe' },
              { value: 'price-high', label: 'Fiyat: Yüksekten Düşüğe' },
              { value: 'name-asc', label: 'İsim: A-Z' },
              { value: 'name-desc', label: 'İsim: Z-A' }
            ]}
          />

          <ViewOptions>
            <ViewButton
              active={view === 'grid'}
              onClick={() => setView('grid')}
              aria-label="Grid görünümü"
            >
              <FiGrid />
            </ViewButton>
            <ViewButton
              active={view === 'list'}
              onClick={() => setView('list')}
              aria-label="Liste görünümü"
            >
              <FiList />
            </ViewButton>
          </ViewOptions>
        </SortingOptions>
      </ProductsHeader>

      <ProductsContainer>
        <Sidebar isFilterOpen={isFilterOpen}>
          <MobileFilterHeader>
            <h3>Filtreler</h3>
            <CloseFilterButton onClick={() => setIsFilterOpen(false)}>
              <FiX />
            </CloseFilterButton>
          </MobileFilterHeader>

          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('categories')}>
              <FilterTitle>Kategoriler</FilterTitle>
              {openFilters.categories ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.categories}>
              <CheckboxGroup>
                {categoryOptions.map(option => (
                  <Checkbox
                    key={option.slug}
                    label={option.label}
                    checked={selectedCategories.includes(option.slug)}
                    onChange={() => handleCategoryChange(option.slug)}
                  />
                ))}
              </CheckboxGroup>
            </FilterContent>
          </FilterSection>

          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('price')}>
              <FilterTitle>Fiyat Aralığı</FilterTitle>
              {openFilters.price ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.price}>
              <PriceInputs>
                <Input
                  type="number"
                  placeholder="Min"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  fullWidth
                />
                <Input
                  type="number"
                  placeholder="Max"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  fullWidth
                />
              </PriceInputs>
            </FilterContent>
          </FilterSection>

          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('colors')}>
              <FilterTitle>Renkler</FilterTitle>
              {openFilters.colors ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.colors}>
              <div>
                {filters.colors.map(color => (
                  <ColorOption
                    key={color.name}
                    color={color.code}
                    isSelected={selectedColors.includes(color.name)}
                    onClick={() => handleColorSelect(color.name)}
                    style={color.name.toLowerCase() === 'beyaz' ? { border: '1px solid #ddd' } : undefined}
                    title={color.name}
                  />
                ))}
              </div>
            </FilterContent>
          </FilterSection>

          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('sizes')}>
              <FilterTitle>Bedenler</FilterTitle>
              {openFilters.sizes ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.sizes}>
              <div>
                {filters.sizes.map(size => (
                  <SizeOption
                    key={size}
                    isSelected={selectedSizes.includes(size)}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </SizeOption>
                ))}
              </div>
            </FilterContent>
          </FilterSection>

          <Button
            variant="outline"
            fullWidth
            onClick={clearFilters}
          >
            Filtreleri Temizle
          </Button>
        </Sidebar>

        <ProductsContent>
          {view === 'grid' ? (
            <ProductGrid>
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </ProductGrid>
          ) : (
            <ProductList>
              {paginatedProducts.map(product => {
                const imageSrc = product.heroImage || product.image;
                return (
                  <ProductListItem key={product.id}>
                    <ProductImage>
                      <img src={imageSrc} alt={product.title} />
                    </ProductImage>
                    <ProductDetails>
                      <ProductCategory>{getCategoryLabel(product)}</ProductCategory>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductDescription>{product.description}</ProductDescription>

                      <PriceContainer>
                        <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
                        {product.oldPrice && (
                          <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
                        )}
                      </PriceContainer>

                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Sepete Ekle
                      </Button>
                    </ProductDetails>
                  </ProductListItem>
                );
              })}
            </ProductList>
          )}

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;
              </PageButton>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PageButton
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}

              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </PageButton>
            </Pagination>
          )}
        </ProductsContent>
      </ProductsContainer>
    </>
  );
};

export default Products;
