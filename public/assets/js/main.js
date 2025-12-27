document.addEventListener('DOMContentLoaded', () => {
    loadSections();
});

const sections = [
    'topbar.html',
    'navbar.html',
    'hero.html',
    'stats.html',
    'services.html',
    'products.html',
    'factory.html',
    'why-us.html',
    'brand-logos.html',
    'testimonials.html',
    'cta.html',
    'footer.html'
];

async function loadSections() {
    const container = document.getElementById('app');

    try {
        // Clear container to prevent duplication if function runs multiple times
        container.innerHTML = '';

        // Fetch all sections in parallel or sequentially. Sequential is safer for order.
        for (const section of sections) {
            const response = await fetch(`sections/${section}`);
            if (!response.ok) throw new Error(`Failed to load ${section}`);
            const html = await response.text();
            container.insertAdjacentHTML('beforeend', html);
        }

        // Initialize UI logic after DOM is populated
        initializeUI();

    } catch (error) {
        console.error('Error loading sections:', error);
        container.innerHTML = '<p class="text-center text-red-500 py-10">Error loading website content. Please refresh.</p>';
    }
}

function initializeUI() {
    console.log('UI Initialized');

    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Sticky Navbar Transition
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower increment to slow and higher precision
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer for Counters
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe the stats section (use the first counter's parent or the specific section)
    const firstCounter = document.querySelector('.counter');
    if (firstCounter) {
        const statsSection = firstCounter.closest('.grid');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Scroll Reveal Animation
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
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Initial scroll check in case page loads scrolled down
    if (window.scrollY > 50 && navbar) {
        navbar.classList.add('nav-scrolled');
    }

    // Active Link Spy
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });

        // Back to top visibility
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // Smart Home Navigation (Fix for duplication/reload issue)
    const homeLinks = document.querySelectorAll('a[href*="#home"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const currentPath = window.location.pathname;
            const isHomePage = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/');

            if (isHomePage) {
                e.preventDefault();
                // Force scroll to absolute top to handle sticky nav overlap correctly
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Clean URL update
                history.replaceState(null, null, 'index.html#home');
            }
        });
    });

    // Check for hash on load (Cross-page navigation support)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 100; // Adjust for sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 300); // Slight delay to separate from load render
    }
}
