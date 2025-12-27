import '@fortawesome/fontawesome-free/css/all.css';

/**
 * Generalized section loader
 * @param {string[]} sectionsContent - Array of HTML content strings
 * @param {string} containerId - Target DOM element ID
 * @param {Function} callback - Optional callback after loading
 */
export function loadSections(sectionsContent, containerId = 'app', callback = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return;
    }

    try {
        container.innerHTML = '';

        for (const html of sectionsContent) {
            container.insertAdjacentHTML('beforeend', html);
        }

        if (callback) callback();

    } catch (error) {
        console.error('Error loading sections:', error);
        container.innerHTML = '<div class="text-center py-20"><p class="text-red-600">Failed to load content. Please refresh.</p></div>';
    }
}
