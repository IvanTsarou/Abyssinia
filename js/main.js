// Эфиопия — карта и галерея достопримечательностей

let map;
let markers = [];

// Регионы по документу Эфиопия_достопримечательности.docx
var regionColors = {
    'Амхара': '#078930',
    'Тыграй': '#8B4512',
    'Харари': '#B8860B',
    'Афар': '#CD5C5C',
    'Оромия': '#228B22',
    'Южные нации': '#DA121A',
    'Аддис-Абеба': '#1E90FF',
    'Дыре-Дауа': '#6B8E23',
    'Афар / Оромия': '#9370DB',
    'Оромия / Южные нации': '#20B2AA'
};

function getIconClass(region) {
    var icons = {
        'Амхара': 'fa-church',
        'Тыграй': 'fa-monument',
        'Харари': 'fa-fort',
        'Афар': 'fa-fire',
        'Оромия': 'fa-mountain',
        'Южные нации': 'fa-people-group',
        'Аддис-Абеба': 'fa-landmark',
        'Дыре-Дауа': 'fa-city',
        'Афар / Оромия': 'fa-mountain-sun',
        'Оромия / Южные нации': 'fa-water'
    };
    return icons[region] || 'fa-map-marker-alt';
}

function createCustomIcon(location) {
    var color = regionColors[location.region] || '#078930';
    var iconClass = getIconClass(location.region);
    return L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:' + color + ';width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);">' +
            '<i class="fas ' + iconClass + '" style="color:white;font-size:12px;"></i></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

function initMap() {
    map = L.map('map').setView([9.5, 40.0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);
    if (typeof locations !== 'undefined' && locations.length) addMarkersToMap();
}

function addMarkersToMap() {
    markers.forEach(function(m) { map.removeLayer(m); });
    markers = [];
    locations.forEach(function(location) {
        var icon = createCustomIcon(location);
        var lon = location.coordinates[0], lat = location.coordinates[1];
        var marker = L.marker([lat, lon], { icon: icon }).addTo(map);
        marker.bindPopup(
            '<div style="padding:10px;min-width:200px;">' +
            '<h3 style="margin:0 0 8px 0;font-size:1.05em;font-weight:bold;">' + location.name + '</h3>' +
            '<p style="margin:5px 0;color:#666;font-size:0.9em;"><strong>Регион:</strong> ' + location.region + '</p>' +
            '<p style="margin:8px 0 0 0;color:#555;font-size:0.85em;line-height:1.35;">' + (location.description || '').substring(0, 120) + '…</p>' +
            '<a href="location.html?id=' + location.id + '" style="display:inline-block;margin-top:10px;padding:6px 12px;background:#078930;color:white;text-decoration:none;border-radius:6px;font-size:0.9em;">Подробнее →</a>' +
            '</div>'
        );
        markers.push(marker);
    });
    if (locations.length > 0) {
        var bounds = L.latLngBounds(locations.map(function(loc) { return [loc.coordinates[1], loc.coordinates[0]]; }));
        map.fitBounds(bounds, { padding: [40, 40] });
    }
}

function getBestLocationPhoto(location) {
    if (location.photos && location.photos.length > 0) return location.photos[0];
    return location.photoUrl || null;
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function createLocationCard(location) {
    if (!location || !location.coordinates || location.coordinates.length < 2) return '';
    var lon = Number(location.coordinates[0]), lat = Number(location.coordinates[1]);
    var photo = getBestLocationPhoto(location);
    var googleMapsUrl = 'https://www.google.com/maps?q=' + lat + ',' + lon;
    var mapsMeUrl = 'mapsme://map?v=1&ll=' + lat + ',' + lon + '&n=' + encodeURIComponent(location.name);
    var nameSafe = escapeHtml(location.name || '');
    var regionSafe = escapeHtml(location.region || '');
    var descSafe = escapeHtml(location.description || '');
    var imgBlock = photo
        ? '<img src="' + photo + '" alt="' + nameSafe + '" class="w-full h-full object-cover" style="display:block" loading="lazy">'
        : '<div class="flex items-center justify-center bg-gray-100 text-gray-400 h-full min-h-[200px]"><i class="fas fa-image text-4xl"></i></div>';
    var unescoBadge = location.isUnesco
        ? '<div class="absolute top-3 right-3 z-10"><span class="px-3 py-1 rounded-full text-xs font-bold text-black shadow" style="background:linear-gradient(135deg,#FCDD09 0%,#F59E0B 100%)"><i class="fas fa-landmark mr-1"></i>ЮНЕСКО</span></div>'
        : '';
    return '<div class="location-card bg-white rounded-xl shadow-lg overflow-hidden" data-location-id="' + location.id + '" data-region="' + regionSafe + '">' +
        '<div class="relative" style="height:240px;overflow:hidden;border-radius:0.5rem 0.5rem 0 0;background:#f3f4f6">' + imgBlock + unescoBadge + '</div>' +
        '<div class="p-4 sm:p-5">' +
        '<h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-1">' + nameSafe + '</h3>' +
        '<p class="text-gray-500 text-xs mb-2 sm:mb-3">' + regionSafe + '</p>' +
        '<p class="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">' + descSafe + '</p>' +
        '<div class="mb-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm">' +
        '<a href="' + googleMapsUrl + '" target="_blank" rel="noopener" class="text-blue-600 hover:underline" onclick="event.stopPropagation()">Google Maps</a>' +
        '<span class="text-gray-500"><i class="fas fa-map-marker-alt text-[#078930] mr-1"></i>' + lat.toFixed(2) + ', ' + lon.toFixed(2) + '</span>' +
        '<a href="' + mapsMeUrl + '" class="text-green-600 hover:underline" onclick="event.stopPropagation()">Maps.me</a>' +
        '</div>' +
        '<div class="flex gap-2">' +
        '<a href="location.html?id=' + location.id + '" class="flex-1 bg-[#078930] hover:bg-[#056b24] text-white font-medium py-2 px-4 rounded-lg text-center text-sm" onclick="event.stopPropagation()">Подробнее</a>' +
        '<button type="button" onclick="event.stopPropagation();showOnMap(' + location.id + ');" class="flex-1 bg-[#DA121A] hover:bg-[#b80e15] text-white font-medium py-2 px-4 rounded-lg text-sm">На карте</button>' +
        '</div></div></div>';
}

function renderLocationCards(filteredLocations) {
    var container = document.getElementById('locations-container');
    if (!container) return;
    var list = filteredLocations || locations;
    if (!list || list.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-full py-8">Ничего не найдено</p>';
        return;
    }
    try {
        container.innerHTML = list.map(createLocationCard).filter(Boolean).join('');
    } catch (e) {
        console.error('renderLocationCards:', e);
        container.innerHTML = '<p class="text-red-500 text-center col-span-full py-8">Ошибка загрузки карточек. Проверьте консоль.</p>';
        return;
    }
    container.querySelectorAll('.location-card').forEach(function(card) {
        var id = card.dataset.locationId;
        card.addEventListener('click', function(e) {
            if (e.target.closest('a') || e.target.closest('button')) return;
            window.location.href = 'location.html?id=' + id;
        });
    });
}

function showOnMap(locationId) {
    var loc = locations.find(function(l) { return l.id === locationId; });
    if (!loc || !map) return;
    var lat = loc.coordinates[1], lon = loc.coordinates[0];
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
    map.setView([lat, lon], 10, { animate: true });
    var m = markers.find(function(m) {
        var L = m.getLatLng();
        return Math.abs(L.lat - lat) < 0.001 && Math.abs(L.lng - lon) < 0.001;
    });
    if (m) setTimeout(function() { m.openPopup(); }, 400);
}

function buildCategoryFilters() {
    var regions = {};
    locations.forEach(function(loc) {
        var r = loc.region || 'Другое';
        if (!regions[r]) regions[r] = true;
    });
    var html = '<button class="filter-btn active px-4 py-2 rounded-full font-medium text-sm shadow border-2 text-white" style="background:#078930;border-color:#078930;" data-filter="all"><i class="fas fa-globe mr-2"></i>Все</button>';
    Object.keys(regions).sort().forEach(function(reg) {
        html += '<button class="filter-btn px-4 py-2 rounded-full font-medium text-sm shadow border border-gray-200 bg-white text-gray-700" data-filter="' + reg.replace(/"/g, '&quot;') + '"><i class="fas ' + (getIconClass(reg) || 'fa-map-marker-alt') + ' mr-2"></i>' + reg + '</button>';
    });
    var el = document.getElementById('category-filters');
    if (el) el.innerHTML = html;
}

function filterLocations(filterKey) {
    var filtered = filterKey === 'all' ? locations : locations.filter(function(loc) { return loc.region === filterKey; });
    markers.forEach(function(m) { map.removeLayer(m); });
    markers = [];
    filtered.forEach(function(location) {
        var icon = createCustomIcon(location);
        var lat = location.coordinates[1], lon = location.coordinates[0];
        var marker = L.marker([lat, lon], { icon: icon }).addTo(map);
        marker.bindPopup(
            '<div style="padding:10px;min-width:200px;">' +
            '<h3 style="margin:0 0 8px 0;font-size:1.05em;font-weight:bold;">' + location.name + '</h3>' +
            '<p style="margin:5px 0;color:#666;font-size:0.9em;">' + location.region + '</p>' +
            '<a href="location.html?id=' + location.id + '" style="display:inline-block;margin-top:8px;padding:6px 12px;background:#078930;color:white;text-decoration:none;border-radius:6px;font-size:0.9em;">Подробнее →</a>' +
            '</div>'
        );
        markers.push(marker);
    });
    if (filtered.length > 0) {
        var bounds = L.latLngBounds(filtered.map(function(loc) { return [loc.coordinates[1], loc.coordinates[0]]; }));
        map.fitBounds(bounds, { padding: [40, 40] });
    }
    renderLocationCards(filtered);
}

function initFilters() {
    buildCategoryFilters();
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(b) {
                b.classList.remove('active');
                b.style.background = '';
                b.style.borderColor = '';
                b.style.color = '';
            });
            this.classList.add('active');
            this.style.background = '#078930';
            this.style.borderColor = '#078930';
            this.style.color = 'white';
            filterLocations(this.dataset.filter || 'all');
        });
    });
    var reset = document.getElementById('reset-filter');
    if (reset) reset.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
            b.style.background = '';
            b.style.borderColor = '';
            b.style.color = '';
        });
        var first = document.querySelector('.filter-btn');
        if (first) { first.classList.add('active'); first.style.background = '#078930'; first.style.borderColor = '#078930'; first.style.color = 'white'; }
        filterLocations('all');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof L !== 'undefined') initMap();
    else window.addEventListener('load', function() { setTimeout(initMap, 300); });
    if (typeof locations !== 'undefined' && locations.length) renderLocationCards();
    else window.addEventListener('load', function() { setTimeout(function() { if (locations && locations.length) renderLocationCards(); }, 300); });
    initFilters();
});
