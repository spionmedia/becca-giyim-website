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

const InfoCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const InfoCard = styled.div`
  background: ${props => props.theme.colors.gradients.card};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
`;

const DeliveryReturns = () => {
  useEffect(() => {
    updateSEO({
      title: PAGE_SEO.delivery.title,
      description: PAGE_SEO.delivery.description,
      url: '/#/teslimat-ve-iade',
      breadcrumbs: [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Teslimat ve İade', url: '/#/teslimat-ve-iade' }
      ]
    });
  }, []);

  return (
    <PageWrapper>
      <div>
        <Title>Teslimat ve İade Koşulları</Title>
        <Intro>
          Sipariş ettiğiniz ürünlerin size hızlı ve güvenli şekilde ulaşması, memnun kalmamanız halinde kolayca iade edebilmeniz için tüm süreçlerimizi şeffaflıkla paylaşıyoruz. Aşağıdaki başlıklarda teslimat, kargo takibi, değişim ve iade prosedürlerimizi inceleyebilirsiniz.
        </Intro>
      </div>

      <InfoCardGrid>
        <InfoCard>
          <strong>Kargo Süresi</strong>
          <p>Hafta içi saat 15.00’e kadar verilen siparişler aynı gün, diğer siparişler en geç 2 iş günü içinde kargoya teslim edilir.</p>
        </InfoCard>
        <InfoCard>
          <strong>Ücretsiz Kargo Limiti</strong>
          <p>1.500 TL ve üzeri alışverişlerde yurt içi kargo ücretsizdir. Bu tutarın altındaki siparişler için 89 TL sabit kargo ücreti uygulanır.</p>
        </InfoCard>
        <InfoCard>
          <strong>İade Süresi</strong>
          <p>Ürünü teslim aldığınız tarihten itibaren 14 gün içinde koşulsuz iade talebinde bulunabilirsiniz.</p>
        </InfoCard>
      </InfoCardGrid>

      <Section>
        <SectionTitle>1. Teslimat Bilgileri</SectionTitle>
        <Paragraph>
          Siparişleriniz anlaşmalı kargo şirketimiz aracılığıyla, sistemde tanımlı teslimat adresinize gönderilir. Kargo bilgileri ve takip numarası, siparişiniz kargoya verildiğinde e-posta ve SMS olarak paylaşılır.
        </Paragraph>
        <List>
          <li>Teslimatlar Türkiye sınırları içerisinde gerçekleştirilir.</li>
          <li>Yoğun kampanya dönemlerinde kargoya teslim süresi +1-2 iş günü uzayabilir.</li>
          <li>Adres değişiklikleri kargo çıkışı gerçekleşmeden önce Müşteri Hizmetleri ile paylaşılmalıdır.</li>
          <li>Kargo görevlisi teslimat adresinde sizi bulamadığında ikinci bir teslimat denemesi yapılır.</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. Kargo Hasar ve Eksik Ürün Prosedürü</SectionTitle>
        <Paragraph>
          Teslimat sırasında paketin hasarlı olduğunu fark ederseniz, kargo görevlisine tutanak tutturup ürünü teslim almayınız. Eksik veya yanlış ürün gönderimi durumunda 48 saat içinde bize ulaşmanız halinde ücretsiz değişim süreci başlatılır.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. İade Şartları</SectionTitle>
        <List>
          <li>İade talebinizi “Hesabım &gt; Siparişlerim” üzerinden veya support@beccagiyim.com adresinden iletebilirsiniz.</li>
          <li>Ürünlerin kullanılmamış, yıkanmamış, orijinal ambalajı ve etiketleriyle birlikte gönderilmesi gerekir.</li>
          <li>İç giyim, kozmetik ve kişiye özel ürünlerde hijyen gerekçesiyle iade kabul edilmez.</li>
          <li>İade kargo bedeli, ürün kusurlu değilse müşteri tarafından karşılanır.</li>
          <li>İade edilen ürün depoya ulaştıktan sonra kontrolleri 2 iş günü içinde tamamlanır.</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Değişim İşlemleri</SectionTitle>
        <Paragraph>
          Varsa stok durumuna bağlı olarak ürün değişimi yapılabilir. Değişim talebinde öncelikle iade süreci başlatılır, ardından yeni ürün için ayrı bir sipariş oluşturulur. Kampanya kodları veya indirimler yeni siparişe otomatik olarak yansıtılmaz.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Geri Ödeme Süreci</SectionTitle>
        <Paragraph>
          Geri ödeme, ürünün iade şartlarına uygunluğunun onaylanmasını takiben 5-7 iş günü içinde orijinal ödeme yöntemine yapılır. Bankanızın süreçleri nedeniyle kart ekstresine yansıma süresi farklılık gösterebilir.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. İletişim</SectionTitle>
        <Paragraph>
          Teslimat ve iade süreçleriyle ilgili tüm sorularınız için hafta içi 09:00-18:00 saatleri arasında +90 5394491810 numaralı çağrı merkezimize ulaşabilir veya support@beccagiyim.com adresine e-posta gönderebilirsiniz.
        </Paragraph>
      </Section>
    </PageWrapper>
  );
};

export default DeliveryReturns;
