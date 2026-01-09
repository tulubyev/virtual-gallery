// JavaScript для панели организатора туров
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logoutBtn');
    const tourModal = document.getElementById('tourModal');
    const closeModal = document.querySelector('.close');
    const tourForm = document.getElementById('tourForm');
    
    // Проверка аутентификации
    if (!localStorage.getItem('authToken') || 
        (localStorage.getItem('userRole') !== 'tour_guide' && 
         localStorage.getItem('userRole') !== 'admin')) {
        alert('Доступ запрещен. Требуются права организатора туров или администратора.');
        window.location.href = '/';
        return;
    }
    
    // Инициализация вкладок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Обновление активной вкладки
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Показ соответствующего контента
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabName) {
                    content.classList.add('active');
                    
                    // Загрузка данных для активной вкладки
                    switch(tabName) {
                        case 'dashboard':
                            loadTourGuideDashboard();
                            break;
                        case 'tours':
                            loadTours();
                            break;
                        case 'schedule':
                            loadSchedule();
                            break;
                        case 'participants':
                            loadParticipants();
                            break;
                        case 'analytics':
                            loadAnalytics();
                            break;
                    }
                }
            });
        });
    });
    
    // Обработчик выхода
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    });
    
    // Обработчики модального окна
    closeModal.addEventListener('click', () => {
        tourModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === tourModal) {
            tourModal.style.display = 'none';
        }
    });
    
    // Обработчик формы создания тура
    tourForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const tourData = {
            name: document.getElementById('tourName').value,
            description: document.getElementById('tourDescription').value,
            duration: document.getElementById('tourDuration').value,
            language: document.getElementById('tourLanguage').value,
            route: document.getElementById('tourRoute').value,
            max_participants: document.getElementById('tourMaxParticipants').value,
            difficulty: document.getElementById('tourDifficulty').value
        };
        
        try {
            const response = await fetch('/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(tourData)
            });
            
            if (response.ok) {
                alert('Тур успешно создан');
                tourModal.style.display = 'none';
                loadTours(); // Обновляем список туров
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при создании тура:', error);
            alert('Ошибка при создании тура');
        }
    });
    
    // Обработчики быстрых действий
    document.getElementById('createTourBtn').addEventListener('click', () => {
        document.getElementById('tourForm').reset();
        tourModal.style.display = 'block';
    });
    
    document.getElementById('scheduleTourBtn').addEventListener('click', () => {
        alert('Назначение тура');
        // Здесь будет реализация назначения тура
    });
    
    document.getElementById('manageRoutesBtn').addEventListener('click', () => {
        alert('Управление маршрутами');
        // Здесь будет реализация управления маршрутами
    });
    
    document.getElementById('viewFeedbackBtn').addEventListener('click', () => {
        alert('Просмотр отзывов');
        // Здесь будет реализация просмотра отзывов
    });
    
    // Функция для загрузки дашборда организатора туров
    async function loadTourGuideDashboard() {
        try {
            // Заглушка для статистики - в реальном приложении эти данные будут запрашиваться с сервера
            document.getElementById('activeTours').textContent = '3';
            document.getElementById('scheduledTours').textContent = '7';
            document.getElementById('totalParticipants').textContent = '142';
            document.getElementById('averageRating').textContent = '4.7';
        } catch (error) {
            console.error('Ошибка при загрузке дашборда:', error);
        }
    }
    
    // Функция для загрузки туров
    async function loadTours() {
        try {
            // Заглушка для туров - в реальном приложении данные будут запрашиваться с сервера
            const tours = [
                { id: 1, name: 'Тур по импрессионистам', description: 'Обзор работ импрессионистов', duration: 60, participants: 15, date: '2023-05-15' },
                { id: 2, name: 'Современное искусство', description: 'Экспериментальные работы', duration: 90, participants: 12, date: '2023-05-16' },
                { id: 3, name: 'Классика жанра', description: 'Шедевры мировой живописи', duration: 120, participants: 18, date: '2023-05-17' }
            ];
            
            const container = document.getElementById('toursGrid');
            container.innerHTML = '';
            
            tours.forEach(tour => {
                const card = document.createElement('div');
                card.className = 'tour-card';
                
                card.innerHTML = `
                    <div class="tour-image">🧭</div>
                    <div class="tour-info">
                        <div class="tour-title">${tour.name}</div>
                        <div class="tour-description">${tour.description}</div>
                        <div class="tour-meta">
                            <span>${tour.duration} мин</span>
                            <span>${tour.participants} участников</span>
                        </div>
                        <div style="margin-top: 10px;">
                            <button class="btn btn-warning" onclick="editTour(${tour.id})">Редактировать</button>
                            <button class="btn btn-danger" onclick="deleteTour(${tour.id})">Удалить</button>
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Ошибка при загрузке туров:', error);
        }
    }
    
    // Функция для загрузки расписания
    async function loadSchedule() {
        try {
            // Генерация календаря
            generateCalendar();
            
            // Загрузка запланированных туров на сегодня
            const todaysToursList = document.getElementById('todaysTours');
            todaysToursList.innerHTML = '';
            
            // Пример туров на сегодня
            const todaysTours = [
                { id: 1, name: 'Тур по импрессионистам', time: '10:00', participants: 12 },
                { id: 2, name: 'Современное искусство', time: '14:00', participants: 8 }
            ];
            
            todaysTours.forEach(tour => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${tour.time}</strong> - ${tour.name} 
                    <span>(${tour.participants} участников)</span>
                    <button class="btn btn-primary" style="float: right;" onclick="startTour(${tour.id})">Начать тур</button>
                `;
                todaysToursList.appendChild(li);
            });
        } catch (error) {
            console.error('Ошибка при загрузке расписания:', error);
        }
    }
    
    // Функция для генерации календаря
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Заголовки дней недели
        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.textAlign = 'center';
            dayHeader.style.padding = '0.5rem';
            calendarGrid.appendChild(dayHeader);
        });
        
        // Генерация дней месяца (заглушка)
        for (let i = 1; i <= 35; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Добавляем индикатор события для некоторых дней
            if (i % 7 === 0 || i % 5 === 0) {
                dayElement.classList.add('has-event');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Функция для загрузки участников
    async function loadParticipants() {
        try {
            // Заглушка для участников - в реальном приложении данные будут запрашиваться с сервера
            const participants = [
                { id: 1, name: 'Иванов И.И.', email: 'ivanov@example.com', tour: 'Тур по импрессионистам', date: '2023-05-10', status: 'confirmed' },
                { id: 2, name: 'Петрова М.С.', email: 'petrova@example.com', tour: 'Современное искусство', date: '2023-05-11', status: 'confirmed' },
                { id: 3, name: 'Сидоров А.К.', email: 'sidorov@example.com', tour: 'Классика жанра', date: '2023-05-12', status: 'pending' }
            ];
            
            const tbody = document.getElementById('participantsTableBody');
            tbody.innerHTML = '';
            
            participants.forEach(participant => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${participant.id}</td>
                    <td>${participant.name}</td>
                    <td>${participant.email}</td>
                    <td>${participant.tour}</td>
                    <td>${participant.date}</td>
                    <td><span class="status-badge ${participant.status}">${getStatusText(participant.status)}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="contactParticipant(${participant.id})">Связаться</button>
                        <button class="btn btn-danger" onclick="removeParticipant(${participant.id})">Удалить</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке участников:', error);
        }
    }
    
    // Функция для загрузки аналитики
    function loadAnalytics() {
        // Заглушка для диаграмм - в реальном приложении здесь будет код для построения графиков
        console.log('Загрузка аналитики туров');
    }
    
    // Вспомогательная функция для получения текста статуса
    function getStatusText(status) {
        switch(status) {
            case 'confirmed': return 'Подтвержден';
            case 'pending': return 'Ожидает';
            case 'cancelled': return 'Отменен';
            default: return status;
        }
    }
    
    // Функции для управления турами
    window.editTour = function(tourId) {
        alert(`Редактирование тура с ID: ${tourId}`);
        // Здесь будет реализация редактирования тура
    };
    
    window.deleteTour = function(tourId) {
        if (confirm('Вы уверены, что хотите удалить этот тур?')) {
            alert(`Тур с ID ${tourId} будет удален`);
            loadTours(); // Обновляем список туров
        }
    };
    
    window.startTour = function(tourId) {
        alert(`Начало тура с ID: ${tourId}`);
        // Здесь будет реализация начала тура
    };
    
    window.contactParticipant = function(participantId) {
        alert(`Связаться с участником с ID: ${participantId}`);
        // Здесь будет реализация связи с участником
    };
    
    window.removeParticipant = function(participantId) {
        if (confirm('Вы уверены, что хотите удалить этого участника?')) {
            alert(`Участник с ID ${participantId} будет удален`);
            loadParticipants(); // Обновляем список участников
        }
    };
    
    // Инициализация: загружаем дашборд организатора туров
    loadTourGuideDashboard();
});