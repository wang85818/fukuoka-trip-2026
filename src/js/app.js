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
            localStorage.setItem('fukuokaItinerary', JSON.stringify(window.appData.itineraryData));
        }

        // Dynamic Checklist Migration & Loading
        const savedChecklistFull = localStorage.getItem('fukuokaChecklistFull');
        if (savedChecklistFull) {
            try {
                window.appData.checklistData = JSON.parse(savedChecklistFull);
            } catch(e) {}
        } else {
            // Migrate old checklist state if exists
            const oldSaved = JSON.parse(localStorage.getItem('fukuokaChecklist') || '{}');
            if (Object.keys(oldSaved).length > 0) {
                window.appData.checklistData.forEach(cat => {
                    cat.items.forEach(item => {
                        if (oldSaved[item.id]) item.checked = true;
                    });
                });
            }
            localStorage.setItem('fukuokaChecklistFull', JSON.stringify(window.appData.checklistData));
        }

        // Shopping List Loading
        const savedShopping = localStorage.getItem('fukuokaShoppingList');
        if (savedShopping) {
            try {
                window.appData.shoppingListData = JSON.parse(savedShopping);
            } catch(e) {}
        }

        // Reservation Data Loading
        const savedReservations = localStorage.getItem('fukuokaReservations');
        if (savedReservations) {
            try {
                window.appData.reservationData = JSON.parse(savedReservations);
            } catch(e) {}
        }

        window.renderUI.renderItinerary(window.appData.itineraryData);
        window.renderUI.renderPOIs(); 
        window.renderUI.renderChecklist(window.appData.checklistData);
        window.renderUI.renderShoppingList(window.appData.shoppingListData);
        if(window.renderUI.renderReservations) window.renderUI.renderReservations(window.appData.reservationData);
        if(window.updateShoppingTotal) window.updateShoppingTotal();
        
        // Initialize Map after rendering itinerary
        setTimeout(() => {
            if(window.mapModule && window.appData.itineraryData.length > 0) {
                window.mapModule.initMap();
                window.mapModule.updateRouteForDay(window.appData.itineraryData[0], false);
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

    // 7. Initialize Checklist Persistence (Already implemented above)

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
                    if (window.updateShoppingTotal) window.updateShoppingTotal();
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

    // 10. Dynamic Checklist Event Delegation
    const checklistContainer = document.getElementById('dynamic-checklist-container');
    if (checklistContainer) {
        checklistContainer.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const catIdx = e.target.getAttribute('data-cat-idx');
                const itemIdx = e.target.getAttribute('data-item-idx');
                window.appData.checklistData[catIdx].items[itemIdx].checked = e.target.checked;
                localStorage.setItem('fukuokaChecklistFull', JSON.stringify(window.appData.checklistData));
                window.renderUI.renderChecklist(window.appData.checklistData); // re-render for strike-through
            }
        });

        checklistContainer.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.delete-check-btn');
            const addBtn = e.target.closest('.add-check-btn');
            
            if (delBtn) {
                const catIdx = delBtn.getAttribute('data-cat-idx');
                const itemIdx = delBtn.getAttribute('data-item-idx');
                window.appData.checklistData[catIdx].items.splice(itemIdx, 1);
                localStorage.setItem('fukuokaChecklistFull', JSON.stringify(window.appData.checklistData));
                window.renderUI.renderChecklist(window.appData.checklistData);
            }
            
            if (addBtn) {
                const catIdx = addBtn.getAttribute('data-cat-idx');
                const input = document.getElementById(`new-check-${catIdx}`);
                const text = input.value.trim();
                if (text) {
                    window.appData.checklistData[catIdx].items.push({
                        id: `item_${Date.now()}`,
                        text: text,
                        checked: false
                    });
                    localStorage.setItem('fukuokaChecklistFull', JSON.stringify(window.appData.checklistData));
                    window.renderUI.renderChecklist(window.appData.checklistData);
                }
            }
        });
    }

    // 11. Shopping List Logic
    window.updateShoppingTotal = function() {
        let totalJpy = 0;
        window.appData.shoppingListData.forEach(item => {
            totalJpy += item.qty * item.price;
        });
        const totalTwd = Math.round(totalJpy * currentRate);
        const jpyEl = document.getElementById('shop-total-jpy');
        const twdEl = document.getElementById('shop-total-twd');
        if (jpyEl) jpyEl.textContent = `￥ ${totalJpy.toLocaleString()}`;
        if (twdEl) twdEl.textContent = `約 NT$ ${totalTwd.toLocaleString()}`;
    };

    const shopAddBtn = document.getElementById('shop-add-btn');
    if (shopAddBtn) {
        shopAddBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('shop-item-name');
            const qtyInput = document.getElementById('shop-item-qty');
            const priceInput = document.getElementById('shop-item-price');
            
            const name = nameInput.value.trim();
            const qty = parseInt(qtyInput.value) || 1;
            const price = parseInt(priceInput.value) || 0;
            
            if (!name) {
                alert("請輸入物品名稱！");
                return;
            }
            
            window.appData.shoppingListData.push({
                name: name,
                qty: qty,
                price: price,
                bought: false
            });
            
            localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
            window.renderUI.renderShoppingList(window.appData.shoppingListData);
            window.updateShoppingTotal();
            
            nameInput.value = '';
            qtyInput.value = '1';
            priceInput.value = '';
        });
    }

    const shopContainer = document.getElementById('shopping-list-container');
    if (shopContainer) {
        shopContainer.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            if (e.target.classList.contains('shop-check')) {
                window.appData.shoppingListData[idx].bought = e.target.checked;
                localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
                window.renderUI.renderShoppingList(window.appData.shoppingListData);
            } else if (e.target.classList.contains('shop-edit-name')) {
                window.appData.shoppingListData[idx].name = e.target.value.trim();
                localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
            } else if (e.target.classList.contains('shop-edit-qty')) {
                window.appData.shoppingListData[idx].qty = parseInt(e.target.value) || 1;
                localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
                window.renderUI.renderShoppingList(window.appData.shoppingListData);
                window.updateShoppingTotal();
            } else if (e.target.classList.contains('shop-edit-price')) {
                window.appData.shoppingListData[idx].price = parseInt(e.target.value) || 0;
                localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
                window.renderUI.renderShoppingList(window.appData.shoppingListData);
                window.updateShoppingTotal();
            }
        });

        shopContainer.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.shop-del-btn');
            if (delBtn) {
                const idx = delBtn.getAttribute('data-idx');
                window.appData.shoppingListData.splice(idx, 1);
                localStorage.setItem('fukuokaShoppingList', JSON.stringify(window.appData.shoppingListData));
                window.renderUI.renderShoppingList(window.appData.shoppingListData);
                window.updateShoppingTotal();
            }
        });
    }

    // 12. Reservations Logic
    const resAddBtn = document.getElementById('res-add-btn');
    if (resAddBtn) {
        resAddBtn.addEventListener('click', () => {
            const type = document.getElementById('res-type').value;
            const name = document.getElementById('res-name').value.trim();
            const time = document.getElementById('res-time').value.trim();
            const note = document.getElementById('res-note').value.trim();
            
            if (!name) {
                alert("請輸入預約/票券名稱！");
                return;
            }
            
            window.appData.reservationData.push({ type, name, time, note });
            
            localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
            window.renderUI.renderReservations(window.appData.reservationData);
            
            document.getElementById('res-name').value = '';
            document.getElementById('res-time').value = '';
            document.getElementById('res-note').value = '';
        });
    }

    const resContainer = document.getElementById('reservations-container');
    if (resContainer) {
        resContainer.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.res-del-btn');
            if (delBtn) {
                const idx = delBtn.getAttribute('data-idx');
                if(confirm("確定要刪除這筆紀錄嗎？")) {
                    window.appData.reservationData.splice(idx, 1);
                    localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
                    window.renderUI.renderReservations(window.appData.reservationData);
                }
            }
        });
    }

    // Expose currency update to global so it can trigger from fetch
    const originalFetchThen = () => {
         window.updateShoppingTotal();
    };
});
