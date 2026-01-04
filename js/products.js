export let products = [];

export function initializeProductList() {
    // We need to fetch product data or parse it from the DOM if it was static.
    // However, since we are moving from a system where data might have been in valid JSON files or just HTML.
    // Let's assume the HTML loaded by loader.js contains the product items.
    // If dynamic data is needed, we would fetch it here.

    // Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterButtons.forEach(b => {
                b.classList.remove('bg-slate-900', 'text-white', 'border-transparent');
                b.classList.add('bg-white', 'text-slate-600', 'border-gray-200');
            });
            // Add active
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
                // Assume description is also searchable if present
                if (title.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}
