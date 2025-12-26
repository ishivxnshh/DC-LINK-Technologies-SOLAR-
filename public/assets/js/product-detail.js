document.addEventListener('DOMContentLoaded', () => {
    loadSections();
});

const sections = [
    'navbar.html',
    'product-detail.html',
    'footer.html'
];

async function loadSections() {
    const container = document.getElementById('app');

    try {
        container.innerHTML = '';

        await loadSection('topbar.html', container);
        await loadSection('navbar.html', container);
        await loadSection('product-detail.html', container);
        await loadSection('footer.html', container);

        initializeUI();

    } catch (error) {
        console.error('Error loading sections:', error);
        container.innerHTML = '<p class="text-center text-red-500 py-10">Error loading content. Please refresh.</p>';
    }
}

async function loadSection(filename, container) {
    try {
        const response = await fetch(`sections/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const html = await response.text();
        container.insertAdjacentHTML('beforeend', html);
    } catch (e) {
        console.log(`Skipping ${filename}: ${e.message}`);
    }
}

function initializeUI() {
    // Re-initialize basic UI handlers
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Product Image Gallery (Simple Switcher)
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('border-emerald-500', 'ring-2', 'ring-emerald-200'));
                thumb.classList.add('border-emerald-500', 'ring-2', 'ring-emerald-200');
                mainImage.src = thumb.src;
            });
        });
    }

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            tabBtns.forEach(b => {
                b.classList.remove('text-slate-900', 'border-emerald-600', 'bg-emerald-50/50', 'active');
                b.classList.add('text-slate-500', 'border-transparent');
            });
            // Add active to clicked
            btn.classList.add('text-slate-900', 'border-emerald-600', 'bg-emerald-50/50', 'active');
            btn.classList.remove('text-slate-500', 'border-transparent');

            // Hide all contents
            tabContents.forEach(c => c.classList.add('hidden'));

            // Show target
            const targetId = `tab-${btn.getAttribute('data-tab')}`;
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('block');
            }
        });
    });

    loadProductDetails();
}

const productDB = {
    'mc4': {
        title: 'MC4 Solar DC Connector (1500V)',
        desc: 'Designed for heavy-duty solar applications, the DC-LINK MC4 Connector provides a reliable, waterproof connection for PV systems. Featuring high-grade materials and low contact resistance ensuring maximum efficiency and safety.',
        images: [
            'assets/images/product-3.jpeg',
            'assets/images/product-1.jpeg',
            'assets/images/product-2.jpeg',
            'assets/images/product-4.jpeg'
        ],
        category: 'Connectors',
        specs: [
            { k: 'Rated Voltage', v: '1500V DC' },
            { k: 'Rated Current', v: '30A' },
            { k: 'Protection', v: 'IP68' }
        ]
    },
    'harness': {
        title: 'Solar PV String Harness',
        desc: 'Customized branch harness solutions designed to simplify field wiring and significantly reduce installation time. Pre-assembled and tested for immediate deployment.',
        images: [
            'assets/images/product-1.jpeg',
            'assets/images/product-3.jpeg',
            'assets/images/product-2.jpeg'
        ],
        category: 'Harnesses',
        specs: [
            { k: 'Voltage', v: '1500V DC' },
            { k: 'Cable Type', v: 'EN 50618' },
            { k: 'Config', v: 'Customizable' }
        ]
    },
    'cable': {
        title: 'H1Z2Z2-K DC Solar Cable',
        desc: 'Premium electron-beam cross-linked solar cables designed for UV resistance and extreme weather durability. TUV certified for 25+ years of service life.',
        images: [
            'assets/images/product-2.jpeg',
            'assets/images/product-1.jpeg'
        ],
        category: 'Cables',
        specs: [
            { k: 'Standard', v: 'EN 50618' },
            { k: 'Conductor', v: 'Tinned Copper' },
            { k: 'Insulation', v: 'XLPO' }
        ]
    },
    'fuse': {
        title: 'Inline Fuse Connector',
        desc: 'Robust overcurrent protection with replaceable fuse links, essential for protecting photovoltaic systems from surge currents.',
        images: [
            'assets/images/product-4.jpeg',
            'assets/images/product-3.jpeg'
        ],
        category: 'Connectors',
        specs: [
            { k: 'Amperage', v: '10A - 30A' },
            { k: 'Voltage', v: '1500V DC' },
            { k: 'Type', v: 'Inline Replaceable' }
        ]
    },
    'tools': {
        title: 'Solar Crimping Tool Set',
        desc: 'High-precision crimping tools designed specifically for MC4 connectors to ensure secure and standard-compliant connections in the field.',
        images: [
            'assets/images/product-3.jpeg' // Placeholder
        ],
        category: 'Tools',
        specs: [
            { k: 'Range', v: '2.5 / 4 / 6 mm²' },
            { k: 'Type', v: 'Ratchet' },
            { k: 'Material', v: 'Hardened Steel' }
        ]
    }
};

let currentSlide = 0;
let totalSlides = 0;

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const product = productDB[id] || productDB['mc4']; // Default to MC4 if ID missing (dev safety)

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

        // --- GALLERY STRIP LOGIC ---
        const galleryStrip = document.getElementById('gallery-strip');

        if (galleryStrip && product.images) {
            galleryStrip.innerHTML = '';

            // Generate Cards
            product.images.forEach((imgSrc, index) => {
                const card = document.createElement('div');
                // Card Style: Fixed width, nice border, contained image
                card.className = 'min-w-[280px] h-[340px] bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center snap-center shadow-sm hover:shadow-md transition-shadow relative select-none';

                card.innerHTML = `
                    <img src="${imgSrc}" class="max-w-full max-h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-4 right-4 text-xs font-bold text-gray-300">0${index + 1}</div>
                `;

                galleryStrip.appendChild(card);
            });
        }

        // --- Specs (Simple demo update) ---
        const rows = document.querySelectorAll('tbody tr');
        product.specs.forEach((spec, index) => {
            if (rows[index]) {
                rows[index].children[0].textContent = spec.k;
                rows[index].children[1].textContent = spec.v;
            }
        });
    }
}


