import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';

// Styled Components
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary}11;
  border-radius: ${props => props.theme.borderRadius.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    text-align: left;
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xxl};
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding-right: ${props => props.theme.spacing.xxl};
  }
`;

const HeroTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxxl};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.md};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  
  svg {
    margin-left: ${props => props.theme.spacing.xs};
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const CategorySection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const CategoryCard = styled.div`
  position: relative;
  height: 200px;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.md};
    
    img {
      transform: scale(1.05);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.spacing.md};
  background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
  
  h3 {
    color: white;
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const AboutContent = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  
  h2 {
    margin-top: 0;
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const AboutImage = styled.div`
  flex: 1;
  min-height: 300px;
  background-image: url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
`;

const TestimonialSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
  text-align: center;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  text-align: left;
  
  p {
    font-style: italic;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: ${props => props.theme.spacing.md};
  }
  
  .author-info {
    h4 {
      margin: 0 0 5px 0;
    }
    
    span {
      color: ${props => props.theme.colors.text.secondary};
      font-size: ${props => props.theme.typography.fontSize.sm};
    }
  }
`;

const NewsletterSection = styled.section`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: ${props => props.theme.spacing.lg} auto 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md} 0 0 ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: ${props => props.theme.borderRadius.md};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const NewsletterButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    border-radius: ${props => props.theme.borderRadius.md};
  }
`;

// Örnek ürün verileri
const featuredProducts = [
  {
    id: 1,
    title: 'Vintage Baskılı T-Shirt',
    category: 'Erkek',
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isWishlisted: false
  },
  {
    id: 2,
    title: 'Minimalist Tasarım T-Shirt',
    category: 'Kadın',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isWishlisted: true
  },
  {
    id: 3,
    title: 'Grafik Baskılı Oversize T-Shirt',
    category: 'Unisex',
    price: 229.99,
    oldPrice: 299.99,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isWishlisted: false
  },
  {
    id: 4,
    title: 'Retro Baskılı T-Shirt',
    category: 'Erkek',
    price: 189.99,
    oldPrice: 239.99,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isWishlisted: false
  }
];

// Örnek kategori verileri
const categories = [
  { id: 1, name: 'Erkek', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
  { id: 2, name: 'Kadın', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
  { id: 3, name: 'Unisex', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' },
  { id: 4, name: 'Oversize', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' }
];

// Örnek müşteri yorumları
const testimonials = [
  {
    id: 1,
    text: 'TeeVogue\'dan aldığım t-shirtler hem kaliteli hem de çok şık. Baskılar uzun süre dayanıyor ve kumaşı çok rahat.',
    name: 'Ayşe Yılmaz',
    title: 'Müşteri',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    text: 'Siparişim çok hızlı geldi ve ürünler tam beklediğim gibiydi. Kesinlikle tekrar alışveriş yapacağım.',
    name: 'Mehmet Kaya',
    title: 'Müşteri',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    text: 'Özel tasarım t-shirtler için en iyi adres. Fiyat-performans açısından çok memnun kaldım.',
    name: 'Zeynep Demir',
    title: 'Müşteri',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const Home = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Bülten aboneliği işleme
    alert('Bülten aboneliğiniz alındı!');
  };
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Tarzını Yansıt</HeroTitle>
          <HeroSubtitle>
            Özel tasarım t-shirtler ile kendi tarzını oluştur. Kaliteli kumaş ve baskılarla uzun ömürlü kullanım.
          </HeroSubtitle>
          <Button 
            variant="primary" 
            size="large"
            as={Link} 
            to="/products"
            rightIcon={<FiArrowRight />}
          >
            Hemen Keşfet
          </Button>
        </HeroContent>
        <HeroImage>
          <img 
            src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="TeeVogue T-shirts" 
          />
        </HeroImage>
      </HeroSection>
      
      {/* Featured Products Section */}
      <section>
        <SectionHeader>
          <SectionTitle>Öne Çıkan Ürünler</SectionTitle>
          <ViewAllLink to="/products">
            Tümünü Gör <FiArrowRight />
          </ViewAllLink>
        </SectionHeader>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>
      
      {/* Categories Section */}
      <CategorySection>
        <SectionTitle>Kategoriler</SectionTitle>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.id}>
              <Link to={`/category/${category.id}`}>
                <img src={category.image} alt={category.name} />
                <CategoryOverlay>
                  <h3>{category.name}</h3>
                </CategoryOverlay>
              </Link>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySection>
      
      {/* About Section */}
      <AboutSection>
        <AboutContent>
          <SectionTitle>Hakkımızda</SectionTitle>
          <p>
            TeeVogue, 2023 yılında özel tasarım t-shirtler üretmek amacıyla kuruldu. Amacımız, müşterilerimize hem kaliteli hem de özgün tasarımlara sahip ürünler sunmak.
          </p>
          <p>
            Tüm ürünlerimiz %100 pamuklu kumaştan üretilmekte ve çevre dostu baskı teknikleri kullanılmaktadır. Sürdürülebilirlik ve etik üretim değerlerimizin merkezinde yer alır.
          </p>
          <Button 
            variant="outline" 
            as={Link} 
            to="/about"
          >
            Daha Fazla Bilgi
          </Button>
        </AboutContent>
        <AboutImage />
      </AboutSection>
      
      {/* Testimonials Section */}
      <TestimonialSection>
        <SectionTitle>Müşteri Yorumları</SectionTitle>
        <TestimonialGrid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id}>
              <p>"{testimonial.text}"</p>
              <TestimonialAuthor>
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.title}</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialSection>
      
      {/* Newsletter Section */}
      <NewsletterSection>
        <SectionTitle>Bültenimize Abone Olun</SectionTitle>
        <p>Yeni ürünler, kampanyalar ve indirimlerden ilk siz haberdar olun.</p>
        <NewsletterForm onSubmit={handleNewsletterSubmit}>
          <NewsletterInput 
            type="email" 
            placeholder="E-posta adresiniz" 
            required 
          />
          <NewsletterButton type="submit">Abone Ol</NewsletterButton>
        </NewsletterForm>
      </NewsletterSection>
    </>
  );
};

export default Home;
