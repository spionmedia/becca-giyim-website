// SEO Helper Utility
// Sayfa bazlı meta tag yönetimi için

const SITE_NAME = 'Becca Giyim';
const SITE_URL = 'https://beccagiyim.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// Sayfa başlığını güncelle
export const setPageTitle = (title) => {
    if (title) {
        document.title = `${title} | ${SITE_NAME}`;
    } else {
        document.title = `${SITE_NAME} | Kadın ve Erkek Giyim Online Alışveriş`;
    }
};

// Meta description güncelle
export const setMetaDescription = (description) => {
    const defaultDesc = 'Becca Giyim\'de en şık kadın ve erkek giyim ürünlerini keşfedin. Tişört, sweatshirt, pantolon ve daha fazlası uygun fiyatlarla.';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', description || defaultDesc);
    }
};

// Canonical URL güncelle
export const setCanonicalUrl = (path = '') => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`);
};

// Open Graph meta taglarını güncelle
export const setOpenGraphTags = ({ title, description, image, url, type = 'website' }) => {
    const ogTags = {
        'og:title': title || `${SITE_NAME} | Kadın ve Erkek Giyim Online Alışveriş`,
        'og:description': description || 'Becca Giyim\'de en şık kadın ve erkek giyim ürünlerini keşfedin.',
        'og:image': image || DEFAULT_IMAGE,
        'og:url': url || SITE_URL,
        'og:type': type
    };

    Object.entries(ogTags).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    });
};

// Twitter Card meta taglarını güncelle
export const setTwitterTags = ({ title, description, image }) => {
    const twitterTags = {
        'twitter:title': title || `${SITE_NAME} | Kadın ve Erkek Giyim Online Alışveriş`,
        'twitter:description': description || 'Becca Giyim\'de en şık kadın ve erkek giyim ürünlerini keşfedin.',
        'twitter:image': image || DEFAULT_IMAGE
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    });
};

// Ürün için structured data ekle
export const setProductStructuredData = (product) => {
    if (!product) return;

    // Mevcut product structured data'yı kaldır
    const existingScript = document.querySelector('script[data-type="product-ld"]');
    if (existingScript) {
        existingScript.remove();
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || `${product.name} - Becca Giyim`,
        image: product.images?.[0] || DEFAULT_IMAGE,
        brand: {
            '@type': 'Brand',
            name: 'Becca Giyim'
        },
        offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/#/product/${product.id}`,
            priceCurrency: 'TRY',
            price: product.price,
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Becca Giyim'
            }
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'product-ld');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
};

// BreadcrumbList structured data ekle
export const setBreadcrumbStructuredData = (breadcrumbs) => {
    if (!breadcrumbs || breadcrumbs.length === 0) return;

    // Mevcut breadcrumb structured data'yı kaldır
    const existingScript = document.querySelector('script[data-type="breadcrumb-ld"]');
    if (existingScript) {
        existingScript.remove();
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`
        }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'breadcrumb-ld');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
};

// Tüm SEO taglarını tek seferde güncelle
export const updateSEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    product = null,
    breadcrumbs = null
}) => {
    setPageTitle(title);
    setMetaDescription(description);
    setCanonicalUrl(url);
    setOpenGraphTags({ title, description, image, url, type });
    setTwitterTags({ title, description, image });

    if (product) {
        setProductStructuredData(product);
    }

    if (breadcrumbs) {
        setBreadcrumbStructuredData(breadcrumbs);
    }
};

// Sayfa SEO ayarları
export const PAGE_SEO = {
    home: {
        title: null, // Ana sayfa için varsayılan başlık kullanılacak
        description: 'Becca Giyim\'de en şık kadın ve erkek giyim ürünlerini keşfedin. Tişört, sweatshirt, pantolon ve daha fazlası uygun fiyatlarla. Hızlı kargo, güvenli ödeme.'
    },
    products: {
        title: 'Tüm Ürünler',
        description: 'Becca Giyim\'de tüm kadın ve erkek giyim ürünlerini inceleyin. En yeni moda trendleri, uygun fiyatlar.'
    },
    kadin: {
        title: 'Kadın Giyim',
        description: 'Kadın giyim koleksiyonumuzu keşfedin. Şık elbiseler, tişörtler, pantolonlar ve daha fazlası Becca Giyim\'de.'
    },
    erkek: {
        title: 'Erkek Giyim',
        description: 'Erkek giyim koleksiyonumuzu keşfedin. Kaliteli tişörtler, sweatshirtler, pantolonlar Becca Giyim\'de.'
    },
    cart: {
        title: 'Sepetim',
        description: 'Alışveriş sepetinizi görüntüleyin ve siparişinizi tamamlayın.'
    },
    privacy: {
        title: 'Gizlilik Politikası',
        description: 'Becca Giyim gizlilik politikası. Kişisel verilerinizin nasıl korunduğunu öğrenin.'
    },
    delivery: {
        title: 'Teslimat ve İade',
        description: 'Becca Giyim teslimat ve iade koşulları. Kargo süreleri ve iade prosedürleri hakkında bilgi.'
    },
    agreement: {
        title: 'Mesafeli Satış Sözleşmesi',
        description: 'Becca Giyim mesafeli satış sözleşmesi. Alışveriş koşulları ve yasal bilgiler.'
    }
};

export default {
    setPageTitle,
    setMetaDescription,
    setCanonicalUrl,
    setOpenGraphTags,
    setTwitterTags,
    setProductStructuredData,
    setBreadcrumbStructuredData,
    updateSEO,
    PAGE_SEO
};
