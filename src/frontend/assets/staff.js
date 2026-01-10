// JavaScript для панели сотрудника
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logoutBtn');
    const artworkForm = document.getElementById('artworkForm');
    const editModal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close');
    const editArtworkForm = document.getElementById('editArtworkForm');
    
    // Проверка аутентификации
    if (!localStorage.getItem('authToken') || 
        (localStorage.getItem('userRole') !== 'staff' && 
         localStorage.getItem('userRole') !== 'admin' &&
         localStorage.getItem('userRole') !== 'curator')) {
        alert('Доступ запрещен. Требуются права сотрудника, куратора или администратора.');
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
                            loadStaffDashboard();
                            break;
                        case 'my-artworks':
                            loadMyArtworks();
                            break;
                        case 'pending':
                            loadPendingArtworks();
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
    
    // Обработчик формы добавления экспоната
    artworkForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        
        // Собираем данные формы
        const artworkData = {
            title: document.getElementById('title').value,
            artist_name: document.getElementById('artistName').value,
            year_created: document.getElementById('yearCreated').value || null,
            medium: document.getElementById('medium').value,
            dimensions: document.getElementById('dimensions').value,
            style: document.getElementById('style').value,
            description: document.getElementById('description').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            location_in_gallery: document.getElementById('location').value,
            status: document.getElementById('status').value
        };
        
        try {
            const response = await fetch('/api/artworks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(artworkData)
            });
            
            if (response.ok) {
                const artwork = await response.json();
                alert('Экспонат успешно добавлен');
                artworkForm.reset();
                loadMyArtworks(); // Обновляем список моих экспонатов
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при добавлении экспоната:', error);
            alert('Ошибка при добавлении экспоната');
        }
    });
    
    // Обработчики модального окна
    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Обработчик формы редактирования экспоната
    editArtworkForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const artworkId = document.getElementById('editArtworkId').value;
        
        const artworkData = {
            title: document.getElementById('editTitle').value,
            artist_name: document.getElementById('editArtistName').value,
            year_created: document.getElementById('editYearCreated').value || null,
            medium: document.getElementById('editMedium').value,
            dimensions: document.getElementById('editDimensions').value,
            style: document.getElementById('editStyle').value,
            description: document.getElementById('editDescription').value,
            tags: document.getElementById('editTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            location_in_gallery: document.getElementById('editLocation').value,
            status: document.getElementById('editStatus').value
        };
        
        try {
            const response = await fetch(`/api/artworks/${artworkId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(artworkData)
            });
            
            if (response.ok) {
                const artwork = await response.json();
                alert('Экспонат успешно обновлен');
                editModal.style.display = 'none';
                loadMyArtworks(); // Обновляем список моих экспонатов
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при обновлении экспоната:', error);
            alert('Ошибка при обновлении экспоната');
        }
    });
    
    // Функция для загрузки дашборда сотрудника
    async function loadStaffDashboard() {
        try {
            // Заглушка для статистики - в реальном приложении эти данные будут запрашиваться с сервера
            document.getElementById('addedArtworks').textContent = '24';
            document.getElementById('pendingArtworks').textContent = '5';
            document.getElementById('approvedArtworks').textContent = '17';
            document.getElementById('rejectedArtworks').textContent = '2';
            
            // Загрузка недавней активности
            const activityList = document.getElementById('activityList');
            activityList.innerHTML = '';
            
            const activities = [
                { action: 'Добавлен экспонат', item: 'Картина "Звезда" - Иванов И.И.', time: '10 минут назад' },
                { action: 'Обновлен статус', item: 'Экспонат #123 - На модерации', time: '30 минут назад' },
                { action: 'Одобрен экспонат', item: 'Скульптура "Вечность" - Петров П.П.', time: '2 часа назад' },
                { action: 'Отклонен экспонат', item: 'Фотография "Город" - Сидоров С.С.', time: '1 день назад' }
            ];
            
            activities.forEach(activity => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${activity.action}</strong>: ${activity.item}<br><small>${activity.time}</small>`;
                activityList.appendChild(li);
            });
        } catch (error) {
            console.error('Ошибка при загрузке дашборда:', error);
        }
    }
    
    // Функция для загрузки моих экспонатов
    async function loadMyArtworks() {
        try {
            const response = await fetch('/api/artworks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const artworks = await response.json();
                const tbody = document.getElementById('myArtworksTableBody');
                tbody.innerHTML = '';
                
                artworks.forEach(artwork => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${artwork.artwork_id}</td>
                        <td>${artwork.title}</td>
                        <td>${artwork.artist_name}</td>
                        <td>${artwork.year_created || 'Неизвестно'}</td>
                        <td><span class="status-badge ${artwork.status}">${getStatusText(artwork.status)}</span></td>
                        <td>${new Date(artwork.created_at).toLocaleDateString()}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editArtwork(${artwork.artwork_id})">Редактировать</button>
                            <button class="btn btn-danger" onclick="deleteArtwork(${artwork.artwork_id})">Удалить</button>
                        </td>
                    `;
                    
                    tbody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Ошибка при загрузке моих экспонатов:', error);
        }
    }
    
    // Функция для загрузки экспонатов на модерации
    async function loadPendingArtworks() {
        try {
            // Заглушка для экспонатов на модерации - в реальном приложении данные будут запрашиваться с сервера
            const tbody = document.getElementById('pendingTableBody');
            tbody.innerHTML = '';
            
            // Пример данных
            const pendingArtworks = [
                { id: 1, title: 'Картина "Закат"', artist: 'Иванов И.И.', added_by: 'Петров П.П.', date_added: '2023-05-15' },
                { id: 2, title: 'Скульптура "Птица"', artist: 'Сидоров С.С.', added_by: 'Кузнецов К.К.', date_added: '2023-05-16' },
                { id: 3, title: 'Фотография "Портрет"', artist: 'Волков В.В.', added_by: 'Петров П.П.', date_added: '2023-05-17' }
            ];
            
            pendingArtworks.forEach(artwork => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${artwork.id}</td>
                    <td>${artwork.title}</td>
                    <td>${artwork.artist}</td>
                    <td>${artwork.added_by}</td>
                    <td>${artwork.date_added}</td>
                    <td>
                        <button class="btn btn-primary" onclick="approveArtwork(${artwork.id})">Одобрить</button>
                        <button class="btn btn-danger" onclick="rejectArtwork(${artwork.id})">Отклонить</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке экспонатов на модерации:', error);
        }
    }
    
    // Вспомогательная функция для получения текста статуса
    function getStatusText(status) {
        switch(status) {
            case 'draft': return 'Черновик';
            case 'pending': return 'На модерации';
            case 'published': return 'Опубликован';
            case 'rejected': return 'Отклонен';
            default: return status;
        }
    }
    
    // Функция для редактирования экспоната
    window.editArtwork = async function(artworkId) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const artwork = await response.json();
                
                // Заполняем форму данными
                document.getElementById('editArtworkId').value = artwork.artwork_id;
                document.getElementById('editTitle').value = artwork.title;
                document.getElementById('editArtistName').value = artwork.artist_name;
                document.getElementById('editYearCreated').value = artwork.year_created || '';
                document.getElementById('editMedium').value = artwork.medium || '';
                document.getElementById('editDimensions').value = artwork.dimensions || '';
                document.getElementById('editStyle').value = artwork.style || '';
                document.getElementById('editDescription').value = artwork.description || '';
                document.getElementById('editTags').value = artwork.tags ? artwork.tags.join(', ') : '';
                document.getElementById('editLocation').value = artwork.location_in_gallery ? 
                    JSON.stringify(artwork.location_in_gallery) : '';
                document.getElementById('editStatus').value = artwork.status || 'draft';
                
                // Показываем модальное окно
                editModal.style.display = 'block';
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных экспоната:', error);
            alert('Ошибка при загрузке данных экспоната');
        }
    };
    
    // Функция для удаления экспоната
    window.deleteArtwork = async function(artworkId) {
        if (confirm('Вы уверены, что хотите удалить этот экспонат?')) {
            try {
                const response = await fetch(`/api/artworks/${artworkId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                if (response.ok) {
                    alert('Экспонат успешно удален');
                    loadMyArtworks(); // Обновляем список моих экспонатов
                } else {
                    const error = await response.json();
                    alert(`Ошибка: ${error.error}`);
                }
            } catch (error) {
                console.error('Ошибка при удалении экспоната:', error);
                alert('Ошибка при удалении экспоната');
            }
        }
    };
    
    // Функции для модерации
    window.approveArtwork = function(artworkId) {
        alert(`Экспонат с ID ${artworkId} одобрен`);
        loadPendingArtworks(); // Обновляем список экспонатов на модерации
    };
    
    window.rejectArtwork = function(artworkId) {
        if (confirm('Вы уверены, что хотите отклонить этот экспонат?')) {
            alert(`Экспонат с ID ${artworkId} отклонен`);
            loadPendingArtworks(); // Обновляем список экспонатов на модерации
        }
    };
    
    // Инициализация: загружаем дашборд сотрудника
    loadStaffDashboard();
});