// JavaScript для куратора
document.addEventListener('DOMContentLoaded', function() {
    // Проверка аутентификации и роли
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || (userRole !== 'curator' && userRole !== 'admin')) {
        alert('Доступ запрещен. Требуется роль куратора.');
        window.location.href = '/';
        return;
    }

    // Элементы DOM
    const logoutBtn = document.getElementById('logoutBtn') as HTMLElement;
    const dashboardContent = document.getElementById('dashboardContent');

    // Инициализация интерфейса
    function initInterface() {
        // Загрузка специфичных для куратора данных
        loadCuratorData();
    }

    // Загрузка данных куратора
    async function loadCuratorData() {
        try {
            const response = await fetch('/api/curator/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                if (dashboardContent) {
                    dashboardContent.innerHTML = `
                        <h2>Панель куратора</h2>
                        <div class="curator-stats">
                            <div class="stat-card">
                                <h3>Экспонаты на рассмотрении</h3>
                                <p>${data.pending_artworks || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Созданные коллекции</h3>
                                <p>${data.created_collections || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Одобренные экспонаты</h3>
                                <p>${data.approved_artworks || 0}</p>
                            </div>
                        </div>
                        
                        <div class="curator-actions">
                            <button class="btn btn-primary" onclick="createCollection()">Создать коллекцию</button>
                            <button class="btn btn-secondary" onclick="reviewArtworks()">Проверить экспонаты</button>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных куратора:', error);
        }
    }

    // Функция создания коллекции
    (window as any).createCollection = function() {
        window.location.href = '/collections/create';
    };

    // Функция проверки экспонатов
    (window as any).reviewArtworks = function() {
        window.location.href = '/artworks/review';
    };

    // Обработчик выхода
    logoutBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    });

    // Инициализация интерфейса
    initInterface();
});