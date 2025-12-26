document.addEventListener('DOMContentLoaded', () => {
    loadSections();
});

const sections = [
    'navbar.html', // Reuse topbar/navbar from main site
    'product-list.html',
    'footer.html'
];

async function loadSections() {
    const container = document.getElementById('app');

    try {
        container.innerHTML = '';

        // Manually load topbar if needed, but assuming navbar includes it or we skip it for subpages.
        // Let's check if navbar.html includes topbar. existing main.js loads topbar.html separately.
        // So I should load topbar.html too.
        await loadSection('topbar.html', container);
        await loadSection('navbar.html', container);
        await loadSection('product-list.html', container);
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
    // Re-initialize basic UI handlers (mobile menu, etc)
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        // Clone to remove old listeners if any (simple way)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Filter Logic for Product List
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => {
                b.classList.remove('bg-slate-900', 'text-white', 'border-transparent');
                b.classList.add('bg-white', 'text-slate-600', 'border-gray-200');
            });
            // Add active to clicked
            btn.classList.remove('bg-white', 'text-slate-600', 'border-gray-200');
            btn.classList.add('bg-slate-900', 'text-white', 'border-transparent');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search Logic
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const isVisible = card.style.display !== 'none'; // Only search within filtered? Or search all? Usually search resets filter or searches within. Let's just search all for simplicity or search within current view? 
                // Simple behavior: Search matches title
                if (title.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}
