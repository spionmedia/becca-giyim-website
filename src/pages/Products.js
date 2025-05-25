import React, { useState } from 'react';
import styled from 'styled-components';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

// Styled Components
const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  max-width: 800px;
`;

const ProductsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: ${props => props.isFilterOpen ? 'block' : 'none'};
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semiBold};
  margin: 0;
`;

const FilterContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const PriceInputs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ColorOption = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0 ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs} 0;
  cursor: pointer;
  border: 2px solid ${props => props.isSelected ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOption = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.isSelected 
    ? props.theme.colors.primary 
    : props.theme.colors.text.disabled};
  background-color: ${props => props.isSelected 
    ? props.theme.colors.primary 
    : 'transparent'};
  color: ${props => props.isSelected 
    ? 'white' 
    : props.theme.colors.text.primary};
  margin: 0 ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs} 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background-color: white;
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.fontFamily.body};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const MobileFilterHeader = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.surface};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const CloseFilterButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductsContent = styled.div`
  flex: 1;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ProductCount = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const SortingOptions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ViewOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const ViewButton = styled.button`
  background: none;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.text.disabled};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  ${props => props.view === 'list' && `
    grid-template-columns: 1fr;
  `}
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ProductListItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 200px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    height: 200px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProductCategory = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const Price = styled.span`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const OldPrice = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: line-through;
  margin-left: ${props => props.theme.spacing.sm};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.text.disabled};
  background-color: ${props => props.active 
    ? props.theme.colors.primary 
    : 'transparent'};
  color: ${props => props.active 
    ? 'white' 
    : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  margin: 0 ${props => props.theme.spacing.xs};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Örnek ürün verileri
const mockProducts = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  title: `T-Shirt Model ${index + 1}`,
  category: index % 3 === 0 ? 'Erkek' : index % 3 === 1 ? 'Kadın' : 'Unisex',
  price: 149.99 + (index * 10),
  oldPrice: index % 2 === 0 ? 199.99 + (index * 10) : null,
  discount: index % 2 === 0 ? 25 : null,
  image: `https://picsum.photos/500/500?random=${index}`,
  isWishlisted: index % 5 === 0,
  description: 'Yüksek kaliteli pamuklu kumaştan üretilmiş, rahat ve şık tasarımlı t-shirt. Günlük kullanım için ideal.',
  colors: ['black', 'white', 'gray', 'blue', 'red'].slice(0, (index % 3) + 2),
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].slice(0, (index % 4) + 3)
}));

const Products = () => {
  // State tanımlamaları
  const [view, setView] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    categories: true,
    price: true,
    colors: true,
    sizes: true
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtre bölümlerini açıp kapatma
  const toggleFilter = (filter) => {
    setOpenFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  // Kategori seçimi
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Fiyat aralığı değişimi
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Renk seçimi
  const handleColorSelect = (color) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };
  
  // Beden seçimi
  const handleSizeSelect = (size) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };
  
  // Sıralama değişimi
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Filtreleri temizleme
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSelectedColors([]);
    setSelectedSizes([]);
  };
  
  // Sayfa değiştirme
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <>
      <PageHeader>
        <PageTitle>Ürünlerimiz</PageTitle>
        <PageDescription>
          Özel tasarım t-shirtlerimiz arasından size en uygun olanı seçin. Tüm ürünlerimiz %100 pamuklu kumaştan üretilmiştir.
        </PageDescription>
      </PageHeader>
      
      <ProductsHeader>
        <ProductCount>{mockProducts.length} ürün bulundu</ProductCount>
        
        <SortingOptions>
          <MobileFilterButton onClick={() => setIsFilterOpen(true)}>
            <FiFilter /> Filtrele
          </MobileFilterButton>
          
          <Select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            options={[
              { value: 'featured', label: 'Öne Çıkanlar' },
              { value: 'newest', label: 'En Yeniler' },
              { value: 'price-low', label: 'Fiyat: Düşükten Yükseğe' },
              { value: 'price-high', label: 'Fiyat: Yüksekten Düşüğe' },
              { value: 'name-asc', label: 'İsim: A-Z' },
              { value: 'name-desc', label: 'İsim: Z-A' }
            ]}
          />
          
          <ViewOptions>
            <ViewButton 
              active={view === 'grid'} 
              onClick={() => setView('grid')}
              aria-label="Grid görünümü"
            >
              <FiGrid />
            </ViewButton>
            <ViewButton 
              active={view === 'list'} 
              onClick={() => setView('list')}
              aria-label="Liste görünümü"
            >
              <FiList />
            </ViewButton>
          </ViewOptions>
        </SortingOptions>
      </ProductsHeader>
      
      <ProductsContainer>
        {/* Filtreler Sidebar */}
        <Sidebar isFilterOpen={isFilterOpen}>
          <MobileFilterHeader>
            <h3>Filtreler</h3>
            <CloseFilterButton onClick={() => setIsFilterOpen(false)}>
              <FiX />
            </CloseFilterButton>
          </MobileFilterHeader>
          
          {/* Kategoriler Filtresi */}
          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('categories')}>
              <FilterTitle>Kategoriler</FilterTitle>
              {openFilters.categories ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.categories}>
              <CheckboxGroup>
                <Checkbox
                  label="Erkek"
                  checked={selectedCategories.includes('Erkek')}
                  onChange={() => handleCategoryChange('Erkek')}
                />
                <Checkbox
                  label="Kadın"
                  checked={selectedCategories.includes('Kadın')}
                  onChange={() => handleCategoryChange('Kadın')}
                />
                <Checkbox
                  label="Unisex"
                  checked={selectedCategories.includes('Unisex')}
                  onChange={() => handleCategoryChange('Unisex')}
                />
              </CheckboxGroup>
            </FilterContent>
          </FilterSection>
          
          {/* Fiyat Filtresi */}
          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('price')}>
              <FilterTitle>Fiyat Aralığı</FilterTitle>
              {openFilters.price ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.price}>
              <PriceInputs>
                <Input
                  type="number"
                  placeholder="Min"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  fullWidth
                />
                <Input
                  type="number"
                  placeholder="Max"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  fullWidth
                />
              </PriceInputs>
            </FilterContent>
          </FilterSection>
          
          {/* Renk Filtresi */}
          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('colors')}>
              <FilterTitle>Renkler</FilterTitle>
              {openFilters.colors ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.colors}>
              <div>
                <ColorOption 
                  color="black" 
                  isSelected={selectedColors.includes('black')}
                  onClick={() => handleColorSelect('black')}
                />
                <ColorOption 
                  color="white" 
                  isSelected={selectedColors.includes('white')}
                  onClick={() => handleColorSelect('white')}
                  style={{ border: '1px solid #ddd' }}
                />
                <ColorOption 
                  color="gray" 
                  isSelected={selectedColors.includes('gray')}
                  onClick={() => handleColorSelect('gray')}
                />
                <ColorOption 
                  color="red" 
                  isSelected={selectedColors.includes('red')}
                  onClick={() => handleColorSelect('red')}
                />
                <ColorOption 
                  color="blue" 
                  isSelected={selectedColors.includes('blue')}
                  onClick={() => handleColorSelect('blue')}
                />
                <ColorOption 
                  color="green" 
                  isSelected={selectedColors.includes('green')}
                  onClick={() => handleColorSelect('green')}
                />
              </div>
            </FilterContent>
          </FilterSection>
          
          {/* Beden Filtresi */}
          <FilterSection>
            <FilterHeader onClick={() => toggleFilter('sizes')}>
              <FilterTitle>Bedenler</FilterTitle>
              {openFilters.sizes ? <FiChevronUp /> : <FiChevronDown />}
            </FilterHeader>
            <FilterContent isOpen={openFilters.sizes}>
              <div>
                <SizeOption 
                  isSelected={selectedSizes.includes('XS')}
                  onClick={() => handleSizeSelect('XS')}
                >
                  XS
                </SizeOption>
                <SizeOption 
                  isSelected={selectedSizes.includes('S')}
                  onClick={() => handleSizeSelect('S')}
                >
                  S
                </SizeOption>
                <SizeOption 
                  isSelected={selectedSizes.includes('M')}
                  onClick={() => handleSizeSelect('M')}
                >
                  M
                </SizeOption>
                <SizeOption 
                  isSelected={selectedSizes.includes('L')}
                  onClick={() => handleSizeSelect('L')}
                >
                  L
                </SizeOption>
                <SizeOption 
                  isSelected={selectedSizes.includes('XL')}
                  onClick={() => handleSizeSelect('XL')}
                >
                  XL
                </SizeOption>
                <SizeOption 
                  isSelected={selectedSizes.includes('XXL')}
                  onClick={() => handleSizeSelect('XXL')}
                >
                  XXL
                </SizeOption>
              </div>
            </FilterContent>
          </FilterSection>
          
          <Button 
            variant="outline" 
            fullWidth
            onClick={clearFilters}
          >
            Filtreleri Temizle
          </Button>
        </Sidebar>
        
        {/* Ürünler */}
        <ProductsContent>
          {view === 'grid' ? (
            <ProductGrid>
              {mockProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <ProductList>
              {mockProducts.map(product => (
                <ProductListItem key={product.id}>
                  <ProductImage>
                    <img src={product.image} alt={product.title} />
                  </ProductImage>
                  <ProductDetails>
                    <ProductCategory>{product.category}</ProductCategory>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    
                    <PriceContainer>
                      <Price>{product.price.toLocaleString('tr-TR')} ₺</Price>
                      {product.oldPrice && (
                        <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>
                      )}
                    </PriceContainer>
                    
                    <Button 
                      variant="primary"
                      onClick={() => alert(`${product.title} sepete eklendi!`)}
                    >
                      Sepete Ekle
                    </Button>
                  </ProductDetails>
                </ProductListItem>
              ))}
            </ProductList>
          )}
          
          {/* Sayfalama */}
          <Pagination>
            <PageButton 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </PageButton>
            
            {[1, 2, 3].map(page => (
              <PageButton 
                key={page}
                active={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton 
              disabled={currentPage === 3}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </PageButton>
          </Pagination>
        </ProductsContent>
      </ProductsContainer>
    </>
  );
};

export default Products;
