# TeeVogue - T-Shirt Satış Platformu

TeeVogue, modern ve kullanıcı dostu bir t-shirt satış platformudur. Özel tasarımlar ve kaliteli ürünlerle müşterilere benzersiz bir alışveriş deneyimi sunmayı hedefler.

## Proje Kurulumu

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Repoyu klonlayın
git clone <repo-url>

# Proje dizinine gidin
cd teevogue

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Kullanılan Teknolojiler

- React.js
- React Router
- Styled Components
- Axios
- React Icons
- React Hook Form

## Proje Yapısı

```
src/
├── assets/         # Resimler, fontlar ve diğer statik dosyalar
├── components/     # Yeniden kullanılabilir bileşenler
│   ├── common/     # Butonlar, formlar gibi genel bileşenler
│   ├── layout/     # Header, footer gibi düzen bileşenleri
│   └── product/    # Ürünle ilgili bileşenler
├── contexts/       # React context'leri
├── hooks/          # Özel React hook'ları
├── pages/          # Sayfa bileşenleri
├── services/       # API istekleri ve diğer servisler
└── utils/          # Yardımcı fonksiyonlar ve sabitler
```

## Özellikler

- Ürün listeleme ve filtreleme
- Ürün detay sayfaları
- Sepet işlevselliği
- Kullanıcı hesap yönetimi
- Ödeme entegrasyonu

## Katkıda Bulunma

1. Repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
