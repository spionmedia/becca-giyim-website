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

const SectionParagraph = styled.p`
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

const PrivacyPolicy = () => {
  useEffect(() => {
    updateSEO({
      title: PAGE_SEO.privacy.title,
      description: PAGE_SEO.privacy.description,
      url: '/#/gizlilik-politikasi',
      breadcrumbs: [
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Gizlilik Politikası', url: '/#/gizlilik-politikasi' }
      ]
    });
  }, []);

  const sections = [
    {
      title: '1. Genel Bilgilendirme',
      paragraphs: [
        'Bu gizlilik politikası, Becca Giyim olarak kişisel verilerinizi nasıl topladığımızı, sakladığımızı ve işlediğimizi açıklamak için hazırlanmıştır. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.'
      ]
    },
    {
      title: '2. Toplanan Kişisel Veriler',
      paragraphs: [
        'Hizmetlerimizi sunarken aşağıdaki veri kategorilerini işleyebiliriz:'
      ],
      list: [
        'Kimlik bilgileri: ad, soyad, T.C. kimlik numarası (kurumsal işlemlerde), doğum tarihi',
        'İletişim bilgileri: e-posta adresi, telefon numarası, teslimat ve fatura adresleri',
        'Müşteri işlem verileri: sipariş detayları, sepet içerikleri, iade ve değişim talepleri',
        'Finansal veriler: ödeme tutarı, taksit bilgileri (ödeme altyapısı sağlayıcıları üzerinden)',
        'Pazarlama verileri: iletişim izinleri, kampanya tercihleri, anket yanıtları',
        'Çevrimiçi veriler: cihaz ve tarayıcı bilgileri, IP adresi, çerez kayıtları'
      ]
    },
    {
      title: '3. Kişisel Verilerin İşlenme Amaçları',
      paragraphs: [
        'Topladığımız kişisel verileri aşağıdaki amaçlarla işleriz:'
      ],
      list: [
        'Siparişlerin alınması, hazırlanması, kargolanması ve satış sonrası desteğin sağlanması',
        'Ödeme işlemlerinin gerçekleştirilmesi ve faturalama süreçlerinin yürütülmesi',
        'Müşteri hesabı oluşturma, giriş, parola sıfırlama gibi üyelik işlemlerinin yönetilmesi',
        'Kampanya, promosyon ve kişiselleştirilmiş pazarlama iletişimlerinin gönderilmesi (onay verilmişse)',
        'Yasal yükümlülüklerin yerine getirilmesi ve resmi makam taleplerinin karşılanması',
        'Site deneyiminin iyileştirilmesi, performans ve güvenlik analizlerinin yapılması'
      ]
    },
    {
      title: '4. Kişisel Verilerin Aktarılması',
      paragraphs: [
        'Verileriniz, yalnızca hizmetimizin gerektirdiği ölçüde ve mevzuata uygun olarak şu taraflarla paylaşılabilir:'
      ],
      list: [
        'Ödeme kuruluşları ve bankalar',
        'Kargo/lojistik şirketleri ve depolama hizmeti sağlayıcıları',
        'Bilgi teknolojileri altyapı sağlayıcılarımız, barındırma ve güvenlik partnerlerimiz',
        'Yetkili kamu kurumları ve yasal merciler',
        'Pazarlama iletişimine onay verdiğiniz üçüncü taraf hizmet sağlayıcıları'
      ]
    },
    {
      title: '5. Çerez (Cookie) Kullanımı',
      paragraphs: [
        'Web sitemizde oturum yönetimi, tercihlerin hatırlanması, istatistiksel analizler ve reklam gösterimleri için çerezler kullanılır. Tarayıcı ayarlarınızdan çerez tercihlerinizi güncelleyebilir veya tamamen devre dışı bırakabilirsiniz. Çerezleri devre dışı bırakmanız bazı özelliklerin çalışmamasına neden olabilir.'
      ]
    },
    {
      title: '6. KVKK Kapsamındaki Haklarınız',
      paragraphs: [
        'KVKK’nın 11. maddesi uyarınca şirketimize başvurarak aşağıdaki haklarınızı kullanabilirsiniz:'
      ],
      list: [
        'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
        'Verileriniz işlenmişse buna ilişkin bilgi talep etme',
        'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
        'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
        'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
        'KVKK’ya aykırı işlendiğinde silinmesini veya yok edilmesini talep etme',
        'Otomatik sistemler ile analiz edilmesine itiraz etme',
        'Maddi zarar doğması halinde zararların giderilmesini talep etme'
      ]
    },
    {
      title: '7. Veri Saklama Süreleri',
      paragraphs: [
        'Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca veya işleme amaçlarının gerektirdiği süre kadar saklanır. Süre sonunda veriler, saklama ve imha politikalarımıza uygun şekilde silinir, yok edilir veya anonim hale getirilir.'
      ]
    },
    {
      title: '8. İletişim',
      paragraphs: [
        'Veri sahibi olarak haklarınızı kullanmak veya gizlilik politikamızla ilgili sorularınızı iletmek için support@beccagiyim.com adresine e-posta gönderebilir veya +90 5394491810 numaralı telefon hattımızı arayabilirsiniz.'
      ]
    }
  ];

  return (
    <PageWrapper>
      <div>
        <Title>Gizlilik Politikası</Title>
        <Intro>
          Becca Giyim kullanıcılarının kişisel verilerinin güvenliği, veri işleme süreçlerinde şeffaflık ve mevzuata uyum en öncelikli değerlerimizdir. Bu sayfa üzerinden hangi verileri hangi amaçlarla işlediğimizi, kimlerle paylaştığımızı ve haklarınızı detaylı şekilde inceleyebilirsiniz.
        </Intro>
      </div>

      {sections.map(section => (
        <Section key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.paragraphs.map(text => (
            <SectionParagraph key={text}>{text}</SectionParagraph>
          ))}
          {section.list && (
            <List>
              {section.list.map(item => (
                <li key={item}>{item}</li>
              ))}
            </List>
          )}
        </Section>
      ))}
    </PageWrapper>
  );
};

export default PrivacyPolicy;
