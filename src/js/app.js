// app.js - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Changelog
    if (window.appData && window.renderUI) {
        window.renderUI.renderChangelog(window.appData.changelogData);
    }

    // 2. Initial Data & Firebase Sync
    
    // 1. Initial Data Load
    function loadItinerary() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedData = urlParams.get('data');
        
        if (sharedData && window.LZString) {
            try {
                const decoded = LZString.decompressFromEncodedURIComponent(sharedData);
                if (decoded) {
                    const parsedData = JSON.parse(decoded);
                    localStorage.setItem('fukuokaItinerary', JSON.stringify(parsedData));
                    console.log("Loaded itinerary from shared URL.");
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch(e) {
                console.error("Failed to parse shared data", e);
                alert("分享連結無效或已損毀。");
            }
        }

        const CURRENT_DATA_VERSION = "3";
        const savedVersion = localStorage.getItem('fukuokaDataVersion');
        
        // Only force overwrite if no shared data was just loaded
        if (!sharedData && savedVersion !== CURRENT_DATA_VERSION) {
            // Force overwrite with new hardcoded data from data.js
            localStorage.removeItem('fukuokaItinerary');
            localStorage.setItem('fukuokaDataVersion', CURRENT_DATA_VERSION);
            console.log("Data version updated. Local storage cleared.");
        }

        const savedItinerary = localStorage.getItem('fukuokaItinerary');
        if (savedItinerary) {
            try {
                window.appData.itineraryData = JSON.parse(savedItinerary);
            } catch(e) {
                console.error("Error parsing saved itinerary", e);
            }
        } else {
            // First time setup: push local default data to localStorage
            localStorage.setItem('fukuokaItinerary', JSON.stringify(window.appData.itineraryData));
        }
        window.renderUI.renderItinerary(window.appData.itineraryData);
        window.renderUI.renderPOIs(); // Render the new POI Database
        
        // Initialize Map after rendering itinerary
        setTimeout(() => {
            if(window.mapModule && window.appData.itineraryData.length > 0) {
                window.mapModule.initMap();
                window.mapModule.updateRouteForDay(window.appData.itineraryData[0], false); // Draw route for day 1 by default, but don't open modal
            }
        }, 300);
    }

    loadItinerary();

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
    
    // 5. POI Filter Logic
    const poiFilterBtns = document.querySelectorAll('.poi-filter-btn');
    if (poiFilterBtns.length > 0) {
        poiFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                poiFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Re-render based on filter
                const filteredData = window.appData.poiDatabase.filter(poi => 
                    filterValue === 'all' ? true : poi.category === filterValue
                );
                
                window.renderUI.renderPOIs(filteredData);
            });
        });
    }
    
    // 6. Live POI Search Logic (Nominatim API)
    const poiSearchBtn = document.getElementById('poi-search-btn');
    const poiSearchInput = document.getElementById('poi-search-input');
    
    if (poiSearchBtn && poiSearchInput) {
        poiSearchBtn.addEventListener('click', async () => {
            const query = poiSearchInput.value.trim();
            if (!query) return;
            
            poiSearchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            poiSearchBtn.disabled = true;
            
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const searchResults = data.map((item, index) => {
                        const newPoi = {
                            id: `search_${Date.now()}_${index}`,
                            name: item.display_name.split(',')[0], // Use first part of address as name
                            category: 'search',
                            lat: parseFloat(item.lat),
                            lng: parseFloat(item.lon),
                            desc: item.display_name
                        };
                        // Temporarily add to DB so it can be added to itinerary
                        window.appData.poiDatabase.push(newPoi);
                        return newPoi;
                    });
                    
                    // Render the results
                    window.renderUI.renderPOIs(searchResults);
                    
                    // Reset filters UI
                    if(poiFilterBtns.length > 0) {
                        poiFilterBtns.forEach(b => b.classList.remove('active'));
                    }
                } else {
                    alert('找不到該地點，請嘗試更換關鍵字！');
                }
            } catch (err) {
                console.error("Search failed:", err);
                alert('搜尋失敗，請稍後再試。');
            } finally {
                poiSearchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> 搜尋';
                poiSearchBtn.disabled = false;
            }
        });
        
        // Enter key to search
        poiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                poiSearchBtn.click();
            }
        });
    }

    // 7. Initialize Checklist Persistence
    const checkboxes = document.querySelectorAll('.check-list input[type="checkbox"]');
    const savedChecklist = JSON.parse(localStorage.getItem('fukuokaChecklist') || '{}');
    
    checkboxes.forEach(cb => {
        if (cb.value && savedChecklist[cb.value]) {
            cb.checked = true;
        }
        
        cb.addEventListener('change', (e) => {
            if (e.target.value) {
                savedChecklist[e.target.value] = e.target.checked;
                localStorage.setItem('fukuokaChecklist', JSON.stringify(savedChecklist));
            }
        });
    });

    // 8. Share Itinerary Logic
    const shareBtn = document.getElementById('share-itinerary-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (!window.LZString) {
                alert("壓縮套件尚未載入，請稍後再試！");
                return;
            }
            const dataToShare = JSON.stringify(window.appData.itineraryData);
            const compressed = LZString.compressToEncodedURIComponent(dataToShare);
            const shareUrl = `${window.location.origin}${window.location.pathname}?data=${compressed}`;
            
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert("✅ 分享連結已複製到剪貼簿！快去貼給家人吧！");
            }).catch(err => {
                console.error("Copy failed", err);
                prompt("請手動複製以下連結：", shareUrl);
            });
        });
    }

    // 9. Currency & Budget Logic
    const jpyInput = document.getElementById('calc-jpy');
    const twdInput = document.getElementById('calc-twd');
    const rateDisplay = document.getElementById('exchange-rate-display');
    const budgetNotes = document.getElementById('budget-notes');
    const saveStatus = document.getElementById('budget-save-status');
    let currentRate = 0.22; // default fallback

    if (jpyInput && twdInput && rateDisplay) {
        // Fetch real-time rate
        fetch('https://open.er-api.com/v6/latest/JPY')
            .then(res => res.json())
            .then(data => {
                if (data && data.rates && data.rates.TWD) {
                    currentRate = data.rates.TWD;
                    rateDisplay.textContent = `(目前匯率: 1 JPY = ${currentRate.toFixed(4)} TWD)`;
                }
            })
            .catch(err => {
                console.warn("Fetch exchange rate failed, using fallback.", err);
                rateDisplay.textContent = `(離線模式，預估匯率 0.22)`;
            });

        jpyInput.addEventListener('input', (e) => {
            const jpy = parseFloat(e.target.value);
            if (!isNaN(jpy)) {
                twdInput.value = Math.round(jpy * currentRate);
            } else {
                twdInput.value = '';
            }
        });

        twdInput.addEventListener('input', (e) => {
            const twd = parseFloat(e.target.value);
            if (!isNaN(twd)) {
                jpyInput.value = Math.round(twd / currentRate);
            } else {
                jpyInput.value = '';
            }
        });
    }

    // Restore budget notes
    if (budgetNotes) {
        const savedNotes = localStorage.getItem('fukuokaBudgetNotes');
        if (savedNotes) {
            budgetNotes.value = savedNotes;
        }

        let timeout = null;
        budgetNotes.addEventListener('input', (e) => {
            clearTimeout(timeout);
            saveStatus.style.display = 'none';
            timeout = setTimeout(() => {
                localStorage.setItem('fukuokaBudgetNotes', e.target.value);
                saveStatus.style.display = 'inline-block';
                setTimeout(() => { saveStatus.style.display = 'none'; }, 2000);
            }, 1000);
        });
    }

});
