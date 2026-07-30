/**
 * baimstore - Direktori Video Edukasi YouTube
 * Main Application Logic (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Initial State & Sample Data Definition
    // ==========================================
    const STORAGE_KEY = 'baimstore_videos_v2';
    const THEME_KEY = 'baimstore_theme';

    const defaultVideos = [
        // --- PEMROGRAMAN ---
        {
            id: 'vid_prog_1',
            ytId: 'W6NZfCO5SIk',
            url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            title: 'JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour',
            author: 'Programming with Mosh',
            thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '1 Jam',
            notes: 'Panduan fundamental JavaScript modern: variabel, fungsi, objek, array, dan DOM manipulation dasar.',
            completed: true,
            createdAt: Date.now() - 86400000 * 18
        },
        {
            id: 'vid_prog_2',
            ytId: '_uQrJ0TkZlc',
            url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            title: 'Python Tutorial for Beginners - Full Course',
            author: 'FreeCodeCamp',
            thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '6 Jam',
            notes: 'Mempelajari dasar pemrograman Python dari variabel, struktur data, fungsi hingga pembuatan proyek nyata.',
            completed: false,
            createdAt: Date.now() - 86400000 * 17
        },
        {
            id: 'vid_prog_3',
            ytId: 'NBZ9Ro6UKV8',
            url: 'https://www.youtube.com/watch?v=NBZ9Ro6UKV8',
            title: 'HTML & CSS Dasar untuk Pemula - Web Development',
            author: 'Web Programming Unpas',
            thumbnail: 'https://img.youtube.com/vi/NBZ9Ro6UKV8/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '35 Menit',
            notes: 'Pengenalan struktur tag HTML5 dan teknik styling CSS3 untuk membangun tata letak situs web modern.',
            completed: true,
            createdAt: Date.now() - 86400000 * 16
        },
        {
            id: 'vid_prog_4',
            ytId: 'lTMZuM0fCh4',
            url: 'https://www.youtube.com/watch?v=lTMZuM0fCh4',
            title: 'Git & GitHub Tutorial Lengkap untuk Pemula',
            author: 'Web Programming Unpas',
            thumbnail: 'https://img.youtube.com/vi/lTMZuM0fCh4/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '45 Menit',
            notes: 'Panduan kontrol versi dengan Git: commit, branching, merging, push, dan kolaborasi repositori di GitHub.',
            completed: false,
            createdAt: Date.now() - 86400000 * 15
        },
        {
            id: 'vid_prog_5',
            ytId: 'bMknfKXIFA8',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            title: 'React JS Tutorial for Beginners',
            author: 'Programming with Mosh',
            thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '2 Jam',
            notes: 'Konsep dasar React JS: Component, JSX, Props, State, Hooks (useState, useEffect), dan struktur aplikasi web.',
            completed: false,
            createdAt: Date.now() - 86400000 * 14
        },
        {
            id: 'vid_prog_6',
            ytId: '8hly31xKLI0',
            url: 'https://www.youtube.com/watch?v=8hly31xKLI0',
            title: 'Struktur Data dan Algoritma Dasar',
            author: 'freeCodeCamp',
            thumbnail: 'https://img.youtube.com/vi/8hly31xKLI0/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '5 Jam',
            notes: 'Pemahaman Big O Notation, Array, Linked List, Stack, Queue, Hash Table, serta algoritma pencarian & pengurutan.',
            completed: false,
            createdAt: Date.now() - 86400000 * 13
        },
        {
            id: 'vid_prog_7',
            ytId: 'vLnPwxZdW4Y',
            url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
            title: 'C++ Programming Course - Beginner to Advanced',
            author: 'freeCodeCamp',
            thumbnail: 'https://img.youtube.com/vi/vLnPwxZdW4Y/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '4 Jam',
            notes: 'Konsep dasar hingga lanjutan pemrograman C++: pointer, manajemen memori, OOP, dan manipulasi data.',
            completed: false,
            createdAt: Date.now() - 86400000 * 12
        },

        // --- MATEMATIKA & SAINS ---
        {
            id: 'vid_math_1',
            ytId: 'fNk_zzaMoSs',
            url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
            title: 'Vectors | Chapter 1, Essence of Linear Algebra',
            author: '3Blue1Brown',
            thumbnail: 'https://img.youtube.com/vi/fNk_zzaMoSs/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '10 Menit',
            notes: 'Visualisasi matematika intuitif mengenai konsep dasar vektor, penjumlahan vektor, dan perkalian skalar.',
            completed: true,
            createdAt: Date.now() - 86400000 * 11
        },
        {
            id: 'vid_math_2',
            ytId: 'WUvTyaaNkzM',
            url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
            title: 'The Essence of Calculus | Chapter 1',
            author: '3Blue1Brown',
            thumbnail: 'https://img.youtube.com/vi/WUvTyaaNkzM/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '17 Menit',
            notes: 'Pendekatan geometri visual untuk memahami konsep turunan (derivative) dan integral dalam kalkulus.',
            completed: false,
            createdAt: Date.now() - 86400000 * 10
        },
        {
            id: 'vid_math_3',
            ytId: 'PUB0TaZ7bhA',
            url: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
            title: 'Trigonometri Dasar & Pengaplikasiannya',
            author: 'Khan Academy',
            thumbnail: 'https://img.youtube.com/vi/PUB0TaZ7bhA/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '20 Menit',
            notes: 'Memahami sinus, kosinus, tangen, teorema Pythagoras, dan rasio sudut pada segitiga siku-siku.',
            completed: false,
            createdAt: Date.now() - 86400000 * 9
        },
        {
            id: 'vid_math_4',
            ytId: 'kYB8IZa5AuE',
            url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
            title: 'Matriks dan Transformasi Geometri Ruang',
            author: '3Blue1Brown',
            thumbnail: 'https://img.youtube.com/vi/kYB8IZa5AuE/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '12 Menit',
            notes: 'Bagaimana operasi matriks memetakan dan mentransformasikan koordinat dalam ruang aljabar linear.',
            completed: false,
            createdAt: Date.now() - 86400000 * 8
        },
        {
            id: 'vid_math_5',
            ytId: 'EefR8C3AIfE',
            url: 'https://www.youtube.com/watch?v=EefR8C3AIfE',
            title: 'Persamaan Kuadrat & Metode Penyelesaiannya',
            author: 'Khan Academy',
            thumbnail: 'https://img.youtube.com/vi/EefR8C3AIfE/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '15 Menit',
            notes: 'Memahami 3 metode penyelesaian persamaan kuadrat: pemfaktoran, melengkapkan kuadrat, dan rumus kuadratik.',
            completed: false,
            createdAt: Date.now() - 86400000 * 7
        },
        {
            id: 'vid_math_6',
            ytId: 'uhxtUt_-GyM',
            url: 'https://www.youtube.com/watch?v=uhxtUt_-GyM',
            title: 'Statistika Dasar: Mean, Median, Modus & Varians',
            author: 'CrashCourse',
            thumbnail: 'https://img.youtube.com/vi/uhxtUt_-GyM/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '14 Menit',
            notes: 'Konsep dasar analisis statistik: pemusatan data (mean, median, modus) serta pengukur dispersi data.',
            completed: false,
            createdAt: Date.now() - 86400000 * 6
        },

        // --- BAHASA INGGRIS & KOMUNIKASI ---
        {
            id: 'vid_lang_1',
            ytId: 'juK1T_hpxG0',
            url: 'https://www.youtube.com/watch?v=juK1T_hpxG0',
            title: 'How to Speak Fluent English: 5 Actionable Tips',
            author: 'English with Lucy',
            thumbnail: 'https://img.youtube.com/vi/juK1T_hpxG0/hqdefault.jpg',
            category: 'Bahasa',
            duration: '15 Menit',
            notes: 'Strategi praktis meningkatkan kelancaran percakapan bahasa Inggris dan membangun kepercayaan diri.',
            completed: true,
            createdAt: Date.now() - 86400000 * 5
        },
        {
            id: 'vid_lang_2',
            ytId: 'rC7x0c_39sE',
            url: 'https://www.youtube.com/watch?v=rC7x0c_39sE',
            title: '100 Daily English Conversation Sentences for Beginners',
            author: 'BBC Learning English',
            thumbnail: 'https://img.youtube.com/vi/rC7x0c_39sE/hqdefault.jpg',
            category: 'Bahasa',
            duration: '25 Menit',
            notes: 'Kumpulan 100 frasa & ungkapan umum dalam percakapan bahasa Inggris sehari-hari beserta intonasi yang tepat.',
            completed: false,
            createdAt: Date.now() - 86400000 * 4
        },
        {
            id: 'vid_lang_3',
            ytId: 'AEB60h7n5gU',
            url: 'https://www.youtube.com/watch?v=AEB60h7n5gU',
            title: 'English Grammar Rules: Present Simple vs Present Continuous',
            author: 'English with Lucy',
            thumbnail: 'https://img.youtube.com/vi/AEB60h7n5gU/hqdefault.jpg',
            category: 'Bahasa',
            duration: '12 Menit',
            notes: 'Penjelasan komprehensif perbedaan tata bahasa antara Present Simple dan Present Continuous beserta contohnya.',
            completed: false,
            createdAt: Date.now() - 86400000 * 3
        },
        {
            id: 'vid_lang_4',
            ytId: 'sRFEV3R3Mto',
            url: 'https://www.youtube.com/watch?v=sRFEV3R3Mto',
            title: 'IELTS Speaking Test Tips & band 9 Answer Strategy',
            author: 'IELTS Advantage',
            thumbnail: 'https://img.youtube.com/vi/sRFEV3R3Mto/hqdefault.jpg',
            category: 'Bahasa',
            duration: '30 Menit',
            notes: 'Panduan dan strategi menjawab pertanyaan ujian IELTS Speaking untuk memperoleh nilai band tinggi.',
            completed: false,
            createdAt: Date.now() - 86400000 * 2
        },
        {
            id: 'vid_lang_5',
            ytId: 'by6v42w35n0',
            url: 'https://www.youtube.com/watch?v=by6v42w35n0',
            title: 'Vocabulary Builder: 50 Advanced English Words',
            author: 'English with Lucy',
            thumbnail: 'https://img.youtube.com/vi/by6v42w35n0/hqdefault.jpg',
            category: 'Bahasa',
            duration: '20 Menit',
            notes: 'Memperkaya kosakata bahasa Inggris tingkat lanjut (advanced) untuk konteks akademik dan komunikasi bisnis.',
            completed: false,
            createdAt: Date.now() - 86400000 * 1
        }
    ];

    let videos = loadVideos();
    let currentFilterCategory = 'all';
    let currentFilterStatus = 'all';
    let currentSortMode = 'newest';
    let currentViewMode = 'grid';
    let activePlayerVideoId = null;

    // ==========================================
    // 2. DOM Elements Selection
    // ==========================================
    // Navbar & Dashboard
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const btnOpenAddModal = document.getElementById('btnOpenAddModal');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercent = document.getElementById('progressPercent');
    const statCompleted = document.getElementById('statCompleted');
    const statTotal = document.getElementById('statTotal');

    // Controls
    const searchInput = document.getElementById('searchInput');
    const btnClearSearch = document.getElementById('btnClearSearch');
    const categoryPills = document.getElementById('categoryPills');
    const sortSelect = document.getElementById('sortSelect');
    const btnGridView = document.getElementById('btnGridView');
    const btnListView = document.getElementById('btnListView');

    // Video Container
    const videoContainer = document.getElementById('videoContainer');
    const emptyState = document.getElementById('emptyState');
    const btnResetFilters = document.getElementById('btnResetFilters');

    // Add Video Modal
    const addModal = document.getElementById('addModal');
    const btnCloseAddModal = document.getElementById('btnCloseAddModal');
    const btnCancelAdd = document.getElementById('btnCancelAdd');
    const addVideoForm = document.getElementById('addVideoForm');
    const ytUrlInput = document.getElementById('ytUrl');
    const btnFetchMetadata = document.getElementById('btnFetchMetadata');
    const oembedPreview = document.getElementById('oembedPreview');
    const previewImg = document.getElementById('previewImg');
    const previewTitle = document.getElementById('previewTitle');
    const previewAuthor = document.getElementById('previewAuthor');
    const videoTitleInput = document.getElementById('videoTitle');
    const videoCategorySelect = document.getElementById('videoCategory');
    const videoDurationInput = document.getElementById('videoDuration');
    const videoNotesInput = document.getElementById('videoNotes');

    // Player Modal
    const playerModal = document.getElementById('playerModal');
    const btnClosePlayerModal = document.getElementById('btnClosePlayerModal');
    const playerCategoryBadge = document.getElementById('playerCategoryBadge');
    const playerVideoTitle = document.getElementById('playerVideoTitle');
    const youtubeIframe = document.getElementById('youtubeIframe');
    const playerNotesText = document.getElementById('playerNotesText');
    const btnPlayerToggleStatus = document.getElementById('btnPlayerToggleStatus');

    // Edit Modal
    const editModal = document.getElementById('editModal');
    const btnCloseEditModal = document.getElementById('btnCloseEditModal');
    const btnCancelEdit = document.getElementById('btnCancelEdit');
    const editVideoForm = document.getElementById('editVideoForm');
    const editVideoId = document.getElementById('editVideoId');
    const editVideoTitle = document.getElementById('editVideoTitle');
    const editVideoCategory = document.getElementById('editVideoCategory');
    const editVideoDuration = document.getElementById('editVideoDuration');
    const editVideoNotes = document.getElementById('editVideoNotes');

    // Toast Container
    const toastContainer = document.getElementById('toastContainer');

    // ==========================================
    // 3. Helper Functions
    // ==========================================
    function loadVideos() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing stored videos, reverting to default.', e);
            }
        }
        // Save defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVideos));
        return defaultVideos;
    }

    function saveVideos() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
        updateProgressStats();
    }

    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.trim().match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconClass = 'fa-circle-info';
        if (type === 'success') iconClass = 'fa-circle-check';
        if (type === 'error') iconClass = 'fa-triangle-exclamation';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function updateProgressStats() {
        const total = videos.length;
        const completed = videos.filter(v => v.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        statTotal.textContent = total;
        statCompleted.textContent = completed;
        progressPercent.textContent = `${percentage}%`;
        progressBarFill.style.width = `${percentage}%`;
    }

    // ==========================================
    // 4. YouTube oEmbed API Integration
    // ==========================================
    async function fetchOEmbedMetadata(url) {
        const ytId = extractYouTubeId(url);
        if (!ytId) {
            showToast('Format URL YouTube tidak valid', 'error');
            return;
        }

        btnFetchMetadata.disabled = true;
        btnFetchMetadata.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengambil...</span>`;

        const oembedEndpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${ytId}`)}&format=json`;

        try {
            const response = await fetch(oembedEndpoint);
            if (response.ok) {
                const data = await response.json();
                
                // Populate fields
                videoTitleInput.value = data.title || '';
                previewTitle.textContent = data.title || 'Judul Video';
                previewAuthor.innerHTML = `<i class="fa-regular fa-circle-user"></i> ${data.author_name || 'YouTube Channel'}`;
                previewImg.src = data.thumbnail_url || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                
                oembedPreview.classList.remove('hidden');
                showToast('Informasi video berhasil diambil via oEmbed API!', 'success');
            } else {
                throw new Error('Gagal mengambil data oEmbed');
            }
        } catch (err) {
            console.warn('oEmbed API fetch failed, fallback to direct thumbnail resolution:', err);
            // Fallback: resolution via YouTube ID
            const fallbackTitle = `Video Edukasi YouTube (${ytId})`;
            videoTitleInput.value = fallbackTitle;
            previewTitle.textContent = fallbackTitle;
            previewAuthor.innerHTML = `<i class="fa-regular fa-circle-user"></i> YouTube Edu`;
            previewImg.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
            
            oembedPreview.classList.remove('hidden');
            showToast('Thumbnail berhasil dimuat (Judul dapat disesuaikan manual)', 'info');
        } finally {
            btnFetchMetadata.disabled = false;
            btnFetchMetadata.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Ambil Info</span>`;
        }
    }

    // Auto trigger fetch when pasting or blurring URL field
    ytUrlInput.addEventListener('blur', () => {
        const val = ytUrlInput.value.trim();
        if (val && extractYouTubeId(val)) {
            fetchOEmbedMetadata(val);
        }
    });

    btnFetchMetadata.addEventListener('click', () => {
        const val = ytUrlInput.value.trim();
        if (!val) {
            showToast('Masukkan URL YouTube terlebih dahulu', 'error');
            return;
        }
        fetchOEmbedMetadata(val);
    });

    // ==========================================
    // 5. Render Video Directory
    // ==========================================
    function renderVideos() {
        let filtered = [...videos];

        // 1. Search Query Filter
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            filtered = filtered.filter(v => 
                v.title.toLowerCase().includes(query) ||
                (v.notes && v.notes.toLowerCase().includes(query)) ||
                (v.category && v.category.toLowerCase().includes(query)) ||
                (v.author && v.author.toLowerCase().includes(query))
            );
        }

        // 2. Category Filter
        if (currentFilterCategory !== 'all') {
            filtered = filtered.filter(v => v.category === currentFilterCategory);
        }

        // 3. Status Filter
        if (currentFilterStatus === 'completed') {
            filtered = filtered.filter(v => v.completed);
        } else if (currentFilterStatus === 'uncompleted') {
            filtered = filtered.filter(v => !v.completed);
        }

        // 4. Sorting Logic
        filtered.sort((a, b) => {
            if (currentSortMode === 'newest') return b.createdAt - a.createdAt;
            if (currentSortMode === 'oldest') return a.createdAt - b.createdAt;
            if (currentSortMode === 'title-asc') return a.title.localeCompare(b.title);
            if (currentSortMode === 'title-desc') return b.title.localeCompare(a.title);
            if (currentSortMode === 'status') return Number(a.completed) - Number(b.completed);
            return 0;
        });

        // Render HTML
        videoContainer.innerHTML = '';

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        } else {
            emptyState.classList.add('hidden');
        }

        filtered.forEach(vid => {
            const card = document.createElement('div');
            card.className = `video-card ${vid.completed ? 'completed' : ''}`;
            card.dataset.id = vid.id;

            card.innerHTML = `
                <div class="card-thumb-wrapper" onclick="openPlayerModal('${vid.id}')">
                    <img src="${vid.thumbnail}" alt="${escapeHtml(vid.title)}" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${vid.ytId}/hqdefault.jpg'">
                    <div class="play-overlay">
                        <div class="play-btn-circle">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <span class="category-badge">${escapeHtml(vid.category || 'Umum')}</span>
                    ${vid.duration ? `<span class="duration-badge"><i class="fa-regular fa-clock"></i> ${escapeHtml(vid.duration)}</span>` : ''}
                    ${vid.completed ? `<span class="status-badge-overlay"><i class="fa-solid fa-check"></i> Selesai</span>` : ''}
                </div>
                
                <div class="card-body">
                    <h3 class="card-title" onclick="openPlayerModal('${vid.id}')" title="${escapeHtml(vid.title)}">
                        ${escapeHtml(vid.title)}
                    </h3>
                    <p class="card-notes">${escapeHtml(vid.notes || 'Belum ada catatan ringkas.')}</p>
                    
                    <div class="card-footer">
                        <button class="btn-toggle-status" onclick="toggleVideoStatus('${vid.id}', event)">
                            <i class="fa-${vid.completed ? 'solid' : 'regular'} fa-circle-check"></i>
                            <span>${vid.completed ? 'Selesai' : 'Belum Selesai'}</span>
                        </button>
                        
                        <div class="card-actions-right">
                            <button class="btn-card-action" onclick="openEditModal('${vid.id}', event)" title="Edit Video">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            videoContainer.appendChild(card);
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[m]);
    }

    // ==========================================
    // 6. Video Actions (Add, Edit, Toggle)
    // ==========================================
    addVideoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const url = ytUrlInput.value.trim();
        const ytId = extractYouTubeId(url);

        if (!ytId) {
            showToast('URL YouTube tidak valid', 'error');
            return;
        }

        const title = videoTitleInput.value.trim() || `Video YouTube ${ytId}`;
        const category = videoCategorySelect.value;
        const duration = videoDurationInput.value.trim();
        const notes = videoNotesInput.value.trim();
        const thumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        const author = previewAuthor.textContent.trim() || 'YouTube Channel';

        const newVideo = {
            id: 'vid_' + Date.now(),
            ytId,
            url,
            title,
            author,
            thumbnail,
            category,
            duration,
            notes,
            completed: false,
            createdAt: Date.now()
        };

        videos.unshift(newVideo);
        saveVideos();
        renderVideos();
        closeAddModal();
        showToast('Video edukasi berhasil ditambahkan!', 'success');
    });

    window.toggleVideoStatus = function(id, event) {
        if (event) event.stopPropagation();
        const video = videos.find(v => v.id === id);
        if (video) {
            video.completed = !video.completed;
            saveVideos();
            renderVideos();

            // Also update player modal if it's currently open
            if (activePlayerVideoId === id) {
                updatePlayerModalStatusButton(video.completed);
            }

            const statusText = video.completed ? 'ditandai Selesai' : 'ditandai Belum Selesai';
            showToast(`Video ${statusText}`, 'info');
        }
    };


    // Edit Video
    window.openEditModal = function(id, event) {
        if (event) event.stopPropagation();
        const video = videos.find(v => v.id === id);
        if (!video) return;

        editVideoId.value = video.id;
        editVideoTitle.value = video.title;
        editVideoCategory.value = video.category || 'Umum';
        editVideoDuration.value = video.duration || '';
        editVideoNotes.value = video.notes || '';

        editModal.classList.remove('hidden');
    };

    editVideoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = editVideoId.value;
        const video = videos.find(v => v.id === id);

        if (video) {
            video.title = editVideoTitle.value.trim();
            video.category = editVideoCategory.value;
            video.duration = editVideoDuration.value.trim();
            video.notes = editVideoNotes.value.trim();

            saveVideos();
            renderVideos();
            closeEditModal();
            showToast('Detail video berhasil diperbarui!', 'success');
        }
    });

    // ==========================================
    // 7. Player Modal Operations
    // ==========================================
    window.openPlayerModal = function(id) {
        const video = videos.find(v => v.id === id);
        if (!video) return;

        activePlayerVideoId = id;
        playerCategoryBadge.textContent = video.category || 'Umum';
        playerVideoTitle.textContent = video.title;
        playerNotesText.textContent = video.notes || 'Belum ada catatan ringkas untuk video ini.';
        
        // Autoplay embed
        youtubeIframe.src = `https://www.youtube.com/embed/${video.ytId}?autoplay=1&enablejsapi=1`;

        updatePlayerModalStatusButton(video.completed);

        playerModal.classList.remove('hidden');
    };

    function updatePlayerModalStatusButton(isCompleted) {
        if (isCompleted) {
            btnPlayerToggleStatus.classList.add('is-completed');
            btnPlayerToggleStatus.innerHTML = `<i class="fa-solid fa-check"></i> <span>Selesai Ditonton</span>`;
        } else {
            btnPlayerToggleStatus.classList.remove('is-completed');
            btnPlayerToggleStatus.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>Tandai Selesai</span>`;
        }
    }

    btnPlayerToggleStatus.addEventListener('click', () => {
        if (activePlayerVideoId) {
            toggleVideoStatus(activePlayerVideoId);
        }
    });

    function closePlayerModal() {
        playerModal.classList.add('hidden');
        youtubeIframe.src = ''; // Stop video audio
        activePlayerVideoId = null;
    }

    btnClosePlayerModal.addEventListener('click', closePlayerModal);

    // Close modals on backdrop click
    playerModal.addEventListener('click', (e) => {
        if (e.target === playerModal) closePlayerModal();
    });

    function closeAddModal() {
        addModal.classList.add('hidden');
        addVideoForm.reset();
        oembedPreview.classList.add('hidden');
    }

    function closeEditModal() {
        editModal.classList.add('hidden');
    }

    btnOpenAddModal.addEventListener('click', () => addModal.classList.remove('hidden'));
    btnCloseAddModal.addEventListener('click', closeAddModal);
    btnCancelAdd.addEventListener('click', closeAddModal);
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) closeAddModal();
    });

    btnCloseEditModal.addEventListener('click', closeEditModal);
    btnCancelEdit.addEventListener('click', closeEditModal);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });

    // ==========================================
    // 8. Filters, Search & Sort Event Listeners
    // ==========================================
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim()) {
            btnClearSearch.classList.remove('hidden');
        } else {
            btnClearSearch.classList.add('hidden');
        }
        renderVideos();
    });

    btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        btnClearSearch.classList.add('hidden');
        renderVideos();
        searchInput.focus();
    });

    categoryPills.addEventListener('click', (e) => {
        const target = e.target.closest('.pill');
        if (!target) return;

        // Reset active state for all pills
        categoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        target.classList.add('active');

        const cat = target.dataset.category;
        const filter = target.dataset.filter;

        if (cat) {
            currentFilterCategory = cat;
            currentFilterStatus = 'all';
        } else if (filter) {
            currentFilterCategory = 'all';
            currentFilterStatus = filter;
        }

        renderVideos();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSortMode = e.target.value;
        renderVideos();
    });

    // Grid vs List View Switcher
    btnGridView.addEventListener('click', () => {
        currentViewMode = 'grid';
        btnGridView.classList.add('active');
        btnListView.classList.remove('active');
        videoContainer.classList.remove('list-view');
    });

    btnListView.addEventListener('click', () => {
        currentViewMode = 'list';
        btnListView.classList.add('active');
        btnGridView.classList.remove('active');
        videoContainer.classList.add('list-view');
    });

    btnResetFilters.addEventListener('click', () => {
        searchInput.value = '';
        btnClearSearch.classList.add('hidden');
        currentFilterCategory = 'all';
        currentFilterStatus = 'all';
        categoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        categoryPills.querySelector('[data-category="all"]').classList.add('active');
        renderVideos();
    });

    // ==========================================
    // 9. Keyboard Shortcuts & Theme Toggle
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // Press '/' to focus search bar
        if (e.key === '/' && document.activeElement !== searchInput && 
            document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            searchInput.focus();
        }

        // Press ESC to close modals
        if (e.key === 'Escape') {
            if (!playerModal.classList.contains('hidden')) closePlayerModal();
            if (!addModal.classList.contains('hidden')) closeAddModal();
            if (!editModal.classList.contains('hidden')) closeEditModal();
        }
    });

    // Dark/Light Theme Switching
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
            localStorage.setItem(THEME_KEY, 'light');
            showToast('Tema terang diaktifkan', 'info');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
            localStorage.setItem(THEME_KEY, 'dark');
            showToast('Tema gelap diaktifkan', 'info');
        }
    });

    // Initial Execution
    updateProgressStats();
    renderVideos();
});
