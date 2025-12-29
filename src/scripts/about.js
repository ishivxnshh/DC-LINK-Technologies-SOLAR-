import { loadSections } from './loader.js';
import { initializeAnimations } from './animations.js';

// Import sections
import topbar from '../sections/topbar.html?raw';
import navbar from '../sections/navbar.html?raw';
import aboutHero from '../sections/about-hero.html?raw';
import companyStory from '../sections/company-story.html?raw';
import mission from '../sections/mission.html?raw';
import team from '../sections/team.html?raw';
import cta from '../sections/cta.html?raw';
import footer from '../sections/footer.html?raw';
import aboutHeader from '../sections/about-header.html?raw';

const aboutSections = [
    topbar,
    navbar,
    aboutHeader,
    companyStory,
    mission,
    team,
    cta,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(aboutSections, 'app', () => {
        initializeAnimations();
        // Highlight current nav item
        const aboutLinks = document.querySelectorAll('a[href="about.html"]'); // Adjust selector if needed
        aboutLinks.forEach(link => {
            link.classList.add('text-emerald-700');
        });

        // Initialize direct link highlighting if navbar didn't do it
        // The navbar.html likely has static classes, but we can dynamically activate "About"
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes('about.html') || link.innerText.includes('ABOUT')) {
                link.classList.remove('text-black');
                link.classList.add('text-emerald-700');
            }
        });
    });
});
