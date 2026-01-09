// JavaScript для кабинета участника аукциона
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabButtons = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutBtn = document.getElementById('logoutBtn');
    const bidModal = document.getElementById('bidModal');
    const closeModal = document.querySelector('.close');
    const bidForm = document.getElementById('bidForm');
    
    // Проверка аутентификации
    if (!localStorage.getItem('authToken') || 
        (localStorage.getItem('userRole') !== 'auction_participant' && 
         localStorage.getItem('userRole') !== 'admin')) {
        alert('Доступ запрещен. Требуются права участника аукциона или администратора.');
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
                            loadAuctionDashboard();
                            break;
                        case 'auctions':
                            loadAuctions();
                            break;
                        case 'bids':
                            loadBids();
                            break;
                        case 'watchlist':
                            loadWatchlist();
                            break;
                        case 'transactions':
                            loadTransactions();
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
        bidModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === bidModal) {
            bidModal.style.display = 'none';
        }
    });
    
    // Обработчик формы ставки
    bidForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const lotId = document.getElementById('lotId').value;
        const bidAmount = document.getElementById('bidAmount').value;
        
        try {
            const response = await fetch(`/api/auctions/${lotId}/bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ amount: parseFloat(bidAmount) })
            });
            
            if (response.ok) {
                alert('Ставка успешно сделана');
                bidModal.style.display = 'none';
                loadBids(); // Обновляем список ставок
                loadAuctions(); // Обновляем список аукционов
            } else {
                const error = await response.json();
                alert(`Ошибка: ${error.error}`);
            }
        } catch (error) {
            console.error('Ошибка при размещении ставки:', error);
            alert('Ошибка при размещении ставки');
        }
    });
    
    // Функция для загрузки дашборда участника аукциона
    async function loadAuctionDashboard() {
        try {
            // Заглушка для статистики - в реальном приложении эти данные будут запрашиваться с сервера
            document.getElementById('balance').textContent = '15,000 ₽';
            document.getElementById('activeBids').textContent = '3';
            document.getElementById('wonLots').textContent = '2';
            document.getElementById('participatedAuctions').textContent = '7';
            
            // Загрузка предстоящих аукционов
            const upcomingAuctionsList = document.getElementById('upcomingAuctionsList');
            upcomingAuctionsList.innerHTML = '';
            
            // Пример предстоящих аукционов
            const upcomingAuctions = [
                { id: 1, name: 'Весенний аукцион живописи', date: '2023-05-20T10:00:00', lots: 45 },
                { id: 2, name: 'Аукцион скульптур и графики', date: '2023-05-25T14:00:00', lots: 32 },
                { id: 3, name: 'Редкие книги и рукописи', date: '2023-06-02T11:00:00', lots: 28 }
            ];
            
            upcomingAuctions.forEach(auction => {
                const auctionItem = document.createElement('div');
                auctionItem.className = 'auction-item';
                
                const auctionDate = new Date(auction.date);
                auctionItem.innerHTML = `
                    <div class="auction-info">
                        <div class="auction-title">${auction.name}</div>
                        <div class="auction-date">Дата: ${auctionDate.toLocaleString()}</div>
                    </div>
                    <div class="auction-lots">${auction.lots} лотов</div>
                    <button class="btn btn-primary" onclick="viewAuction(${auction.id})">Участвовать</button>
                `;
                
                upcomingAuctionsList.appendChild(auctionItem);
            });
        } catch (error) {
            console.error('Ошибка при загрузке дашборда:', error);
        }
    }
    
    // Функция для загрузки аукционов
    async function loadAuctions() {
        try {
            // Заглушка для аукционов - в реальном приложении данные будут запрашиваться с сервера
            const auctions = [
                { id: 1, name: 'Весенний аукцион живописи', category: 'paintings', lots: 45, date: '2023-05-20', status: 'active' },
                { id: 2, name: 'Аукцион скульптур и графики', category: 'sculptures', lots: 32, date: '2023-05-25', status: 'upcoming' },
                { id: 3, name: 'Редкие книги и рукописи', category: 'antiques', lots: 28, date: '2023-06-02', status: 'upcoming' }
            ];
            
            const container = document.getElementById('auctionsGrid');
            container.innerHTML = '';
            
            auctions.forEach(auction => {
                const card = document.createElement('div');
                card.className = 'auction-card';
                
                card.innerHTML = `
                    <div class="auction-image">🖼️</div>
                    <div class="auction-details">
                        <div class="auction-name">${auction.name}</div>
                        <div class="auction-description">${auction.lots} лотов</div>
                        <div class="auction-meta">
                            <span>${auction.date}</span>
                            <span class="status-badge ${auction.status}">${getStatusText(auction.status)}</span>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="viewAuction(${auction.id})">Просмотреть</button>
                    </div>
                `;
                
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Ошибка при загрузке аукционов:', error);
        }
    }
    
    // Функция для загрузки ставок
    async function loadBids() {
        try {
            // Заглушка для ставок - в реальном приложении данные будут запрашиваться с сервера
            const bids = [
                { lot_id: 101, artwork: 'Картина "Закат"', current_bid: 12000, my_bid: 12500, status: 'leading', date: '2023-05-15' },
                { lot_id: 102, artwork: 'Скульптура "Птица"', current_bid: 8500, my_bid: 8000, status: 'outbid', date: '2023-05-14' },
                { lot_id: 103, artwork: 'Фотография "Город"', current_bid: 5000, my_bid: 5000, status: 'tied', date: '2023-05-13' }
            ];
            
            const tbody = document.getElementById('bidsTableBody');
            tbody.innerHTML = '';
            
            bids.forEach(bid => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${bid.lot_id}</td>
                    <td>${bid.artwork}</td>
                    <td>${bid.current_bid} ₽</td>
                    <td>${bid.my_bid} ₽</td>
                    <td><span class="status-badge ${bid.status}">${getStatusText(bid.status)}</span></td>
                    <td>${bid.date}</td>
                    <td>
                        <button class="btn btn-primary" onclick="increaseBid(${bid.lot_id}, ${bid.current_bid + 500})">Увеличить ставку</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке ставок:', error);
        }
    }
    
    // Функция для загрузки списка наблюдения
    async function loadWatchlist() {
        try {
            // Заглушка для списка наблюдения - в реальном приложении данные будут запрашиваться с сервера
            const watchlist = [
                { lot_id: 201, artwork: 'Картина "Рассвет"', current_bid: 15000, auction: 'Весенний аукцион', time_left: '2д 5ч' },
                { lot_id: 202, artwork: 'Скульптура "Танцор"', current_bid: 9500, auction: 'Аукцион скульптур', time_left: '5д 12ч' },
                { lot_id: 203, artwork: 'Графика "Этюд"', current_bid: 3200, auction: 'Аукцион графики', time_left: '1д 1ч' }
            ];
            
            const tbody = document.getElementById('watchlistTableBody');
            tbody.innerHTML = '';
            
            watchlist.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${item.lot_id}</td>
                    <td>${item.artwork}</td>
                    <td>${item.current_bid} ₽</td>
                    <td>${item.auction}</td>
                    <td>${item.time_left}</td>
                    <td>
                        <button class="btn btn-primary" onclick="makeBid(${item.lot_id}, ${item.current_bid})">Сделать ставку</button>
                        <button class="btn btn-danger" onclick="removeFromWatchlist(${item.lot_id})">Удалить</button>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке списка наблюдения:', error);
        }
    }
    
    // Функция для загрузки транзакций
    async function loadTransactions() {
        try {
            // Заглушка для транзакций - в реальном приложении данные будут запрашиваться с сервера
            const transactions = [
                { id: 1, type: 'bid', amount: -2500, date: '2023-05-15', status: 'completed', details: 'Ставка на лот 101' },
                { id: 2, type: 'win', amount: -12500, date: '2023-05-10', status: 'completed', details: 'Выигранный лот 098' },
                { id: 3, type: 'payment', amount: -12750, date: '2023-05-12', status: 'completed', details: 'Оплата выигранного лота' },
                { id: 4, type: 'deposit', amount: 20000, date: '2023-05-01', status: 'completed', details: 'Пополнение счета' }
            ];
            
            const tbody = document.getElementById('transactionsTableBody');
            tbody.innerHTML = '';
            
            transactions.forEach(transaction => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${transaction.id}</td>
                    <td>${getTypeText(transaction.type)}</td>
                    <td>${transaction.amount > 0 ? '+' : ''}${transaction.amount} ₽</td>
                    <td>${transaction.date}</td>
                    <td><span class="status-badge ${transaction.status}">${getStatusText(transaction.status)}</span></td>
                    <td>${transaction.details}</td>
                `;
                
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке транзакций:', error);
        }
    }
    
    // Вспомогательная функция для получения текста статуса
    function getStatusText(status) {
        switch(status) {
            case 'active': return 'Активен';
            case 'upcoming': return 'Предстоящий';
            case 'completed': return 'Завершен';
            case 'pending': return 'Ожидает';
            case 'cancelled': return 'Отменен';
            case 'leading': return 'Лидирую';
            case 'outbid': return 'Перебит';
            case 'tied': return 'Равная ставка';
            default: return status;
        }
    }
    
    // Вспомогательная функция для получения текста типа
    function getTypeText(type) {
        switch(type) {
            case 'bid': return 'Ставка';
            case 'win': return 'Выигрыш';
            case 'payment': return 'Платеж';
            case 'deposit': return 'Депозит';
            default: return type;
        }
    }
    
    // Функция для отображения деталей аукциона
    window.viewAuction = function(auctionId) {
        alert(`Просмотр аукциона с ID: ${auctionId}`);
        // Здесь будет реализация просмотра аукциона
    };
    
    // Функция для увеличения ставки
    window.increaseBid = function(lotId, currentBid) {
        document.getElementById('lotId').value = lotId;
        document.getElementById('minBidAmount').textContent = (currentBid + 500).toLocaleString();
        document.getElementById('bidAmount').value = currentBid + 500;
        bidModal.style.display = 'block';
    };
    
    // Функция для размещения ставки
    window.makeBid = function(lotId, currentBid) {
        document.getElementById('lotId').value = lotId;
        document.getElementById('minBidAmount').textContent = (currentBid + 500).toLocaleString();
        document.getElementById('bidAmount').value = currentBid + 500;
        bidModal.style.display = 'block';
    };
    
    // Функция для удаления из списка наблюдения
    window.removeFromWatchlist = function(lotId) {
        if (confirm('Вы уверены, что хотите удалить этот лот из списка наблюдения?')) {
            alert(`Лот ${lotId} удален из списка наблюдения`);
            loadWatchlist(); // Обновляем список наблюдения
        }
    };
    
    // Инициализация: загружаем дашборд участника аукциона
    loadAuctionDashboard();
});