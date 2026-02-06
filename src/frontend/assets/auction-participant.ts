declare function toastSuccess(msg: string, dur?: number): void;
declare function toastError(msg: string, dur?: number): void;
declare function toastWarning(msg: string, dur?: number): void;
declare function toastInfo(msg: string, dur?: number): void;

// JavaScript для участника аукциона
document.addEventListener('DOMContentLoaded', function() {
    // Проверка аутентификации и роли
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || (userRole !== 'auction_participant' && userRole !== 'admin')) {
        toastWarning('Доступ запрещен. Требуется роль участника аукциона.');
        window.location.href = '/';
        return;
    }

    // Элементы DOM
    const logoutBtn = document.getElementById('logoutBtn') as HTMLElement;
    const dashboardContent = document.getElementById('dashboardContent');

    // Инициализация интерфейса
    function initInterface() {
        // Загрузка специфичных для аукционов данных
        loadAuctionData();
    }

    // Загрузка данных аукциона
    async function loadAuctionData() {
        try {
            const response = await fetch('/api/auctions/participating', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                }
            });

            if (response.ok) {
                const auctions = await response.json();
                
                if (dashboardContent) {
                    dashboardContent.innerHTML = `
                        <h2>Ваши аукционы</h2>
                        <div class="auction-list">
                            ${auctions.map((auction: any) => `
                                <div class="auction-item">
                                    <h3>${auction.title}</h3>
                                    <p>${auction.description}</p>
                                    <p>Дата начала: ${new Date(auction.start_date).toLocaleString()}</p>
                                    <p>Статус: ${auction.status}</p>
                                    <button class="btn btn-primary" onclick="viewAuction(${auction.auction_id})">Просмотреть</button>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных аукциона:', error);
        }
    }

    // Функция просмотра аукциона
    (window as any).viewAuction = function(auctionId: number) {
        window.location.href = `/auction/${auctionId}`;
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