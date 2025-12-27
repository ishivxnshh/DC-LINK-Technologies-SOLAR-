import { loadSections } from './loader.js';
import { initializeAnimations } from './animations.js';

// Import all sections as raw strings
import topbar from '../sections/topbar.html?raw';
import navbar from '../sections/navbar.html?raw';
import hero from '../sections/hero.html?raw';
import stats from '../sections/stats.html?raw';
import services from '../sections/services.html?raw';
import products from '../sections/products.html?raw';
import factory from '../sections/factory.html?raw';
import whyUs from '../sections/why-us.html?raw';
import brandLogos from '../sections/brand-logos.html?raw';
import testimonials from '../sections/testimonials.html?raw';
import cta from '../sections/cta.html?raw';
import footer from '../sections/footer.html?raw';

const homeSections = [
    topbar,
    navbar,
    hero,
    stats,
    services,
    products,
    factory,
    whyUs,
    brandLogos,
    testimonials,
    cta,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(homeSections, 'app', () => {
        initializeAnimations();
    });
});
