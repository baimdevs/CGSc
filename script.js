/**
 * baimstore - Direktori Video Edukasi YouTube
 * Main Application Logic (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Initial State & Verified Default Data Definition
    // ==========================================
    const STORAGE_KEY = 'baimstore_videos_v3';
    const THEME_KEY = 'baimstore_theme';

    // List of known broken/deleted YouTube IDs to purge from legacy stored state
    const brokenYtIds = new Set([
        'lTMZuM0fCh4', '8hly31xKLI0', 'EefR8C3AIfE', 'juK1T_hpxG0',
        'rC7x0c_39sE', 'AEB60h7n5gU', 'sRFEV3R3Mto', 'by6v42w35n0'
    ]);

    const defaultVideos = [
        // --- PEMROGRAMAN ---
        {
            id: 'vid_prog_1',
            ytId: 'W6NZfCO5SIk',
            url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            title: 'JavaScript Course for Beginners – Your First Step to Web Development',
            author: 'Programming with Mosh',
            thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '1 Jam',
            notes: 'Panduan fundamental JavaScript modern: variabel, fungsi, objek, array, dan DOM manipulation dasar.',
            completed: true,
            createdAt: Date.now() - 86400000 * 24
        },
        {
            id: 'vid_prog_2',
            ytId: '_uQrJ0TkZlc',
            url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            title: 'Python Full Course for Beginners',
            author: 'Programming with Mosh',
            thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '6 Jam',
            notes: 'Mempelajari dasar pemrograman Python dari variabel, struktur data, fungsi hingga pembuatan proyek nyata.',
            completed: false,
            createdAt: Date.now() - 86400000 * 23
        },
        {
            id: 'vid_prog_3',
            ytId: 'NBZ9Ro6UKV8',
            url: 'https://www.youtube.com/watch?v=NBZ9Ro6UKV8',
            title: 'HTML Dasar : Pendahuluan HTML',
            author: 'Web Programming Unpas',
            thumbnail: 'https://img.youtube.com/vi/NBZ9Ro6UKV8/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '35 Menit',
            notes: 'Pengenalan struktur tag HTML5 dan teknik styling CSS3 untuk membangun tata letak situs web modern.',
            completed: true,
            createdAt: Date.now() - 86400000 * 22
        },
        {
            id: 'vid_prog_4',
            ytId: '8JJ101D3knE',
            url: 'https://www.youtube.com/watch?v=8JJ101D3knE',
            title: 'Git Tutorial for Beginners: Learn Git in 1 Hour',
            author: 'Programming with Mosh',
            thumbnail: 'https://img.youtube.com/vi/8JJ101D3knE/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '1 Jam',
            notes: 'Panduan kontrol versi dengan Git: commit, branching, merging, push, dan kolaborasi repositori di GitHub.',
            completed: false,
            createdAt: Date.now() - 86400000 * 21
        },
        {
            id: 'vid_prog_5',
            ytId: 'bMknfKXIFA8',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            title: "React Course - Beginner's Tutorial for React JavaScript Library",
            author: 'freeCodeCamp.org',
            thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '2 Jam',
            notes: 'Konsep dasar React JS: Component, JSX, Props, State, Hooks (useState, useEffect), dan struktur aplikasi web.',
            completed: false,
            createdAt: Date.now() - 86400000 * 20
        },
        {
            id: 'vid_prog_6',
            ytId: 'RBSGKlAvoiM',
            url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
            title: 'Data Structures Easy to Advanced Course - Full Tutorial',
            author: 'freeCodeCamp.org',
            thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '8 Jam',
            notes: 'Pemahaman Big O Notation, Array, Linked List, Stack, Queue, Hash Table, serta algoritma pencarian & pengurutan.',
            completed: false,
            createdAt: Date.now() - 86400000 * 19
        },
        {
            id: 'vid_prog_7',
            ytId: 'vLnPwxZdW4Y',
            url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
            title: 'C++ Tutorial for Beginners - Full Course',
            author: 'freeCodeCamp.org',
            thumbnail: 'https://img.youtube.com/vi/vLnPwxZdW4Y/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '4 Jam',
            notes: 'Konsep dasar hingga lanjutan pemrograman C++: pointer, manajemen memori, OOP, dan manipulasi data.',
            completed: false,
            createdAt: Date.now() - 86400000 * 18
        },
        {
            id: 'vid_prog_8',
            ytId: 'zOjov-2OZ0E',
            url: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
            title: 'Introduction to Programming and Computer Science - Full Course',
            author: 'freeCodeCamp.org',
            thumbnail: 'https://img.youtube.com/vi/zOjov-2OZ0E/hqdefault.jpg',
            category: 'Pemrograman',
            duration: '2 Jam',
            notes: 'Konsep dasar ilmu komputer, arsitektur CPU, logika biner, alur eksekusi memori, dan paradigma algoritma.',
            completed: false,
            createdAt: Date.now() - 86400000 * 17
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
            createdAt: Date.now() - 86400000 * 16
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
            createdAt: Date.now() - 86400000 * 15
        },
        {
            id: 'vid_math_3',
            ytId: 'PUB0TaZ7bhA',
            url: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
            title: 'Trigonometry For Beginners!',
            author: 'The Organic Chemistry Tutor',
            thumbnail: 'https://img.youtube.com/vi/PUB0TaZ7bhA/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '20 Menit',
            notes: 'Memahami sinus, kosinus, tangen, teorema Pythagoras, dan rasio sudut pada segitiga siku-siku.',
            completed: false,
            createdAt: Date.now() - 86400000 * 14
        },
        {
            id: 'vid_math_4',
            ytId: 'kYB8IZa5AuE',
            url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
            title: 'Linear Transformations and Matrices | Chapter 3',
            author: '3Blue1Brown',
            thumbnail: 'https://img.youtube.com/vi/kYB8IZa5AuE/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '12 Menit',
            notes: 'Bagaimana operasi matriks memetakan dan mentransformasikan koordinat dalam ruang aljabar linear.',
            completed: false,
            createdAt: Date.now() - 86400000 * 13
        },
        {
            id: 'vid_math_5',
            ytId: 'uhxtUt_-GyM',
            url: 'https://www.youtube.com/watch?v=uhxtUt_-GyM',
            title: 'Statistics: The Average & Descriptive Statistics',
            author: 'Khan Academy',
            thumbnail: 'https://img.youtube.com/vi/uhxtUt_-GyM/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '14 Menit',
            notes: 'Konsep dasar analisis statistik: pemusatan data (mean, median, modus) serta pengukur dispersi data.',
            completed: false,
            createdAt: Date.now() - 86400000 * 12
        },
        {
            id: 'vid_math_6',
            ytId: 'aircAruvnKk',
            url: 'https://www.youtube.com/watch?v=aircAruvnKk',
            title: 'But what is a neural network? | Deep Learning Chapter 1',
            author: '3Blue1Brown',
            thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg',
            category: 'Matematika & Sains',
            duration: '19 Menit',
            notes: 'Penjelasan visual intuitif mengenai arsitektur Neural Network, bobot (weights), bias, dan aktivasi.',
            completed: false,
            createdAt: Date.now() - 86400000 * 11
        },

        // --- BAHASA ---
        {
            id: 'vid_lang_1',
            ytId: 'd0yGdNEWdn0',
            url: 'https://www.youtube.com/watch?v=d0yGdNEWdn0',
            title: 'How to Learn Any Language in Six Months',
            author: 'TEDx Talks (Chris Lonsdale)',
            thumbnail: 'https://img.youtube.com/vi/d0yGdNEWdn0/hqdefault.jpg',
            category: 'Bahasa',
            duration: '18 Menit',
            notes: '5 prinsip utama dan 7 tindakan praktis untuk mempercepat kemampuan berbicara bahasa asing secara alami.',
            completed: true,
            createdAt: Date.now() - 86400000 * 10
        },
        {
            id: 'vid_lang_2',
            ytId: 'Unzc731iCUY',
            url: 'https://www.youtube.com/watch?v=Unzc731iCUY',
            title: 'How to Speak (Public Speaking & Presentation Skills)',
            author: 'MIT OpenCourseWare',
            thumbnail: 'https://img.youtube.com/vi/Unzc731iCUY/hqdefault.jpg',
            category: 'Bahasa',
            duration: '60 Menit',
            notes: 'Kuliah legendaris Prof. Patrick Winston tentang teknik presentasi, komunikasi efektif, dan publik speaking.',
            completed: false,
            createdAt: Date.now() - 86400000 * 9
        },
        {
            id: 'vid_lang_3',
            ytId: '8KkKuTCFvzI',
            url: 'https://www.youtube.com/watch?v=8KkKuTCFvzI',
            title: 'What Makes a Good Life? Lessons from the Longest Study on Happiness',
            author: 'TED (Robert Waldinger)',
            thumbnail: 'https://img.youtube.com/vi/8KkKuTCFvzI/hqdefault.jpg',
            category: 'Bahasa',
            duration: '12 Menit',
            notes: 'Temuan riset 75 tahun Harvard tentang pentingnya hubungan interpersonal dan komunikasi emosional yang berkualitas.',
            completed: false,
            createdAt: Date.now() - 86400000 * 8
        },

        // --- DESAIN & KREATIF ---
        {
            id: 'vid_design_1',
            ytId: 'c9Wg6Cb_YlU',
            url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
            title: 'UI / UX Design Tutorial – Wireframe, Mockup & Design in Figma',
            author: 'freeCodeCamp.org',
            thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/hqdefault.jpg',
            category: 'Desain & Kreatif',
            duration: '2 Jam',
            notes: 'Panduan mendesain antarmuka aplikasi dari ideation, wireframing, pembuatan komponen UI, hingga visual design.',
            completed: false,
            createdAt: Date.now() - 86400000 * 7
        },
        {
            id: 'vid_design_2',
            ytId: 'FTFaQWZBqQ8',
            url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
            title: 'Figma UI Design Tutorial: Get Started in Just 24 Minutes!',
            author: 'AJ&Smart',
            thumbnail: 'https://img.youtube.com/vi/FTFaQWZBqQ8/hqdefault.jpg',
            category: 'Desain & Kreatif',
            duration: '24 Menit',
            notes: 'Pengenalan cepat tools Figma dasar, autolayout, dan pembuatan desain landing page modern.',
            completed: false,
            createdAt: Date.now() - 86400000 * 6
        },

        // --- BISNIS & KARIR ---
        {
            id: 'vid_biz_1',
            ytId: 'nU-IIXBWlS4',
            url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
            title: 'Digital Marketing Course Part 1 - Tutorial Pemula',
            author: 'Simplilearn',
            thumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/hqdefault.jpg',
            category: 'Bisnis & Karir',
            duration: '2 Jam',
            notes: 'Konsep dasar pemasaran digital, riset audiens target, SEO, konten marketing, dan strategi pertumbuhan bisnis.',
            completed: false,
            createdAt: Date.now() - 86400000 * 5
        },
        {
            id: 'vid_biz_2',
            ytId: 'fLJsdqxnZb0',
            url: 'https://www.youtube.com/watch?v=fLJsdqxnZb0',
            title: 'The Happy Secret to Better Work (Psikologi Kerja & Performa)',
            author: 'TED (Shawn Achor)',
            thumbnail: 'https://img.youtube.com/vi/fLJsdqxnZb0/hqdefault.jpg',
            category: 'Bisnis & Karir',
            duration: '12 Menit',
            notes: 'Bagaimana pemikiran positif dan psikologi produktivitas dapat meningkatkan kinerja, efisiensi kerja, dan kepuasan karir.',
            completed: false,
            createdAt: Date.now() - 86400000 * 4
        },

        // --- PENGEMBANGAN DIRI ---
        {
            id: 'vid_dev_1',
            ytId: 'PZ7lDrwYdZc',
            url: 'https://www.youtube.com/watch?v=PZ7lDrwYdZc',
            title: 'How to Become 37.78 Times Better at Anything (Atomic Habits Summary)',
            author: 'Escaping Ordinary',
            thumbnail: 'https://img.youtube.com/vi/PZ7lDrwYdZc/hqdefault.jpg',
            category: 'Pengembangan Diri',
            duration: '10 Menit',
            notes: 'Rangkuman visual buku Atomic Habits karya James Clear: 4 hukum perubahan perilaku dan sistem pembentukan kebiasaan kecil.',
            completed: true,
            createdAt: Date.now() - 86400000 * 3
        },
        {
            id: 'vid_dev_2',
            ytId: 'iONDebHX9qk',
            url: 'https://www.youtube.com/watch?v=iONDebHX9qk',
            title: 'How I Manage My Time - 10 Time Management Tips',
            author: 'Ali Abdaal',
            thumbnail: 'https://img.youtube.com/vi/iONDebHX9qk/hqdefault.jpg',
            category: 'Pengembangan Diri',
            duration: '15 Menit',
            notes: 'Sistem pengelolaan waktu harian, teknik delegasi, aturan 2 menit, dan cara efektif mengatasi prokrastinasi.',
            completed: false,
            createdAt: Date.now() - 86400000 * 2
        },
        {
            id: 'vid_dev_3',
            ytId: 'iCvmsMzlF7o',
            url: 'https://www.youtube.com/watch?v=iCvmsMzlF7o',
            title: 'The Power of Vulnerability (Kekuatan Keberanian & Penerimaan Diri)',
            author: 'TED (Brené Brown)',
            thumbnail: 'https://img.youtube.com/vi/iCvmsMzlF7o/hqdefault.jpg',
            category: 'Pengembangan Diri',
            duration: '20 Menit',
            notes: 'Riset Brené Brown tentang empati, keberanian mengambil risiko emosional, dan cara membangun kecerdasan emosional.',
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
    const btnResetCatalog = document.getElementById('btnResetCatalog');
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
    const btnOpenYouTube = document.getElementById('btnOpenYouTube');

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
        let loaded = null;
        
        // 1. Try reading modern v3 storage
        const savedV3 = localStorage.getItem(STORAGE_KEY);
        if (savedV3) {
            try {
                loaded = JSON.parse(savedV3);
            } catch (e) {
                console.error('Error parsing v3 stored videos', e);
            }
        }

        // 2. Fallback to legacy v2 or v1 storage if v3 is absent
        if (!loaded) {
            const savedLegacy = localStorage.getItem('baimstore_videos_v2') || localStorage.getItem('baimstore_videos');
            if (savedLegacy) {
                try {
                    loaded = JSON.parse(savedLegacy);
                } catch (e) {
                    console.error('Error parsing legacy stored videos', e);
                }
            }
        }

        if (loaded && Array.isArray(loaded) && loaded.length > 0) {
            // Purge broken YouTube IDs from user's state
            let cleaned = loaded.filter(v => v && v.ytId && !brokenYtIds.has(v.ytId));

            // Merge missing active default videos so all categories are available
            const existingYtIds = new Set(cleaned.map(v => v.ytId));
            defaultVideos.forEach(defVid => {
                if (!existingYtIds.has(defVid.ytId)) {
                    cleaned.push(defVid);
                }
            });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
            return cleaned;
        }

        // Save fresh defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVideos));
        return [...defaultVideos];
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
            showToast('Thumbnail dimuat (Judul dapat disesuaikan manual)', 'info');
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
                    <img src="${vid.thumbnail}" alt="${escapeHtml(vid.title)}" loading="lazy" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${vid.ytId}/mqdefault.jpg'">
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
                            <a href="https://www.youtube.com/watch?v=${vid.ytId}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-yt-link" title="Buka di YouTube" onclick="event.stopPropagation()">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                            <button class="btn-card-action" onclick="openEditModal('${vid.id}', event)" title="Edit Video">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn-card-action btn-delete" onclick="deleteVideo('${vid.id}', event)" title="Hapus Video">
                                <i class="fa-solid fa-trash-can"></i>
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
    // 6. Video Actions (Add, Edit, Toggle, Delete, Reset Catalog)
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

            if (activePlayerVideoId === id) {
                updatePlayerModalStatusButton(video.completed);
            }

            const statusText = video.completed ? 'ditandai Selesai' : 'ditandai Belum Selesai';
            showToast(`Video ${statusText}`, 'info');
        }
    };

    window.deleteVideo = function(id, event) {
        if (event) event.stopPropagation();
        const video = videos.find(v => v.id === id);
        if (!video) return;

        if (confirm(`Apakah Anda yakin ingin menghapus video "${video.title}"?`)) {
            videos = videos.filter(v => v.id !== id);
            saveVideos();
            renderVideos();
            showToast('Video berhasil dihapus', 'info');
        }
    };

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

    if (btnResetCatalog) {
        btnResetCatalog.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin mereset katalog ke 24 video edukasi default yang aktif & verified?')) {
                videos = JSON.parse(JSON.stringify(defaultVideos));
                saveVideos();
                renderVideos();
                showToast('Katalog video berhasil di-reset ke 24 video aktif!', 'success');
            }
        });
    }

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
        
        if (btnOpenYouTube) {
            btnOpenYouTube.href = `https://www.youtube.com/watch?v=${video.ytId}`;
        }

        // Embed video player with enablejsapi and autoplay
        youtubeIframe.src = `https://www.youtube.com/embed/${video.ytId}?autoplay=1&rel=0&enablejsapi=1`;

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
        youtubeIframe.src = ''; // Stop video audio playback
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
        if (e.key === '/' && document.activeElement !== searchInput && 
            document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            searchInput.focus();
        }

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
