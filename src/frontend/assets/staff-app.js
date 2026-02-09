        lucide.createIcons();

        async function loadStats() {
            try {
                const response = await fetch('/api/stats/dashboard');
                const data = await response.json();
                document.getElementById('stat-today').textContent = data.new_today || 0;
                document.getElementById('stat-pending').textContent = data.pending || 0;
                document.getElementById('stat-approved').textContent = data.approved || 0;
                document.getElementById('stat-total').textContent = data.artworks || 0;
            } catch (error) {
                console.error('Failed to load stats:', error);
            }
        }
        loadStats();

        let selectedImageFile = null;
        let selectedImageDataUrl = null;

        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('text-green-600', 'border-b-2', 'border-green-600');
                    t.classList.add('text-gray-500');
                });
                tab.classList.add('text-green-600', 'border-b-2', 'border-green-600');
                tab.classList.remove('text-gray-500');

                const contentId = 'content-' + tab.id.replace('tab-', '');
                contents.forEach(c => c.classList.add('hidden'));
                document.getElementById(contentId).classList.remove('hidden');
            });
        });

        const dropZone = document.getElementById('drop-zone');
        const imageUpload = document.getElementById('image-upload');
        const previewContainer = document.getElementById('preview-container');
        const imagePreview = document.getElementById('image-preview');
        const analyzeBtn = document.getElementById('analyze-btn');
        const analysisResults = document.getElementById('analysis-results');

        dropZone.addEventListener('click', () => imageUpload.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-green-400', 'bg-green-50');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-green-400', 'bg-green-50');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-green-400', 'bg-green-50');
            if (e.dataTransfer.files.length > 0) {
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });

        imageUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleImageUpload(e.target.files[0]);
            }
        });

        function handleImageUpload(file) {
            selectedImageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedImageDataUrl = e.target.result;
                imagePreview.src = e.target.result;
                dropZone.classList.add('hidden');
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }

        document.getElementById('remove-image').addEventListener('click', () => {
            selectedImageFile = null;
            selectedImageDataUrl = null;
            dropZone.classList.remove('hidden');
            previewContainer.classList.add('hidden');
            imageUpload.value = '';
            resetAnalysisResults();
        });

        function resetAnalysisResults() {
            loadUploadHistory();
        }

        async function loadUploadHistory() {
            const uploadHistory = document.getElementById('upload-history');
            try {
                const response = await fetch('/api/artworks?limit=10');
                const data = await response.json();
                
                if (data.success && data.artworks.length > 0) {
                    uploadHistory.innerHTML = data.artworks.map(artwork => {
                        const artId = artwork.id || artwork.artwork_id;
                        const artArtist = artwork.artist || artwork.artist_name || 'Неизвестный';
                        return `
                        <div class="artwork-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" data-img-section="staff_list" data-id="${artId}" data-image="${artwork.image_url}" data-title="${artwork.title}" data-artist="${artArtist}" data-year="${artwork.year_created || ''}" data-style="${artwork.style || ''}" data-country="${artwork.country || ''}" data-epoch="${artwork.epoch || ''}" data-description="${artwork.description || ''}">
                            <img src="${artwork.thumbnail_url || artwork.image_url}" class="w-12 h-12 object-cover rounded" alt="${artwork.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22>?</text></svg>'">
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-gray-900 truncate">${artwork.title}</p>
                                <p class="text-sm text-gray-500">${artArtist} ${artwork.year_created ? '• ' + artwork.year_created : ''}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full ${artwork.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">${artwork.status}</span>
                            <button class="edit-artwork-btn p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${artId}" title="Редактировать">
                                <i data-lucide="pencil" class="w-4 h-4"></i>
                            </button>
                        </div>`;
                    }).join('');
                    lucide.createIcons();
                    
                    document.querySelectorAll('.artwork-item').forEach(item => {
                        item.addEventListener('click', (e) => {
                            if (!e.target.closest('.edit-artwork-btn')) {
                                showArtworkModal(item.dataset);
                            }
                        });
                    });
                    
                    document.querySelectorAll('.edit-artwork-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const item = btn.closest('.artwork-item');
                            showArtworkModal(item.dataset, true);
                        });
                    });
                } else {
                    uploadHistory.innerHTML = '<p class="text-gray-500 text-center py-8">Загруженные произведения появятся здесь</p>';
                }
            } catch (error) {
                console.error('Load history error:', error);
                uploadHistory.innerHTML = '<p class="text-red-500 text-center py-8">Ошибка загрузки истории</p>';
            }
        }
        
        function showArtworkModal(data, editMode = false) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
                    <div class="flex-1 bg-gray-900 flex items-center justify-center p-4" data-img-section="staff_preview" style="aspect-ratio: 4/3;">
                        <img src="${data.image}" alt="${data.title}" class="max-w-full max-h-[60vh] object-contain rounded-lg">
                    </div>
                    <div class="w-full md:w-96 p-6 overflow-y-auto">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-display font-bold">${data.title}</h2>
                            <button class="toggle-edit-btn p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Редактировать">
                                <i data-lucide="pencil" class="w-5 h-5"></i>
                            </button>
                        </div>
                        <p class="text-lg text-gray-600 mb-4">${data.artist}</p>
                        
                        <div id="view-mode" class="${editMode ? 'hidden' : ''}">
                            ${data.year ? `<p class="text-sm text-gray-500 mb-2"><strong>Год:</strong> ${data.year}</p>` : ''}
                            ${data.style ? `<p class="text-sm text-gray-500 mb-2"><strong>Стиль:</strong> ${data.style}</p>` : ''}
                            ${data.epoch ? `<p class="text-sm text-gray-500 mb-2"><strong>Эпоха:</strong> ${data.epoch}</p>` : ''}
                            ${data.country ? `<p class="text-sm text-gray-500 mb-2"><strong>Страна:</strong> ${data.country}</p>` : ''}
                            ${data.description ? `<div class="mt-4 p-3 bg-gray-50 rounded-lg"><p class="text-sm text-gray-700">${data.description}</p></div>` : ''}
                        </div>
                        
                        <div id="edit-mode" class="${editMode ? '' : 'hidden'}">
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Название</label>
                                    <input type="text" id="edit-title" value="${data.title || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Художник</label>
                                    <input type="text" id="edit-artist" value="${data.artist || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600 mb-1">Год</label>
                                        <input type="number" id="edit-year" value="${data.year || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-medium text-gray-600 mb-1">Страна</label>
                                        <input type="text" id="edit-country" value="${data.country || ''}" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Стиль</label>
                                    <select id="edit-style" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                        <option value="">Выберите стиль</option>
                                        <option value="Реализм" ${data.style === 'Реализм' ? 'selected' : ''}>Реализм</option>
                                        <option value="Импрессионизм" ${data.style === 'Импрессионизм' ? 'selected' : ''}>Импрессионизм</option>
                                        <option value="Постимпрессионизм" ${data.style === 'Постимпрессионизм' ? 'selected' : ''}>Постимпрессионизм</option>
                                        <option value="Экспрессионизм" ${data.style === 'Экспрессионизм' ? 'selected' : ''}>Экспрессионизм</option>
                                        <option value="Абстракционизм" ${data.style === 'Абстракционизм' ? 'selected' : ''}>Абстракционизм</option>
                                        <option value="Сюрреализм" ${data.style === 'Сюрреализм' ? 'selected' : ''}>Сюрреализм</option>
                                        <option value="Кубизм" ${data.style === 'Кубизм' ? 'selected' : ''}>Кубизм</option>
                                        <option value="Романтизм" ${data.style === 'Романтизм' ? 'selected' : ''}>Романтизм</option>
                                        <option value="Барокко" ${data.style === 'Барокко' ? 'selected' : ''}>Барокко</option>
                                        <option value="Ренессанс" ${data.style === 'Ренессанс' ? 'selected' : ''}>Ренессанс</option>
                                        <option value="Классицизм" ${data.style === 'Классицизм' ? 'selected' : ''}>Классицизм</option>
                                        <option value="Модернизм" ${data.style === 'Модернизм' ? 'selected' : ''}>Модернизм</option>
                                        <option value="Другое" ${data.style === 'Другое' ? 'selected' : ''}>Другое</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Эпоха</label>
                                    <select id="edit-epoch" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                                        <option value="">Выберите эпоху</option>
                                        <option value="Античность" ${data.epoch === 'Античность' ? 'selected' : ''}>Античность</option>
                                        <option value="Средневековье" ${data.epoch === 'Средневековье' ? 'selected' : ''}>Средневековье</option>
                                        <option value="Возрождение" ${data.epoch === 'Возрождение' ? 'selected' : ''}>Возрождение</option>
                                        <option value="XVII век" ${data.epoch === 'XVII век' ? 'selected' : ''}>XVII век</option>
                                        <option value="XVIII век" ${data.epoch === 'XVIII век' ? 'selected' : ''}>XVIII век</option>
                                        <option value="XIX век" ${data.epoch === 'XIX век' ? 'selected' : ''}>XIX век</option>
                                        <option value="Начало XX века" ${data.epoch === 'Начало XX века' ? 'selected' : ''}>Начало XX века</option>
                                        <option value="Середина XX века" ${data.epoch === 'Середина XX века' ? 'selected' : ''}>Середина XX века</option>
                                        <option value="Конец XX века" ${data.epoch === 'Конец XX века' ? 'selected' : ''}>Конец XX века</option>
                                        <option value="XXI век" ${data.epoch === 'XXI век' ? 'selected' : ''}>XXI век</option>
                                        <option value="Современность" ${data.epoch === 'Современность' ? 'selected' : ''}>Современность</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Описание</label>
                                    <textarea id="edit-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">${data.description || ''}</textarea>
                                </div>
                            </div>
                            <button id="save-edit-btn" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <i data-lucide="save" class="w-4 h-4"></i>
                                Сохранить изменения
                            </button>
                        </div>
                        
                        <button class="close-modal mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors">
                            Закрыть
                        </button>
                    </div>
                </div>
            `;
            
            lucide.createIcons();
            
            const toggleEditBtn = modal.querySelector('.toggle-edit-btn');
            const viewMode = modal.querySelector('#view-mode');
            const editModeDiv = modal.querySelector('#edit-mode');
            
            toggleEditBtn.addEventListener('click', () => {
                viewMode.classList.toggle('hidden');
                editModeDiv.classList.toggle('hidden');
            });
            
            const saveEditBtn = modal.querySelector('#save-edit-btn');
            saveEditBtn.addEventListener('click', async () => {
                saveEditBtn.disabled = true;
                saveEditBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Сохраняем...';
                
                try {
                    const updates = {
                        title: modal.querySelector('#edit-title').value,
                        artist: modal.querySelector('#edit-artist').value,
                        year: modal.querySelector('#edit-year').value,
                        country: modal.querySelector('#edit-country').value,
                        style: modal.querySelector('#edit-style').value,
                        period: modal.querySelector('#edit-epoch').value,
                        description: modal.querySelector('#edit-description').value
                    };
                    
                    const response = await fetch(`/api/artworks/${data.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updates)
                    });
                    
                    if (!response.ok) throw new Error('Failed to save');
                    
                    toastSuccess('Изменения сохранены!');
                    modal.remove();
                    loadUploadHistory();
                } catch (error) {
                    console.error('Save error:', error);
                    toastError('Ошибка сохранения: ' + error.message);
                } finally {
                    saveEditBtn.disabled = false;
                    saveEditBtn.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i> Сохранить изменения';
                    lucide.createIcons();
                }
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('close-modal')) {
                    modal.remove();
                }
            });
            
            document.body.appendChild(modal);
            lucide.createIcons();
        }

        loadUploadHistory();

        const saveDirectBtn = document.getElementById('save-direct-btn');
        saveDirectBtn.addEventListener('click', async () => {
            if (!selectedImageFile) {
                toastWarning('Пожалуйста, загрузите изображение');
                return;
            }

            saveDirectBtn.disabled = true;
            saveDirectBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Сохраняем...';
            lucide.createIcons();

            try {
                const formData = new FormData();
                formData.append('image', selectedImageFile);
                formData.append('title', document.getElementById('artwork-title').value);
                formData.append('artist', document.getElementById('artwork-artist').value);
                formData.append('year', document.getElementById('artwork-year').value);
                formData.append('style', document.getElementById('artwork-style').value);
                formData.append('country', document.getElementById('artwork-country').value);
                formData.append('epoch', document.getElementById('artwork-epoch').value);
                formData.append('description', document.getElementById('artwork-description').value);

                const response = await fetch('/api/artworks/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    toastSuccess('Произведение успешно сохранено!');
                    selectedImageFile = null;
                    selectedImageDataUrl = null;
                    dropZone.classList.remove('hidden');
                    previewContainer.classList.add('hidden');
                    imageUpload.value = '';
                    document.getElementById('artwork-title').value = '';
                    document.getElementById('artwork-artist').value = '';
                    document.getElementById('artwork-year').value = '';
                    document.getElementById('artwork-style').value = '';
                    document.getElementById('artwork-country').value = '';
                    document.getElementById('artwork-epoch').value = '';
                    document.getElementById('artwork-description').value = '';
                    loadUploadHistory();
                } else {
                    toastError('Ошибка: ' + (data.error || 'Не удалось сохранить'));
                }
            } catch (error) {
                toastError('Ошибка сети: ' + error.message);
            } finally {
                saveDirectBtn.disabled = false;
                saveDirectBtn.innerHTML = '<i data-lucide="save" class="w-5 h-5"></i> Сохранить';
                lucide.createIcons();
            }
        });

        analyzeBtn.addEventListener('click', async () => {
            if (!selectedImageDataUrl) {
                toastWarning('Пожалуйста, загрузите изображение');
                return;
            }

            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Анализируем...';
            lucide.createIcons();

            analysisResults.innerHTML = `
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center animate-pulse">
                        <i data-lucide="brain" class="w-5 h-5 text-accent-600"></i>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-accent-600">AI Анализ...</h3>
                </div>
                <div class="space-y-3">
                    <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
            `;
            lucide.createIcons();

            try {
                const response = await fetch('/api/ai/analyze-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imageUrl: selectedImageDataUrl,
                        artworkId: 'artwork_' + Date.now()
                    })
                });

                const data = await response.json();

                if (response.ok && data.analysis) {
                    showAnalysisResults(data);
                } else if (data.hint) {
                    showDemoAnalysis();
                } else {
                    showDemoAnalysis();
                }
            } catch (error) {
                showDemoAnalysis();
            } finally {
                analyzeBtn.disabled = false;
                analyzeBtn.innerHTML = '<i data-lucide="sparkles" class="w-5 h-5"></i> Анализировать';
                lucide.createIcons();
            }
        });

        function showAnalysisResults(data) {
            const analysis = data.analysis || {};
            analysisResults.innerHTML = `
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <i data-lucide="check-circle" class="w-5 h-5 text-green-600"></i>
                    </div>
                    <h3 class="text-xl font-display font-semibold text-green-700">Анализ завершён</h3>
                </div>
                <div class="space-y-4">
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="palette" class="w-4 h-4 text-accent-600"></i>
                            Стиль
                        </h4>
                        <p class="text-gray-600">${analysis.style || 'Не определён'}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
                            Период
                        </h4>
                        <p class="text-gray-600">${analysis.period || 'Не определён'}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="brush" class="w-4 h-4 text-amber-600"></i>
                            Техника
                        </h4>
                        <p class="text-gray-600">${analysis.technique || 'Не определена'}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="file-text" class="w-4 h-4 text-green-600"></i>
                            Описание
                        </h4>
                        <p class="text-gray-600">${analysis.description || 'Описание недоступно'}</p>
                    </div>
                </div>
                <button class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                    <i data-lucide="save" class="w-5 h-5"></i>
                    Сохранить карточку
                </button>
            `;
            lucide.createIcons();
        }

        function showDemoAnalysis() {
            const demoStyles = ['Импрессионизм', 'Реализм', 'Барокко', 'Классицизм', 'Модернизм'];
            const demoPeriods = ['XIX век', 'XVIII век', 'XVII век', 'XX век'];
            const demoTechniques = ['Масляная живопись', 'Акварель', 'Темпера', 'Смешанная техника'];
            
            analysisResults.innerHTML = `
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <i data-lucide="sparkles" class="w-5 h-5 text-amber-600"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-display font-semibold text-amber-700">Демо-анализ</h3>
                        <p class="text-xs text-amber-600">AI/ML сервис не подключен</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="palette" class="w-4 h-4 text-accent-600"></i>
                            Стиль (примерный)
                        </h4>
                        <p class="text-gray-600">${demoStyles[Math.floor(Math.random() * demoStyles.length)]}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
                            Период (примерный)
                        </h4>
                        <p class="text-gray-600">${demoPeriods[Math.floor(Math.random() * demoPeriods.length)]}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <i data-lucide="brush" class="w-4 h-4 text-amber-600"></i>
                            Техника (примерная)
                        </h4>
                        <p class="text-gray-600">${demoTechniques[Math.floor(Math.random() * demoTechniques.length)]}</p>
                    </div>
                    <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <h4 class="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                            <i data-lucide="info" class="w-4 h-4"></i>
                            Для точного анализа
                        </h4>
                        <p class="text-amber-600 text-sm">Запустите AI/ML сервис (Python FastAPI на порту 8001) для получения реального анализа с использованием GPT-4 Vision.</p>
                    </div>
                </div>
                <button class="mt-6 w-full bg-gray-400 text-white py-3 px-4 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2" disabled>
                    <i data-lucide="save" class="w-5 h-5"></i>
                    Сохранить (требуется AI анализ)
                </button>
            `;
            lucide.createIcons();
        }

        async function loadFullHistory() {
            const historyList = document.getElementById('full-history-list');
            try {
                const response = await fetch('/api/artworks?limit=50');
                const data = await response.json();
                
                if (data.success && data.artworks.length > 0) {
                    historyList.innerHTML = data.artworks.map(artwork => `
                        <div class="artwork-history-item flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors" data-id="${artwork.id}" data-image="${artwork.image_url}" data-title="${artwork.title}" data-artist="${artwork.artist || 'Неизвестный'}" data-year="${artwork.year_created || ''}" data-style="${artwork.style || ''}" data-country="${artwork.country || ''}" data-epoch="${artwork.epoch || ''}" data-description="${artwork.description || ''}">
                            <img src="${artwork.thumbnail_url || artwork.image_url}" class="w-16 h-16 rounded-lg object-cover" alt="${artwork.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23999%22>?</text></svg>'">
                            <div class="flex-1">
                                <p class="font-medium text-gray-900">${artwork.title}</p>
                                <p class="text-sm text-gray-500">${artwork.style || 'Без стиля'}${artwork.epoch ? ', ' + artwork.epoch : ''}</p>
                            </div>
                            <span class="px-3 py-1 rounded-full text-sm ${artwork.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">${artwork.status === 'active' ? 'Активно' : artwork.status}</span>
                            <button class="edit-history-btn p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Редактировать">
                                <i data-lucide="pencil" class="w-4 h-4"></i>
                            </button>
                        </div>
                    `).join('');
                    lucide.createIcons();
                    
                    document.querySelectorAll('.artwork-history-item').forEach(item => {
                        item.addEventListener('click', (e) => {
                            if (!e.target.closest('.edit-history-btn')) {
                                showArtworkModal(item.dataset);
                            }
                        });
                    });
                    
                    document.querySelectorAll('.edit-history-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const item = btn.closest('.artwork-history-item');
                            showArtworkModal(item.dataset, true);
                        });
                    });
                } else {
                    historyList.innerHTML = '<p class="text-gray-500 text-center py-8">Нет загруженных произведений</p>';
                }
            } catch (error) {
                console.error('Load full history error:', error);
                historyList.innerHTML = '<p class="text-red-500 text-center py-8">Ошибка загрузки истории</p>';
            }
        }

        document.getElementById('refresh-history-btn').addEventListener('click', loadFullHistory);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.id === 'tab-history') {
                    loadFullHistory();
                }
            });
        });

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
