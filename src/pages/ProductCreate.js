import React, { useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import categoryMeta from '../constants/categoryMeta';
import { addProduct } from '../services/productService';
import { uploadProductImage, uploadMultipleImages } from '../services/storageService';

const Page = styled.section`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.p`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
  max-width: 620px;
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  background: ${props => props.theme.colors.background};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  resize: vertical;
  background: ${props => props.theme.colors.background};
`;

const Helper = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const ImageUploadArea = styled.div`
  border: 2px dashed ${props => props.isDragging ? props.theme.colors.primary : props.theme.colors.text.disabled};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isDragging ? props.theme.colors.primary + '10' : 'transparent'};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const ImagePreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${props => props.isMain ? props.theme.colors.primary : 'transparent'};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background: #d14343;
  }
`;

const MainBadge = styled.span`
  position: absolute;
  bottom: 4px;
  left: 4px;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
`;

const UploadProgress = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary}15;
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const ColorChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.muted};
  background: ${props => props.theme.colors.background};
`;

const ColorPreview = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  background: ${props => props.color};
`;

const SizeList = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  flex-wrap: wrap;
`;

const SizeTag = styled.button`
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.disabled};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#fff' : props => props.theme.colors.text.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const SummaryCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: ${props => props.theme.spacing.xl};
`;

const PreviewImage = styled.div`
  width: 100%;
  padding-top: 65%;
  border-radius: ${props => props.theme.borderRadius.md};
  background: url(${props => props.src}) center/cover no-repeat, #f4f4f4;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary}22;
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const SuccessState = styled.div`
  border: 1px solid ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.success}15;
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const initialForm = {
  title: '',
  description: '',
  heroImage: '',
  galleryInput: '',
  gender: 'kadin',
  category: 'takim',
  price: '',
  oldPrice: '',
  inventory: '',
  discount: '',
  tagsInput: '',
};

const sizePresets = ['XS', 'S', 'M', 'L', 'XL', '34', '36', '38', '40', '42', '44', '46', '48', '50'];

const ProductCreate = () => {
  const [form, setForm] = useState(initialForm);
  const [colorDraft, setColorDraft] = useState({ name: '', code: '#000000' });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successProduct, setSuccessProduct] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]); // URL listesi
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const availableCategories = useMemo(() => {
    return categoryMeta[form.gender]?.subcategories || [];
  }, [form.gender]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddColor = () => {
    if (!colorDraft.name.trim()) return;
    setColors(prev => [...prev, { name: colorDraft.name.trim(), code: colorDraft.code }]);
    setColorDraft({ name: '', code: '#000000' });
  };

  const handleRemoveColor = (index) => {
    setColors(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  // Dosya yükleme işlemleri
  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const urls = await uploadMultipleImages(files);
      setUploadedImages(prev => [...prev, ...urls]);

      // İlk görsel hero image olsun
      if (uploadedImages.length === 0 && urls.length > 0) {
        setForm(prev => ({ ...prev, heroImage: urls[0] }));
      }
    } catch (err) {
      setError('Görsel yüklenirken hata oluştu: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);

    // Hero image güncelle
    if (index === 0 && newImages.length > 0) {
      setForm(prev => ({ ...prev, heroImage: newImages[0] }));
    } else if (newImages.length === 0) {
      setForm(prev => ({ ...prev, heroImage: '' }));
    }
  };

  const setAsMainImage = (index) => {
    const newImages = [...uploadedImages];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    setUploadedImages(newImages);
    setForm(prev => ({ ...prev, heroImage: selected }));
  };

  const validate = () => {
    if (!form.title.trim()) return 'Ürün adı zorunludur';
    if (uploadedImages.length === 0) return 'En az bir ürün görseli yükleyin';
    if (!form.price) return 'Fiyat bilgisi zorunludur';
    if (!form.description.trim()) return 'Ürün açıklaması girin';
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        heroImage: uploadedImages[0] || form.heroImage.trim(),
        gallery: uploadedImages.slice(1),
        gender: form.gender,
        category: form.category,
        price: parseFloat(form.price),
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : 0,
        inventory: form.inventory ? parseInt(form.inventory, 10) : 0,
        discount: form.discount ? parseInt(form.discount, 10) : null,
        colors,
        sizes,
        tags: form.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
      };

      const created = await addProduct(payload);
      setSuccessProduct(created);
      setForm(initialForm);
      setColors([]);
      setSizes([]);
      setUploadedImages([]);
    } catch (err) {
      setError('Ürün kaydedilirken bir sorun oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Title>Yeni Ürün Ekle</Title>
      <Subtitle>
        Ürün görsellerini doğrudan yükleyin - sistem otomatik olarak URL'ye dönüştürür.
        Birden fazla görsel yükleyebilirsiniz, ilk görsel ana görsel olarak kullanılır.
      </Subtitle>

      {error && <SuccessState style={{ borderColor: '#d14343', background: '#fee', color: '#d14343' }}>{error}</SuccessState>}

      <Page>
        <Card as="form" onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Temel Bilgiler</SectionTitle>
            <FieldGrid>
              <Input
                label="Ürün Adı"
                name="title"
                placeholder="Örn. Nova Saten Elbise"
                value={form.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="Fiyat (₺)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                fullWidth
              />
              <Input
                label="İndirimli Fiyat (Opsiyonel)"
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                fullWidth
              />
              <Input
                label="Stok"
                name="inventory"
                type="number"
                value={form.inventory}
                onChange={handleChange}
                fullWidth
              />
            </FieldGrid>
            <Label style={{ marginTop: '1rem' }}>
              Açıklama
              <TextArea
                name="description"
                placeholder="Ürün kumaşı, kalıp ve kullanım önerilerini anlatın"
                value={form.description}
                onChange={handleChange}
              />
            </Label>
          </Section>

          <Section>
            <SectionTitle>Kategori & Koleksiyon</SectionTitle>
            <FieldGrid>
              <Label>
                Hedef Cinsiyet
                <Select name="gender" value={form.gender} onChange={(e) => {
                  handleChange(e);
                  const firstSub = categoryMeta[e.target.value]?.subcategories?.[0]?.slug;
                  setForm(prev => ({ ...prev, category: firstSub || '' }));
                }}>
                  <option value="kadin">Kadın</option>
                  <option value="erkek">Erkek</option>
                </Select>
              </Label>
              <Label>
                Alt Kategori
                <Select name="category" value={form.category} onChange={handleChange}>
                  {availableCategories.map(sub => (
                    <option key={sub.slug} value={sub.slug}>{sub.label}</option>
                  ))}
                </Select>
              </Label>
              <Label>
                Etiketler
                <Input
                  name="tagsInput"
                  placeholder="premium, capsule, office"
                  value={form.tagsInput}
                  onChange={handleChange}
                  fullWidth
                />
                <Helper>Virgülle ayırarak birden fazla etiket yazabilirsiniz.</Helper>
              </Label>
            </FieldGrid>
          </Section>

          <Section>
            <SectionTitle>Görseller</SectionTitle>
            <ImageUploadArea
              isDragging={isDragging}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon>
                <FiUpload />
              </UploadIcon>
              <p style={{ margin: 0, fontWeight: 500 }}>
                {uploading ? 'Yükleniyor...' : 'Görselleri sürükleyin veya tıklayın'}
              </p>
              <Helper>PNG, JPG, WEBP - Maks. 5MB</Helper>
              <HiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </ImageUploadArea>

            {uploading && (
              <UploadProgress>
                <FiImage style={{ marginRight: '8px' }} />
                Görseller yükleniyor, lütfen bekleyin...
              </UploadProgress>
            )}

            {uploadedImages.length > 0 && (
              <ImagePreviewGrid>
                {uploadedImages.map((url, index) => (
                  <ImagePreviewItem key={url} isMain={index === 0}>
                    <img src={url} alt={`Ürün görseli ${index + 1}`} />
                    <RemoveImageButton type="button" onClick={() => handleRemoveImage(index)}>
                      <FiX />
                    </RemoveImageButton>
                    {index === 0 ? (
                      <MainBadge>Ana Görsel</MainBadge>
                    ) : (
                      <MainBadge
                        style={{ background: '#666', cursor: 'pointer' }}
                        onClick={() => setAsMainImage(index)}
                      >
                        Ana Yap
                      </MainBadge>
                    )}
                  </ImagePreviewItem>
                ))}
              </ImagePreviewGrid>
            )}

            <Helper style={{ marginTop: '0.5rem' }}>
              İlk görsel ana görsel olarak kullanılır. Tıklayarak sırayı değiştirebilirsiniz.
            </Helper>
          </Section>

          <Section>
            <SectionTitle>Renkler</SectionTitle>
            <FieldGrid>
              <Input
                label="Renk Adı"
                value={colorDraft.name}
                onChange={(e) => setColorDraft(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn. Şampanya"
                fullWidth
              />
              <Label>
                Hex Kodu
                <input
                  type="color"
                  value={colorDraft.code}
                  onChange={(e) => setColorDraft(prev => ({ ...prev, code: e.target.value }))}
                  style={{ height: '50px', borderRadius: '12px', border: '1px solid #dcdcdc' }}
                />
              </Label>
              <Button type="button" variant="outline" onClick={handleAddColor} style={{ alignSelf: 'end' }}>
                Renk Ekle
              </Button>
            </FieldGrid>
            <ColorList>
              {colors.map((color, index) => (
                <ColorChip key={color.name + index}>
                  <ColorPreview color={color.code} />
                  {color.name}
                  <button type="button" onClick={() => handleRemoveColor(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                </ColorChip>
              ))}
              {!colors.length && <Helper>Henüz renk eklenmedi.</Helper>}
            </ColorList>
          </Section>

          <Section>
            <SectionTitle>Bedene Göre Seçim</SectionTitle>
            <SizeList>
              {sizePresets.map(size => (
                <SizeTag key={size} type="button" active={sizes.includes(size)} onClick={() => toggleSize(size)}>
                  {size}
                </SizeTag>
              ))}
            </SizeList>
            {!sizes.length && <Helper>En az bir beden seçin.</Helper>}
          </Section>

          <Section>
            <SectionTitle>Planlama</SectionTitle>
            <FieldGrid>
              <Input
                label="Tahmini İndirim (%)"
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                fullWidth
              />
            </FieldGrid>
          </Section>

          <Button type="submit" size="large" disabled={saving}>
            {saving ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
          </Button>
        </Card>

        <SummaryCard>
          <h3>Ön İzleme</h3>
          <PreviewImage src={uploadedImages[0] || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'} />
          <h4>{form.title || 'Ürün adı bekleniyor'}</h4>
          <Badge>{categoryMeta[form.gender]?.label}</Badge>
          <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>{form.description || 'Ürün açıklaması bu alanda görünecek.'}</p>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            {form.price ? `${Number(form.price).toLocaleString('tr-TR')} ₺` : 'Fiyat yok'}
          </div>
          {successProduct && (
            <SuccessState style={{ marginTop: '1rem' }}>
              <strong>{successProduct.title}</strong> koleksiyona eklendi.
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <Button as="a" href={`/product/${successProduct.id}`} variant="outline" size="small">
                  Detaya Git
                </Button>
                <Button variant="text" size="small" onClick={() => navigate(-1)}>Geri Dön</Button>
              </div>
            </SuccessState>
          )}
        </SummaryCard>
      </Page>
    </div>
  );
};

export default ProductCreate;
