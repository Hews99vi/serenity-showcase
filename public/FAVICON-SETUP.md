# Required Favicon Files

To complete the SEO setup, you need to add the following favicon files to this `/public` folder:

## Required Files:

1. **favicon.ico** - Main favicon (16x16 or 32x32)
2. **favicon-16x16.png** - 16x16 PNG favicon
3. **favicon-32x32.png** - 32x32 PNG favicon
4. **apple-touch-icon.png** - 180x180 PNG for Apple devices
5. **favicon-192x192.png** - 192x192 PNG for Android
6. **favicon-512x512.png** - 512x512 PNG for high-res displays
7. **og-image.jpg** - Open Graph image (recommended: 1200x630px)

## How to Generate Favicons:

### Option 1: Use RealFaviconGenerator (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload your logo (the Serenity "S" icon with cream/charcoal colors)
3. Configure settings for each platform
4. Download the package
5. Extract all files to this `/public` folder

### Option 2: Use Favicon.io
1. Go to https://favicon.io/
2. Upload your logo image
3. Download the generated files
4. Place them in this `/public` folder

### Option 3: Manual Creation
If you have the Serenity logo source file:
- Use an image editor (Photoshop, GIMP, Figma)
- Export at each required size
- Save as PNG with transparency
- Convert the smallest to .ico format

## OG Image (og-image.jpg)

Create a 1200x630px image with:
- Serenity Wedding Films logo
- Brand colors (cream #FFEFC2, charcoal #2D2D2D, gold #C9A961)
- Tagline: "Where Serenity Meets Cinema, Love Becomes a Masterpiece"
- Clean, professional design for social media previews

## After Adding Files:

1. Verify all files load correctly:
   - https://serenityweddingfilms.com/favicon.ico
   - https://serenityweddingfilms.com/og-image.jpg
   
2. Test with:
   - Google Search Console
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   
3. Request Google to recrawl: Use Google Search Console > URL Inspection > Request Indexing

## Current Status:

✅ site.webmanifest - Created
✅ index.html - Updated with all meta tags
✅ SEO metadata - Configured
⏳ Favicon files - **Need to be added**
⏳ og-image.jpg - **Need to be added**
