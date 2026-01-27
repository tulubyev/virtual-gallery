// Компонент для отображения деталей произведения искусства
class ArtworkDetailComponent {
    container: HTMLElement;
    isVisible: boolean;
    artwork: any;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId) as HTMLElement;
        this.isVisible = false;
        this.artwork = null;
    }

    show(artwork: any) {
        this.artwork = artwork;
        this.render();
        this.container.style.display = 'block';
        this.isVisible = true;
    }

    hide() {
        this.container.style.display = 'none';
        this.isVisible = false;
    }

    render() {
        if (!this.artwork) return;

        this.container.innerHTML = `
            <div class="modal-overlay" onclick="artworkDetail.hide()">
                <div class="artwork-modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>${this.artwork.title}</h2>
                        <button class="close-btn" onclick="artworkDetail.hide()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="artwork-detail-image">
                            ${this.artwork.image_url ?
                              `<img src="${this.artwork.image_url}" alt="${this.artwork.title}">` :
                              `<div class="no-image">Изображение недоступно</div>`}
                        </div>
                        <div class="artwork-detail-info">
                            <p><strong>Автор:</strong> ${this.artwork.artist_name}</p>
                            <p><strong>Год создания:</strong> ${this.artwork.year_created || 'Неизвестно'}</p>
                            <p><strong>Техника:</strong> ${this.artwork.medium || 'Неизвестно'}</p>
                            <p><strong>Размеры:</strong> ${this.artwork.dimensions || 'Неизвестны'}</p>
                            <p><strong>Стиль:</strong> ${this.artwork.style || 'Неизвестно'}</p>
                            <p><strong>Описание:</strong> ${this.artwork.description || 'Описание отсутствует'}</p>

                            <div class="artwork-tags">
                                <strong>Теги:</strong>
                                ${(this.artwork.tags && this.artwork.tags.length > 0) ?
                                  this.artwork.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join(' ') :
                                  '<span class="no-tags">Теги отсутствуют</span>'}
                            </div>

                            <div class="artwork-actions">
                                <button class="btn btn-secondary" onclick="artworkDetail.addToFavorites(${this.artwork.artwork_id})">Добавить в избранное</button>
                                <button class="btn btn-tertiary" onclick="artworkDetail.shareArtwork(${this.artwork.artwork_id})">Поделиться</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addToFavorites(artworkId: number) {
        console.log(`Добавление произведения ${artworkId} в избранное`);
        // Здесь будет вызов API для добавления в избранное
        alert('Произведение добавлено в избранное!');
    }

    shareArtwork(artworkId: number) {
        console.log(`Поделиться произведением ${artworkId}`);
        // Здесь будет реализация функции "поделиться"
        if (navigator.share) {
            navigator.share({
                title: this.artwork.title,
                text: `Посмотрите это удивительное произведение искусства: ${this.artwork.title} от ${this.artwork.artist_name}`,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Резервный вариант для браузеров, не поддерживающих Web Share API
            const shareUrl = `${window.location.origin}/artwork/${artworkId}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Ссылка скопирована в буфер обмена!');
            });
        }
    }
}

// Добавляем стили для модального окна в CSS
const modalStyles = `
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.artwork-modal {
    background: white;
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
}

.modal-header h2 {
    margin: 0;
    color: var(--primary-color);
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
}

.close-btn:hover {
    color: var(--accent-color);
}

.modal-body {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
}

@media (min-width: 768px) {
    .modal-body {
        flex-direction: row;
    }
}

.artwork-detail-image {
    flex: 1;
    margin-bottom: 1.5rem;
}

.artwork-detail-image img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.no-image {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    border-radius: var(--border-radius);
    color: #666;
    font-style: italic;
}

.artwork-detail-info {
    flex: 1;
    min-width: 300px;
}

.artwork-tags {
    margin: 1rem 0;
}

.tag {
    display: inline-block;
    background-color: var(--secondary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.no-tags {
    color: #999;
    font-style: italic;
}

.artwork-actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: white;
}

.btn-secondary:hover {
    background-color: #2980b9;
}

.btn-tertiary {
    background-color: #95a5a6;
    color: white;
}

.btn-tertiary:hover {
    background-color: #7f8c8d;
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.innerText = modalStyles;
document.head.appendChild(styleSheet);

// Глобальная переменная для компонента деталей произведения
declare global {
    interface Window {
        artworkDetail: ArtworkDetailComponent;
        createArtworkCard: (artwork: any) => HTMLElement;
    }
}

let artworkDetail: ArtworkDetailComponent;

// Инициализация компонента после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для модального окна
    const modalContainer = document.createElement('div');
    modalContainer.id = 'artworkModal';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);

    // Инициализируем компонент
    artworkDetail = new ArtworkDetailComponent('artworkModal');
    window.artworkDetail = artworkDetail;

    // Обновляем функцию createArtworkCard в основном скрипте, чтобы добавить возможность просмотра деталей
    const originalCreateArtworkCard = window.createArtworkCard || function(artwork: any) {
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
                <button class="btn-view-details" onclick="artworkDetail.show(${JSON.stringify(artwork).replace(/"/g, '&quot;')})">Подробнее</button>
            </div>
        `;

        return card;
    };

    // Обновляем глобальную функцию
    window.createArtworkCard = function(artwork: any) {
        const card = originalCreateArtworkCard(artwork);

        // Находим кнопку "Подробнее" и добавляем обработчик
        const button = card.querySelector('.btn-view-details');
        if (!button) {
            const infoDiv = card.querySelector('.artwork-info') as HTMLElement;
            const buttonHTML = '<button class="btn btn-secondary btn-view-details" style="width:100%; margin-top: 1rem;">Подробнее</button>';
            infoDiv.insertAdjacentHTML('beforeend', buttonHTML);

            const newButton = card.querySelector('.btn-view-details') as HTMLElement;
            newButton.onclick = () => artworkDetail.show(artwork);
        }

        return card;
    };
});