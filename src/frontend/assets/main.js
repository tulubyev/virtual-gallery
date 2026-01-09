// Основной JavaScript файл для виртуальной галереи
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const exploreBtn = document.getElementById('exploreBtn');
    const featuredArtworksContainer = document.getElementById('featuredArtworks');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    
    // Проверяем, есть ли токен в localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
        // Если токен есть, показываем ссылку "Выход" и скрываем "Вход"/"Регистрация"
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        // Если токена нет, показываем "Вход" и "Регистрация"
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }

    // Получаем элементы модальных окон
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeRegister = document.querySelector('.close');
    const closeLogin = document.querySelector('.close-login');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Обработчики открытия модальных окон
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });

    // Обработчики закрытия модальных окон
    closeRegister.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Закрытие модальных окон при клике вне их области
    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Обработчик формы регистрации
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role') || 'user'  // По умолчанию обычный пользователь
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                // Сохраняем токен и роль в localStorage
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('userRole', result.role || userData.role);

                // Обновляем UI
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
                logoutLink.style.display = 'block';

                // Закрываем модальное окно
                registerModal.style.display = 'none';

                alert('Регистрация прошла успешно!');
            } else {
                alert(`Ошибка регистрации: ${result.error}`);
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации');
        }
    });

    // Обработчик формы входа
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                // Сохраняем токен и роль в localStorage
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('userRole', result.role);

                // Обновляем UI
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
                logoutLink.style.display = 'block';

                // Закрываем модальное окно
                loginModal.style.display = 'none';

                alert('Вход выполнен успешно!');
            } else {
                alert(`Ошибка входа: ${result.error}`);
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            alert('Ошибка при входе');
        }
    });
    
    // Функция для получения токена из localStorage
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }
    
    // Функция для установки токена в localStorage
    function setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }
    
    // Функция для удаления токена из localStorage
    function removeAuthToken() {
        localStorage.removeItem('authToken');
    }
    
    // Функция для выполнения API запросов
    async function apiRequest(endpoint, options = {}) {
        const url = `/api${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        const authToken = getAuthToken();
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        
        const config = {
            ...options,
            headers
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                if (response.status === 401) {
                    // Если получили 401 ошибку, удаляем токен и обновляем UI
                    removeAuthToken();
                    updateAuthUI();
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }
    
    // Функция для обновления UI аутентификации
    function updateAuthUI() {
        const token = getAuthToken();
        if (token) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
        } else {
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
        }
    }
    
    // Обработчик кнопки "Начать исследование"
    exploreBtn.addEventListener('click', async function() {
        try {
            // Загружаем произведения искусства
            loadArtworks();
        } catch (error) {
            console.error('Error exploring artworks:', error);
            alert('Ошибка при загрузке произведений искусства');
        }
    });
    
    // Обработчик ссылки "Выход"
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        removeAuthToken();
        updateAuthUI();
        alert('Вы успешно вышли из системы');
    });
    
    // Функция для загрузки произведений искусства
    async function loadArtworks() {
        try {
            // Показываем индикатор загрузки
            featuredArtworksContainer.innerHTML = '<div class="loading">Загрузка произведений искусства...</div>';
            
            // Загружаем произведения искусства с API
            const artworks = await apiRequest('/artworks');
            
            // Очищаем контейнер
            featuredArtworksContainer.innerHTML = '';
            
            // Если произведения есть, отображаем их
            if (artworks && artworks.length > 0) {
                artworks.forEach(artwork => {
                    const artworkElement = createArtworkCard(artwork);
                    featuredArtworksContainer.appendChild(artworkElement);
                });
            } else {
                // Если произведений нет, показываем сообщение
                featuredArtworksContainer.innerHTML = '<div class="loading">Произведения искусства не найдены</div>';
            }
        } catch (error) {
            console.error('Error loading artworks:', error);
            featuredArtworksContainer.innerHTML = '<div class="loading">Ошибка при загрузке произведений искусства</div>';
        }
    }
    
    // Функция для создания карточки произведения искусства
    function createArtworkCard(artwork) {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        
        card.innerHTML = `
            <div class="artwork-image">
                ${artwork.image_url ? `<img src="${artwork.image_url}" alt="${artwork.title}" style="width:100%;height:100%;object-fit:cover;">` : 
                  `<span>Изображение недоступно</span>`}
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${artwork.title}</h3>
                <div class="artwork-artist">Автор: ${artwork.artist_name}</div>
                <p class="artwork-description">${artwork.description ? artwork.description.substring(0, 100) + '...' : 'Описание отсутствует'}</p>
                <div class="artwork-meta">
                    <span>${artwork.year_created || 'Неизвестно'}</span>
                    <span>${artwork.medium || 'Неизвестно'}</span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Инициализация: загружаем популярные произведения при загрузке страницы
    loadArtworks();
    
    // Инициализация Socket.IO
    const socket = io();
    
    socket.on('connect', function() {
        console.log('Подключено к серверу');
    });
    
    socket.on('disconnect', function() {
        console.log('Отключено от сервера');
    });
    
    // Обработка событий взаимодействия с произведениями искусства
    socket.on('artworkInteractionBroadcast', function(data) {
        console.log('Взаимодействие с произведением искусства:', data);
        // Здесь можно добавить обновление интерфейса в реальном времени
    });
});