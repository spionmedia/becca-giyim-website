import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import GlobalStyles from './utils/globalStyles';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Sayfalar
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CategoryLanding from './pages/CategoryLanding';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductCreate from './pages/ProductCreate';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeliveryReturns from './pages/DeliveryReturns';
import DistanceSalesAgreement from './pages/DistanceSalesAgreement';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import AdminOrders from './pages/AdminOrders';
import PaymentCallback from './pages/PaymentCallback';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-callback" element={<PaymentCallback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
                <Route path="/teslimat-ve-iade" element={<DeliveryReturns />} />
                <Route path="/mesafeli-satis-sozlesmesi" element={<DistanceSalesAgreement />} />
                <Route path="/:gender" element={<CategoryLanding />} />
                <Route path="/:gender/:subcategory" element={<Products />} />
                <Route path="/admin/urun-ekle" element={<ProductCreate />} />
                <Route path="*" element={<div>Sayfa Bulunamadı</div>} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
