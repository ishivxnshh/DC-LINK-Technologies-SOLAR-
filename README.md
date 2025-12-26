# DC-LINK Technologies - Solar Connection Products

Professional website for DC-LINK Technologies, a leading manufacturer of solar connection products with 25 years of industry experience.

## 🌟 Features

- **Modern Design**: Clean, professional B2B industrial aesthetic
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Product Catalog**: Filterable product listing with search functionality
- **Product Details**: Horizontal image galleries with detailed specifications
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Optimized build with Vite and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
DC-LINK Technologies(SOLAR)/
├── assets/
│   ├── css/
│   │   └── output.css          # Compiled Tailwind CSS
│   ├── images/                 # Product and hero images
│   └── js/                     # JavaScript modules
├── sections/                   # HTML page sections
│   ├── navbar.html
│   ├── hero.html
│   ├── products.html
│   ├── product-list.html
│   ├── product-detail.html
│   └── footer.html
├── dist/                       # Production build (generated)
├── index.html                  # Homepage
├── product-list.html          # Product catalog page
├── product-detail.html        # Product detail page
├── contact.html               # Contact page
├── style.css                  # Custom styles
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Dependencies

```

## 🚀 Quick Start

### Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output will be in the `dist/` folder

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options**:
- **Netlify**: Drag & drop the `dist` folder
- **Vercel**: Run `vercel --prod`
- **GitHub Pages**: Push to GitHub and enable Pages

## 🎨 Brand Guidelines

### Colors
- **Primary Green**: `#15803d` - Buttons, accents, highlights
- **Black**: `#0f172a` - Text, headers
- **Yellow**: `#eab308` - Highlights, badges, emphasis
- **White**: `#ffffff` - Backgrounds, cards

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 📄 Pages

### Homepage (`index.html`)
- Hero section with company overview
- Featured products
- Key features
- Contact information

### Product Catalog (`product-list.html`)
- Filterable product grid
- Search functionality
- Category filters (Connectors, Harnesses, Cables, Tools)
- Product cards with hover effects

### Product Detail (`product-detail.html`)
- Horizontal scrollable image gallery
- Tabbed content (Overview, Tech Specs, Models, Downloads)
- Sticky summary card
- Call-to-action buttons

### Contact (`contact.html`)
- Contact form
- Company information
- Location details

## 🔧 Customization

### Adding New Products

1. **Add product images** to `assets/images/`
2. **Update product data** in `assets/js/product-detail.js`:
   ```javascript
   const productDB = {
       'product-id': {
           title: 'Product Name',
           description: 'Description',
           images: ['image1.jpg', 'image2.jpg'],
           // ... more details
       }
   };
   ```
3. **Add product card** to `sections/product-list.html`

### Modifying Colors

Edit `tailwind.config.js`:
```javascript
theme: {
    extend: {
        colors: {
            // Add your custom colors
        }
    }
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **CSS**: 30.72 kB (gzipped: 6.10 kB)
- **Images**: Optimized and compressed
- **Loading**: Fast initial page load
- **SEO**: Optimized meta tags and structure

## 📞 Support

For issues or questions about the website:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the code comments
- Contact the development team

## 📝 License

Proprietary - DC-LINK Technologies

---

**Built for DC-LINK Technologies** - Professional Solar Connection Products Manufacturer since 1999