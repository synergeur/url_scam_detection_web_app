// Function to dynamically fetch image paths
async function fetchImagePaths(folder) {
    const response = await fetch(`/list-files/${folder}`);
    const files = await response.json();
    return files.map(file => `/static/${folder}/${file}`);
}

const parts = {};

async function initializeParts() {
    parts.backgrounds = await fetchImagePaths('images/cards/backgrounds');
    parts.stats = await fetchImagePaths('images/cards/stats');
    parts.jobs = await fetchImagePaths('images/cards/jobs');
    parts.banners = await fetchImagePaths('images/cards/banners');
    parts.borders = await fetchImagePaths('images/cards/borders');

    setupUI();
    addStaticImages(); // Add static images that don't change
}

let currentIndices = {
    backgrounds: 0,
    stats: 0,
    jobs: 0,
    banners: 0,
    borders: 0
};

const visualisationContainer = document.getElementById('visualisation-container');
const images = {};

function setupUI() {
    // Create img elements for each part
    Object.keys(parts).forEach(part => {
        if (!images[part]) {
            images[part] = document.createElement('img');
            images[part].alt = `${part} Image`;
            visualisationContainer.appendChild(images[part]);
        }
    });

    // Setup controls for each part
    setupControls('backgrounds', 'card-left-1', 'card-right-1');
    setupControls('stats', 'card-left-2', 'card-right-2');
    setupControls('jobs', 'card-left-3', 'card-right-3');
    setupControls('banners', 'card-left-4', 'card-right-4');
    setupControls('borders', 'card-left-5', 'card-right-5');

    // Initialize images
    updateImages();
}

function addStaticImages() {
    const staticImages = [
        '/static/images/cards/evolutions/card_evolution_1.webp',
        '/static/images/cards/lvl_icons/lvl_icon_1.webp',
        '/static/images/cards/stats_labels.webp'
    ];

    staticImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Static Image';
        visualisationContainer.appendChild(img);
    });
}

function updateImages() {
    Object.keys(parts).forEach(part => {
        images[part].src = `${parts[part][currentIndices[part]]}`;
        console.log(`Updating ${part}: ${images[part].src}`); // Debugging log
    });
}

function setupControls(part, leftButtonId, rightButtonId) {
    const leftButton = document.getElementById(leftButtonId);
    const rightButton = document.getElementById(rightButtonId);

    leftButton.addEventListener('click', () => {
        currentIndices[part] = (currentIndices[part] - 1 + parts[part].length) % parts[part].length;
        updateImages();
    });

    rightButton.addEventListener('click', () => {
        currentIndices[part] = (currentIndices[part] + 1) % parts[part].length;
        updateImages();
    });
}

// Initialize parts dynamically
initializeParts();
