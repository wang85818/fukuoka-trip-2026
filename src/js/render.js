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
        itineraryData.forEach((dayData, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.1}s`;

            const hotelHTML = dayData.hotelMap 
                ? `${dayData.hotel} <a href="https://maps.google.com/?q=${dayData.hotelMap}" target="_blank" class="map-link-inline"><i class="fa-solid fa-location-dot"></i> 地圖</a>`
                : dayData.hotel;

            // Generate Timeline HTML
            let timelineHTML = `<div class="timeline-container">`;
            dayData.timeline.forEach(item => {
                timelineHTML += `
                    <div class="timeline-item">
                        <div class="timeline-time">${item.time}</div>
                        <div class="timeline-content">${item.desc}</div>
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
    }
}

window.renderUI = {
    renderChangelog,
    renderItinerary
};
