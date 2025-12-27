import { loadSections } from '../loader.js';
import { initializeAnimations } from '../animations.js';

import topbar from '../../sections/topbar.html?raw';
import navbar from '../../sections/navbar.html?raw';
import adminCreate from '../../sections/admin-create.html?raw';
import footer from '../../sections/footer.html?raw';

const sections = [
    topbar,
    navbar,
    adminCreate,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(sections, 'app', () => {
        initializeAnimations();
        initializeAdminUI();
    });
});

function initializeAdminUI() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    const dropzones = document.querySelectorAll('.dropzone');
    dropzones.forEach(dz => {
        dz.addEventListener('dragover', (e) => {
            e.preventDefault();
            dz.classList.add('border-emerald-500', 'bg-emerald-50');
        });
        dz.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dz.classList.remove('border-emerald-500', 'bg-emerald-50');
        });
        dz.addEventListener('drop', (e) => {
            e.preventDefault();
            dz.classList.remove('border-emerald-500', 'bg-emerald-50');
            if (e.dataTransfer.files.length > 0) {
                const p = dz.querySelector('p');
                if (p) p.innerText = e.dataTransfer.files[0].name;
            }
        });
    });
}
