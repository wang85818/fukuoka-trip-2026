// render.js - Handles rendering logic

function renderChangelog(changelogData) {
    const changelogList = document.getElementById('changelog-list');
    if (changelogList) {
        changelogData.forEach(log => {
            const logHTML = `
                <div class="changelog-item">
                    <div class="changelog-version">${log.version} <span class="changelog-date">(${log.date})</span></div>
                    <ul class="changelog-desc">
                        ${log.changes.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            `;
            changelogList.insertAdjacentHTML('beforeend', logHTML);
        });
    }
}

function renderItinerary(itineraryData) {
    const itineraryList = document.getElementById('itinerary-list');
    if(itineraryList) {
        itineraryList.innerHTML = ''; // clear before render
        itineraryData.forEach((dayData, dayIndex) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${dayIndex * 0.1}s`;

            const hotelHTML = dayData.hotel;

            // Generate Timeline HTML
            let timelineHTML = `<div class="timeline-container" data-day-index="${dayIndex}">`;
            dayData.timeline.forEach((item, itemIndex) => {
                const optimizedIcon = item.isOptimized ? '<i class="fa-solid fa-wand-magic-sparkles" style="color: #f59e0b; margin-left: 5px;" title="已最佳化"></i>' : '';
                timelineHTML += `
                    <div class="timeline-item" data-item-index="${itemIndex}" onclick="window.mapModule.showPOI(${item.lat}, ${item.lng}, '${item.desc}')">
                        <div class="timeline-item-content">
                            <div class="timeline-time">${item.time}</div>
                            <div class="timeline-content">${item.desc} ${optimizedIcon}</div>
                        </div>
                    </div>
                `;
            });
            timelineHTML += `</div>`;

            card.innerHTML = `
                <div class="card-header" style="display:flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span class="day-badge">${dayData.day}</span>
                        <h3 class="theme">${dayData.theme}</h3>
                    </div>
                    <button class="export-btn" onclick="window.optimizeModule.optimizeDay(${dayIndex})" style="background: var(--primary-color); border: none; padding: 5px 10px; border-radius: 8px; color: white; cursor: pointer;">
                        <i class="fa-solid fa-route"></i> 最佳化路線
                    </button>
                </div>
                <div class="card-body">
                    <div class="info-row" style="margin-top:0;">
                        <span class="icon"><i class="fa-solid fa-bed"></i></span>
                        <div>
                            <strong>住宿</strong>
                            <p>${hotelHTML}</p>
                        </div>
                    </div>
                    
                    ${timelineHTML}

                    <div style="text-align: center; margin-top: 15px;">
                        <button onclick="window.mapModule.updateRouteForDay(window.appData.itineraryData[${dayIndex}])" style="padding: 8px 15px; border-radius: 20px; border: 1px solid var(--primary-color); background: white; color: var(--primary-color); cursor: pointer; font-size: 0.9em;">
                            <i class="fa-solid fa-map"></i> 顯示本日地圖路線
                        </button>
                    </div>
                </div>
            `;
            itineraryList.appendChild(card);
        });
    }
}

function renderPOIs(dataToRender) {
    const poiList = document.getElementById('poi-list');
    if (!poiList) return;

    const db = dataToRender || window.appData.poiDatabase;
    if (!db) return;

    poiList.innerHTML = '';
    db.forEach(poi => {
        let icon = '<i class="fa-solid fa-location-dot"></i>'; // default
        if (poi.category === 'attraction') icon = '<i class="fa-solid fa-camera-retro"></i>';
        if (poi.category === 'food') icon = '<i class="fa-solid fa-utensils"></i>';
        if (poi.category === 'hotel') icon = '<i class="fa-solid fa-bed"></i>';

        // Select options for days
        let dayOptions = '';
        window.appData.itineraryData.forEach((day, idx) => {
            dayOptions += `<option value="${idx}">${day.day} - ${day.theme}</option>`;
        });

        const card = document.createElement('div');
        card.className = 'poi-card card';
        card.innerHTML = `
            <div class="card-body">
                <h3 style="margin-bottom: 10px; font-size: 1.1em; font-weight: 700;">${icon} ${poi.name}</h3>
                <p style="font-size: 0.9em; color: #64748b; margin-bottom: 15px;">${poi.desc}</p>
                
                <div style="display: flex; gap: 10px; align-items: center;">
                    <select id="poi-select-${poi.id}" style="padding: 5px; border-radius: 5px; border: 1px solid #cbd5e1; flex: 1;">
                        ${dayOptions}
                    </select>
                    <button onclick="addPoiToItinerary('${poi.id}')" style="background: var(--primary-color); color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer;">
                        <i class="fa-solid fa-plus"></i> 加入
                    </button>
                    <button onclick="window.mapModule.showPOI(${poi.lat}, ${poi.lng}, '${poi.name}')" style="background: #e2e8f0; color: #475569; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer;">
                        地圖
                    </button>
                </div>
            </div>
        `;
        poiList.appendChild(card);
    });
}

window.addPoiToItinerary = function(poiId) {
    const poi = window.appData.poiDatabase.find(p => p.id === poiId);
    if (!poi) return;

    const selectEl = document.getElementById(`poi-select-${poiId}`);
    const dayIndex = parseInt(selectEl.value);

    if (isNaN(dayIndex) || !window.appData.itineraryData[dayIndex]) return;

    // Add to timeline
    window.appData.itineraryData[dayIndex].timeline.push({
        id: "t_new_" + Date.now(),
        time: "--:--",
        desc: poi.name,
        lat: poi.lat,
        lng: poi.lng,
        isOptimized: false
    });

    // Save
    localStorage.setItem('fukuokaItinerary', JSON.stringify(window.appData.itineraryData));
    
    // Re-render
    renderItinerary(window.appData.itineraryData);
    alert(`已將 ${poi.name} 加入到 ${window.appData.itineraryData[dayIndex].day} 的行程中！`);
    
    // Switch to itinerary tab
    document.querySelector('.nav-btn[data-target="tab-itinerary"]').click();
};

window.renderUI = {
    renderChangelog,
    renderItinerary,
    renderPOIs,
    renderChecklist: function(data) {
        const container = document.getElementById('dynamic-checklist-container');
        if (!container) return;
        
        let html = '';
        data.forEach((cat, catIndex) => {
            html += `<div class="checklist-card">
                <h3>${cat.title}</h3>
                <ul class="check-list" data-category="${cat.id}">`;
                
            cat.items.forEach((item, itemIndex) => {
                html += `
                    <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <label style="flex: 1; cursor: pointer; display: flex; align-items: center;">
                            <input type="checkbox" value="${item.id}" data-cat-idx="${catIndex}" data-item-idx="${itemIndex}" ${item.checked ? 'checked' : ''} style="margin-right: 10px; transform: scale(1.2);"> 
                            <span style="font-size: 0.95rem; ${item.checked ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${item.text}</span>
                        </label>
                        <button class="action-btn delete-check-btn" data-cat-idx="${catIndex}" data-item-idx="${itemIndex}" style="background: none; border: none; color: #ef4444; padding: 5px; box-shadow: none;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </li>`;
            });
            
            html += `</ul>
                <div style="display: flex; gap: 8px; margin-top: 15px;">
                    <input type="text" id="new-check-${catIndex}" class="form-input" placeholder="新增項目..." style="flex: 1; padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.9rem;">
                    <button class="action-btn add-check-btn" data-cat-idx="${catIndex}" style="padding: 6px 12px; font-size: 0.9rem;">新增</button>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    },
    renderShoppingList: function(data) {
        const container = document.getElementById('shopping-list-container');
        if (!container) return;
        
        if (data.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 30px; color: #9ca3af;">購物清單目前是空的，開始新增你想買的東西吧！</div>';
            return;
        }

        let html = '';
        data.forEach((item, idx) => {
            const itemTotal = item.qty * item.price;
            html += `
                <div class="info-card" style="margin-bottom: 10px; padding: 12px 15px; display: flex; justify-content: space-between; align-items: center; opacity: ${item.bought ? '0.6' : '1'};">
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                        <input type="checkbox" class="shop-check" data-idx="${idx}" ${item.bought ? 'checked' : ''} style="transform: scale(1.5);">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 1.05rem; ${item.bought ? 'text-decoration: line-through;' : ''}">${item.name}</div>
                            <div style="font-size: 0.85rem; color: #6b7280;">數量: ${item.qty} | 單價: ￥${item.price.toLocaleString()}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-weight: bold; color: #4f46e5;">￥${itemTotal.toLocaleString()}</div>
                        <button class="action-btn shop-del-btn" data-idx="${idx}" style="background: none; border: none; color: #ef4444; padding: 5px; box-shadow: none;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }
};
