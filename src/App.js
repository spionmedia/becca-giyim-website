import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Şimdilik geçici sayfalar oluşturuyoruz, ileride ayrı dosyalara taşınacak
const Home = () => (
  <div className="page">
    <h1>TeeVogue</h1>
    <p>Özel tasarım t-shirtler için doğru adres</p>
  </div>
);

const Products = () => (
  <div className="page">
    <h1>Ürünlerimiz</h1>
    <p>Ürün listemiz yakında burada olacak</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/products">Ürünler</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 TeeVogue - Tüm Hakları Saklıdır</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
