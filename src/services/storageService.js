import supabase from './supabaseClient';

/**
 * Görseli sıkıştırır ve yeniden boyutlandırır
 * @param {File} file - Orijinal dosya
 * @param {number} maxWidth - Maksimum genişlik (default: 1200px)
 * @param {number} quality - Kalite (0-1, default: 0.8)
 * @returns {Promise<Blob>} - Sıkıştırılmış görsel
 */
const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
            // Boyut hesapla
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            // Çiz ve sıkıştır
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Görsel sıkıştırılamadı'));
                    }
                },
                'image/webp', // WebP formatı - daha küçük boyut
                quality
            );
        };

        img.onerror = () => reject(new Error('Görsel yüklenemedi'));
        img.src = URL.createObjectURL(file);
    });
};

/**
 * Ürün görseli yükler ve public URL döner
 * @param {File} file - Yüklenecek dosya
 * @returns {Promise<string>} - Public URL
 */
export const uploadProductImage = async (file) => {
    // Görseli sıkıştır (WebP formatına dönüştürür)
    const compressedBlob = await compressImage(file);

    // Benzersiz dosya adı oluştur (webp formatında)
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
    const filePath = `products/${fileName}`;

    // Sıkıştırılmış dosyayı yükle
    const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, compressedBlob, {
            cacheControl: '31536000', // 1 yıl cache
            contentType: 'image/webp',
            upsert: false
        });

    if (error) {
        console.error('Upload error:', error);
        throw new Error('Görsel yüklenirken hata oluştu: ' + error.message);
    }

    // Public URL al
    const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
};

/**
 * Birden fazla görsel yükler
 * @param {FileList|File[]} files - Yüklenecek dosyalar
 * @returns {Promise<string[]>} - Public URL listesi
 */
export const uploadMultipleImages = async (files) => {
    const uploadPromises = Array.from(files).map(file => uploadProductImage(file));
    return Promise.all(uploadPromises);
};

/**
 * Görseli siler
 * @param {string} url - Silinecek görselin URL'i
 */
export const deleteProductImage = async (url) => {
    // URL'den dosya yolunu çıkar
    const urlParts = url.split('/product-images/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

    if (error) {
        console.error('Delete error:', error);
        throw new Error('Görsel silinirken hata oluştu');
    }
};
