import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import supabase from '../services/supabaseClient';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const defaultItem = (product, options = {}) => ({
  product_id: product.id,
  title: product.title,
  price: product.price,
  image: product.heroImage || product.image,
  gender: product.gender,
  category: product.category,
  color: options.color || null,
  size: options.size || null,
  quantity: options.quantity || 1,
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  // Sync from Supabase when user logs in
  useEffect(() => {
    if (user) {
      syncCartFromSupabase();
    } else {
      setItems([]);
    }
  }, [user]);

  const syncCartFromSupabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Sepet yüklenemedi:', error);
    }
  };

  const addItem = async (product, options = {}) => {
    if (!user) {
      alert('Sepete eklemek için giriş yapmalısınız');
      return;
    }

    const newItem = defaultItem(product, options);
    newItem.user_id = user.id;

    try {
      // Check if item exists
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .eq('size', newItem.size)
        .eq('color', newItem.color)
        .maybeSingle();

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + newItem.quantity })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('cart_items')
          .insert([newItem]);

        if (error) throw error;
      }

      await syncCartFromSupabase();
    } catch (error) {
      console.error('Sepete eklenemedi:', error);
      alert('Sepete eklenirken hata oluştu: ' + error.message);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) return removeItem(itemId);

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      await syncCartFromSupabase();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await syncCartFromSupabase();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error('Sepet temizlenemedi:', error);
    }
  };

  const summary = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, subtotal, currency: 'TRY' };
  }, [items]);

  const value = {
    items,
    summary,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart yalnızca CartProvider içinde kullanılabilir');
  }
  return context;
};
