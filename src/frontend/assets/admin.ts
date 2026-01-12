// JavaScript для админ-панели
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logoutBtn') as HTMLElement;
    const roleModal = document.getElementById('roleModal') as HTMLElement;
    const closeModal = document.querySelector('.close') as HTMLElement;
    const roleForm = document.getElementById('roleForm') as HTMLFormElement;
    const userIdForRole = document.getElementById('userIdForRole') as HTMLInputElement;
    const newRoleSelect = document.getElementById('newRole') as HTMLSelectElement;

    // Проверка аутентификации
    if (!localStorage.getItem('authToken') || localStorage.getItem('userRole') !== 'admin') {
        alert('Доступ запрещен. Требуются права администратора.');
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
                            loadDashboardStats();
                            break;
                        case 'users':
                            loadUsers();
                            break;
                        case 'artworks':
                            loadArtworks();
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
        roleModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === roleModal) {
            roleModal.style.display = 'none';
        }
    });

    // Обработчик формы изменения роли
    roleForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const userId = userIdForRole.value;
        const newRole = newRoleSelect.value;

        try {
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                alert('Роль пользователя успешно обновлена');
                roleModal.style.display = 'none';
                loadUsers(); // Обновляем список пользователей
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при обновлении роли:', error);
            alert('Ошибка при обновлении роли пользователя');
        }
    });

    // Функция для загрузки статистики на главной панели
    async function loadDashboardStats() {
        try {
            const response = await fetch('/api/admin/users/stats', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const stats = await response.json();

                document.getElementById('totalUsers')!.textContent = stats.total_users;
                document.getElementById('activeUsers')!.textContent = stats.active_users;
                document.getElementById('newToday')!.textContent = stats.new_users_today;

                // Заглушка для количества экспонатов
                document.getElementById('totalArtworks')!.textContent = '150';
            }
        } catch (error) {
            console.error('Ошибка при загрузке статистики:', error);
        }
    }

    // Функция для загрузки пользователей
    async function loadUsers() {
        try {
            const response = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const users = await response.json();
                const tbody = document.getElementById('usersTableBody');
                if (tbody) {
                    tbody.innerHTML = '';

                    users.forEach((user: any) => {
                        const row = document.createElement('tr');

                        row.innerHTML = `
                            <td>${user.user_id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                            <td>${new Date(user.created_at).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning" onclick="openRoleModal(${user.user_id}, '${user.role}')">Изменить роль</button>
                                <button class="btn btn-danger" onclick="deleteUser(${user.user_id})">Удалить</button>
                            </td>
                        `;

                        tbody.appendChild(row);
                    });
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    }

    // Функция для загрузки экспонатов
    async function loadArtworks() {
        try {
            const response = await fetch('/api/artworks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const artworks = await response.json();
                const tbody = document.getElementById('artworksTableBody');
                if (tbody) {
                    tbody.innerHTML = '';

                    artworks.forEach((artwork: any) => {
                        const row = document.createElement('tr');

                        row.innerHTML = `
                            <td>${artwork.artwork_id}</td>
                            <td>${artwork.title}</td>
                            <td>${artwork.artist_name}</td>
                            <td>${artwork.year_created || 'Неизвестно'}</td>
                            <td>${artwork.status || 'Активен'}</td>
                            <td>
                                <button class="btn btn-warning" onclick="editArtwork(${artwork.artwork_id})">Редактировать</button>
                                <button class="btn btn-danger" onclick="deleteArtwork(${artwork.artwork_id})">Удалить</button>
                            </td>
                        `;

                        tbody.appendChild(row);
                    });
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке экспонатов:', error);
        }
    }

    // Функция для загрузки аналитики
    function loadAnalytics() {
        // Заглушка для диаграмм - в реальном приложении здесь будет код для построения графиков
        console.log('Загрузка аналитики');
    }

    // Функция для открытия модального окна изменения роли
    (window as any).openRoleModal = function(userId: number, currentRole: string) {
        userIdForRole.value = userId.toString();
        newRoleSelect.value = currentRole;
        roleModal.style.display = 'block';
    };

    // Функция для удаления пользователя
    (window as any).deleteUser = async function(userId: number) {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                    }
                });

                if (response.ok) {
                    alert('Пользователь успешно удален');
                    loadUsers(); // Обновляем список пользователей
                } else {
                    const error = await response.json();
                    alert(`Ошибка: ${error.error}`);
                }
            } catch (error) {
                console.error('Ошибка при удалении пользователя:', error);
                alert('Ошибка при удалении пользователя');
            }
        }
    };

    // Функция для редактирования экспоната
    (window as any).editArtwork = function(artworkId: number) {
        alert(`Редактирование экспоната с ID: ${artworkId}`);
        // Здесь будет реализация редактирования экспоната
    };

    // Функция для удаления экспоната
    (window as any).deleteArtwork = async function(artworkId: number) {
        if (confirm('Вы уверены, что хотите удалить этот экспонат?')) {
            try {
                const response = await fetch(`/api/artworks/${artworkId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                    }
                });

                if (response.ok) {
                    alert('Экспонат успешно удален');
                    loadArtworks(); // Обновляем список экспонатов
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

    // Инициализация: загружаем статистику для главной панели
    loadDashboardStats();
});