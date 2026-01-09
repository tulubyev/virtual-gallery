// JavaScript для панели куратора
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logoutBtn');
    const collectionModal = document.getElementById('collectionModal');
    const closeModal = document.querySelector('.close');
    const collectionForm = document.getElementById('collectionForm');
    
    // Проверка аутентификации
    if (!localStorage.getItem('authToken') || 
        (localStorage.getItem('userRole') !== 'curator' && 
         localStorage.getItem('userRole') !== 'admin')) {
        alert('Доступ запрещен. Требуются права куратора или администратора.');
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
                            loadCuratorDashboard();
                            break;
                        case 'collections':
                            loadCollections();
                            break;
                        case 'exhibitions':
                            loadExhibitions();
                            break;
                        case 'artworks':
                            loadArtworks();
                            break;
                        case 'ai-curation':
                            // Для AI-курирования не нужна предварительная загрузка
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
        collectionModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === collectionModal) {
            collectionModal.style.display = 'none';
        }
    });
    
    // Обработчик формы создания коллекции
    collectionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('collectionName').value;
        const description = document.getElementById('collectionDescription').value;
        const theme = document.getElementById('collectionTheme').value;
        const selectedArtworks = Array.from(document.getElementById('collectionArtworks').selectedOptions)
            .map(option => parseInt(option.value));
        
        try {
            const response = await fetch('/api/ai/collections/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    theme,
                    artworks: selectedArtworks,
                    isPublic: false
                })
            });
            
            if (response.ok) {
                alert('Коллекция успешно создана');
                collectionModal.style.display = 'none';
                loadCollections(); // Обновляем список коллекций
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при создании коллекции:', error);
            alert('Ошибка при создании коллекции');
        }
    });
    
    // Обработчики быстрых действий
    document.getElementById('createCollectionBtn').addEventListener('click', () => {
        document.getElementById('collectionForm').reset();
        collectionModal.style.display = 'block';
    });
    
    document.getElementById('createExhibitionBtn').addEventListener('click', () => {
        alert('Создание новой выставки');
        // Здесь будет реализация создания выставки
    });
    
    document.getElementById('aiCurateBtn').addEventListener('click', () => {
        document.getElementById('ai-curation').classList.add('active');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.nav-btn[data-tab="ai-curation"]').classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById('ai-curation').classList.add('active');
    });
    
    document.getElementById('generateCollectionBtn').addEventListener('click', generateAICollection);
    
    // Функция для загрузки дашборда куратора
    async function loadCuratorDashboard() {
        try {
            // Заглушка для статистики - в реальном приложении эти данные будут запрашиваться с сервера
            document.getElementById('activeCollections').textContent = '12';
            document.getElementById('createdExhibitions').textContent = '5';
            document.getElementById('selectedArtworks').textContent = '48';
            document.getElementById('todayVisitors').textContent = '127';
        } catch (error) {
            console.error('Ошибка при загрузке дашборда:', error);
        }
    }
    
    // Функция для загрузки коллекций
    async function loadCollections() {
        try {
            const response = await fetch('/api/ai/collections', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const collections = await response.json();
                const container = document.getElementById('collectionsGrid');
                container.innerHTML = '';
                
                collections.forEach(collection => {
                    const card = document.createElement('div');
                    card.className = 'collection-card';
                    
                    card.innerHTML = `
                        <div class="collection-image">🖼️</div>
                        <div class="collection-info">
                            <div class="collection-title">${collection.name}</div>
                            <div class="collection-description">${collection.description || 'Без описания'}</div>
                            <div class="collection-meta">
                                <span>${collection.artworks_count || 0} экспонатов</span>
                                <span>${collection.theme || 'Без темы'}</span>
                            </div>
                            <div style="margin-top: 10px;">
                                <button class="btn btn-warning" onclick="editCollection(${collection.collection_id})">Редактировать</button>
                                <button class="btn btn-danger" onclick="deleteCollection(${collection.collection_id})">Удалить</button>
                            </div>
                        </div>
                    `;
                    
                    container.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Ошибка при загрузке коллекций:', error);
        }
    }
    
    // Функция для загрузки выставок
    async function loadExhibitions() {
        try {
            // Заглушка для выставок - в реальном приложении данные будут запрашиваться с сервера
            const tbody = document.getElementById('exhibitionsTableBody');
            tbody.innerHTML = '';
            
            // Пример данных
            const exhibitions = [
                { id: 1, name: 'Выставка импрессионистов', theme: 'Импрессионизм', start_date: '2023-05-01', end_date: '2023-08-31', status: 'Активна' },
                { id: 2, name: 'Современное искусство', theme: 'Современное', start_date: '2023-09-01', end_date: '2023-12-31', status: 'Планируется' },
                { id: 3, name: 'Русская живопись', theme: 'Русское искусство', start_date: '2023-03-15', end_date: '2023-06-15', status: 'Завершена' }
            ];
            
            exhibitions.forEach(exhibition => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${exhibition.id}</td>
                    <td>${exhibition.name}</td>
                    <td>${exhibition.theme}</td>
                    <td>${exhibition.start_date}</td>
                    <td>${exhibition.end_date}</td>
                    <td>${exhibition.status}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editExhibition(${exhibition.id})">Редактировать</button>
                        <button class="btn btn-danger" onclick="deleteExhibition(${exhibition.id})">Удалить</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке выставок:', error);
        }
    }
    
    // Функция для загрузки экспонатов
    async function loadArtworks() {
        try {
            const response = await fetch('/api/artworks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const artworks = await response.json();
                const tbody = document.getElementById('artworksTableBody');
                tbody.innerHTML = '';
                
                artworks.forEach(artwork => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${artwork.artwork_id}</td>
                        <td>${artwork.title}</td>
                        <td>${artwork.artist_name}</td>
                        <td>${artwork.medium || 'Не указано'}</td>
                        <td>${artwork.year_created || 'Неизвестно'}</td>
                        <td>${artwork.in_collection ? 'Да' : 'Нет'}</td>
                        <td>
                            <button class="btn btn-primary" onclick="addToCollection(${artwork.artwork_id})">В коллекцию</button>
                            <button class="btn btn-warning" onclick="editArtwork(${artwork.artwork_id})">Редактировать</button>
                        </td>
                    `;
                    
                    tbody.appendChild(row);
                });
                
                // Также обновляем список для формы создания коллекции
                updateArtworksList(artworks);
            }
        } catch (error) {
            console.error('Ошибка при загрузке экспонатов:', error);
        }
    }
    
    // Функция для обновления списка экспонатов в форме создания коллекции
    function updateArtworksList(artworks) {
        const select = document.getElementById('collectionArtworks');
        select.innerHTML = '';
        
        artworks.forEach(artwork => {
            const option = document.createElement('option');
            option.value = artwork.artwork_id;
            option.textContent = `${artwork.title} (${artwork.artist_name})`;
            select.appendChild(option);
        });
    }
    
    // Функция для генерации коллекции с помощью ИИ
    async function generateAICollection() {
        const theme = document.getElementById('aiTheme').value;
        const style = document.getElementById('aiStyle').value;
        const count = document.getElementById('aiCount').value;
        
        if (!theme) {
            alert('Пожалуйста, укажите тему для подбора экспонатов');
            return;
        }
        
        try {
            const response = await fetch(`/api/ai/collections/generate?theme=${encodeURIComponent(theme)}&style=${encodeURIComponent(style)}&count=${count}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const collection = await response.json();
                displayAIResults(collection);
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при генерации коллекции:', error);
            alert('Ошибка при генерации коллекции');
        }
    }
    
    // Функция для отображения результатов ИИ-курирования
    function displayAIResults(collection) {
        const container = document.getElementById('aiResultsContainer');
        
        container.innerHTML = `
            <div class="collection-card">
                <div class="collection-info">
                    <div class="collection-title">${collection.name}</div>
                    <div class="collection-description">${collection.description}</div>
                    <div class="collection-artworks">
                        <h4>Подобранные экспонаты:</h4>
                        <ul>
                            ${collection.artworks.map(artwork => 
                                `<li>${artwork.title} - ${artwork.artist_name}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="saveAICollection(${JSON.stringify(collection).replace(/"/g, '&quot;')})" style="margin-top: 10px;">Сохранить коллекцию</button>
                </div>
            </div>
        `;
    }
    
    // Функция для сохранения ИИ-коллекции
    window.saveAICollection = async function(collection) {
        try {
            const response = await fetch('/api/ai/collections/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    name: collection.name,
                    description: collection.description,
                    artworks: collection.artworks.map(a => a.artwork_id),
                    isPublic: false,
                    is_ai_generated: true
                })
            });
            
            if (response.ok) {
                alert('Коллекция успешно сохранена');
                loadCollections(); // Обновляем список коллекций
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при сохранении коллекции:', error);
            alert('Ошибка при сохранении коллекции');
        }
    };
    
    // Функции для редактирования и удаления
    window.editCollection = function(collectionId) {
        alert(`Редактирование коллекции с ID: ${collectionId}`);
        // Здесь будет реализация редактирования коллекции
    };
    
    window.deleteCollection = async function(collectionId) {
        if (confirm('Вы уверены, что хотите удалить эту коллекцию?')) {
            try {
                const response = await fetch(`/api/collections/${collectionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                if (response.ok) {
                    alert('Коллекция успешно удалена');
                    loadCollections(); // Обновляем список коллекций
                } else {
                    const error = await response.json();
                    alert(`Ошибка: ${error.error}`);
                }
            } catch (error) {
                console.error('Ошибка при удалении коллекции:', error);
                alert('Ошибка при удалении коллекции');
            }
        }
    };
    
    window.editExhibition = function(exhibitionId) {
        alert(`Редактирование выставки с ID: ${exhibitionId}`);
        // Здесь будет реализация редактирования выставки
    };
    
    window.deleteExhibition = function(exhibitionId) {
        if (confirm('Вы уверены, что хотите удалить эту выставку?')) {
            alert(`Выставка с ID ${exhibitionId} будет удалена`);
            loadExhibitions(); // Обновляем список выставок
        }
    };
    
    window.addToCollection = function(artworkId) {
        alert(`Добавление экспоната с ID ${artworkId} в коллекцию`);
        // Здесь будет реализация добавления в коллекцию
    };
    
    window.editArtwork = function(artworkId) {
        alert(`Редактирование экспоната с ID: ${artworkId}`);
        // Здесь будет реализация редактирования экспоната
    };
    
    // Инициализация: загружаем дашборд куратора
    loadCuratorDashboard();
});