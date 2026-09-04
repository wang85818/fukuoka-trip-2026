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

            const hotelHTML = dayData.hotelMap 
                ? `${dayData.hotel} <a href="https://maps.google.com/?q=${dayData.hotelMap}" target="_blank" class="map-link-inline"><i class="fa-solid fa-location-dot"></i> 地圖</a>`
                : dayData.hotel;

            // Generate Timeline HTML
            let timelineHTML = `<div class="timeline-container" data-day-index="${dayIndex}">`;
            dayData.timeline.forEach((item, itemIndex) => {
                timelineHTML += `
                    <div class="timeline-item" data-item-index="${itemIndex}">
                        <div class="timeline-item-content">
                            <div class="timeline-time">${item.time}</div>
                            <div class="timeline-content">${item.desc}</div>
                        </div>
                        <div class="drag-handle"><i class="fa-solid fa-bars"></i></div>
                    </div>
                `;
            });
            timelineHTML += `</div>`;

            card.innerHTML = `
                <div class="card-header">
                    <span class="day-badge">${dayData.day}</span>
                    <h3 class="theme">${dayData.theme}</h3>
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

                    <div class="info-row">
                        <span class="icon"><i class="fa-solid fa-lightbulb"></i></span>
                        <div>
                            <strong>育兒重點與備註</strong>
                            <p>${dayData.tips}</p>
                        </div>
                    </div>
                    <div class="info-row">
                        <span class="icon"><i class="fa-solid fa-umbrella"></i></span>
                        <div>
                            <strong>雨天備案</strong>
                            <p>${dayData.rainPlan}</p>
                        </div>
                    </div>
                </div>
            `;
            itineraryList.appendChild(card);
        });

        // Initialize SortableJS for each timeline container
        const timelines = document.querySelectorAll('.timeline-container');
        timelines.forEach(container => {
            Sortable.create(container, {
                handle: '.drag-handle', // drag handle selector
                animation: 150,
                ghostClass: 'sortable-ghost',
                dragClass: 'sortable-drag',
                onEnd: function (evt) {
                    const dayIndex = evt.to.getAttribute('data-day-index');
                    const oldIndex = evt.oldIndex;
                    const newIndex = evt.newIndex;
                    
                    if (oldIndex !== newIndex) {
                        // Reorder data array
                        const dayData = window.appData.itineraryData[dayIndex];
                        const movedItem = dayData.timeline.splice(oldIndex, 1)[0];
                        dayData.timeline.splice(newIndex, 0, movedItem);
                        
                        // Save to localStorage for now (until Firebase is ready)
                        localStorage.setItem('fukuokaItinerary', JSON.stringify(window.appData.itineraryData));
                        console.log('Saved new order to localStorage', window.appData.itineraryData);
                    }
                }
            });
        });
    }
}

window.renderUI = {
    renderChangelog,
    renderItinerary
};
