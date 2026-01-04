/**
 * Loads a list of HTML components into a target element.
 * @param {string[]} components - Array of component filenames (without extension)
 * @param {string} targetId - ID of the element to inject content into
 * @param {Function} callback - Optional callback after loading
 */
export async function loadSections(components, targetId, callback) {
    const target = document.getElementById(targetId);
    if (!target) {
        console.error(`Target element #${targetId} not found`);
        return;
    }

    let fullContent = '';

    // We fetch all sequentially to maintain order, or parallel for speed then join? 
    // Sequential is safer for dependency order if scripts were involved, 
    // but here it's just HTML. Parallel is better for speed.

    const promises = components.map(async (name) => {
        try {
            const response = await fetch(`../components/${name}.html`);
            if (!response.ok) throw new Error(`Failed into load ${name}`);
            return await response.text();
        } catch (error) {
            console.error(error);
            return `<div style="color:red; padding:1rem;">Error loading ${name}</div>`;
        }
    });

    const results = await Promise.all(promises);
    target.innerHTML = results.join('');

    if (callback) callback();
}
