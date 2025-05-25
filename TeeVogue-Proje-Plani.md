# TeeVogue T-Shirt Satış Sitesi Proje Planı

## Proje Hakkında
TeeVogue, modern ve kullanıcı dostu bir t-shirt satış platformudur. Özel tasarımlar ve kaliteli ürünlerle müşterilere benzersiz bir alışveriş deneyimi sunmayı hedefler.

## Teknoloji Seçimi
- **Frontend**: React.js
- **CSS Framework**: Tailwind CSS veya Styled Components
- **State Management**: Redux veya Context API
- **Routing**: React Router
- **Backend** (ileriki aşamada): Node.js + Express
- **Veritabanı** (ileriki aşamada): MongoDB veya PostgreSQL
- **Ödeme Sistemi**: Stripe veya iyzico

## Proje Adımları

### 1. Proje Kurulumu
- [x] React projesi oluşturma (`npx create-react-app teevogue` veya `npx create-next-app teevogue`)
- [x] Git repository oluşturma ve ilk commit
- [x] Klasör yapısını düzenleme:
  ```
  src/
  ├── assets/
  ├── components/
  │   ├── common/
  │   ├── layout/
  │   └── product/
  ├── contexts/
  ├── hooks/
  ├── pages/
  ├── services/
  └── utils/
  ```
- [x] Gerekli paketlerin kurulumu:
  - React Router
  - Styled Components/Tailwind
  - Axios
  - React Icons
  - Form yönetimi için React Hook Form

### 2. Tasarım ve UI
- [ ] Marka kimliği oluşturma
  - [ ] Logo tasarımı
  - [ ] Renk paleti: Ana renk, ikincil renk, vurgu rengi, nötr renkler
  - [ ] Tipografi: Başlık fontu, metin fontu
- [ ] UI komponentleri geliştirme
  - [ ] Butonlar (primary, secondary, outline, text)
  - [ ] Form elemanları (input, select, checkbox, radio)
  - [ ] Kartlar (ürün kartı, inceleme kartı)
  - [ ] Navigasyon (header, footer, sidebar)
  - [ ] Modal ve dialog kutuları
- [ ] Responsive tasarım için medya sorguları oluşturma
  - [ ] Mobil görünüm (< 768px)
  - [ ] Tablet görünüm (768px - 1024px)
  - [ ] Masaüstü görünüm (> 1024px)

### 3. Sayfa Yapıları
- [ ] Ana sayfa
  - [ ] Hero bölümü
  - [ ] Öne çıkan ürünler
  - [ ] Kategoriler
  - [ ] Kampanyalar
  - [ ] Hakkımızda kısa bilgi
  - [ ] Müşteri yorumları
  - [ ] Bülten aboneliği
- [ ] Ürünler sayfası
  - [ ] Filtreleme ve sıralama
  - [ ] Kategori seçimi
  - [ ] Ürün listesi grid yapısı
  - [ ] Sayfalama veya sonsuz kaydırma
- [ ] Ürün detay sayfası
  - [ ] Ürün görselleri (galeri veya slider)
  - [ ] Ürün bilgileri (fiyat, açıklama, özellikler)
  - [ ] Beden/renk seçimi
  - [ ] Sepete ekle butonu
  - [ ] Benzer ürünler
  - [ ] Yorumlar ve değerlendirmeler
- [ ] Sepet sayfası
  - [ ] Ürün listesi
  - [ ] Miktar güncelleme
  - [ ] Ürün kaldırma
  - [ ] Fiyat özeti
  - [ ] Ödemeye geç butonu
- [ ] Ödeme sayfası
  - [ ] Teslimat bilgileri formu
  - [ ] Ödeme bilgileri formu
  - [ ] Sipariş özeti
  - [ ] Güvenli ödeme bilgisi
- [ ] Kullanıcı hesap sayfaları
  - [ ] Giriş/kayıt
  - [ ] Profil düzenleme
  - [ ] Sipariş geçmişi
  - [ ] Adres yönetimi
  - [ ] Favoriler

### 4. Temel Özellikler
- [ ] Ürün yönetimi
  - [ ] Ürün listeleme
  - [ ] Filtreleme ve arama
  - [ ] Kategori bazlı görüntüleme
  - [ ] Sıralama (fiyat, popülerlik, yenilik)
- [ ] Sepet işlevselliği
  - [ ] Ürün ekleme/çıkarma
  - [ ] Miktar güncelleme
  - [ ] Sepet özeti
  - [ ] Sepeti localStorage'da saklama
- [ ] Kullanıcı hesap yönetimi
  - [ ] Kayıt ve giriş
  - [ ] Profil güncelleme
  - [ ] Şifre sıfırlama
  - [ ] Adres yönetimi
- [ ] Ödeme süreci
  - [ ] Adres ve teslimat bilgileri
  - [ ] Ödeme yöntemi seçimi
  - [ ] Sipariş onayı
  - [ ] Ödeme entegrasyonu

### 5. Backend Entegrasyonu (İleriki Aşama)
- [ ] API yapısını oluşturma
  - [ ] Endpoint tasarımı
  - [ ] Veri modelleri
  - [ ] Kimlik doğrulama ve yetkilendirme
- [ ] Veritabanı şeması
  - [ ] Ürün koleksiyonu/tablosu
  - [ ] Kullanıcı koleksiyonu/tablosu
  - [ ] Sipariş koleksiyonu/tablosu
  - [ ] Kategori koleksiyonu/tablosu
- [ ] Admin paneli
  - [ ] Ürün yönetimi
  - [ ] Sipariş takibi
  - [ ] Kullanıcı yönetimi
  - [ ] İstatistikler ve raporlar

### 6. Test ve Optimizasyon
- [ ] Birim testleri
  - [ ] Komponent testleri
  - [ ] Util fonksiyon testleri
- [ ] Entegrasyon testleri
  - [ ] Sayfa akışları
  - [ ] API entegrasyonları
- [ ] Performans optimizasyonu
  - [ ] Lazy loading
  - [ ] Code splitting
  - [ ] Image optimization
  - [ ] Bundle size analizi
- [ ] SEO optimizasyonu
  - [ ] Meta etiketleri
  - [ ] Semantic HTML
  - [ ] Sitemap
  - [ ] Robots.txt

### 7. Dağıtım ve Yayınlama
- [ ] Hosting seçimi (Vercel, Netlify, AWS)
- [ ] CI/CD pipeline kurulumu
- [ ] Domain ayarları
- [ ] SSL sertifikası
- [ ] Analytics kurulumu
- [ ] Hata izleme sistemi

## Zaman Çizelgesi
- **Hafta 1-2**: Proje kurulumu ve temel UI komponentleri
- **Hafta 3-4**: Ana sayfa ve ürün listeleme sayfası
- **Hafta 5-6**: Ürün detay sayfası ve sepet işlevselliği
- **Hafta 7-8**: Kullanıcı hesap sayfaları ve ödeme süreci
- **Hafta 9-10**: Backend entegrasyonu
- **Hafta 11-12**: Test, optimizasyon ve yayınlama

## Gelecek Özellikler
- [ ] Çoklu dil desteği
- [ ] Koyu mod
- [ ] Mobil uygulama
- [ ] Kişiselleştirilmiş ürün önerileri
- [ ] Sadakat programı
- [ ] Dropshipping entegrasyonu 