// PWA регистрация и управление офлайн режимом

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration.scope);
                
                // Проверяем обновления каждые 5 минут
                setInterval(() => {
                    registration.update();
                }, 5 * 60 * 1000);
                
                // Обработка обновлений
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(err => console.log('SW registration failed:', err));
    });
}

// Показать уведомление об обновлении
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.className = 'fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-600 text-white p-4 rounded-xl shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-semibold">Доступно обновление</p>
                <p class="text-sm text-blue-100">Обновите для новых данных</p>
            </div>
            <button onclick="updateApp()" class="bg-white text-blue-600 px-3 py-1 rounded-lg font-medium text-sm">
                Обновить
            </button>
        </div>
    `;
    document.body.appendChild(notification);
}

// Обновить приложение
function updateApp() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage('skipWaiting');
    }
    window.location.reload();
}

// Индикатор офлайн режима
function updateOnlineStatus() {
    const indicator = document.getElementById('offline-indicator');
    
    if (!navigator.onLine) {
        if (!indicator) {
            const div = document.createElement('div');
            div.id = 'offline-indicator';
            div.className = 'fixed top-16 left-0 right-0 bg-amber-500 text-white text-center py-2 text-sm z-40';
            div.innerHTML = '<i class="fas fa-wifi-slash mr-2"></i>Офлайн режим — данные из кэша';
            document.body.appendChild(div);
        }
    } else {
        if (indicator) {
            indicator.remove();
        }
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
document.addEventListener('DOMContentLoaded', updateOnlineStatus);

// Кнопка "Сохранить для офлайн"
function createOfflineButton() {
    // Проверяем, есть ли уже кнопка
    if (document.getElementById('save-offline-btn')) return;
    
    const btn = document.createElement('button');
    btn.id = 'save-offline-btn';
    btn.className = 'fixed bottom-20 right-4 md:bottom-4 bg-green-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-green-700 transition';
    btn.innerHTML = '<i class="fas fa-download"></i>';
    btn.title = 'Сохранить для офлайн';
    btn.onclick = saveForOffline;
    
    // Показываем только если есть SW и онлайн
    if ('serviceWorker' in navigator && navigator.onLine) {
        document.body.appendChild(btn);
    }
}

// Сохранить данные для офлайн
async function saveForOffline() {
    const btn = document.getElementById('save-offline-btn');
    if (!btn) return;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    try {
        // Запрашиваем кэширование фотографий
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage('cachePhotos');
        }
        
        // Ждём подтверждения
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject('timeout'), 30000);
            
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data === 'photosCached') {
                    clearTimeout(timeout);
                    resolve();
                }
            });
        });
        
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.className = btn.className.replace('bg-green-600', 'bg-gray-600');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-download"></i>';
            btn.className = btn.className.replace('bg-gray-600', 'bg-green-600');
            btn.disabled = false;
        }, 3000);
        
    } catch (err) {
        console.error('Failed to save offline:', err);
        btn.innerHTML = '<i class="fas fa-exclamation"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-download"></i>';
            btn.disabled = false;
        }, 3000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createOfflineButton, 2000);
});

// Добавляем мета-теги для PWA если их нет
function addPWAMetaTags() {
    const head = document.head;
    
    // Manifest
    if (!document.querySelector('link[rel="manifest"]')) {
        const manifest = document.createElement('link');
        manifest.rel = 'manifest';
        manifest.href = '/manifest.json';
        head.appendChild(manifest);
    }
    
    // Theme color
    if (!document.querySelector('meta[name="theme-color"]')) {
        const theme = document.createElement('meta');
        theme.name = 'theme-color';
        theme.content = '#078930';
        head.appendChild(theme);
    }
    
    // Apple meta tags
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
        const capable = document.createElement('meta');
        capable.name = 'apple-mobile-web-app-capable';
        capable.content = 'yes';
        head.appendChild(capable);
    }
    
    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
        const status = document.createElement('meta');
        status.name = 'apple-mobile-web-app-status-bar-style';
        status.content = 'black-translucent';
        head.appendChild(status);
    }
}

addPWAMetaTags();
