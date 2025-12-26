const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo.jpg');

async function generateFavicons() {
    console.log('Favicon\'lar oluşturuluyor...');

    const sizes = [
        { name: 'favicon-16x16.png', size: 16 },
        { name: 'favicon-32x32.png', size: 32 },
        { name: 'apple-touch-icon.png', size: 180 },
        { name: 'android-chrome-192x192.png', size: 192 },
        { name: 'android-chrome-512x512.png', size: 512 },
        { name: 'logo192.png', size: 192 },
        { name: 'logo512.png', size: 512 },
        { name: 'og-image.jpg', size: 1200, height: 630, format: 'jpeg' }
    ];

    for (const item of sizes) {
        const outputPath = path.join(publicDir, item.name);

        try {
            let sharpInstance = sharp(logoPath).resize(item.size, item.height || item.size, {
                fit: 'cover',
                position: 'center'
            });

            if (item.format === 'jpeg') {
                await sharpInstance.jpeg({ quality: 90 }).toFile(outputPath);
            } else {
                await sharpInstance.png().toFile(outputPath);
            }

            console.log(`✓ ${item.name} (${item.size}x${item.height || item.size})`);
        } catch (err) {
            console.error(`✗ ${item.name} oluşturulamadı:`, err.message);
        }
    }

    // favicon.ico oluştur (multi-size ICO)
    try {
        const ico16 = await sharp(logoPath).resize(16, 16).png().toBuffer();
        const ico32 = await sharp(logoPath).resize(32, 32).png().toBuffer();
        const ico48 = await sharp(logoPath).resize(48, 48).png().toBuffer();

        // ICO formatı için basit PNG kullan (modern tarayıcılar destekler)
        await sharp(logoPath).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
        console.log('✓ favicon.ico (32x32)');
    } catch (err) {
        console.error('✗ favicon.ico oluşturulamadı:', err.message);
    }

    console.log('\nTüm favicon\'lar başarıyla oluşturuldu!');
}

generateFavicons().catch(console.error);
