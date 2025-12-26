document.addEventListener('DOMContentLoaded', () => {
    loadSections();
});

const sections = [
    'navbar.html',
    'admin-edit.html',
    'footer.html'
];

async function loadSections() {
    const container = document.getElementById('app');

    try {
        container.innerHTML = '';

        await loadSection('topbar.html', container);
        await loadSection('navbar.html', container);
        await loadSection('admin-edit.html', container);
        await loadSection('footer.html', container);

        initializeUI();

    } catch (error) {
        console.error('Error loading sections:', error);
        container.innerHTML = '<p class="text-center text-red-500 py-10">Error loading content. Please refresh.</p>';
    }
}

async function loadSection(filename, container) {
    try {
        const response = await fetch(`sections/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const html = await response.text();
        container.insertAdjacentHTML('beforeend', html);
    } catch (e) {
        console.log(`Skipping ${filename}: ${e.message}`);
    }
}

function initializeUI() {
    // Re-initialize basic UI handlers
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Drag and Drop UI
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
                // For edit page, maybe show "New file selected: ..."
                if (p) p.innerText = "Selected: " + e.dataTransfer.files[0].name;
            }
        });
    });
}
