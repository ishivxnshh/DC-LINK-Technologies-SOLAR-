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

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('border-emerald-500', 'ring-2', 'ring-emerald-200'));
            thumb.classList.add('border-emerald-500', 'ring-2', 'ring-emerald-200');
            mainImage.src = thumb.src;
        });
    });
}
