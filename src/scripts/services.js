import { loadSections } from './loader.js';
import { initializeAnimations } from './animations.js';

// Import sections
import topbar from '../sections/topbar.html?raw';
import navbar from '../sections/navbar.html?raw';
import servicesList from '../sections/services-list.html?raw';
import serviceBenefits from '../sections/service-benefits.html?raw';
import serviceProcess from '../sections/service-process.html?raw';
import serviceStats from '../sections/service-stats.html?raw';
import serviceIndustries from '../sections/service-industries.html?raw';
import cta from '../sections/cta.html?raw';
import footer from '../sections/footer.html?raw';

const serviceSections = [
    topbar,
    navbar,
    servicesList,
    serviceBenefits,
    serviceProcess,
    serviceStats,
    serviceIndustries,
    cta,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(serviceSections, 'app', () => {
        initializeAnimations();

        // Highlight current nav item
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes('services.html') || link.innerText.includes('SERVICES')) {
                link.classList.remove('text-black');
                link.classList.add('text-emerald-700');
            }
        });
    });
});
