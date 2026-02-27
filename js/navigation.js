/**
 * Компонент навигации для Africa Travel Guide
 * Создаёт верхний и нижний навбар динамически
 */

const NAV_CONFIG = {
    countries: [
        { id: 'overview', name: 'Обзор', flag: '🗺️', mapHref: 'overview.html', routeHref: null },
        { id: 'ethiopia', name: 'Эфиопия', flag: '🇪🇹', mapHref: 'index.html', routeHref: 'journey.html', color: '#078930' },
        { id: 'uganda', name: 'Уганда', flag: '🇺🇬', mapHref: 'uganda-map.html', routeHref: 'uganda.html', color: '#000' },
        { id: 'rwanda', name: 'Руанда', flag: '🇷🇼', mapHref: 'rwanda-map.html', routeHref: 'rwanda.html', color: '#00A1DE' },
        { id: 'burundi', name: 'Бурунди', flag: '🇧🇮', mapHref: 'burundi-map.html', routeHref: 'burundi.html', color: '#CE1126' }
    ],
    
    gradients: {
        overview: 'from-gray-800 via-gray-900 to-gray-800',
        ethiopia: 'from-[#078930] via-[#056b24] to-[#078930]',
        uganda: 'from-black via-gray-900 to-black',
        rwanda: 'from-[#00A1DE] via-[#0088bb] to-[#00A1DE]',
        burundi: 'from-[#CE1126] via-[#b50f21] to-[#CE1126]'
    }
};

function detectCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    const pageMap = {
        'overview.html': { country: 'overview', type: 'map' },
        'index.html': { country: 'ethiopia', type: 'map' },
        'journey.html': { country: 'ethiopia', type: 'route' },
        'ethiopia-location.html': { country: 'ethiopia', type: 'location' },
        'location.html': { country: 'ethiopia', type: 'location' },
        'map-fullscreen.html': { country: 'ethiopia', type: 'map' },
        'uganda-map.html': { country: 'uganda', type: 'map' },
        'uganda.html': { country: 'uganda', type: 'route' },
        'uganda-location.html': { country: 'uganda', type: 'location' },
        'uganda-map-fullscreen.html': { country: 'uganda', type: 'map' },
        'rwanda-map.html': { country: 'rwanda', type: 'map' },
        'rwanda.html': { country: 'rwanda', type: 'route' },
        'rwanda-location.html': { country: 'rwanda', type: 'location' },
        'rwanda-map-fullscreen.html': { country: 'rwanda', type: 'map' },
        'burundi-map.html': { country: 'burundi', type: 'map' },
        'burundi.html': { country: 'burundi', type: 'route' },
        'burundi-location.html': { country: 'burundi', type: 'location' },
        'burundi-map-fullscreen.html': { country: 'burundi', type: 'map' }
    };
    
    return pageMap[page] || { country: 'ethiopia', type: 'map' };
}

function createTopNav(containerId = 'top-nav') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const current = detectCurrentPage();
    const currentCountry = NAV_CONFIG.countries.find(c => c.id === current.country);
    const gradient = NAV_CONFIG.gradients[current.country] || NAV_CONFIG.gradients.ethiopia;
    
    let html = `
        <nav class="sticky top-0 z-50 bg-gradient-to-r ${gradient} shadow-lg">
            <div class="container mx-auto px-3 py-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1 sm:gap-3">
    `;
    
    NAV_CONFIG.countries.forEach(country => {
        const isActive = country.id === current.country;
        const href = country.mapHref;
        const activeClass = isActive ? 'text-white bg-white/20' : 'text-white/70 hover:text-white hover:bg-white/10';
        
        html += `
            <a href="${href}" class="${activeClass} px-1.5 sm:px-2 py-1 text-xs sm:text-sm rounded">
                ${country.flag} <span class="hidden sm:inline">${country.name}</span>
            </a>
        `;
    });
    
    html += `</div>`;
    
    if (currentCountry && currentCountry.routeHref) {
        const mapActive = current.type === 'map' ? 'text-white bg-white/20 font-medium' : 'text-white/80 hover:text-white bg-white/10';
        const routeActive = current.type === 'route' ? 'text-white bg-white/20 font-medium' : 'text-white/80 hover:text-white bg-white/10';
        
        html += `
            <div class="flex items-center">
                <a href="${currentCountry.mapHref}" class="${mapActive} px-2 py-1 rounded-l text-xs">
                    <i class="fas fa-map-marked-alt mr-1"></i>Карта
                </a>
                <a href="${currentCountry.routeHref}" class="${routeActive} px-2 py-1 rounded-r text-xs">
                    <i class="fas fa-route mr-1"></i>Маршрут
                </a>
            </div>
        `;
    }
    
    html += `
                </div>
            </div>
        </nav>
    `;
    
    container.innerHTML = html;
}

function createBottomNav(containerId = 'bottom-nav') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const current = detectCurrentPage();
    
    let html = '';
    
    NAV_CONFIG.countries.forEach(country => {
        const isActive = country.id === current.country;
        const href = country.mapHref;
        const activeClass = isActive ? 'class="active"' : '';
        
        html += `
            <a href="${href}" ${activeClass}>
                <span class="flag">${country.flag}</span>
                <span>${country.name}</span>
            </a>
        `;
    });
    
    container.innerHTML = html;
}

function initNavigation() {
    createTopNav();
    createBottomNav();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}
