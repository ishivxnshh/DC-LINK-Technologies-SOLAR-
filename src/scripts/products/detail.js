import { loadSections } from '../loader.js';
import { initializeAnimations } from '../animations.js';
import productDB from '../../data/products.json';

import topbar from '../../sections/topbar.html?raw';
import navbar from '../../sections/navbar.html?raw';
import productDetail from '../../sections/product-detail.html?raw';
import footer from '../../sections/footer.html?raw';

const sections = [
    topbar,
    navbar,
    productDetail,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(sections, 'app', () => {
        initializeAnimations();
        initializeProductDetail();
    });
});

function initializeProductDetail() {
    // Gallery & Tab Logic from Original
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-img'); // These might not exist yet if dynamically generated? 
    // Actually the original logic generated the gallery strip dynamically. 
    // BUT the thumbnails selectors were grabbed immediately. Wait.
    // In Original code: 
    // loadProductDetails() was called at end of initializeUI.
    // loadProductDetails generated the gallery strip.
    // AND mainImage logic was separate.

    // Let's implement loadProductDetails logic first which populates the DOM.

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = productDB[id] || productDB['mc4'];

    if (product) {
        // Update Text
        const titleEl = document.querySelector('h1');
        const descEl = document.querySelector('p.text-slate-600.mb-6');
        const catEl = document.querySelector('.text-amber-500');

        if (titleEl) titleEl.textContent = product.title;
        if (descEl) descEl.textContent = product.desc;
        if (catEl) catEl.textContent = product.category + ' Series';

        // Breadcrumb
        const breadcrumb = document.querySelector('li[aria-current="page"] span');
        if (breadcrumb) breadcrumb.textContent = product.title;

        // Gallery Strip Generation
        const galleryStrip = document.getElementById('gallery-strip');
        if (galleryStrip && product.images) {
            galleryStrip.innerHTML = '';
            product.images.forEach((imgSrc, index) => {
                const card = document.createElement('div');
                card.className = 'min-w-[280px] h-[340px] bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center snap-center shadow-sm hover:shadow-md transition-shadow relative select-none cursor-pointer';
                // Added cursor-pointer for clarity

                card.innerHTML = `
                    <img src="${imgSrc}" class="max-w-full max-h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 text-xs font-bold text-gray-300">0${index + 1}</div>
                `;

                // Click to set main image
                card.addEventListener('click', () => {
                    if (mainImage) mainImage.src = imgSrc;
                });

                galleryStrip.appendChild(card);
            });

            // Set initial main image
            if (mainImage && product.images.length > 0) {
                mainImage.src = product.images[0];
            }
        }

        // Specs
        const rows = document.querySelectorAll('tbody tr');
        product.specs.forEach((spec, index) => {
            if (rows[index]) {
                rows[index].children[0].textContent = spec.k;
                rows[index].children[1].textContent = spec.v;
            }
        });
    }

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('text-slate-900', 'border-emerald-600', 'bg-emerald-50/50', 'active');
                b.classList.add('text-slate-500', 'border-transparent');
            });
            btn.classList.add('text-slate-900', 'border-emerald-600', 'bg-emerald-50/50', 'active');
            btn.classList.remove('text-slate-500', 'border-transparent');

            tabContents.forEach(c => c.classList.add('hidden'));
            const targetId = `tab-${btn.getAttribute('data-tab')}`;
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('block');
            }
        });
    });
}
