import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import categoryMeta from '../constants/categoryMeta';
import useProducts from '../hooks/useProducts';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// Styled Components
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} 0;
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.gradients.hero};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  
  &::after {
    content: '';
    position: absolute;
    inset: 12%;
    background: radial-gradient(circle at top, rgba(228, 199, 165, 0.65), transparent 55%);
    z-index: -1;
  }
  
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
  color: white;
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: rgba(255, 255, 255, 0.75);
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.lg};
    box-shadow: ${props => props.theme.shadows.lg};
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.05));
  
  h3 {
    color: white;
    margin: 0 0 ${props => props.theme.spacing.xs} 0;
    font-size: ${props => props.theme.typography.fontSize.lg};
  }

  p {
    margin: 0;
    color: rgba(255,255,255,0.75);
    font-size: ${props => props.theme.typography.fontSize.sm};
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



const Home = () => {
  const { products: allProducts, loading } = useProducts();
  const featuredProducts = allProducts.slice(0, 4);

  const categories = [
    {
      id: 'kadin',
      name: 'Kadın Koleksiyonu',
      tagline: 'Takım, dış giyim ve üst giyim kapsülleri',
      image: categoryMeta.kadin.hero.image,
      to: '/kadin'
    },
    {
      id: 'erkek',
      name: 'Erkek Koleksiyonu',
      tagline: 'Şehir silüetinden ilham alan parçalar',
      image: categoryMeta.erkek.hero.image,
      to: '/erkek'
    },
    {
      id: 'kadin-takim',
      name: 'Kadın Takım',
      tagline: 'Ofisten akşam davetine',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      to: '/kadin/takim'
    },
    {
      id: 'erkek-dis',
      name: 'Erkek Dış Giyim',
      tagline: 'Teknik kaban ve ceketler',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
      to: '/erkek/dis-giyim'
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: 'Becca Giyim\'den aldığım ürünler hem kaliteli hem de çok şık. Kesinlikle tekrar alışveriş yapacağım.',
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
      text: 'Özel tasarım ürünler için en iyi adres. Fiyat-performans açısından çok memnun kaldım.',
      name: 'Zeynep Demir',
      title: 'Müşteri',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];



  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
        >
          <HeroTitle
            as={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tarzını Yansıt
          </HeroTitle>
          <HeroSubtitle
            as={motion.p}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Becca Giyim ile şıklığı yeniden keşfet. Kaliteli kumaşlar ve modern tasarımlarla gardırobunuzu güncelleyin.
          </HeroSubtitle>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="large"
              as={Link}
              to="/products"
              rightIcon={<FiArrowRight />}
            >
              Hemen Keşfet
            </Button>
          </motion.div>
        </HeroContent>
        <HeroImage
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Becca Giyim Koleksiyonu"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </HeroImage>
      </HeroSection>

      {/* Featured Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionHeader>
          <SectionTitle>Öne Çıkan Ürünler</SectionTitle>
          <ViewAllLink to="/products">
            Tümünü Gör <FiArrowRight />
          </ViewAllLink>
        </SectionHeader>
        <ProductGrid
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            <p>Yükleniyor...</p>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={scaleIn}>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p>Henüz ürün eklenmemiş.</p>
          )}
        </ProductGrid>
      </motion.section>

      {/* Categories Section */}
      <CategorySection
        as={motion.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionTitle>Kategoriler</SectionTitle>
        <CategoryGrid
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} variants={scaleIn}>
              <CategoryCard
                as={motion.div}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/${category.id}`}>
                  <img src={category.image} alt={category.name} />
                  <CategoryOverlay>
                    <h3>{category.name}</h3>
                  </CategoryOverlay>
                </Link>
              </CategoryCard>
            </motion.div>
          ))}
        </CategoryGrid>
      </CategorySection>

      {/* About Section */}
      <AboutSection
        as={motion.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AboutContent
          as={motion.div}
          variants={fadeInLeft}
        >
          <SectionTitle>Hakkımızda</SectionTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Becca Giyim, modern ve şık tasarımlarıyla kadın ve erkek modasına yön vermek amacıyla kuruldu. Amacımız, müşterilerimize hem kaliteli hem de özgün parçalar sunmak.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Tüm ürünlerimiz seçkin kumaşlardan üretilmekte ve sürdürülebilir üretim ilkelerine uyulmaktadır. Kalite ve tarz, değerlerimizin merkezinde yer alır.
          </motion.p>
        </AboutContent>
        <AboutImage
          as={motion.div}
          variants={fadeInRight}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        />
      </AboutSection>

      {/* Testimonials Section */}
      <TestimonialSection
        as={motion.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <SectionTitle>Müşteri Yorumları</SectionTitle>
        <TestimonialGrid
          as={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={scaleIn}>
              <TestimonialCard
                as={motion.div}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <p>"{testimonial.text}"</p>
                <TestimonialAuthor>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.title}</span>
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialGrid>
      </TestimonialSection>

    </>
  );
};

export default Home;
