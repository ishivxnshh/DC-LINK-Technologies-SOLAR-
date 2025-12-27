import { loadSections } from '../loader.js';
import { initializeAnimations } from '../animations.js';

import topbar from '../../sections/topbar.html?raw';
import navbar from '../../sections/navbar.html?raw';
import productList from '../../sections/product-list.html?raw';
import footer from '../../sections/footer.html?raw';

const sections = [
    topbar,
    navbar,
    productList,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(sections, 'app', () => {
        initializeAnimations();
        initializeProductList();
    });
});

function initializeProductList() {
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
                if (title.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}
