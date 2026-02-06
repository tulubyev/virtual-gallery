declare function toastSuccess(msg: string, dur?: number): void;
declare function toastError(msg: string, dur?: number): void;
declare function toastWarning(msg: string, dur?: number): void;
declare function toastInfo(msg: string, dur?: number): void;

// JavaScript для гида экскурсии
document.addEventListener('DOMContentLoaded', function() {
    // Проверка аутентификации и роли
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || (userRole !== 'tour_guide' && userRole !== 'admin')) {
        toastWarning('Доступ запрещен. Требуется роль гида экскурсии.');
        window.location.href = '/';
        return;
    }

    // Элементы DOM
    const logoutBtn = document.getElementById('logoutBtn') as HTMLElement;
    const dashboardContent = document.getElementById('dashboardContent');

    // Инициализация интерфейса
    function initInterface() {
        // Загрузка специфичных для гида данных
        loadTourGuideData();
    }

    // Загрузка данных гида
    async function loadTourGuideData() {
        try {
            const response = await fetch('/api/tour-guide/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                if (dashboardContent) {
                    dashboardContent.innerHTML = `
                        <h2>Панель гида</h2>
                        <div class="guide-stats">
                            <div class="stat-card">
                                <h3>Активные экскурсии</h3>
                                <p>${data.active_tours || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Посетители обслужены</h3>
                                <p>${data.visitors_served || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Рейтинг</h3>
                                <p>${data.average_rating || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div class="guide-actions">
                            <button class="btn btn-primary" onclick="startTour()">Начать экскурсию</button>
                            <button class="btn btn-secondary" onclick="viewTourHistory()">История экскурсий</button>
                            <button class="btn btn-tertiary" onclick="createCustomRoute()">Создать маршрут</button>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных гида:', error);
        }
    }

    // Функция начала экскурсии
    (window as any).startTour = function() {
        window.location.href = '/tours/start';
    };

    // Функция просмотра истории экскурсий
    (window as any).viewTourHistory = function() {
        window.location.href = '/tours/history';
    };

    // Функция создания пользовательского маршрута
    (window as any).createCustomRoute = function() {
        window.location.href = '/tours/create-route';
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