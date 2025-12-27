import { loadSections } from '../loader.js';
import { initializeAnimations } from '../animations.js';

import topbar from '../../sections/topbar.html?raw';
import navbar from '../../sections/navbar.html?raw';
import contactDetails from '../../sections/contact-details.html?raw';
import footer from '../../sections/footer.html?raw';

const contactSections = [
    topbar,
    navbar,
    contactDetails,
    footer
];

document.addEventListener('DOMContentLoaded', () => {
    loadSections(contactSections, 'app', () => {
        initializeAnimations();
        initializeContactForm();
    });
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const feedbackBox = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackBox.classList.add('hidden');
            feedbackBox.className = 'hidden rounded-lg p-4 text-sm text-center font-medium';

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;

            setTimeout(() => {
                feedbackBox.textContent = "Thank you! Your message has been sent successfully. We will get back to you shortly.";
                feedbackBox.classList.remove('hidden');
                feedbackBox.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');

                submitBtn.innerHTML = `
                    <i class="fas fa-check"></i>
                    <span>Sent</span>
                `;
                submitBtn.classList.remove('bg-emerald-700', 'hover:bg-emerald-800');
                submitBtn.classList.add('bg-green-600');
                submitBtn.disabled = true; // Keep disabled as per design

                contactForm.reset();
            }, 1500);
        });
    }
}