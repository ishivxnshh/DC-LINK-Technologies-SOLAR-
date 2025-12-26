document.addEventListener('DOMContentLoaded', () => {
    loadSections();
});

const sections = [
    'topbar.html',
    'navbar.html',
    'contact-details.html',
    'footer.html'
];

async function loadSections() {
    const container = document.getElementById('app');

    try {
        for (const section of sections) {
            const response = await fetch(`sections/${section}`);
            if (!response.ok) throw new Warning(`Failed to load ${section}`);
            const html = await response.text();
            container.insertAdjacentHTML('beforeend', html);
        }

        initializeUI();

    } catch (error) {
        console.error('Error loading sections', error);
        container.innerHTML = '<p class="text-center text-red-500 py-10">Error loading page content.</p>';
    }
}

function initializeUI() {
    // Mobile Menu Toggle Reuse
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-hide');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const feedbackBox = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackBox.classList.add('hidden');
            feedbackBox.className = 'hidden rounded-lg p-4 text-sm text-center font-medium'; // Reset classes

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Simulate Sending
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
            `;

            // Mock API delay
            setTimeout(() => {
                // Success
                feedbackBox.textContent = "Thank you! Your message has been sent successfully. We will get back to you shortly.";
                feedbackBox.classList.remove('hidden');
                feedbackBox.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-200');

                // Keep button disabled to indicate completion, or re-enable if desired. 
                // Request said "Disable button after submission".
                submitBtn.innerHTML = `
                    <i class="fas fa-check"></i>
                    <span>Sent</span>
                `;
                submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                submitBtn.classList.add('bg-green-600');

                contactForm.reset();
            }, 1500);
        });
    }
}