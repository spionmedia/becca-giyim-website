// Tema renkleri ve tipografi
const theme = {
  colors: {
    // Ana renkler
    primary: '#3F51B5',      // Koyu mavi - ana marka rengi
    secondary: '#FF4081',    // Pembe - vurgu rengi
    accent: '#00BCD4',       // Turkuaz - ikincil vurgu
    
    // Nötr renkler
    background: '#FFFFFF',   // Beyaz - arka plan
    surface: '#F5F5F5',      // Açık gri - kart arka planı
    text: {
      primary: '#212121',    // Koyu gri - ana metin
      secondary: '#757575',  // Orta gri - ikincil metin
      disabled: '#BDBDBD',   // Açık gri - devre dışı metin
    },
    
    // Durum renkleri
    success: '#4CAF50',      // Yeşil - başarı
    error: '#F44336',        // Kırmızı - hata
    warning: '#FFC107',      // Sarı - uyarı
    info: '#2196F3',         // Mavi - bilgi
  },
  
  typography: {
    fontFamily: {
      heading: "'Montserrat', sans-serif",  // Başlık fontu
      body: "'Open Sans', sans-serif",      // Metin fontu
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.25rem',    // 20px
      xl: '1.5rem',     // 24px
      xxl: '2rem',      // 32px
      xxxl: '2.5rem',   // 40px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '1rem',       // 16px
    full: '9999px',   // Tam yuvarlak
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
  
  // Medya sorguları için breakpoint'ler
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export default theme;
