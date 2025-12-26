import React, { useEffect } from 'react';
import styled from 'styled-components';
import { updateSEO, PAGE_SEO } from '../utils/seo';

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Intro = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.7;
`;

const Section = styled.section`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Paragraph = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const List = styled.ul`
  padding-left: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const DistanceSalesAgreement = () => {
  useEffect(() => {
    updateSEO({
      title: PAGE_SEO.agreement.title,
      description: PAGE_SEO.agreement.description,
      url: '/#/mesafeli-satis-sozlesmesi',
      breadcrumbs: [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Mesafeli Satış Sözleşmesi', url: '/#/mesafeli-satis-sozlesmesi' }
      ]
    });
  }, []);

  return (
    <PageWrapper>
      <div>
        <Title>Mesafeli Satış Sözleşmesi</Title>
        <Intro>
          İşbu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında, Becca Giyim ile tüketici sıfatını haiz alıcı arasında kurulan elektronik ticaret işlemlerinde uygulanır.
        </Intro>
      </div>

      <Section>
        <SectionTitle>1. Taraflar</SectionTitle>
        <Paragraph>
          SATICI: Becca Giyim San. ve Tic. Ltd. Şti. / Vergi No: 0000000000 / Adres: Ayazağa Mah. Maslak Meydan Sk. No:12 Sarıyer/İstanbul / İletişim: support@beccagiyim.com, +90 850 000 00 00
        </Paragraph>
        <Paragraph>
          ALICI: www.beccagiyim.com adresi üzerinden sipariş oluşturan, üyelik veya misafir alışveriş yapan gerçek kişi ya da tüzel kişi.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Konu</SectionTitle>
        <Paragraph>
          ALICI’nın, SATICI’ya ait internet sitesinden elektronik ortamda sipariş ettiği ürün/ürünlerin nitelikleri, satış fiyatı, teslimat ve ödeme koşulları ile tarafların hak ve yükümlülüklerinin belirlenmesidir.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Ürün Bilgileri</SectionTitle>
        <Paragraph>
          Ürün cinsi, adedi, vergiler dahil satış bedeli ve teslimat bedeli, siparişin onaylandığı ödeme sayfasında ve sipariş özetinde belirtilir. ALICI, siparişi onayladığında bu fiyatları kabul etmiş sayılır.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Ödeme ve Fatura</SectionTitle>
        <List>
          <li>Ödemeler kredi kartı, banka kartı veya havale/EFT yöntemleriyle alınır.</li>
          <li>3D Secure güvenlik protokolü üzerinden ödeme alınır.</li>
          <li>Faturalar elektronik ortamda düzenlenir ve e-posta yoluyla paylaşılır.</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Teslimat Koşulları</SectionTitle>
        <Paragraph>
          Teslimat, ALICI’nın sipariş formunda belirttiği adrese yapılır. Kargo bedeli sipariş sırasında ALICI’ya bildirilir. SATICI, stok ve lojistik koşulları el verdiği sürece ürünleri en geç 5 iş günü içinde kargoya teslim eder.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Cayma Hakkı</SectionTitle>
        <Paragraph>
          ALICI, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeden ve cezai şart ödemeden sözleşmeden cayma hakkına sahiptir. Cayma bildirimi support@beccagiyim.com adresine yazılı olarak iletilmelidir.
        </Paragraph>
        <List>
          <li>Ürünlerin kullanılmamış, ambalajı bozulmamış ve tekrar satılabilir nitelikte olması gerekir.</li>
          <li>Hijyen gereği iç giyim, kişiye özel ürünler ve hızla bozulan mallarda cayma hakkı kullanılamaz.</li>
          <li>Cayma durumunda iade kargo bedeli aksi belirtilmedikçe ALICI’ya aittir.</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>7. Garanti ve İade</SectionTitle>
        <Paragraph>
          Ayıplı ürün durumunda ALICI, teslimattan itibaren 30 gün içinde ayıbı bildirerek ücretsiz onarım, değişim veya bedel iadesi talep edebilir. İnceleme süresi en fazla 20 iş günüdür.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Mücbir Sebepler</SectionTitle>
        <Paragraph>
          Doğal afetler, pandemi, savaş, grev gibi tarafların kontrolü dışında gelişen durumlarda teslimat süreleri uzayabilir. Bu hallerde taraflar yükümlülüklerini askıya alabilir.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. Uyuşmazlıkların Çözümü</SectionTitle>
        <Paragraph>
          İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri, üzerinde ise Tüketici Mahkemeleri yetkilidir. İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkili kabul edilir.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>10. Yürürlük</SectionTitle>
        <Paragraph>
          ALICI, elektronik ortamda verdiği onay ile sözleşme koşullarını kabul etmiş sayılır. Siparişin tamamlanmasıyla sözleşme yürürlüğe girer.
        </Paragraph>
      </Section>
    </PageWrapper>
  );
};

export default DistanceSalesAgreement;
