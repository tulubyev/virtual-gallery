        lucide.createIcons();

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

        // Tab navigation
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

        // ===== Dashboard Stats =====
        async function loadDashboardStats() {
            try {
                const res = await fetch('/api/stats/dashboard');
                if (!res.ok) throw new Error('Failed to fetch stats');
                const data = await res.json();
                
                document.getElementById('totalUsers').textContent = data.users.toLocaleString();
                document.getElementById('activeUsers').textContent = data.active_users.toLocaleString();
                document.getElementById('totalArtworks').textContent = data.artworks.toLocaleString();
                document.getElementById('newToday').textContent = data.new_today.toLocaleString();
                
                // Update small badges or secondary info if needed
                const artworksBadge = document.getElementById('usersTotalBadge');
                if (artworksBadge) artworksBadge.textContent = data.artworks;
                
            } catch (error) {
                console.error('Error loading dashboard stats:', error);
            }
        }

        // Initialize dashboard
        loadDashboardStats();

        // Refresh stats on tab switch
        document.querySelector('[data-tab="dashboard"]')?.addEventListener('click', loadDashboardStats);

        // ===== Artworks (Exhibits) Management =====
        let artworksCurrentOffset = 0;
        const artworksPageSize = 20;
        let artworksSearchTimeout = null;

        function getStorageInfo(url) {
            if (!url) return { type: 'Нет файла', icon: 'file-x', color: 'gray' };
            if (url.includes('s3.') || url.includes('storage.beget.cloud')) {
                const parts = url.split('/');
                const filename = parts[parts.length - 1] || '';
                return { type: 'S3 (Beget)', icon: 'cloud', color: 'blue', filename };
            }
            if (url.startsWith('/uploads/')) {
                const filename = url.replace('/uploads/', '');
                return { type: 'Локальное', icon: 'hard-drive', color: 'amber', filename };
            }
            if (url.startsWith('http')) {
                return { type: 'Внешний URL', icon: 'external-link', color: 'purple', filename: '' };
            }
            return { type: 'Неизвестно', icon: 'help-circle', color: 'gray', filename: '' };
        }

        function getStatusBadge(status) {
            const map = {
                published: { label: 'Опубликован', bg: 'bg-green-100', text: 'text-green-700' },
                approved: { label: 'Одобрен', bg: 'bg-blue-100', text: 'text-blue-700' },
                active: { label: 'Активен', bg: 'bg-teal-100', text: 'text-teal-700' },
                pending: { label: 'На модерации', bg: 'bg-yellow-100', text: 'text-yellow-700' },
                rejected: { label: 'Отклонён', bg: 'bg-red-100', text: 'text-red-700' }
            };
            const s = map[status] || { label: status || '—', bg: 'bg-gray-100', text: 'text-gray-600' };
            return `<span class="${s.bg} ${s.text} px-2.5 py-1 rounded-full text-xs font-medium">${s.label}</span>`;
        }

        async function loadArtworkFilters() {
            try {
                const res = await fetch('/api/artworks/filters');
                if (!res.ok) return;
                const data = await res.json();

                const statusSel = document.getElementById('artworkStatusFilter');
                data.statuses.forEach(s => {
                    const opt = document.createElement('option');
                    opt.value = s.status;
                    opt.textContent = `${s.status} (${s.count})`;
                    statusSel.appendChild(opt);
                });

                const styleSel = document.getElementById('artworkStyleFilter');
                data.styles.forEach(s => {
                    const opt = document.createElement('option');
                    opt.value = s;
                    opt.textContent = s;
                    styleSel.appendChild(opt);
                });

                const countrySel = document.getElementById('artworkCountryFilter');
                data.countries.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = c;
                    countrySel.appendChild(opt);
                });

                const epochSel = document.getElementById('artworkEpochFilter');
                data.epochs.forEach(e => {
                    const opt = document.createElement('option');
                    opt.value = e;
                    opt.textContent = e;
                    epochSel.appendChild(opt);
                });

                const collSel = document.getElementById('artworkCollectionFilter');
                data.collections.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.slug;
                    opt.textContent = c.name;
                    collSel.appendChild(opt);
                });
            } catch (e) {
                console.error('Failed to load filters:', e);
            }
        }

        async function loadArtworks() {
            const tbody = document.getElementById('artworksTableBody');
            tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-gray-400"><i data-lucide="loader-2" class="w-6 h-6 mx-auto mb-2 animate-spin"></i>Загрузка...</td></tr>';
            lucide.createIcons();

            const params = new URLSearchParams();
            const search = document.getElementById('artworkSearch')?.value;
            const status = document.getElementById('artworkStatusFilter')?.value;
            const style = document.getElementById('artworkStyleFilter')?.value;
            const country = document.getElementById('artworkCountryFilter')?.value;
            const epoch = document.getElementById('artworkEpochFilter')?.value;
            const collection = document.getElementById('artworkCollectionFilter')?.value;

            if (search) params.set('search', search);
            if (status) params.set('status', status);
            if (style) params.set('style', style);
            if (country) params.set('country', country);
            if (epoch) params.set('epoch', epoch);
            if (collection) params.set('collection', collection);
            params.set('limit', artworksPageSize);
            params.set('offset', artworksCurrentOffset);

            try {
                const res = await fetch(`/api/artworks?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to load artworks');
                const data = await res.json();
                const artworks = data.artworks || [];
                const total = data.total || 0;

                document.getElementById('artworksTotalBadge').textContent = `${total} шт.`;

                const from = total === 0 ? 0 : artworksCurrentOffset + 1;
                const to = Math.min(artworksCurrentOffset + artworksPageSize, total);
                document.getElementById('artworksPaginationInfo').textContent = `${from}–${to} из ${total}`;

                const prevBtn = document.getElementById('artworksPrevBtn');
                const nextBtn = document.getElementById('artworksNextBtn');
                prevBtn.disabled = artworksCurrentOffset === 0;
                nextBtn.disabled = artworksCurrentOffset + artworksPageSize >= total;

                if (artworks.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-gray-400"><i data-lucide="image-off" class="w-8 h-8 mx-auto mb-2"></i><p>Экспонаты не найдены</p></td></tr>';
                    lucide.createIcons();
                    return;
                }

                tbody.innerHTML = artworks.map(a => {
                    const storage = getStorageInfo(a.image_url);
                    const storageColor = storage.color;
                    const thumbSrc = a.thumbnail_url || a.image_url;
                    const hasThumb = thumbSrc && thumbSrc.length > 0;
                    const collectionName = a.collection || '—';
                    const artId = a.artwork_id || a.id;
                    const artistName = a.artist_name || a.artist || '—';
                    const dateStr = a.created_at ? new Date(a.created_at).toLocaleDateString('ru-RU') : '—';

                    return `<tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                ${hasThumb
                                    ? `<img src="${thumbSrc}" alt="" class="w-11 h-11 rounded-lg object-cover flex-shrink-0 bg-gray-100" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                                    : ''
                                }
                                <div class="w-11 h-11 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0 items-center justify-center" style="display:${hasThumb ? 'none' : 'flex'}">
                                    <i data-lucide="image" class="w-5 h-5 text-indigo-400"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="font-medium text-gray-900 truncate max-w-[200px]">${a.title || 'Без названия'}</p>
                                    <p class="text-xs text-gray-400">#${artId} &middot; ${dateStr}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <p class="text-sm text-gray-700">${artistName}</p>
                            <p class="text-xs text-gray-400">${a.year_created || ''}</p>
                        </td>
                        <td class="px-4 py-3 hidden md:table-cell">
                            <p class="text-sm text-gray-700">${a.style || '—'}</p>
                            <p class="text-xs text-gray-400">${a.epoch || ''} ${a.country ? '&middot; ' + a.country : ''}</p>
                        </td>
                        <td class="px-4 py-3 hidden lg:table-cell">
                            <span class="text-sm text-gray-600">${collectionName}</span>
                        </td>
                        <td class="px-4 py-3 hidden lg:table-cell">
                            <div class="flex items-center gap-1.5">
                                <i data-lucide="${storage.icon}" class="w-4 h-4 text-${storageColor}-500"></i>
                                <span class="text-xs text-gray-600">${storage.type}</span>
                            </div>
                            ${storage.filename ? `<p class="text-[10px] text-gray-400 truncate max-w-[140px] mt-0.5" title="${storage.filename}">${storage.filename}</p>` : ''}
                        </td>
                        <td class="px-4 py-3">${getStatusBadge(a.status)}</td>
                        <td class="px-4 py-3">
                            <div class="flex gap-1">
                                ${a.image_url ? `<a href="${a.image_url}" target="_blank" class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Открыть изображение"><i data-lucide="external-link" class="w-4 h-4 text-gray-500"></i></a>` : ''}
                                <button onclick="deleteArtwork(${artId})" class="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Удалить"><i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i></button>
                            </div>
                        </td>
                    </tr>`;
                }).join('');

                lucide.createIcons();
            } catch (error) {
                tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-12 text-center text-red-500"><i data-lucide="alert-circle" class="w-6 h-6 mx-auto mb-2"></i><p>Ошибка загрузки: ${error.message}</p></td></tr>`;
                lucide.createIcons();
            }
        }

        window.deleteArtwork = async function(id) {
            if (!confirm('Удалить этот экспонат? Он будет перемещён в архив.')) return;
            try {
                const res = await fetch(`/api/artworks/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ archived_by: 'admin' }) });
                if (res.ok) {
                    toastSuccess('Экспонат удалён и перемещён в архив');
                    loadArtworks();
                } else {
                    const data = await res.json();
                    toastError(data.error || 'Ошибка удаления');
                }
            } catch (e) {
                toastError('Ошибка: ' + e.message);
            }
        };

        document.getElementById('artworkSearch')?.addEventListener('input', () => {
            clearTimeout(artworksSearchTimeout);
            artworksSearchTimeout = setTimeout(() => { artworksCurrentOffset = 0; loadArtworks(); }, 400);
        });

        ['artworkStatusFilter', 'artworkStyleFilter', 'artworkCountryFilter', 'artworkEpochFilter', 'artworkCollectionFilter'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => { artworksCurrentOffset = 0; loadArtworks(); });
        });

        document.getElementById('artworkResetFilters')?.addEventListener('click', () => {
            document.getElementById('artworkSearch').value = '';
            document.getElementById('artworkStatusFilter').value = '';
            document.getElementById('artworkStyleFilter').value = '';
            document.getElementById('artworkCountryFilter').value = '';
            document.getElementById('artworkEpochFilter').value = '';
            document.getElementById('artworkCollectionFilter').value = '';
            artworksCurrentOffset = 0;
            loadArtworks();
        });

        document.getElementById('artworksPrevBtn')?.addEventListener('click', () => {
            artworksCurrentOffset = Math.max(0, artworksCurrentOffset - artworksPageSize);
            loadArtworks();
        });

        document.getElementById('artworksNextBtn')?.addEventListener('click', () => {
            artworksCurrentOffset += artworksPageSize;
            loadArtworks();
        });

        document.querySelector('[data-tab="artworks"]')?.addEventListener('click', () => {
            setTimeout(() => { loadArtworkFilters(); loadArtworks(); }, 50);
        });

        function escapeHtml(str) {
            if (!str) return '';
            return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        }

        // ===== Users Management =====
        let usersCurrentOffset = 0;
        const usersPageSize = 20;
        let usersSearchTimeout = null;

        const roleLabels = {
            admin: 'Администратор',
            curator: 'Куратор',
            staff: 'Сотрудник',
            guide: 'Экскурсовод',
            user: 'Пользователь'
        };

        const roleColors = {
            admin: { bg: 'bg-red-100', text: 'text-red-700' },
            curator: { bg: 'bg-purple-100', text: 'text-purple-700' },
            staff: { bg: 'bg-amber-100', text: 'text-amber-700' },
            guide: { bg: 'bg-teal-100', text: 'text-teal-700' },
            user: { bg: 'bg-blue-100', text: 'text-blue-700' }
        };

        function getRoleBadge(role) {
            const label = roleLabels[role] || role || '—';
            const c = roleColors[role] || { bg: 'bg-gray-100', text: 'text-gray-600' };
            return `<span class="${c.bg} ${c.text} px-2.5 py-1 rounded-full text-xs font-medium">${label}</span>`;
        }

        function getUserInitials(name) {
            if (!name) return '??';
            const parts = name.trim().split(/\s+/);
            if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
            return name.substring(0, 2).toUpperCase();
        }

        const avatarColors = ['indigo', 'green', 'amber', 'purple', 'teal', 'rose', 'sky', 'orange'];
        function getAvatarColor(id) {
            return avatarColors[(id || 0) % avatarColors.length];
        }

        async function loadUsers() {
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-400"><i data-lucide="loader-2" class="w-6 h-6 mx-auto mb-2 animate-spin"></i>Загрузка...</td></tr>';
            lucide.createIcons();

            const params = new URLSearchParams();
            const search = document.getElementById('userSearch')?.value;
            const role = document.getElementById('roleFilter')?.value;

            if (search) params.set('search', search);
            if (role) params.set('role', role);
            params.set('limit', usersPageSize);
            params.set('offset', usersCurrentOffset);

            try {
                const res = await fetch(`/api/admin/users?${params.toString()}`);
                if (!res.ok) throw new Error('Ошибка загрузки');
                const data = await res.json();
                const users = data.users || [];
                const total = data.total || 0;

                document.getElementById('usersTotalBadge').textContent = `${total} чел.`;

                const from = total === 0 ? 0 : usersCurrentOffset + 1;
                const to = Math.min(usersCurrentOffset + usersPageSize, total);
                document.getElementById('usersShowing').textContent = `${from}–${to} из ${total}`;

                const prevBtn = document.getElementById('usersPrevBtn');
                const nextBtn = document.getElementById('usersNextBtn');
                prevBtn.disabled = usersCurrentOffset === 0;
                nextBtn.disabled = usersCurrentOffset + usersPageSize >= total;

                if (users.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-400"><i data-lucide="users" class="w-8 h-8 mx-auto mb-2"></i><p>Пользователи не найдены</p></td></tr>';
                    lucide.createIcons();
                    return;
                }

                tbody.innerHTML = users.map(u => {
                    const safeName = escapeHtml(u.username);
                    const safeEmail = escapeHtml(u.email);
                    const initials = getUserInitials(u.username);
                    const color = getAvatarColor(u.user_id);
                    const dateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('ru-RU') : '—';

                    return `<tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td class="px-4 py-3 text-sm text-gray-400">${u.user_id}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span class="text-sm font-medium text-${color}-600">${initials}</span>
                                </div>
                                <span class="font-medium text-gray-900">${safeName || '—'}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">${safeEmail || '—'}</td>
                        <td class="px-4 py-3">${getRoleBadge(u.role)}</td>
                        <td class="px-4 py-3 text-sm text-gray-500">${dateStr}</td>
                        <td class="px-4 py-3">
                            <div class="flex gap-1">
                                <button onclick="openUserEdit(${u.user_id}, '${safeName.replace(/'/g, "\\'")}', '${safeEmail.replace(/'/g, "\\'")}', '${u.role || 'user'}')" class="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Редактировать">
                                    <i data-lucide="edit" class="w-4 h-4 text-gray-600"></i>
                                </button>
                                <button onclick="deleteUser(${u.user_id}, '${safeName.replace(/'/g, "\\'")}')" class="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                                    <i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                }).join('');

                lucide.createIcons();
            } catch (error) {
                tbody.innerHTML = `<tr><td colspan="6" class="px-4 py-8 text-center text-red-500"><i data-lucide="alert-circle" class="w-6 h-6 mx-auto mb-2"></i><p>Ошибка загрузки: ${error.message}</p></td></tr>`;
                lucide.createIcons();
            }
        }

        window.openUserEdit = function(id, username, email, role) {
            document.getElementById('editUserId').value = id;
            document.getElementById('editUsername').value = username;
            document.getElementById('editEmail').value = email;
            document.getElementById('editRole').value = role;
            const modal = document.getElementById('userEditModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            lucide.createIcons();
        };

        window.closeUserModal = function() {
            const modal = document.getElementById('userEditModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        window.saveUser = async function(event) {
            event.preventDefault();
            const userId = document.getElementById('editUserId').value;
            const username = document.getElementById('editUsername').value.trim();
            const email = document.getElementById('editEmail').value.trim();
            const role = document.getElementById('editRole').value;

            if (!username || !email) {
                toastError('Имя и email обязательны');
                return;
            }

            try {
                const res = await fetch(`/api/admin/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, role })
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    toastSuccess('Профиль обновлён');
                    closeUserModal();
                    loadUsers();
                } else {
                    toastError(data.error || 'Ошибка обновления');
                }
            } catch (e) {
                toastError('Ошибка: ' + e.message);
            }
        };

        window.deleteUser = async function(id, name) {
            if (!confirm(`Удалить пользователя "${name}"? Это действие необратимо.`)) return;
            try {
                const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toastSuccess('Пользователь удалён');
                    loadUsers();
                } else {
                    const data = await res.json();
                    toastError(data.error || 'Ошибка удаления');
                }
            } catch (e) {
                toastError('Ошибка: ' + e.message);
            }
        };

        window.usersPageChange = function(dir) {
            usersCurrentOffset = Math.max(0, usersCurrentOffset + dir * usersPageSize);
            loadUsers();
        };

        document.getElementById('userSearch')?.addEventListener('input', () => {
            clearTimeout(usersSearchTimeout);
            usersSearchTimeout = setTimeout(() => { usersCurrentOffset = 0; loadUsers(); }, 400);
        });

        document.getElementById('roleFilter')?.addEventListener('change', () => {
            usersCurrentOffset = 0;
            loadUsers();
        });

        document.querySelector('[data-tab="users"]')?.addEventListener('click', () => {
            setTimeout(() => loadUsers(), 50);
        });

        // Knowledge Base Management
        const AI_SERVICE_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:8000' 
            : `${window.location.protocol}//${window.location.host.replace(/:\d+$/, '')}:8000`;
        
        async function loadKnowledgeStats() {
            try {
                const response = await fetch(`${AI_SERVICE_URL}/api/v1/external/sources/stats`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Update source counts
                    const sources = data.sources || {};
                    document.getElementById('metCount').textContent = `${sources.met || 0} записей`;
                    document.getElementById('rijksCount').textContent = `${sources.rijksmuseum || sources.rijks || 0} записей`;
                    document.getElementById('harvardCount').textContent = `${sources.harvard || 0} записей`;
                    document.getElementById('wikiartCount').textContent = `${sources.wikiart || 0} записей`;
                    document.getElementById('externalCount').textContent = data.total_indexed || 0;
                }
                
                // Try to get RAG stats
                const ragResponse = await fetch(`${AI_SERVICE_URL}/api/v1/rag/stats`);
                if (ragResponse.ok) {
                    const ragData = await ragResponse.json();
                    document.getElementById('artworksCount').textContent = ragData.artworks_count || 0;
                    document.getElementById('pdfChunksCount').textContent = ragData.pdf_chunks_count || 0;
                    document.getElementById('totalVectors').textContent = ragData.total_vectors || 0;
                }
            } catch (error) {
                console.log('Stats load error:', error);
            }
        }

        document.getElementById('refreshStatsBtn')?.addEventListener('click', loadKnowledgeStats);

        // Show/hide API key field based on source
        document.getElementById('fetchSource')?.addEventListener('change', (e) => {
            const apiKeyField = document.getElementById('apiKeyField');
            if (e.target.value === 'rijks' || e.target.value === 'harvard') {
                apiKeyField.classList.remove('hidden');
            } else {
                apiKeyField.classList.add('hidden');
            }
        });

        // Fetch external form submission
        document.getElementById('fetchExternalForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const source = document.getElementById('fetchSource').value;
            const query = document.getElementById('fetchQuery').value || 'paintings';
            const apiKey = document.getElementById('fetchApiKey').value;
            const indexToQdrant = document.getElementById('indexToQdrant').checked;
            
            const progressEl = document.getElementById('fetchProgress');
            const resultEl = document.getElementById('fetchResult');
            const submitBtn = document.getElementById('startFetchBtn');
            
            progressEl.classList.remove('hidden');
            resultEl.classList.add('hidden');
            submitBtn.disabled = true;
            document.getElementById('fetchProgressText').textContent = `Загрузка из ${source}...`;
            
            try {
                const requestBody = {
                    query: query,
                    index_to_qdrant: indexToQdrant
                };
                
                if (apiKey) {
                    requestBody.api_key = apiKey;
                }
                
                const response = await fetch(`${AI_SERVICE_URL}/api/v1/external/fetch/${source}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    resultEl.className = 'mt-4 p-4 rounded-xl bg-green-50 text-green-800';
                    resultEl.innerHTML = `
                        <div class="flex items-center gap-2 mb-2">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                            <span class="font-medium">Загрузка завершена</span>
                        </div>
                        <p class="text-sm">Загружено: ${data.fetched || 0} записей</p>
                        ${data.indexed ? `<p class="text-sm">Индексировано: ${data.indexed}</p>` : ''}
                    `;
                    loadKnowledgeStats();
                } else {
                    resultEl.className = 'mt-4 p-4 rounded-xl bg-red-50 text-red-800';
                    resultEl.innerHTML = `
                        <div class="flex items-center gap-2">
                            <i data-lucide="alert-circle" class="w-5 h-5"></i>
                            <span class="font-medium">Ошибка: ${data.detail || 'Неизвестная ошибка'}</span>
                        </div>
                    `;
                }
            } catch (error) {
                resultEl.className = 'mt-4 p-4 rounded-xl bg-red-50 text-red-800';
                resultEl.innerHTML = `
                    <div class="flex items-center gap-2">
                        <i data-lucide="alert-circle" class="w-5 h-5"></i>
                        <span class="font-medium">Ошибка подключения: ${error.message}</span>
                    </div>
                `;
            } finally {
                progressEl.classList.add('hidden');
                resultEl.classList.remove('hidden');
                submitBtn.disabled = false;
                lucide.createIcons();
            }
        });

        // Quick fetch buttons
        document.querySelectorAll('.fetch-source-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const source = btn.dataset.source;
                document.getElementById('fetchSource').value = source;
                document.getElementById('fetchSource').dispatchEvent(new Event('change'));
                document.getElementById('fetchQuery').focus();
            });
        });

        // Reindex buttons
        document.getElementById('reindexArtworksBtn')?.addEventListener('click', async () => {
            if (!confirm('Переиндексировать все оцифрованные работы?')) return;
            
            try {
                const response = await fetch(`${AI_SERVICE_URL}/api/v1/artworks/reindex`, {
                    method: 'POST'
                });
                if (response.ok) {
                    toastSuccess('Переиндексация запущена');
                    loadKnowledgeStats();
                }
            } catch (error) {
                toastError('Ошибка переиндексации: ' + error.message);
            }
        });

        document.getElementById('reindexPdfsBtn')?.addEventListener('click', async () => {
            if (!confirm('Переиндексировать все PDF документы?')) return;
            
            try {
                const response = await fetch(`${AI_SERVICE_URL}/api/v1/pdfs/reindex`, {
                    method: 'POST'
                });
                if (response.ok) {
                    toastSuccess('Переиндексация запущена');
                    loadKnowledgeStats();
                }
            } catch (error) {
                toastError('Ошибка переиндексации: ' + error.message);
            }
        });

        document.getElementById('reindexExternalBtn')?.addEventListener('click', async () => {
            if (!confirm('Переиндексировать все внешние источники?')) return;
            
            try {
                const response = await fetch(`${AI_SERVICE_URL}/api/v1/external/reindex`, {
                    method: 'POST'
                });
                if (response.ok) {
                    toastSuccess('Переиндексация запущена');
                    loadKnowledgeStats();
                }
            } catch (error) {
                toastError('Ошибка переиндексации: ' + error.message);
            }
        });

        // Load stats on knowledge tab open
        document.querySelector('[data-tab="knowledge"]')?.addEventListener('click', loadKnowledgeStats);

        // DevOps Infrastructure Monitoring
        function updateStatusBadge(elementId, status, latency) {
            const badge = document.getElementById(elementId);
            if (!badge) return;
            
            badge.className = 'px-3 py-1 text-xs font-medium rounded-full ';
            
            switch(status) {
                case 'ok':
                case 'connected':
                    badge.className += 'bg-green-100 text-green-700';
                    badge.textContent = latency ? `OK (${latency}ms)` : 'Подключено';
                    break;
                case 'configured':
                    badge.className += 'bg-blue-100 text-blue-700';
                    badge.textContent = 'Настроено';
                    break;
                case 'not_configured':
                    badge.className += 'bg-yellow-100 text-yellow-700';
                    badge.textContent = 'Не настроено';
                    break;
                case 'disconnected':
                case 'error':
                    badge.className += 'bg-red-100 text-red-700';
                    badge.textContent = 'Отключено';
                    break;
                default:
                    badge.className += 'bg-gray-100 text-gray-600';
                    badge.textContent = 'Неизвестно';
            }
        }

        function addLog(message, type = 'info') {
            const logsEl = document.getElementById('infraLogs');
            if (!logsEl) return;
            
            const time = new Date().toLocaleTimeString();
            const colors = {
                'info': 'text-blue-400',
                'success': 'text-green-400',
                'error': 'text-red-400',
                'warn': 'text-yellow-400'
            };
            
            const logLine = document.createElement('p');
            logLine.className = colors[type] || 'text-gray-300';
            logLine.textContent = `[${time}] ${message}`;
            logsEl.appendChild(logLine);
            logsEl.scrollTop = logsEl.scrollHeight;
        }

        function clearLogs() {
            const logsEl = document.getElementById('infraLogs');
            if (logsEl) logsEl.innerHTML = '';
        }

        async function checkInfrastructure() {
            clearLogs();
            addLog('Начинаем проверку инфраструктуры...', 'info');

            try {
                addLog('Проверка Virtual Gallery API...', 'info');
                const galleryResponse = await fetch('/api/health');
                const galleryData = await galleryResponse.json();
                updateStatusBadge('galleryStatusBadge', galleryData.status);
                addLog(`Virtual Gallery: ${galleryData.status === 'ok' ? 'работает' : 'ошибка'}`, galleryData.status === 'ok' ? 'success' : 'error');

                addLog('Проверка AI/ML сервиса...', 'info');
                const aiResponse = await fetch('/api/ai/health');
                const aiData = await aiResponse.json();
                updateStatusBadge('aimlStatusBadge', aiData.status);
                addLog(`AI/ML Service: ${aiData.status === 'connected' ? 'подключен' : 'отключен'}`, aiData.status === 'connected' ? 'success' : 'error');

                addLog('Получение полного статуса инфраструктуры...', 'info');
                const infraResponse = await fetch('/api/infra/status');
                const infraData = await infraResponse.json();

                if (infraData.services) {
                    const s = infraData.services;
                    
                    updateStatusBadge('dbStatusBadge', s.database?.status, s.database?.latency);
                    addLog(`PostgreSQL: ${s.database?.status === 'ok' ? 'подключен' : s.database?.error || 'отключен'}`, s.database?.status === 'ok' ? 'success' : 'error');
                    
                    updateStatusBadge('storageStatusBadge', s.storage?.status, s.storage?.latency);
                    addLog(`S3 Storage: ${s.storage?.status === 'ok' ? 'подключен' : s.storage?.status === 'not_configured' ? 'не настроен' : 'отключен'}`, s.storage?.status === 'ok' ? 'success' : s.storage?.status === 'not_configured' ? 'warn' : 'error');
                    
                    updateStatusBadge('qdrantStatusBadge', s.qdrant?.status, s.qdrant?.latency);
                    addLog(`Qdrant Cloud: ${s.qdrant?.status === 'ok' ? 'подключен' : s.qdrant?.status === 'not_configured' ? 'не настроен' : 'отключен'}`, s.qdrant?.status === 'ok' ? 'success' : s.qdrant?.status === 'not_configured' ? 'warn' : 'error');
                    
                    updateStatusBadge('redisStatusBadge', s.redis?.status, s.redis?.latency);
                    addLog(`Redis: ${s.redis?.status === 'ok' ? 'подключен' : s.redis?.status === 'not_configured' ? 'не настроен' : 'отключен'}`, s.redis?.status === 'ok' ? 'success' : s.redis?.status === 'not_configured' ? 'warn' : 'error');
                    
                    updateStatusBadge('openrouterStatusBadge', s.openrouter?.status);
                    addLog(`OpenRouter API: ${s.openrouter?.status === 'configured' ? 'настроен' : 'не настроен'}`, s.openrouter?.status === 'configured' ? 'success' : 'warn');
                }

                addLog('Проверка завершена', 'success');
            } catch (error) {
                addLog(`Ошибка проверки: ${error.message}`, 'error');
            }
        }

        document.getElementById('refreshInfraBtn')?.addEventListener('click', checkInfrastructure);
        document.getElementById('testAllBtn')?.addEventListener('click', checkInfrastructure);
        document.querySelector('[data-tab="devops"]')?.addEventListener('click', () => {
            setTimeout(checkInfrastructure, 100);
        });

        async function loadDisplaySettings() {
            const container = document.getElementById('displaySettingsList');
            try {
                const response = await fetch('/api/display-settings');
                const data = await response.json();
                if (!data.settings || data.settings.length === 0) {
                    container.innerHTML = '<div class="text-center py-6 text-gray-400">Нет настроек</div>';
                    return;
                }
                const ratioOptions = ['1:1', '3:2', '4:3', '3:4', '16:9', '9:16', '2:3'];
                const fitOptions = [
                    { value: 'cover', label: 'Заполнение (cover)' },
                    { value: 'contain', label: 'Вписать (contain)' },
                    { value: 'fill', label: 'Растянуть (fill)' },
                ];
                container.innerHTML = data.settings.map(s => `
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100" data-setting-key="${s.section_key}">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="font-semibold text-gray-900">${s.section_label}</h3>
                            <span class="text-xs text-gray-400">${s.section_key}</span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">Пропорции</label>
                                <select class="ds-ratio w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400">
                                    ${ratioOptions.map(r => `<option value="${r}" ${r === s.aspect_ratio ? 'selected' : ''}>${r}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">Режим отображения</label>
                                <select class="ds-fit w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400">
                                    ${fitOptions.map(f => `<option value="${f.value}" ${f.value === s.object_fit ? 'selected' : ''}>${f.label}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600 mb-1">Макс. высота (px)</label>
                                <div class="flex gap-2">
                                    <input type="number" class="ds-height flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400" value="${s.max_height}" min="48" max="1200">
                                    <button onclick="saveDisplaySetting('${s.section_key}')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1">
                                        <i data-lucide="save" class="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                lucide.createIcons();
            } catch (error) {
                container.innerHTML = '<div class="text-center py-6 text-red-500">Ошибка загрузки настроек</div>';
            }
        }

        async function saveDisplaySetting(key) {
            const row = document.querySelector(`[data-setting-key="${key}"]`);
            if (!row) return;
            const aspect_ratio = row.querySelector('.ds-ratio').value;
            const object_fit = row.querySelector('.ds-fit').value;
            const max_height = row.querySelector('.ds-height').value;
            try {
                const response = await fetch(`/api/display-settings/${key}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ aspect_ratio, object_fit, max_height: parseInt(max_height) })
                });
                if (!response.ok) throw new Error('Failed to save');
                toastSuccess('Настройки отображения сохранены');
            } catch (error) {
                toastError('Ошибка сохранения: ' + error.message);
            }
        }

        let currentArchiveFilter = '';

        async function loadArchive(type = '') {
            currentArchiveFilter = type;
            const list = document.getElementById('archiveList');
            list.innerHTML = `
                <div class="text-center py-8 text-gray-400">
                    <i data-lucide="loader-2" class="w-8 h-8 mx-auto mb-2 animate-spin"></i>
                    <p>Загрузка архива...</p>
                </div>
            `;
            lucide.createIcons();

            try {
                const url = type ? `/api/archive?type=${type}` : '/api/archive';
                const [itemsRes, statsRes] = await Promise.all([
                    fetch(url),
                    fetch('/api/archive/stats')
                ]);
                const itemsData = await itemsRes.json();
                const statsData = await statsRes.json();
                const items = itemsData.items || [];
                const stats = statsData.stats || { total: 0, by_type: [] };

                document.getElementById('archiveTotalCount').textContent = stats.total;
                const typeMap = {};
                stats.by_type.forEach(t => typeMap[t.entity_type] = parseInt(t.count));
                document.getElementById('archiveArtworksCount').textContent = typeMap.artwork || 0;
                document.getElementById('archiveCollectionsCount').textContent = typeMap.collection || 0;
                document.getElementById('archiveRoomsCount').textContent = typeMap.room || 0;

                if (items.length === 0) {
                    list.innerHTML = `
                        <div class="text-center py-12 text-gray-400">
                            <i data-lucide="archive" class="w-12 h-12 mx-auto mb-3"></i>
                            <p class="text-lg font-medium">Архив пуст</p>
                            <p class="text-sm mt-1">Удалённые элементы будут отображаться здесь</p>
                        </div>
                    `;
                    lucide.createIcons();
                    return;
                }

                list.innerHTML = items.map(item => {
                    const data = item.entity_data;
                    const srcLoc = item.source_location || null;
                    const typeLabels = { artwork: 'Экспонат', collection: 'Коллекция', room: 'Зал' };
                    const typeColors = { artwork: 'blue', collection: 'purple', room: 'amber' };
                    const typeIcons = { artwork: 'image', collection: 'folder', room: 'layout-grid' };
                    const color = typeColors[item.entity_type] || 'gray';
                    const icon = typeIcons[item.entity_type] || 'archive';
                    const label = typeLabels[item.entity_type] || item.entity_type;

                    let title = '', subtitle = '', imgUrl = '';
                    if (item.entity_type === 'artwork') {
                        title = data.title || 'Без названия';
                        subtitle = data.artist_name || data.artist || 'Неизвестен';
                        imgUrl = data.image_url || '';
                    } else if (item.entity_type === 'collection') {
                        title = data.name || 'Без названия';
                        subtitle = data.description || '';
                    } else if (item.entity_type === 'room') {
                        title = data.name || 'Без названия';
                        subtitle = `${data.width || '?'}x${data.depth || '?'}x${data.height || '?'}м, тема: ${data.theme || '?'}`;
                    }

                    const date = new Date(item.archived_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

                    let sourceInfo = '';
                    if (srcLoc && (srcLoc.label || srcLoc.section)) {
                        const srcLabel = srcLoc.label || srcLoc.section || '';
                        const srcDetail = srcLoc.detail || '';
                        sourceInfo = `<p class="text-xs text-indigo-500 mt-1 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> Откуда: ${srcLabel}${srcDetail ? ' — ' + srcDetail : ''}</p>`;
                    }

                    return `
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                            ${imgUrl ? `<img src="${imgUrl}" alt="" class="w-16 h-16 object-cover rounded-xl flex-shrink-0">` : 
                              `<div class="w-16 h-16 bg-${color}-100 rounded-xl flex items-center justify-center flex-shrink-0"><i data-lucide="${icon}" class="w-7 h-7 text-${color}-600"></i></div>`}
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="px-2 py-0.5 bg-${color}-100 text-${color}-700 text-xs font-medium rounded-full">${label}</span>
                                    <span class="text-xs text-gray-400">${date}</span>
                                </div>
                                <h4 class="font-semibold text-gray-900 truncate">${title}</h4>
                                <p class="text-sm text-gray-500 truncate">${subtitle}</p>
                                ${item.reason ? `<p class="text-xs text-gray-400 mt-1">Причина: ${item.reason}</p>` : ''}
                                ${sourceInfo}
                            </div>
                            <div class="flex gap-2 flex-shrink-0">
                                <button onclick="restoreArchiveItem(${item.archive_id})" class="px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-1" title="Восстановить">
                                    <i data-lucide="undo-2" class="w-4 h-4"></i>
                                    Восстановить
                                </button>
                                <button onclick="permanentlyDeleteArchiveItem(${item.archive_id})" class="px-3 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors flex items-center gap-1" title="Удалить навсегда">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
                lucide.createIcons();
            } catch (error) {
                console.error('Load archive error:', error);
                list.innerHTML = `<div class="text-center py-8 text-red-500"><p>Ошибка загрузки архива</p></div>`;
            }
        }

        async function restoreArchiveItem(id) {
            if (!confirm('Восстановить этот элемент из архива?')) return;
            try {
                const response = await fetch(`/api/archive/${id}/restore`, { method: 'POST' });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to restore');
                }
                if (result.entity_type === 'room') {
                    const srcLoc = result.source_location;
                    const locationHint = srcLoc && srcLoc.detail ? ` (${srcLoc.detail})` : '';
                    toastSuccess(`Зал восстановлен${locationHint} и добавлен в конфигурацию галереи`);
                } else {
                    const srcLoc = result.source_location;
                    const locationHint = srcLoc && srcLoc.label ? ` в раздел «${srcLoc.label}»` : '';
                    toastSuccess(`Элемент успешно восстановлен${locationHint}`);
                }
                loadArchive(currentArchiveFilter);
            } catch (error) {
                toastError('Ошибка при восстановлении: ' + error.message);
            }
        }

        async function permanentlyDeleteArchiveItem(id) {
            if (!confirm('Удалить элемент из архива навсегда? Это действие необратимо!')) return;
            try {
                const response = await fetch(`/api/archive/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete');
                loadArchive(currentArchiveFilter);
            } catch (error) {
                toastError('Ошибка при удалении: ' + error.message);
            }
        }

        document.getElementById('clearArchiveBtn')?.addEventListener('click', async () => {
            const typeLabel = currentArchiveFilter ? { artwork: 'экспонаты', collection: 'коллекции', room: 'залы' }[currentArchiveFilter] || currentArchiveFilter : 'все элементы';
            if (!confirm(`Вы уверены, что хотите удалить ${typeLabel} из архива навсегда?\n\nЭто действие необратимо!`)) return;
            try {
                const url = currentArchiveFilter ? `/api/archive?type=${currentArchiveFilter}` : '/api/archive';
                const response = await fetch(url, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to clear');
                const data = await response.json();
                toastSuccess(`Удалено из архива: ${data.deleted} элементов`);
                loadArchive(currentArchiveFilter);
            } catch (error) {
                toastError('Ошибка при очистке архива: ' + error.message);
            }
        });

        document.querySelectorAll('.archive-filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.archive-filter').forEach(b => {
                    b.classList.remove('bg-indigo-100', 'text-indigo-700', 'active');
                    b.classList.add('bg-gray-100', 'text-gray-600');
                });
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                btn.classList.add('bg-indigo-100', 'text-indigo-700', 'active');
                loadArchive(btn.dataset.type);
            });
        });

        document.querySelector('[data-tab="settings"]')?.addEventListener('click', () => {
            setTimeout(() => {
                loadArchive(currentArchiveFilter);
            }, 100);
        });
