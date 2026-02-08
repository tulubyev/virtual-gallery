        lucide.createIcons();

        // Load Dashboard Stats
        async function loadDashboardStats() {
            try {
                const response = await fetch('/api/stats/dashboard');
                const stats = await response.json();
                
                document.getElementById('statCollections').textContent = stats.collections || 0;
                document.getElementById('statRooms').textContent = stats.rooms || 0;
                document.getElementById('statArtworks').textContent = stats.artworks || 0;
                document.getElementById('statPending').textContent = stats.pending || 0;
                
                // Update pending badge
                const pendingBadge = document.getElementById('pendingBadge');
                if (pendingBadge && stats.pending > 0) {
                    pendingBadge.textContent = stats.pending;
                    pendingBadge.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Load stats error:', error);
            }
        }

        // Switch to tab helper
        function switchToTab(tabName) {
            const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
            if (tabBtn) tabBtn.click();
        }

        // Quick action handlers
        document.getElementById('quickNewCollection')?.addEventListener('click', () => {
            switchToTab('collections');
            setTimeout(() => {
                document.getElementById('newCollectionModal')?.classList.remove('hidden');
            }, 200);
        });

        document.getElementById('quickGalleryBuilder')?.addEventListener('click', () => {
            switchToTab('gallery');
        });

        document.getElementById('quickAICuration')?.addEventListener('click', () => {
            switchToTab('ai-curation');
        });

        document.getElementById('quickModeration')?.addEventListener('click', () => {
            switchToTab('digitized');
            setTimeout(() => {
                const filter = document.getElementById('digitizedStatusFilter');
                if (filter) {
                    filter.value = 'pending';
                    filter.dispatchEvent(new Event('change'));
                }
            }, 200);
        });

        // Load stats on page load
        loadDashboardStats();

        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        const menuBtn = document.getElementById('mobileMenuBtn');

        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        }

        menuBtn?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        });

        overlay?.addEventListener('click', closeSidebar);

        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            const sb = document.getElementById('sidebar');
            sb.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sb.classList.contains('collapsed') ? '1' : '0');
            lucide.createIcons();
        });

        if (localStorage.getItem('sidebarCollapsed') === '1') {
            document.getElementById('sidebar')?.classList.add('collapsed');
        }

        document.getElementById('roomsPanelToggle')?.addEventListener('click', () => {
            const panel = document.getElementById('roomsPanel');
            panel.classList.add('collapsed');
            document.getElementById('roomsPanelExpand')?.classList.remove('hidden');
            localStorage.setItem('roomsPanelCollapsed', '1');
        });

        document.getElementById('roomsPanelExpand')?.addEventListener('click', () => {
            const panel = document.getElementById('roomsPanel');
            panel.classList.remove('collapsed');
            document.getElementById('roomsPanelExpand')?.classList.add('hidden');
            localStorage.setItem('roomsPanelCollapsed', '0');
        });

        if (localStorage.getItem('roomsPanelCollapsed') === '1') {
            document.getElementById('roomsPanel')?.classList.add('collapsed');
            document.getElementById('roomsPanelExpand')?.classList.remove('hidden');
        }

        document.querySelectorAll('.sidebar-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                if (!tab) return;

                document.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(tab).classList.add('active');
                lucide.createIcons();
                closeSidebar();
            });
        });

        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            window.location.href = '/';
        });

        // Digitized Artworks Management
        let currentArtwork = null;
        let digitizedArtworks = [];
        let allArtworks = [];
        let searchQuery = '';

        async function loadDigitizedArtworks(status = '') {
            const grid = document.getElementById('digitizedGrid');
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-gray-500">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <i data-lucide="loader-2" class="w-8 h-8 text-gray-400 animate-spin"></i>
                    </div>
                    <p>Загрузка произведений...</p>
                </div>
            `;
            lucide.createIcons();

            try {
                let url = '/api/artworks?limit=100';
                if (status) url += `&status=${status}`;
                if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch artworks');
                
                const data = await response.json();
                allArtworks = data.artworks || [];
                digitizedArtworks = allArtworks.map(a => ({
                    ...a,
                    front_url: a.image_url,
                    thumbnail_url: a.thumbnail_url,
                    period: a.epoch
                }));
                renderDigitizedArtworks();
                updateStats();
            } catch (error) {
                console.error('Error loading artworks:', error);
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="alert-circle" class="w-8 h-8 text-red-400"></i>
                        </div>
                        <p>Ошибка загрузки данных</p>
                        <button onclick="loadDigitizedArtworks()" class="mt-4 text-purple-600 hover:underline">Попробовать снова</button>
                    </div>
                `;
                lucide.createIcons();
            }
        }
        
        // Search functionality
        let searchTimeout;
        document.getElementById('artworkSearchInput')?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchQuery = e.target.value.trim();
                loadDigitizedArtworks(document.getElementById('digitizedStatusFilter').value);
            }, 300);
        });

        function renderDigitizedArtworks() {
            const grid = document.getElementById('digitizedGrid');
            
            if (digitizedArtworks.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i data-lucide="image-off" class="w-8 h-8 text-gray-400"></i>
                        </div>
                        <p>Нет оцифрованных работ</p>
                    </div>
                `;
                lucide.createIcons();
                return;
            }

            grid.innerHTML = digitizedArtworks.map(artwork => `
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="openArtworkModal(${artwork.id})">
                    <div class="relative bg-gray-100" style="aspect-ratio: 4/3" data-img-section="curator_artworks">
                        <img src="${artwork.front_watermarked_url || artwork.front_url}" alt="${artwork.title}" class="w-full h-full object-cover">
                        <span class="absolute top-3 right-3 ${getStatusBadgeClass(artwork.status)} px-2 py-1 rounded-full text-xs font-medium">
                            ${getStatusLabel(artwork.status)}
                        </span>
                        ${artwork.verification_hash ? '<span class="absolute top-3 left-3 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"><i data-lucide="shield-check" class="w-3 h-3"></i>Protected</span>' : ''}
                    </div>
                    <div class="p-4">
                        <h4 class="font-semibold text-gray-900 truncate">${artwork.title || 'Без названия'}</h4>
                        <p class="text-sm text-gray-500">${artwork.artist || 'Неизвестный художник'}</p>
                        <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
                            ${artwork.style ? `<span class="bg-gray-100 px-2 py-0.5 rounded">${artwork.style}</span>` : ''}
                            ${artwork.period ? `<span class="bg-gray-100 px-2 py-0.5 rounded">${artwork.period}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function getStatusBadgeClass(status) {
            const classes = {
                'pending': 'bg-amber-100 text-amber-700',
                'pending_review': 'bg-amber-100 text-amber-700',
                'approved': 'bg-green-100 text-green-700',
                'rejected': 'bg-red-100 text-red-700',
                'published': 'bg-blue-100 text-blue-700',
                'active': 'bg-green-100 text-green-700',
                'needs_revision': 'bg-orange-100 text-orange-700'
            };
            return classes[status] || 'bg-gray-100 text-gray-700';
        }

        function getStatusLabel(status) {
            const labels = {
                'pending': 'На проверке',
                'pending_review': 'На проверке',
                'approved': 'Одобрено',
                'rejected': 'Отклонено',
                'published': 'Опубликовано',
                'active': 'Активно',
                'needs_revision': 'Требует правок'
            };
            return labels[status] || status;
        }

        // Image Zoom/Pan functionality
        const imageViewers = {
            front: { scale: 1, panX: 0, panY: 0, isDragging: false, startX: 0, startY: 0 },
            back: { scale: 1, panX: 0, panY: 0, isDragging: false, startX: 0, startY: 0 }
        };
        const MIN_SCALE = 0.5;
        const MAX_SCALE = 5;
        const SCALE_STEP = 0.25;

        function updateImageTransform(type) {
            const viewer = imageViewers[type];
            const img = document.getElementById(type === 'front' ? 'modalFrontImage' : 'modalBackImage');
            const levelEl = document.getElementById(type === 'front' ? 'zoomLevelFront' : 'zoomLevelBack');
            
            if (img) {
                img.style.transform = `translate(${viewer.panX}px, ${viewer.panY}px) scale(${viewer.scale})`;
            }
            if (levelEl) {
                levelEl.textContent = Math.round(viewer.scale * 100) + '%';
            }
        }

        function zoomImage(type, delta) {
            const viewer = imageViewers[type];
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, viewer.scale + delta));
            
            if (newScale !== viewer.scale) {
                const scaleRatio = newScale / viewer.scale;
                viewer.panX *= scaleRatio;
                viewer.panY *= scaleRatio;
                viewer.scale = newScale;
                updateImageTransform(type);
            }
        }

        function resetImageView(type) {
            imageViewers[type] = { scale: 1, panX: 0, panY: 0, isDragging: false, startX: 0, startY: 0 };
            updateImageTransform(type);
        }

        function setupImageViewer(type) {
            const container = document.getElementById(type === 'front' ? 'frontImageContainer' : 'backImageContainer');
            if (!container) return;

            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
                zoomImage(type, delta);
            }, { passive: false });

            container.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                const viewer = imageViewers[type];
                viewer.isDragging = true;
                viewer.startX = e.clientX - viewer.panX;
                viewer.startY = e.clientY - viewer.panY;
                container.style.cursor = 'grabbing';
            });

            container.addEventListener('mousemove', (e) => {
                const viewer = imageViewers[type];
                if (!viewer.isDragging) return;
                viewer.panX = e.clientX - viewer.startX;
                viewer.panY = e.clientY - viewer.startY;
                updateImageTransform(type);
            });

            container.addEventListener('mouseup', () => {
                imageViewers[type].isDragging = false;
                container.style.cursor = 'grab';
            });

            container.addEventListener('mouseleave', () => {
                imageViewers[type].isDragging = false;
                container.style.cursor = 'grab';
            });

            // Touch support
            let lastTouchDistance = 0;
            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    const viewer = imageViewers[type];
                    viewer.isDragging = true;
                    viewer.startX = e.touches[0].clientX - viewer.panX;
                    viewer.startY = e.touches[0].clientY - viewer.panY;
                } else if (e.touches.length === 2) {
                    lastTouchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            }, { passive: true });

            container.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const viewer = imageViewers[type];
                if (e.touches.length === 1 && viewer.isDragging) {
                    viewer.panX = e.touches[0].clientX - viewer.startX;
                    viewer.panY = e.touches[0].clientY - viewer.startY;
                    updateImageTransform(type);
                } else if (e.touches.length === 2) {
                    const newDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    const delta = (newDistance - lastTouchDistance) * 0.01;
                    zoomImage(type, delta);
                    lastTouchDistance = newDistance;
                }
            }, { passive: false });

            container.addEventListener('touchend', () => {
                imageViewers[type].isDragging = false;
            });
        }

        // Initialize zoom controls
        document.addEventListener('DOMContentLoaded', () => {
            setupImageViewer('front');
            setupImageViewer('back');

            document.getElementById('zoomInFront')?.addEventListener('click', () => zoomImage('front', SCALE_STEP));
            document.getElementById('zoomOutFront')?.addEventListener('click', () => zoomImage('front', -SCALE_STEP));
            document.getElementById('resetZoomFront')?.addEventListener('click', () => resetImageView('front'));

            document.getElementById('zoomInBack')?.addEventListener('click', () => zoomImage('back', SCALE_STEP));
            document.getElementById('zoomOutBack')?.addEventListener('click', () => zoomImage('back', -SCALE_STEP));
            document.getElementById('resetZoomBack')?.addEventListener('click', () => resetImageView('back'));
        });

        function resetAllImageViewers() {
            resetImageView('front');
            resetImageView('back');
        }

        async function updateStats() {
            try {
                const response = await fetch('/api/artworks/stats');
                const counts = await response.json();
                
                document.getElementById('pendingCount').textContent = counts.pending || 0;
                document.getElementById('approvedCount').textContent = counts.approved || 0;
                document.getElementById('rejectedCount').textContent = counts.rejected || 0;
                document.getElementById('publishedCount').textContent = counts.published || 0;
                
                const badge = document.getElementById('pendingBadge');
                if (counts.pending > 0) {
                    badge.textContent = counts.pending;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        async function openArtworkModal(artworkId) {
            const artwork = digitizedArtworks.find(a => a.id === artworkId);
            if (!artwork) {
                console.error('Artwork not found:', artworkId);
                return;
            }
            
            currentArtwork = artwork;
            
            document.getElementById('modalTitle').textContent = artwork.title || 'Детали работы';
            
            const frontImage = artwork.front_watermarked_url || artwork.front_url || artwork.image_url;
            document.getElementById('modalFrontImage').src = frontImage || '';
            document.getElementById('modalBackImage').src = artwork.back_watermarked_url || artwork.back_url || '';
            
            document.getElementById('modalArtworkTitle').value = artwork.title || '';
            document.getElementById('modalArtworkArtist').value = artwork.artist || '';
            document.getElementById('modalArtworkStyle').value = artwork.style || '';
            document.getElementById('modalArtworkPeriod').value = artwork.period || artwork.epoch || '';
            document.getElementById('modalArtworkTechnique').value = artwork.technique || '';
            document.getElementById('modalCuratorNotes').value = artwork.curator_notes || '';
            
            if (document.getElementById('modalArtworkYear')) {
                document.getElementById('modalArtworkYear').value = artwork.year_created || '';
            }
            if (document.getElementById('modalArtworkCountry')) {
                document.getElementById('modalArtworkCountry').value = artwork.country || '';
            }
            if (document.getElementById('modalArtworkDescription')) {
                document.getElementById('modalArtworkDescription').value = artwork.description || '';
            }
            
            const analysis = artwork.ai_analysis || {};
            let analysisHtml = '';
            if (analysis.front) {
                analysisHtml += `<p><strong>Лицевая сторона:</strong> ${analysis.front.description || 'Нет описания'}</p>`;
            }
            if (analysis.back && analysis.back.provenance) {
                analysisHtml += `<p class="mt-2"><strong>Провенанс:</strong> ${analysis.back.provenance}</p>`;
            }
            const aiAnalysisEl = document.getElementById('modalAIAnalysis');
            if (aiAnalysisEl) aiAnalysisEl.innerHTML = analysisHtml || 'AI-анализ недоступен';
            
            const visibleEl = document.querySelector('#visibleWatermark span');
            const invisibleEl = document.querySelector('#invisibleWatermark span');
            if (visibleEl) visibleEl.className = `w-3 h-3 rounded-full ${artwork.visible_watermark_applied ? 'bg-green-500' : 'bg-gray-300'}`;
            if (invisibleEl) invisibleEl.className = `w-3 h-3 rounded-full ${artwork.invisible_watermark_applied ? 'bg-green-500' : 'bg-gray-300'}`;
            const hashEl = document.getElementById('modalVerificationHash');
            if (hashEl) hashEl.textContent = artwork.verification_hash || '-';
            
            updateButtonStates(artwork.status);
            
            const statusBadge = document.getElementById('modalStatusBadge');
            if (statusBadge) {
                statusBadge.className = `px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(artwork.status)}`;
                statusBadge.textContent = getStatusLabel(artwork.status);
            }
            
            document.getElementById('artworkModal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeModal() {
            document.getElementById('artworkModal').classList.add('hidden');
            currentArtwork = null;
            resetAllImageViewers();
        }

        function updateButtonStates(status) {
            const approveBtn = document.getElementById('approveArtwork');
            const rejectBtn = document.getElementById('rejectArtwork');
            const publishBtn = document.getElementById('publishArtwork');
            const resetBtn = document.getElementById('resetArtwork');

            if (approveBtn) {
                approveBtn.disabled = (status === 'approved' || status === 'published');
            }
            if (rejectBtn) {
                rejectBtn.disabled = (status === 'rejected' || status === 'published');
            }
            if (publishBtn) {
                publishBtn.disabled = (status !== 'approved');
                if (status !== 'approved') {
                    publishBtn.title = 'Сначала нужно одобрить работу';
                } else {
                    publishBtn.title = '';
                }
            }
            if (resetBtn) {
                const canReset = (status === 'approved' || status === 'rejected' || status === 'published');
                resetBtn.classList.toggle('hidden', !canReset);
            }
        }

        function setButtonLoading(btn, loading) {
            if (!btn) return;
            btn.disabled = loading;
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');
            if (loading) {
                if (icon) { icon.setAttribute('data-lucide', 'loader-2'); icon.classList.add('animate-spin'); }
                if (span) span.textContent = '...';
                lucide.createIcons();
            }
        }

        const btnOriginalContent = {
            'approved': { icon: 'check', text: 'Одобрить' },
            'rejected': { icon: 'x', text: 'Отклонить' },
            'published': { icon: 'globe', text: 'Опубликовать' },
            'pending': { icon: 'undo-2', text: 'Вернуть' }
        };

        function restoreButton(btn, newStatus) {
            if (!btn) return;
            const orig = btnOriginalContent[newStatus];
            if (orig) {
                const icon = btn.querySelector('i');
                const span = btn.querySelector('span');
                if (icon) { icon.setAttribute('data-lucide', orig.icon); icon.classList.remove('animate-spin'); }
                if (span) span.textContent = orig.text;
                lucide.createIcons();
            }
        }

        async function changeStatus(newStatus, extraData = {}) {
            if (!currentArtwork) return;

            const btnMap = {
                'approved': document.getElementById('approveArtwork'),
                'rejected': document.getElementById('rejectArtwork'),
                'published': document.getElementById('publishArtwork'),
                'pending': document.getElementById('resetArtwork')
            };
            const btn = btnMap[newStatus];
            setButtonLoading(btn, true);

            try {
                const body = { status: newStatus, ...extraData };
                const response = await fetch(`/api/artworks/${currentArtwork.id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Request failed');

                currentArtwork.status = newStatus;

                restoreButton(btn, newStatus);
                updateButtonStates(newStatus);

                const statusBadge = document.getElementById('modalStatusBadge');
                if (statusBadge) {
                    statusBadge.className = `px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(newStatus)}`;
                    statusBadge.textContent = getStatusLabel(newStatus);
                }

                const labels = { 'approved': 'Работа одобрена', 'rejected': 'Работа отклонена', 'published': 'Работа опубликована!', 'pending': 'Статус сброшен' };
                toastSuccess(labels[newStatus] || 'Статус обновлен');

                loadDigitizedArtworks(document.getElementById('digitizedStatusFilter').value);
            } catch (error) {
                console.error(`Status change error (${newStatus}):`, error);
                toastError('Ошибка: ' + error.message);
                restoreButton(btn, newStatus);
                updateButtonStates(currentArtwork.status);
            }
        }

        async function approveArtwork() {
            if (!currentArtwork || document.getElementById('approveArtwork')?.disabled) return;
            const notes = document.getElementById('modalCuratorNotes')?.value || '';
            await changeStatus('approved', { curator_notes: notes });
        }

        async function rejectArtwork() {
            if (!currentArtwork || document.getElementById('rejectArtwork')?.disabled) return;
            const reason = prompt('Укажите причину отклонения:');
            if (!reason) return;
            await changeStatus('rejected', { rejection_reason: reason });
        }

        async function publishArtwork() {
            if (!currentArtwork || document.getElementById('publishArtwork')?.disabled) return;
            if (currentArtwork.status !== 'approved') {
                toastWarning('Для публикации работа должна быть сначала одобрена');
                return;
            }
            if (!confirm('Опубликовать это произведение? Оно станет доступно в 3D галерее.')) return;
            await changeStatus('published');
        }

        async function resetArtwork() {
            if (!currentArtwork) return;
            if (!confirm('Вернуть работу в статус "На рассмотрении"?')) return;
            await changeStatus('pending');
        }

        async function saveChanges() {
            if (!currentArtwork) return;
            const btn = document.getElementById('saveChanges');
            setButtonLoading(btn, true);

            const updates = {
                title: document.getElementById('modalArtworkTitle')?.value,
                artist: document.getElementById('modalArtworkArtist')?.value,
                style: document.getElementById('modalArtworkStyle')?.value,
                period: document.getElementById('modalArtworkPeriod')?.value,
                technique: document.getElementById('modalArtworkTechnique')?.value || '',
                curator_notes: document.getElementById('modalCuratorNotes')?.value || '',
                year: document.getElementById('modalArtworkYear')?.value || null,
                country: document.getElementById('modalArtworkCountry')?.value || '',
                description: document.getElementById('modalArtworkDescription')?.value || ''
            };

            try {
                const response = await fetch(`/api/artworks/${currentArtwork.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to save');

                toastSuccess('Изменения сохранены');
                loadDigitizedArtworks(document.getElementById('digitizedStatusFilter').value);
            } catch (error) {
                console.error('Save error:', error);
                toastError('Ошибка при сохранении: ' + error.message);
            } finally {
                if (btn) {
                    btn.disabled = false;
                    const icon = btn.querySelector('i');
                    const span = btn.querySelector('span');
                    if (icon) { icon.setAttribute('data-lucide', 'save'); icon.classList.remove('animate-spin'); }
                    if (span) span.textContent = 'Сохранить';
                    lucide.createIcons();
                }
            }
        }

        document.getElementById('closeModal')?.addEventListener('click', closeModal);
        document.getElementById('approveArtwork')?.addEventListener('click', approveArtwork);
        document.getElementById('rejectArtwork')?.addEventListener('click', rejectArtwork);
        document.getElementById('publishArtwork')?.addEventListener('click', publishArtwork);
        document.getElementById('resetArtwork')?.addEventListener('click', resetArtwork);
        document.getElementById('saveChanges')?.addEventListener('click', saveChanges);
        document.getElementById('refreshDigitized')?.addEventListener('click', () => {
            loadDigitizedArtworks(document.getElementById('digitizedStatusFilter').value);
        });
        document.getElementById('digitizedStatusFilter')?.addEventListener('change', (e) => {
            loadDigitizedArtworks(e.target.value);
        });
        
        document.getElementById('artworkModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'artworkModal') closeModal();
        });

        async function fetchImageAsBlob(url) {
            const response = await fetch(url);
            return await response.blob();
        }

        document.getElementById('protectionOpacity')?.addEventListener('input', (e) => {
            document.getElementById('opacityValue').textContent = e.target.value + '%';
        });

        async function applyWatermark(type) {
            if (!currentArtwork) return;
            
            const btn = document.getElementById(`apply${type}`);
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> ...';
            btn.disabled = true;
            
            try {
                const imageUrl = currentArtwork.front_url || currentArtwork.image_url;
                if (!imageUrl) throw new Error('No image URL available');
                
                const owner = document.getElementById('protectionOwner')?.value || 'VirtGal.ru';
                const text = document.getElementById('protectionText')?.value || 'VirtGal.ru';
                const position = document.getElementById('protectionPosition')?.value || 'bottom-right';
                const opacity = (document.getElementById('protectionOpacity')?.value || 30) / 100;
                const metadata = document.getElementById('protectionMetadata')?.value || '';
                
                let protectionType;
                switch(type) {
                    case 'VisibleWatermark': protectionType = 'visible'; break;
                    case 'InvisibleWatermark': protectionType = 'invisible'; break;
                    case 'Steganography': protectionType = 'steganography'; break;
                    case 'FullProtection': protectionType = 'full'; break;
                }
                
                const response = await fetch('/api/watermark/apply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imageUrl,
                        artworkId: currentArtwork.id,
                        type: protectionType,
                        owner,
                        text,
                        position,
                        opacity,
                        title: currentArtwork.title || '',
                        artist: currentArtwork.artist || '',
                        metadata
                    })
                });
                
                if (!response.ok) throw new Error('Failed to apply protection');
                
                const result = await response.json();
                if (!result.success) throw new Error(result.error || 'Unknown error');
                
                document.getElementById('modalFrontImage').src = result.image;
                
                updateProtectionStatus(type);
                toastSuccess('Защита применена успешно! Изображение обновлено.');
            } catch (error) {
                console.error('Protection error:', error);
                toastError('Ошибка при применении защиты: ' + error.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            }
        }

        function updateProtectionStatus(type) {
            const statusMap = {
                'VisibleWatermark': 'visibleWatermarkStatus',
                'InvisibleWatermark': 'invisibleWatermarkStatus',
                'Steganography': 'steganographyStatus',
                'FullProtection': ['visibleWatermarkStatus', 'invisibleWatermarkStatus', 'steganographyStatus']
            };
            
            const ids = Array.isArray(statusMap[type]) ? statusMap[type] : [statusMap[type]];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.querySelector('span').classList.remove('bg-gray-300');
                    el.querySelector('span').classList.add('bg-green-500');
                }
            });
        }

        function closeVerifyModal() {
            const modal = document.getElementById('verifyUploadModal');
            modal.classList.add('hidden');
            document.getElementById('verifyModalImage').src = '';
            document.getElementById('verifyModalResult').classList.add('hidden');
            document.getElementById('verifyModalLoading').classList.add('hidden');
            document.getElementById('verifyModalFileName').textContent = '';
        }

        function openRoomSettingsModal() {
            const activeRoomId = galleryConfig.currentRoom;
            if (!activeRoomId || !galleryConfig) return;

            const room = galleryConfig.rooms.find(r => r.id === activeRoomId);
            if (room) {
                const roomNameInput = document.getElementById('roomName');
                const roomThemeInput = document.getElementById('roomTheme');
                const roomWidthInput = document.getElementById('roomWidth');
                const roomDepthInput = document.getElementById('roomDepth');
                const roomHeightInput = document.getElementById('roomHeight');
                const wallColorInput = document.getElementById('wallColor');
                const wallColorHexInput = document.getElementById('wallColorHex');
                const roomLightingInput = document.getElementById('roomLighting');

                if (roomNameInput) roomNameInput.value = room.name || '';
                if (roomThemeInput) roomThemeInput.value = room.theme || 'classic';
                if (roomWidthInput) roomWidthInput.value = room.width || 20;
                if (roomDepthInput) roomDepthInput.value = room.depth || 25;
                if (roomHeightInput) roomHeightInput.value = room.height || 6;
                if (wallColorInput) wallColorInput.value = room.wallColor || '#f5f0e6';
                if (wallColorHexInput) wallColorHexInput.value = room.wallColor || '#f5f0e6';
                if (roomLightingInput) roomLightingInput.value = room.lighting || 70;
            }

            document.getElementById('roomSettingsModal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeRoomSettingsModal() {
            document.getElementById('roomSettingsModal').classList.add('hidden');
        }

        document.getElementById('saveRoomSettings')?.addEventListener('click', () => {
            const activeRoomId = galleryConfig.currentRoom;
            if (!activeRoomId || !galleryConfig) return;

            const room = galleryConfig.rooms.find(r => r.id === activeRoomId);
            if (room) {
                room.name = document.getElementById('roomName').value;
                room.theme = document.getElementById('roomTheme').value;
                room.width = parseInt(document.getElementById('roomWidth').value);
                room.depth = parseInt(document.getElementById('roomDepth').value);
                room.height = parseInt(document.getElementById('roomHeight').value);
                room.wallColor = document.getElementById('wallColor').value;
                room.lighting = parseInt(document.getElementById('roomLighting').value);
                
                const roomItem = document.querySelector(`.room-item[data-room="${activeRoomId}"]`);
                if (roomItem) {
                    const nameEl = roomItem.querySelector('p.font-medium');
                    if (nameEl) nameEl.textContent = room.name;
                }
                
                toastSuccess('Настройки зала применены локально. Не забудьте сохранить конфигурацию галереи.');
                closeRoomSettingsModal();
                renderRoomLayout();
            }
        });

        document.getElementById('wallColor')?.addEventListener('input', (e) => {
            document.getElementById('wallColorHex').value = e.target.value;
        });

        document.getElementById('wallColorHex')?.addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('wallColor').value = e.target.value;
            }
        });

        async function openVerifyModal(file) {
            const modal = document.getElementById('verifyUploadModal');
            const img = document.getElementById('verifyModalImage');
            const loading = document.getElementById('verifyModalLoading');
            const resultDiv = document.getElementById('verifyModalResult');
            const summaryDiv = document.getElementById('verifyModalSummary');
            const dataDiv = document.getElementById('verifyModalData');
            const fileNameDiv = document.getElementById('verifyModalFileName');

            resultDiv.classList.add('hidden');
            loading.classList.remove('hidden');
            modal.classList.remove('hidden');
            lucide.createIcons();

            const reader = new FileReader();
            reader.onload = (e) => { img.src = e.target.result; };
            reader.readAsDataURL(file);
            fileNameDiv.textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + ' КБ)';

            try {
                const formData = new FormData();
                formData.append('image', file, file.name);

                const response = await fetch('/api/watermark/verify', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                loading.classList.add('hidden');
                resultDiv.classList.remove('hidden');
                dataDiv.textContent = JSON.stringify(result, null, 2);

                let html = '';
                if (result.isProtected) {
                    html = '<div class="flex items-center gap-2 text-green-700 font-medium text-sm mb-2"><i data-lucide="shield-check" class="w-5 h-5"></i> Изображение защищено</div>';
                    html += '<ul class="space-y-1.5 text-sm text-gray-600">';
                    if (result.invisibleWatermark?.found) {
                        html += '<li class="flex items-center gap-2"><span class="w-2 h-2 bg-purple-500 rounded-full"></span> Невидимый водяной знак</li>';
                    }
                    if (result.steganography?.found) {
                        html += '<li class="flex items-center gap-2"><span class="w-2 h-2 bg-indigo-500 rounded-full"></span> Стеганография</li>';
                        if (result.steganography.metadata) {
                            const meta = result.steganography.metadata;
                            if (meta.owner) html += '<li class="ml-5 text-xs text-gray-500">Владелец: ' + meta.owner + '</li>';
                            if (meta.id) html += '<li class="ml-5 text-xs text-gray-500">ID: ' + meta.id + '</li>';
                            if (meta.timestamp) html += '<li class="ml-5 text-xs text-gray-500">Дата: ' + new Date(meta.timestamp).toLocaleString('ru-RU') + '</li>';
                            if (meta.hash) html += '<li class="ml-5 text-xs text-gray-500">Hash: ' + meta.hash + '</li>';
                        }
                    }
                    html += '</ul>';
                } else {
                    html = '<div class="flex items-center gap-2 text-amber-600 font-medium text-sm mb-2"><i data-lucide="alert-triangle" class="w-5 h-5"></i> Защита не обнаружена</div>';
                    html += '<p class="text-sm text-gray-500">Изображение не содержит скрытых меток защиты или они были удалены.</p>';
                }

                summaryDiv.innerHTML = html;
                lucide.createIcons();
            } catch (error) {
                loading.classList.add('hidden');
                resultDiv.classList.remove('hidden');
                summaryDiv.innerHTML = '<div class="flex items-center gap-2 text-red-600 font-medium text-sm"><i data-lucide="alert-circle" class="w-5 h-5"></i> Ошибка: ' + error.message + '</div>';
                lucide.createIcons();
            }
        }

        async function verifyProtection(imageBlob = null) {
            const btn = document.getElementById('verifyProtection');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> ...';
            btn.disabled = true;
            
            try {
                let blobToVerify = imageBlob;
                
                if (!blobToVerify) {
                    const imgSrc = document.getElementById('modalFrontImage')?.src;
                    if (!imgSrc) throw new Error('Нет изображения для проверки');
                    
                    if (imgSrc.startsWith('data:')) {
                        const res = await fetch(imgSrc);
                        blobToVerify = await res.blob();
                    } else if (imgSrc.startsWith('blob:')) {
                        const res = await fetch(imgSrc);
                        blobToVerify = await res.blob();
                    } else {
                        blobToVerify = await fetchImageAsBlob(imgSrc);
                    }
                }
                
                const formData = new FormData();
                formData.append('image', blobToVerify, 'artwork.png');
                
                const response = await fetch('/api/watermark/verify', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                const resultDiv = document.getElementById('protectionResult');
                const resultData = document.getElementById('protectionResultData');
                const resultSummary = document.getElementById('protectionResultSummary');
                
                resultDiv.classList.remove('hidden');
                resultData.textContent = JSON.stringify(result, null, 2);
                
                let summaryHtml = '';
                if (result.isProtected) {
                    summaryHtml = '<div class="flex items-center gap-2 text-green-700 font-medium"><i data-lucide="shield-check" class="w-4 h-4"></i> Изображение защищено</div>';
                    summaryHtml += '<ul class="mt-2 space-y-1 text-gray-600">';
                    
                    if (result.invisibleWatermark?.found) {
                        summaryHtml += '<li class="flex items-center gap-1"><span class="w-2 h-2 bg-purple-500 rounded-full"></span> Невидимый водяной знак</li>';
                        updateProtectionStatus('InvisibleWatermark');
                    }
                    if (result.steganography?.found) {
                        summaryHtml += '<li class="flex items-center gap-1"><span class="w-2 h-2 bg-indigo-500 rounded-full"></span> Стеганография</li>';
                        updateProtectionStatus('Steganography');
                        if (result.steganography.metadata) {
                            const meta = result.steganography.metadata;
                            if (meta.owner) summaryHtml += `<li class="ml-4 text-xs">Владелец: ${meta.owner}</li>`;
                            if (meta.id) summaryHtml += `<li class="ml-4 text-xs">ID: ${meta.id}</li>`;
                            if (meta.hash) {
                                document.getElementById('modalVerificationHash').textContent = meta.hash.substring(0, 16) + '...';
                            }
                        }
                    }
                    summaryHtml += '</ul>';
                } else {
                    summaryHtml = '<div class="flex items-center gap-2 text-amber-600 font-medium"><i data-lucide="alert-triangle" class="w-4 h-4"></i> Защита не обнаружена</div>';
                    summaryHtml += '<p class="mt-1 text-xs text-gray-500">Изображение не содержит скрытых меток защиты или они были удалены.</p>';
                }
                
                resultSummary.innerHTML = summaryHtml;
                lucide.createIcons();
            } catch (error) {
                console.error('Verify error:', error);
                toastError('Ошибка при проверке: ' + error.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            }
        }

        document.getElementById('applyVisibleWatermark')?.addEventListener('click', () => applyWatermark('VisibleWatermark'));
        document.getElementById('applyInvisibleWatermark')?.addEventListener('click', () => applyWatermark('InvisibleWatermark'));
        document.getElementById('applySteganography')?.addEventListener('click', () => applyWatermark('Steganography'));
        document.getElementById('applyFullProtection')?.addEventListener('click', () => applyWatermark('FullProtection'));
        document.getElementById('verifyProtection')?.addEventListener('click', () => verifyProtection());
        
        document.getElementById('verifyFileInput')?.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await openVerifyModal(file);
                e.target.value = '';
            }
        });
        
        document.getElementById('closeProtectionResult')?.addEventListener('click', () => {
            document.getElementById('protectionResult')?.classList.add('hidden');
        });

        document.querySelector('[data-tab="digitized"]')?.addEventListener('click', () => {
            setTimeout(() => loadDigitizedArtworks(), 100);
        });

        // Collections - Load Approved Artworks
        let collectionArtworks = [];
        let currentAssignArtwork = null;

        async function loadCollectionArtworks(status = 'approved') {
            const grid = document.getElementById('collectionArtworksGrid');
            grid.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    <i data-lucide="loader-2" class="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin"></i>
                    <p>Загрузка произведений...</p>
                </div>
            `;
            lucide.createIcons();

            try {
                let url = '/api/artworks?limit=100';
                if (status) url += `&status=${status}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                
                const data = await response.json();
                collectionArtworks = data.artworks || [];
                
                document.getElementById('approvedCount').textContent = `(${collectionArtworks.length})`;
                
                if (collectionArtworks.length === 0) {
                    grid.innerHTML = `
                        <div class="col-span-full text-center py-8 text-gray-500">
                            <i data-lucide="image-off" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
                            <p>Нет произведений со статусом "${status || 'любой'}"</p>
                            <p class="text-xs mt-1">Одобрите произведения в разделе "Наполнение"</p>
                        </div>
                    `;
                    lucide.createIcons();
                    return;
                }
                
                grid.innerHTML = collectionArtworks.map(artwork => `
                    <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-colors">
                        <div class="bg-gray-200 relative" style="aspect-ratio: 4/3" data-img-section="curator_collections">
                            ${artwork.image_url ? 
                                `<img src="${artwork.thumbnail_url || artwork.image_url}" alt="${artwork.title || ''}" class="w-full h-full object-cover">` :
                                `<div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>`
                            }
                            <span class="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${
                                artwork.status === 'published' ? 'bg-green-100 text-green-700' : 
                                artwork.status === 'approved' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }">${artwork.status || 'pending'}</span>
                        </div>
                        <div class="p-3">
                            <h4 class="font-semibold text-gray-900 text-sm truncate">${artwork.title || 'Без названия'}</h4>
                            <p class="text-xs text-gray-500 mb-2">${artwork.artist || 'Неизвестен'}${artwork.year ? `, ${artwork.year}` : ''}${artwork.country ? ` • ${artwork.country}` : ''}</p>
                            <div class="flex flex-wrap gap-1 mb-2">
                                ${artwork.style ? `<span class="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">${artwork.style}</span>` : ''}
                                ${artwork.epoch ? `<span class="text-xs bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">${artwork.epoch}</span>` : ''}
                            </div>
                            <button onclick="openAssignModal(${artwork.id})" class="w-full bg-purple-100 text-purple-700 py-1.5 rounded-lg font-medium hover:bg-purple-200 transition-colors text-xs">
                                В коллекцию
                            </button>
                        </div>
                    </div>
                `).join('');
                lucide.createIcons();
            } catch (error) {
                console.error('Load collection artworks error:', error);
                grid.innerHTML = `
                    <div class="col-span-full text-center py-8 text-red-500">
                        <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2"></i>
                        <p>Ошибка загрузки</p>
                    </div>
                `;
                lucide.createIcons();
            }
        }

        function openAssignModal(artworkId) {
            currentAssignArtwork = collectionArtworks.find(a => a.id === artworkId);
            if (!currentAssignArtwork) return;
            
            document.getElementById('assignArtworkName').textContent = `"${currentAssignArtwork.title || 'Без названия'}" — ${currentAssignArtwork.artist || 'Неизвестен'}`;
            document.getElementById('collectionAssignModal').classList.remove('hidden');
            
            document.querySelectorAll('#collectionsList input[type="checkbox"]').forEach(cb => {
                const colStr = ',' + (currentAssignArtwork.collection || '') + ',';
                cb.checked = colStr.includes(',' + cb.value + ',');
            });
        }

        document.getElementById('closeAssignModal')?.addEventListener('click', () => {
            document.getElementById('collectionAssignModal').classList.add('hidden');
            currentAssignArtwork = null;
        });

        document.getElementById('collectionAssignModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'collectionAssignModal') {
                document.getElementById('collectionAssignModal').classList.add('hidden');
                currentAssignArtwork = null;
            }
        });

        document.getElementById('saveCollectionAssign')?.addEventListener('click', async () => {
            if (!currentAssignArtwork) return;
            
            const selectedCollections = [];
            document.querySelectorAll('#collectionsList input[type="checkbox"]:checked').forEach(cb => {
                selectedCollections.push(cb.value);
            });
            
            try {
                const response = await fetch(`/api/artworks/${currentAssignArtwork.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ collection: selectedCollections.join(',') })
                });
                
                if (!response.ok) throw new Error('Failed to update');
                
                toastSuccess('Произведение добавлено в коллекции');
                document.getElementById('collectionAssignModal').classList.add('hidden');
                currentAssignArtwork = null;
                loadCollectionArtworks(document.getElementById('collectionArtworkStatus').value);
            } catch (error) {
                console.error('Assign error:', error);
                toastError('Ошибка при сохранении');
            }
        });

        document.getElementById('refreshCollectionArtworks')?.addEventListener('click', () => {
            loadCollectionArtworks(document.getElementById('collectionArtworkStatus').value);
        });

        document.getElementById('collectionArtworkStatus')?.addEventListener('change', (e) => {
            loadCollectionArtworks(e.target.value);
        });

        document.querySelector('[data-tab="collections"]')?.addEventListener('click', () => {
            setTimeout(() => {
                loadCollections();
                loadCollectionArtworks(document.getElementById('collectionArtworkStatus')?.value || 'approved');
            }, 100);
        });

        // Collections Management
        let allCollections = [];

        async function loadCollections() {
            const grid = document.getElementById('collectionsGrid');
            grid.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-500">
                    <i data-lucide="loader-2" class="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin"></i>
                    <p>Загрузка коллекций...</p>
                </div>
            `;
            lucide.createIcons();

            try {
                const response = await fetch('/api/collections?all=true');
                if (!response.ok) throw new Error('Failed to fetch');
                
                const data = await response.json();
                allCollections = data.collections || [];
                
                updateCollectionsList();
                
                if (allCollections.length === 0) {
                    grid.innerHTML = `
                        <div class="col-span-full text-center py-8 text-gray-500">
                            <i data-lucide="folder" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
                            <p>Нет коллекций</p>
                            <p class="text-xs mt-1">Нажмите "+ Новая коллекция" для создания</p>
                        </div>
                    `;
                    lucide.createIcons();
                    return;
                }
                
                grid.innerHTML = allCollections.map(col => `
                    <div class="collection-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group ${col.is_active === false ? 'opacity-60' : ''}" data-collection="${col.slug}" onclick="openCollection('${col.slug}')">
                        <div class="h-40 bg-gradient-to-br ${col.cover_gradient || 'from-purple-400 to-pink-500'} relative">
                            ${col.epoch ? `<span class="absolute top-3 right-3 bg-white/90 text-purple-700 text-xs px-2 py-1 rounded-full">Эпоха: ${col.epoch}</span>` : ''}
                            <div class="absolute top-3 left-3 flex gap-2">
                                <button onclick="event.stopPropagation(); toggleCollectionActive(${col.id}, ${col.is_active !== false})" 
                                    class="bg-white/90 ${col.is_active === false ? 'text-gray-400' : 'text-green-500'} hover:bg-white p-1.5 rounded-full transition-colors" 
                                    title="${col.is_active === false ? 'Активировать' : 'Деактивировать'}">
                                    <i data-lucide="${col.is_active === false ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
                                </button>
                                <button onclick="event.stopPropagation(); deleteCollection(${col.id}, '${col.name}')" 
                                    class="bg-white/90 text-red-500 hover:text-red-700 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex items-center gap-2 mb-2">
                                <h3 class="font-display font-semibold text-lg text-gray-900">${col.name}</h3>
                                ${col.is_active === false ? '<span class="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Скрыта</span>' : '<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Активна</span>'}
                            </div>
                            <p class="text-gray-600 text-sm mb-3">${col.description || 'Описание отсутствует'}</p>
                            <div class="flex flex-wrap gap-1 mb-4">
                                ${col.country ? `<span class="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">${col.country}</span>` : ''}
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">${col.artwork_count || 0} экспонатов</span>
                                <span class="text-purple-600 hover:text-purple-700 font-medium text-sm">Открыть</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                lucide.createIcons();
            } catch (error) {
                console.error('Load collections error:', error);
                grid.innerHTML = `
                    <div class="col-span-full text-center py-8 text-red-500">
                        <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2"></i>
                        <p>Ошибка загрузки коллекций</p>
                    </div>
                `;
                lucide.createIcons();
            }
        }

        function updateCollectionsList() {
            const list = document.getElementById('collectionsList');
            if (!list || allCollections.length === 0) return;
            
            list.innerHTML = allCollections.map(col => `
                <label class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" name="collection" value="${col.slug}" class="w-4 h-4 text-purple-600 rounded">
                    <span class="text-sm font-medium">${col.name}</span>
                </label>
            `).join('');
        }

        async function openCollection(slug) {
            try {
                const response = await fetch(`/api/collections/${slug}`);
                if (!response.ok) throw new Error('Failed to fetch');
                
                const data = await response.json();
                const collection = data.collection;
                const artworks = data.artworks || [];
                
                document.getElementById('collectionsGrid').classList.add('hidden');
                document.getElementById('collectionDetailView').classList.remove('hidden');
                
                document.getElementById('collectionDetailName').textContent = collection.name;
                document.getElementById('collectionDetailDescription').textContent = collection.description || '';
                document.getElementById('collectionDetailCount').textContent = `${artworks.length} произведений`;
                
                const grid = document.getElementById('collectionDetailArtworks');
                if (artworks.length === 0) {
                    grid.innerHTML = `
                        <div class="col-span-full text-center py-8 text-gray-500">
                            <i data-lucide="image-off" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
                            <p>В коллекции нет произведений</p>
                            <p class="text-xs mt-1">Добавьте произведения из секции ниже</p>
                        </div>
                    `;
                } else {
                    grid.innerHTML = artworks.map(artwork => `
                        <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                            <div class="bg-gray-200" style="aspect-ratio: 4/3" data-img-section="curator_collections">
                                ${artwork.image_url ? 
                                    `<img src="${artwork.thumbnail_url || artwork.image_url}" alt="${artwork.title || ''}" class="w-full h-full object-cover">` :
                                    `<div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>`
                                }
                            </div>
                            <div class="p-3">
                                <h4 class="font-semibold text-gray-900 text-sm truncate">${artwork.title || 'Без названия'}</h4>
                                <p class="text-xs text-gray-500">${artwork.artist || 'Неизвестен'}</p>
                            </div>
                        </div>
                    `).join('');
                }
                lucide.createIcons();
            } catch (error) {
                console.error('Open collection error:', error);
                toastError('Ошибка при открытии коллекции');
            }
        }

        document.getElementById('backToCollections')?.addEventListener('click', () => {
            document.getElementById('collectionDetailView').classList.add('hidden');
            document.getElementById('collectionsGrid').classList.remove('hidden');
        });

        // New Collection Modal
        document.getElementById('newCollectionBtn')?.addEventListener('click', () => {
            document.getElementById('newCollectionModal').classList.remove('hidden');
        });

        document.getElementById('closeNewCollectionModal')?.addEventListener('click', () => {
            document.getElementById('newCollectionModal').classList.add('hidden');
        });

        document.getElementById('newCollectionModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'newCollectionModal') {
                document.getElementById('newCollectionModal').classList.add('hidden');
            }
        });

        document.getElementById('saveNewCollection')?.addEventListener('click', async () => {
            const name = document.getElementById('newCollectionName').value.trim();
            if (!name) {
                toastWarning('Введите название коллекции');
                return;
            }
            
            try {
                const response = await fetch('/api/collections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        description: document.getElementById('newCollectionDescription').value.trim(),
                        epoch: document.getElementById('newCollectionEpoch').value.trim(),
                        country: document.getElementById('newCollectionCountry').value.trim(),
                        cover_gradient: document.getElementById('newCollectionGradient').value
                    })
                });
                
                if (!response.ok) throw new Error('Failed to create');
                
                document.getElementById('newCollectionModal').classList.add('hidden');
                document.getElementById('newCollectionName').value = '';
                document.getElementById('newCollectionDescription').value = '';
                document.getElementById('newCollectionEpoch').value = '';
                document.getElementById('newCollectionCountry').value = '';
                
                loadCollections();
                toastSuccess('Коллекция создана успешно!');
            } catch (error) {
                console.error('Create collection error:', error);
                toastError('Ошибка при создании коллекции');
            }
        });

        async function toggleCollectionActive(id, currentlyActive) {
            try {
                const response = await fetch(`/api/collections/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_active: !currentlyActive })
                });
                
                if (!response.ok) throw new Error('Failed to update');
                loadCollections();
                loadDashboardStats();
            } catch (error) {
                console.error('Toggle collection error:', error);
                toastError('Ошибка при изменении статуса коллекции');
            }
        }

        async function deleteCollection(id, name) {
            if (!confirm(`Вы уверены, что хотите удалить коллекцию "${name}"?\n\nКоллекция будет перемещена в архив и может быть восстановлена администратором.`)) return;
            
            try {
                const response = await fetch(`/api/collections/${id}`, { 
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ archived_by: 'curator', reason: 'Удалена куратором' })
                });
                if (!response.ok) throw new Error('Failed to delete');
                toastSuccess('Коллекция перемещена в архив');
                loadCollections();
                loadDashboardStats();
            } catch (error) {
                console.error('Delete collection error:', error);
                toastError('Ошибка при удалении коллекции');
            }
        }

        // Gallery Builder Logic
        let galleryConfig = {
            rooms: [
                { id: 'main_hall', name: 'Главный холл', theme: 'classic', width: 20, depth: 25, height: 6, wallColor: '#f5f0e6', lighting: 70, slots: 5, connections: ['impressionism', 'modern_art'] },
                { id: 'impressionism', name: 'Импрессионизм', theme: 'classic', width: 18, depth: 20, height: 5, wallColor: '#faf5f0', lighting: 80, slots: 6, connections: ['main_hall'] },
                { id: 'modern_art', name: 'Современное искусство', theme: 'modern', width: 15, depth: 15, height: 4, wallColor: '#ffffff', lighting: 90, slots: 4, connections: ['main_hall'] },
                { id: 'renaissance', name: 'Ренессанс', theme: 'classic', width: 22, depth: 28, height: 7, wallColor: '#f0e8d8', lighting: 60, slots: 6, connections: ['main_hall'] },
                { id: 'contemporary', name: 'Современность', theme: 'dark', width: 16, depth: 16, height: 4, wallColor: '#2a2a2a', lighting: 50, slots: 5, connections: ['main_hall'] }
            ],
            currentRoom: 'main_hall'
        };

        async function loadGalleryConfig() {
            try {
                const response = await fetch('/api/gallery/config');
                if (response.ok) {
                    const savedConfig = await response.json();
                    if (savedConfig && savedConfig.rooms) {
                        galleryConfig = savedConfig;
                    }
                }
            } catch (error) {
                console.log('Using default gallery configuration');
            } finally {
                renderRoomsList();
                selectRoom(galleryConfig.currentRoom || 'main_hall');
            }
        }

        document.querySelector('[data-tab="gallery-builder"]')?.addEventListener('click', () => {
            setTimeout(() => loadGalleryConfig(), 100);
        });

        function selectRoom(roomId) {
            galleryConfig.currentRoom = roomId;
            const room = galleryConfig.rooms.find(r => r.id === roomId);
            if (!room) return;

            document.querySelectorAll('.room-item').forEach(item => {
                if (item.dataset.room === roomId) {
                    item.classList.remove('bg-gray-50', 'hover:bg-gray-100', 'border-gray-200');
                    item.classList.add('bg-purple-50', 'border-purple-200');
                } else {
                    item.classList.remove('bg-purple-50', 'border-purple-200');
                    item.classList.add('bg-gray-50', 'hover:bg-gray-100', 'border-gray-200');
                }
            });

            // Sync with modal inputs if modal is open or for consistency
            const roomNameInput = document.getElementById('roomName');
            const roomThemeInput = document.getElementById('roomTheme');
            const roomWidthInput = document.getElementById('roomWidth');
            const roomDepthInput = document.getElementById('roomDepth');
            const roomHeightInput = document.getElementById('roomHeight');
            const wallColorInput = document.getElementById('wallColor');
            const wallColorHexInput = document.getElementById('wallColorHex');
            const roomLightingInput = document.getElementById('roomLighting');

            if (roomNameInput) roomNameInput.value = room.name || '';
            if (roomThemeInput) roomThemeInput.value = room.theme || 'classic';
            if (roomWidthInput) roomWidthInput.value = room.width || 20;
            if (roomDepthInput) roomDepthInput.value = room.depth || 25;
            if (roomHeightInput) roomHeightInput.value = room.height || 6;
            if (wallColorInput) wallColorInput.value = room.wallColor || '#f5f0e6';
            if (wallColorHexInput) wallColorHexInput.value = room.wallColor || '#f5f0e6';
            if (roomLightingInput) roomLightingInput.value = room.lighting || 70;

            renderRoomLayout();
        }

        document.querySelectorAll('.room-item').forEach(item => {
            item.addEventListener('click', () => selectRoom(item.dataset.room));
        });

        document.getElementById('wallColor')?.addEventListener('input', (e) => {
            document.getElementById('wallColorHex').value = e.target.value;
            updateCurrentRoom('wallColor', e.target.value);
        });

        document.getElementById('wallColorHex')?.addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                document.getElementById('wallColor').value = e.target.value;
                updateCurrentRoom('wallColor', e.target.value);
            }
        });

        ['roomName', 'roomTheme', 'roomWidth', 'roomDepth', 'roomHeight', 'roomLighting'].forEach(fieldId => {
            document.getElementById(fieldId)?.addEventListener('input', (e) => {
                const key = fieldId.replace('room', '').toLowerCase();
                const value = e.target.type === 'number' || e.target.type === 'range' ? parseInt(e.target.value) : e.target.value;
                updateCurrentRoom(key, value);
            });
        });

        function updateCurrentRoom(key, value) {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (room) room[key] = value;
        }

        document.getElementById('addRoomBtn')?.addEventListener('click', () => {
            const newId = 'room_' + Date.now();
            const newRoom = {
                id: newId,
                name: 'Новый зал',
                theme: 'classic',
                width: 15,
                depth: 15,
                height: 5,
                wallColor: '#f5f0e6',
                lighting: 70,
                slots: 4,
                connections: []
            };
            galleryConfig.rooms.push(newRoom);
            renderRoomsList();
            selectRoom(newId);
        });

        function renderRoomsList() {
            const roomStyles = {
                main_hall: { icon: 'home', bgColor: 'background-color: #7c3aed;' },
                impressionism: { icon: 'sun', bgColor: 'background-color: #ec4899;' },
                modern_art: { icon: 'square', bgColor: 'background-color: #06b6d4;' },
                renaissance: { icon: 'crown', bgColor: 'background-color: #f59e0b;' },
                contemporary: { icon: 'zap', bgColor: 'background-color: #374151;' }
            };
            
            const list = document.getElementById('roomsList');
            list.innerHTML = galleryConfig.rooms.map((room, index) => {
                const isActive = room.id === galleryConfig.currentRoom;
                const style = roomStyles[room.id] || { icon: 'box', bgColor: 'background-color: #6b7280;' };
                const isFirst = index === 0;
                const isLast = index === galleryConfig.rooms.length - 1;
                return `
                    <div class="room-item p-3 ${isActive ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'} border rounded-xl cursor-pointer" data-room="${room.id}">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3 flex-1" data-action="select">
                                <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="${style.bgColor}">
                                    <i data-lucide="${style.icon}" class="w-5 h-5 text-white"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">${room.name}</p>
                                    <p class="text-xs text-gray-500">${room.slots} слотов</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <button class="move-up-btn p-1.5 rounded hover:bg-gray-200 ${isFirst ? 'opacity-30 cursor-not-allowed' : ''}" data-room="${room.id}" ${isFirst ? 'disabled' : ''} title="Переместить вверх">
                                    <i data-lucide="chevron-up" class="w-4 h-4 text-gray-500"></i>
                                </button>
                                <button class="move-down-btn p-1.5 rounded hover:bg-gray-200 ${isLast ? 'opacity-30 cursor-not-allowed' : ''}" data-room="${room.id}" ${isLast ? 'disabled' : ''} title="Переместить вниз">
                                    <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500"></i>
                                </button>
                                <button class="delete-room-btn p-1.5 rounded hover:bg-red-100" data-room="${room.id}" title="Удалить зал">
                                    <i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            lucide.createIcons();
            
            document.querySelectorAll('.room-item [data-action="select"]').forEach(item => {
                item.addEventListener('click', () => selectRoom(item.closest('.room-item').dataset.room));
            });
            
            document.querySelectorAll('.move-up-btn:not([disabled])').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    moveRoom(btn.dataset.room, -1);
                });
            });
            
            document.querySelectorAll('.move-down-btn:not([disabled])').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    moveRoom(btn.dataset.room, 1);
                });
            });
            
            document.querySelectorAll('.delete-room-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteRoom(btn.dataset.room);
                });
            });
        }
        
        function moveRoom(roomId, direction) {
            const index = galleryConfig.rooms.findIndex(r => r.id === roomId);
            if (index === -1) return;
            
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= galleryConfig.rooms.length) return;
            
            const temp = galleryConfig.rooms[index];
            galleryConfig.rooms[index] = galleryConfig.rooms[newIndex];
            galleryConfig.rooms[newIndex] = temp;
            
            renderRoomsList();
        }
        
        async function deleteRoom(roomId) {
            if (galleryConfig.rooms.length <= 1) {
                toastWarning('Нельзя удалить последний зал');
                return;
            }
            
            if (!confirm('Вы уверены, что хотите удалить этот зал?\n\nЗал будет перемещён в архив и может быть восстановлен администратором.')) return;
            
            const index = galleryConfig.rooms.findIndex(r => r.id === roomId);
            if (index === -1) return;

            const room = galleryConfig.rooms[index];
            try {
                await fetch('/api/archive/room', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ room, archived_by: 'curator', reason: 'Удалён куратором' })
                });
            } catch (e) {}
            
            galleryConfig.rooms.splice(index, 1);
            
            galleryConfig.rooms.forEach(room => {
                room.connections = room.connections.filter(c => c !== roomId);
            });
            
            if (galleryConfig.currentRoom === roomId) {
                galleryConfig.currentRoom = galleryConfig.rooms[0].id;
                selectRoom(galleryConfig.currentRoom);
            }
            
            renderRoomsList();
        }

        async function saveGalleryConfigAction() {
            try {
                const response = await fetch('/api/gallery/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(galleryConfig)
                });
                if (response.ok) {
                    toastSuccess('Конфигурация галереи сохранена!');
                } else {
                    toastError('Ошибка сохранения конфигурации');
                }
            } catch (error) {
                console.error('Save config error:', error);
                toastError('Ошибка сохранения');
            }
        }

        document.getElementById('saveGalleryConfig')?.addEventListener('click', saveGalleryConfigAction);

        document.getElementById('generateTexturesBtn')?.addEventListener('click', async () => {
            const btn = document.getElementById('generateTexturesBtn');
            const btnText = btn.querySelector('span');
            const originalText = btnText.textContent;
            btn.disabled = true;
            btn.classList.add('opacity-70');
            
            try {
                btnText.textContent = 'Подготовка...';
                
                const textureUrls = await TextureGenerator.generateAndUploadAll(
                    galleryConfig.rooms,
                    (step, total, message) => {
                        const pct = Math.round((step / total) * 100);
                        btnText.textContent = `${message} (${pct}%)`;
                    }
                );

                galleryConfig.textureUrls = textureUrls;
                toastSuccess(`Текстуры сгенерированы и загружены (${Object.keys(textureUrls).length} шт.)`);
            } catch (error) {
                console.error('Texture generation error:', error);
                toastError('Ошибка генерации текстур: ' + error.message);
            } finally {
                btnText.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70');
            }
        });

        document.getElementById('addSlotBtn')?.addEventListener('click', () => {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (room) {
                room.slots = (parseInt(room.slots) || 0) + 1;
                renderRoomsList();
                renderRoomLayout();
            }
        });

        document.getElementById('removeSlotBtn')?.addEventListener('click', () => {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (!room) return;
            const slotsCount = parseInt(room.slots) || 0;
            if (slotsCount <= 0) return;
            const lastIndex = slotsCount - 1;
            const assignment = room.artworkAssignments ? room.artworkAssignments[lastIndex] : null;
            if (assignment) {
                if (!confirm(`Слот #${slotsCount} содержит «${assignment.title || 'экспонат'}». Удалить слот?`)) return;
                delete room.artworkAssignments[lastIndex];
            }
            room.slots = lastIndex;
            renderRoomsList();
            renderRoomLayout();
            toastSuccess(`Слот #${slotsCount} удалён`);
        });

        document.getElementById('saveGalleryConfigBottom')?.addEventListener('click', saveGalleryConfigAction);

        document.getElementById('aiSlotsBtn')?.addEventListener('click', async () => {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (!room) return;

            const btn = document.getElementById('aiSlotsBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Расчёт...';
            btn.disabled = true;
            lucide.createIcons();

            try {
                const response = await fetch('/api/ai/calculate-slots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        roomId: room.id,
                        roomName: room.name,
                        roomDimensions: {
                            width: room.width,
                            depth: room.depth,
                            height: room.height
                        }
                    })
                });

                const data = await response.json();
                
                if (data.success && data.recommendation) {
                    const rec = data.recommendation;
                    const demoNote = data.demo_mode ? ' (демо-режим)' : '';
                    
                    const accept = confirm(
                        `ИИ-рекомендация${demoNote}:\n\n` +
                        `Рекомендуемое количество слотов: ${rec.total_slots}\n\n` +
                        `Распределение:\n` +
                        `• Левая стена: ${rec.layout.leftWall} слотов\n` +
                        `• Правая стена: ${rec.layout.rightWall} слотов\n` +
                        `• Задняя стена: ${rec.layout.backWall} слотов\n\n` +
                        `${rec.reasoning}\n\n` +
                        `Применить рекомендацию?`
                    );

                    if (accept) {
                        room.slots = rec.total_slots;
                        room.slotLayout = rec.layout;
                        renderRoomsList();
                        toastSuccess('Рекомендация применена!');
                    }
                } else {
                    toastError('Не удалось получить рекомендацию от ИИ');
                }
            } catch (error) {
                console.error('AI slots calculation error:', error);
                toastError('Ошибка при расчёте слотов');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            }
        });

        let currentSlotIndex = null;
        let slotArtworksCache = [];

        function renderRoomLayout() {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (!room) return;

            if (!room.artworkAssignments) room.artworkAssignments = {};

            const grid = document.getElementById('slotsGrid');
            if (!grid) return;

            const slotsCount = parseInt(room.slots) || 0;
            let html = '';

            for (let i = 0; i < slotsCount; i++) {
                const assignment = room.artworkAssignments[i];
                if (assignment) {
                    html += `
                        <div class="artwork-slot relative aspect-[3/4] bg-white border-2 border-purple-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:shadow-md transition-all group" data-slot="${i}">
                            <div class="w-full h-full p-2 flex flex-col overflow-hidden">
                                ${assignment.image_url ? 
                                    `<img src="${assignment.thumbnail_url || assignment.image_url}" alt="${assignment.title || ''}" class="flex-1 object-cover rounded-lg min-h-0">` :
                                    `<div class="flex-1 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg"></div>`
                                }
                                <p class="text-xs text-center mt-2 text-gray-700 truncate font-medium">${assignment.title || 'Без названия'}</p>
                                <p class="text-[10px] text-center text-gray-400 truncate">${assignment.artist || ''}</p>
                            </div>
                            <button onclick="event.stopPropagation(); removeSlotArtwork(${i})" class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Убрать экспонат">
                                <i data-lucide="x" class="w-3 h-3"></i>
                            </button>
                            <span class="absolute bottom-1 left-1 text-[9px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">#${i + 1}</span>
                        </div>`;
                } else {
                    html += `
                        <div class="artwork-slot aspect-[3/4] bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all" data-slot="${i}">
                            <i data-lucide="plus" class="w-8 h-8 text-gray-400"></i>
                            <p class="text-xs text-gray-400 mt-2">Слот #${i + 1}</p>
                            <p class="text-[10px] text-gray-300 mt-0.5">Нажмите для выбора</p>
                        </div>`;
                }
            }

            if (slotsCount === 0) {
                html = `
                    <div class="col-span-3 text-center py-12 text-gray-400">
                        <i data-lucide="frame" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
                        <p class="text-sm">Нет слотов для размещения</p>
                        <p class="text-xs mt-1">Нажмите «Добавить слот» выше</p>
                    </div>`;
            }

            grid.innerHTML = html;
            lucide.createIcons();

            grid.querySelectorAll('.artwork-slot').forEach(slot => {
                slot.addEventListener('click', () => {
                    openSlotSelector(parseInt(slot.dataset.slot));
                });
            });
        }

        function removeSlotArtwork(slotIndex) {
            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (!room || !room.artworkAssignments) return;
            
            const removed = room.artworkAssignments[slotIndex];
            delete room.artworkAssignments[slotIndex];
            renderRoomLayout();
            toastSuccess(`«${removed?.title || 'Экспонат'}» убран из слота #${slotIndex + 1}`);
        }

        function openSlotSelector(slotIndex) {
            currentSlotIndex = slotIndex;
            document.getElementById('slotSelectorTitle').textContent = `Выбор экспоната для слота #${slotIndex + 1}`;
            document.getElementById('slotSelectorModal').classList.remove('hidden');
            document.getElementById('slotSearchInput').value = '';
            lucide.createIcons();
            loadSlotArtworks();
        }

        function closeSlotSelector() {
            document.getElementById('slotSelectorModal').classList.add('hidden');
            currentSlotIndex = null;
        }

        document.getElementById('closeSlotSelector')?.addEventListener('click', closeSlotSelector);
        document.getElementById('slotSelectorModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'slotSelectorModal') closeSlotSelector();
        });

        let slotSearchTimeout = null;
        document.getElementById('slotSearchInput')?.addEventListener('input', () => {
            clearTimeout(slotSearchTimeout);
            slotSearchTimeout = setTimeout(() => filterSlotArtworks(), 300);
        });
        document.getElementById('slotFilterStatus')?.addEventListener('change', () => loadSlotArtworks());

        async function loadSlotArtworks() {
            const list = document.getElementById('slotArtworksList');
            list.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i data-lucide="loader-2" class="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin"></i>
                    <p>Загрузка произведений...</p>
                </div>`;
            lucide.createIcons();

            try {
                const status = document.getElementById('slotFilterStatus').value;
                let url = '/api/artworks?limit=200';
                if (status) url += `&status=${status}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                slotArtworksCache = data.artworks || [];
                filterSlotArtworks();
            } catch (error) {
                console.error('Load slot artworks error:', error);
                list.innerHTML = `
                    <div class="text-center py-8 text-red-500">
                        <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2"></i>
                        <p>Ошибка загрузки</p>
                    </div>`;
                lucide.createIcons();
            }
        }

        function filterSlotArtworks() {
            const query = (document.getElementById('slotSearchInput')?.value || '').toLowerCase().trim();
            const list = document.getElementById('slotArtworksList');

            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            const assignedIds = new Set();
            if (room?.artworkAssignments) {
                Object.values(room.artworkAssignments).forEach(a => { if (a?.id) assignedIds.add(a.id); });
            }

            let filtered = slotArtworksCache;
            if (query) {
                filtered = filtered.filter(a => 
                    (a.title || '').toLowerCase().includes(query) ||
                    (a.artist || '').toLowerCase().includes(query) ||
                    (a.style || '').toLowerCase().includes(query)
                );
            }

            if (filtered.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i data-lucide="image-off" class="w-8 h-8 text-gray-400 mx-auto mb-2"></i>
                        <p>${query ? 'Ничего не найдено' : 'Нет доступных произведений'}</p>
                        <p class="text-xs mt-1">Загрузите и одобрите произведения в разделе «Наполнение»</p>
                    </div>`;
                lucide.createIcons();
                return;
            }

            list.innerHTML = `<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">` + filtered.map(artwork => {
                const isAssigned = assignedIds.has(artwork.id);
                return `
                    <div class="slot-artwork-option rounded-xl overflow-hidden border ${isAssigned ? 'border-green-300 bg-green-50/50' : 'border-gray-200 hover:border-purple-300'} transition-colors cursor-pointer ${isAssigned ? 'opacity-60' : ''}" 
                         data-artwork-id="${artwork.id}" onclick="${isAssigned ? '' : `selectArtworkForSlot(${artwork.id})`}">
                        <div class="bg-gray-100 relative" style="aspect-ratio: 3/4">
                            ${artwork.image_url ? 
                                `<img src="${artwork.thumbnail_url || artwork.image_url}" alt="${artwork.title || ''}" class="w-full h-full object-cover" loading="lazy">` :
                                `<div class="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>`
                            }
                            ${isAssigned ? `<div class="absolute inset-0 bg-green-500/20 flex items-center justify-center"><i data-lucide="check-circle" class="w-8 h-8 text-green-600"></i></div>` : ''}
                            <span class="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded-full ${
                                artwork.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }">${artwork.status || 'pending'}</span>
                        </div>
                        <div class="p-2">
                            <p class="text-xs font-semibold text-gray-900 truncate">${artwork.title || 'Без названия'}</p>
                            <p class="text-[10px] text-gray-500 truncate">${artwork.artist || 'Неизвестен'}${artwork.year ? `, ${artwork.year}` : ''}</p>
                            ${isAssigned ? `<p class="text-[10px] text-green-600 mt-0.5">Уже размещён</p>` : ''}
                        </div>
                    </div>`;
            }).join('') + `</div>`;
            lucide.createIcons();
        }

        function selectArtworkForSlot(artworkId) {
            if (currentSlotIndex === null) return;

            const artwork = slotArtworksCache.find(a => a.id === artworkId);
            if (!artwork) return;

            const room = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            if (!room) return;

            if (!room.artworkAssignments) room.artworkAssignments = {};
            room.artworkAssignments[currentSlotIndex] = {
                id: artwork.id,
                title: artwork.title,
                artist: artwork.artist,
                image_url: artwork.image_url,
                thumbnail_url: artwork.thumbnail_url,
                year: artwork.year,
                style: artwork.style
            };

            closeSlotSelector();
            renderRoomLayout();
            toastSuccess(`«${artwork.title || 'Экспонат'}» размещён в слоте #${currentSlotIndex + 1}`);
        }

        document.getElementById('addConnectionBtn')?.addEventListener('click', () => {
            const currentRoom = galleryConfig.rooms.find(r => r.id === galleryConfig.currentRoom);
            const availableRooms = galleryConfig.rooms.filter(r => r.id !== galleryConfig.currentRoom && !currentRoom.connections.includes(r.id));
            
            if (availableRooms.length === 0) {
                toastWarning('Нет доступных залов для создания связи');
                return;
            }
            
            const roomName = prompt('Выберите зал для связи:\n' + availableRooms.map((r, i) => `${i + 1}. ${r.name}`).join('\n'));
            const index = parseInt(roomName) - 1;
            
            if (index >= 0 && index < availableRooms.length) {
                currentRoom.connections.push(availableRooms[index].id);
                availableRooms[index].connections.push(galleryConfig.currentRoom);
                toastSuccess(`Связь с залом "${availableRooms[index].name}" создана`);
            }
        });

        // Collections filter functionality
        document.querySelectorAll('.collection-filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.collection-filter').forEach(b => {
                    b.classList.remove('active', 'bg-purple-100', 'text-purple-700');
                    b.classList.add('bg-gray-100', 'text-gray-600');
                });
                btn.classList.add('active', 'bg-purple-100', 'text-purple-700');
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                
                const filter = btn.dataset.filter;
                filterCollections(filter);
            });
        });

        function filterCollections(filter) {
            if (filter === 'all') {
                loadCollections();
                return;
            }

            const cards = document.querySelectorAll('.collection-card');
            cards.forEach(card => {
                const slug = card.dataset.collection;
                const col = allCollections.find(c => c.slug === slug);
                if (!col) { card.style.display = 'none'; return; }

                let show = true;
                if (filter === 'epoch') { show = !!col.epoch; }
                else if (filter === 'country') { show = !!col.country; }
                else if (filter === 'tag') { show = !!(col.tags || col.style); }
                else if (filter === 'type') { show = true; }
                else if (filter === 'author') { show = true; }

                card.style.display = show ? 'block' : 'none';
            });
        }

