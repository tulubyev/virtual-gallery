// JavaScript для сотрудника
document.addEventListener('DOMContentLoaded', function() {
    // Проверка аутентификации и роли
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || (userRole !== 'staff' && userRole !== 'admin')) {
        alert('Доступ запрещен. Требуется роль сотрудника.');
        window.location.href = '/';
        return;
    }

    // Элементы DOM
    const logoutBtn = document.getElementById('logoutBtn') as HTMLElement;
    const dashboardContent = document.getElementById('dashboardContent');

    // Инициализация интерфейса
    function initInterface() {
        // Загрузка специфичных для сотрудника данных
        loadStaffData();
    }

    // Загрузка данных сотрудника
    async function loadStaffData() {
        try {
            const response = await fetch('/api/staff/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                if (dashboardContent) {
                    dashboardContent.innerHTML = `
                        <h2>Панель сотрудника</h2>
                        <div class="staff-stats">
                            <div class="stat-card">
                                <h3>Посетители сегодня</h3>
                                <p>${data.visitors_today || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Помощь оказана</h3>
                                <p>${data.assistance_provided || 0}</p>
                            </div>
                            <div class="stat-card">
                                <h3>Задачи выполнены</h3>
                                <p>${data.tasks_completed || 0}</p>
                            </div>
                        </div>
                        
                        <div class="staff-actions">
                            <button class="btn btn-primary" onclick="viewVisitorStats()">Статистика посетителей</button>
                            <button class="btn btn-secondary" onclick="manageTasks()">Управление задачами</button>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных сотрудника:', error);
        }
    }

    // Функция просмотра статистики посетителей
    (window as any).viewVisitorStats = function() {
        window.location.href = '/staff/visitors';
    };

    // Функция управления задачами
    (window as any).manageTasks = function() {
        window.location.href = '/staff/tasks';
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