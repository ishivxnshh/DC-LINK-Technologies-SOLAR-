export async function initializeProductDetail() {
    // 1. Fetch Data
    let productDB = {};
    try {
        const response = await fetch('../js/products.json');
        productDB = await response.json();
    } catch (e) {
        console.error("Failed to load product data", e);
        return;
    }

    // 2. Logic
    const mainImage = document.getElementById('main-product-image');

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

                // Adjust image path if needed. Assuming images in JSON are like "images/prod.jpg"
                // But in pages/product-detail.html, they need to be "../images/prod.jpg" IF they are relative.
                // If the JSON paths are "images/...", we should prefix "../".
                // But let's check what the JSON has. Usually it's "images/...".
                const adjustedSrc = imgSrc.startsWith('images/') ? '../' + imgSrc : imgSrc;

                card.innerHTML = `
                    <img src="${adjustedSrc}" class="max-w-full max-h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 text-xs font-bold text-gray-300">0${index + 1}</div>
                `;

                // Click to set main image
                card.addEventListener('click', () => {
                    if (mainImage) mainImage.src = adjustedSrc;
                });

                galleryStrip.appendChild(card);
            });

            // Set initial main image
            if (mainImage && product.images.length > 0) {
                const initialSrc = product.images[0].startsWith('images/') ? '../' + product.images[0] : product.images[0];
                mainImage.src = initialSrc;
            }
        }

        // Specs
        const rows = document.querySelectorAll('tbody tr');
        if (product.specs) {
            product.specs.forEach((spec, index) => {
                if (rows[index]) {
                    rows[index].children[0].textContent = spec.k;
                    rows[index].children[1].textContent = spec.v;
                }
            });
        }
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
