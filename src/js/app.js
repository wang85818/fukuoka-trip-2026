// app.js - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Changelog
    if (window.appData && window.renderUI) {
        window.renderUI.renderChangelog(window.appData.changelogData);
    }

    // 2. Initial Data & Firebase Sync
    
    function fallbackToLocal() {
        const savedItinerary = localStorage.getItem('fukuokaItinerary');
        if (savedItinerary) {
            try {
                window.appData.itineraryData = JSON.parse(savedItinerary);
            } catch(e) {
                console.error("Error parsing saved itinerary", e);
            }
        }
        window.renderUI.renderItinerary(window.appData.itineraryData);
    }

    // Always render local data immediately so the UI is never blank
    fallbackToLocal();

    if (window.db) {
        try {
            const itineraryRef = window.db.ref('itinerary');
            
            // Listen for real-time updates from Firebase
            itineraryRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Use cloud data
                    window.appData.itineraryData = data;
                    window.renderUI.renderItinerary(window.appData.itineraryData);
                } else {
                    // First time setup: push local default data to cloud
                    itineraryRef.set(window.appData.itineraryData).catch(err => {
                        console.warn("Could not push default data. Firebase might be read-only or not created.", err);
                    });
                }
            }, (error) => {
                console.warn("Firebase permission or config error:", error);
                // We already rendered local, so just log warning
            });
        } catch (error) {
            console.warn("Firebase DB error:", error);
        }
    }

    // 2. Tab Switching Logic
    const navButtons = document.querySelectorAll('.top-nav .nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 3. Checklist Persistence
    const checkboxes = document.querySelectorAll('.check-list input[type="checkbox"]');
    
    function loadChecklist() {
        const saved = JSON.parse(localStorage.getItem('fukuokaChecklist') || '{}');
        checkboxes.forEach(cb => {
            if (saved[cb.value]) cb.checked = true;
        });
    }

    function saveChecklist() {
        const state = {};
        checkboxes.forEach(cb => {
            state[cb.value] = cb.checked;
        });
        localStorage.setItem('fukuokaChecklist', JSON.stringify(state));
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', saveChecklist);
    });
    
    loadChecklist();

    // 4. Export PDF Logic
    const exportBtn = document.getElementById('export-pdf-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 匯出中...';
            exportBtn.disabled = true;

            const element = document.getElementById('itinerary-list');
            const opt = {
                margin:       10,
                filename:     '2026_福岡親子旅遊_行程表.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Use html2pdf
            html2pdf().set(opt).from(element).save().then(() => {
                exportBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> 匯出 PDF';
                exportBtn.disabled = false;
            }).catch(err => {
                console.error("PDF Export failed", err);
                exportBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> 匯出失敗';
                exportBtn.disabled = false;
            });
        });
    }

});
