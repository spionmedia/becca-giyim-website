import React, { useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import categoryMeta from '../constants/categoryMeta';
import useProducts from '../hooks/useProducts';
import { updateSEO, PAGE_SEO } from '../utils/seo';

const Page = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xxl};
`;

const Hero = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.gradients.hero};
  color: white;
  overflow: hidden;
  min-height: 320px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${props => props.background}) center/cover;
    opacity: 0.25;
    mix-blend-mode: screen;
  }
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 520px;
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const Pill = styled(Link)`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  letter-spacing: ${props => props.theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  margin: 0;
`;

const SubcategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const SubcategoryCard = styled(Link)`
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.muted};
  padding: ${props => props.theme.spacing.lg};
  text-decoration: none;
  color: ${props => props.theme.colors.text.primary};
  background: ${props => props.theme.colors.surface};
  transition: transform 0.2s ease, border-color 0.2s ease;

  h3 {
    margin-top: 0;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const HighlightCard = styled(Link)`
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: ${props => props.theme.shadows.sm};
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const HighlightImage = styled.div`
  position: relative;
  padding-top: 60%;
  background: #ccc;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HighlightBody = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Price = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
`;

const CategoryLanding = () => {
  const { gender } = useParams();
  const meta = categoryMeta[gender];
  const { products: allProducts, loading } = useProducts({ gender });

  // SEO güncelle
  useEffect(() => {
    if (meta) {
      const seoConfig = gender === 'kadin' ? PAGE_SEO.kadin : PAGE_SEO.erkek;
      updateSEO({
        title: seoConfig.title,
        description: seoConfig.description,
        url: `/#/${gender}`,
        breadcrumbs: [
          { name: 'Ana Sayfa', url: '/' },
          { name: meta.label, url: `/#/${gender}` }
        ]
      });
    }
  }, [gender, meta]);

  if (!meta) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page>
      <Hero background={meta.hero.image}>
        <HeroContent>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8 }}>
            Becca Giyim
          </p>
          <h1>{meta.hero.title}</h1>
          <p style={{ maxWidth: 420 }}>{meta.hero.subtitle}</p>
          <Button as={Link} to={gender ? `/${gender}` : `/products`} variant="secondary" size="large">
            Koleksiyonu Gör
          </Button>
          <PillRow>
            {meta.subcategories.map(sub => (
              <Pill key={sub.slug} to={`/${gender}/${sub.slug}`}>
                {sub.label}
              </Pill>
            ))}
          </PillRow>
        </HeroContent>
      </Hero>

      <div>
        <SectionHeading>
          <Title>Koleksiyonu Keşfet</Title>
          <Button as={Link} to={gender ? `/${gender}` : `/products`} variant="outline">
            Tümünü Gör
          </Button>
        </SectionHeading>
        <SubcategoryGrid>
          {meta.subcategories.map(sub => (
            <SubcategoryCard key={sub.slug} to={`/${gender}/${sub.slug}`}>
              <h3>{sub.label}</h3>
              <p>{sub.description}</p>
            </SubcategoryCard>
          ))}
        </SubcategoryGrid>
      </div>

      <div>
        <SectionHeading>
          <Title>Öne Çıkanlar</Title>
          <span>{loading ? 'Yükleniyor...' : `${allProducts.length} ürün`}</span>
        </SectionHeading>
        <HighlightGrid>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : allProducts.length > 0 ? (
            allProducts.map(product => (
              <HighlightCard key={product.id} to={`/product/${product.id}`}>
                <HighlightImage>
                  <img src={product.heroImage} alt={product.title} />
                </HighlightImage>
                <HighlightBody>
                  <small>{meta.label}</small>
                  <strong>{product.title}</strong>
                  <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
                </HighlightBody>
              </HighlightCard>
            ))
          ) : (
            <p>Bu kategoride ürün bulunmuyor.</p>
          )}
        </HighlightGrid>
      </div>
    </Page>
  );
};

export default CategoryLanding;
