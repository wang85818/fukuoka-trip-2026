const changelogData = [
    {
        version: "v1.1.0",
        date: "2026-09-04",
        changes: [
            "版面大幅升級：將首頁的每日行程改為「時間軸 (Timeline)」設計。",
            "行程擴充：為 9/24 加入了「九州自然動物公園」與「由布院半日遊」。",
            "新增更新日誌區塊，方便追蹤修改紀錄。",
            "修復舊版快取導致的版面跑版問題。"
        ]
    },
    {
        version: "v1.0.0",
        date: "2026-09-04",
        changes: [
            "第一版網站上線，包含基本的九天行程卡片。",
            "新增底部導覽列，支援四大頁籤切換。",
            "加入互動式行李清單功能 (支援記憶功能)。",
            "整合 Giscus 留言板。"
        ]
    }
];

const itineraryData = [
    {
        day: "9/19 (六)",
        theme: "✈️ 飛行抵達",
        hotel: "EN HOTEL Hakata",
        hotelMap: "EN+HOTEL+Hakata",
        timeline: [
            { time: "07:30", desc: "桃園機場 (T2) 起飛 (BR102)" },
            { time: "10:55", desc: "抵達福岡機場，處理入境與小孩餐點" },
            { time: "14:00", desc: "前往飯店寄放行李 / 入住" },
            { time: "16:00", desc: "天神地下街逛街" },
            { time: "18:00", desc: "🍽️ 晚餐：中洲屋台宵夜 / 附近餐廳" },
            { time: "20:00", desc: "返回飯店休息 (晚間抵達降低強度)" }
        ],
        tips: "機場先處理奶量與小孩餐點。",
        rainPlan: "室內行程不受影響"
    },
    {
        day: "9/20 (日)",
        theme: "⛩️ 太宰府與柳川",
        hotel: "EN HOTEL Hakata",
        hotelMap: "EN+HOTEL+Hakata",
        timeline: [
            { time: "08:00", desc: "🍽️ 早餐：飯店或附近超商" },
            { time: "09:30", desc: "太宰府天滿宮、參道散步" },
            { time: "12:30", desc: "🍽️ 午餐：太宰府周邊" },
            { time: "14:00", desc: "柳川川下り遊船" },
            { time: "17:30", desc: "返回博多車站" },
            { time: "18:30", desc: "🍽️ 晚餐：博多站周邊" }
        ],
        tips: "依小孩體力隨時縮短行程；推車避開參道人潮高峰。",
        rainPlan: "改去 Canal City 或 LaLaport 商場"
    },
    {
        day: "9/21 (一)",
        theme: "🛍️ 市區輕遊換房",
        hotel: "THE BASICS",
        hotelMap: "THE+BASICS+FUKUOKA",
        timeline: [
            { time: "09:00", desc: "EN HOTEL 退房，前往 THE BASICS 寄放行李" },
            { time: "11:30", desc: "🍽️ 午餐：人形町今半" },
            { time: "13:30", desc: "博多運河城逛街避暑" },
            { time: "16:00", desc: "大濠公園散步 (若人多提早回飯店)" },
            { time: "18:00", desc: "🍽️ 晚餐：大濠公園周邊或博多" },
            { time: "20:00", desc: "THE BASICS 入住休息" }
        ],
        tips: "下午以室內避暑為主。",
        rainPlan: "改往福岡市美術館或周邊咖啡廳"
    },
    {
        day: "9/22 (二)",
        theme: "🌷 豪斯登堡",
        hotel: "THE BASICS",
        hotelMap: "THE+BASICS+FUKUOKA",
        timeline: [
            { time: "08:00", desc: "搭乘 JR 特急前往豪斯登堡" },
            { time: "10:00", desc: "豪斯登堡 (主題區/遊船/米飛兔)" },
            { time: "12:30", desc: "🍽️ 午餐：園區內餐廳" },
            { time: "14:00", desc: "繼續遊玩豪斯登堡" },
            { time: "17:30", desc: "傍晚搭乘 JR 返回博多" },
            { time: "19:30", desc: "🍽️ 晚餐：博多車站周邊" }
        ],
        tips: "園區廣大，多利用室內休息區與推車；控制步行量。",
        rainPlan: "園區內有眾多室內設施與商場"
    },
    {
        day: "9/23 (三)",
        theme: "♨️ 前往大分 (別府地獄溫泉)",
        hotel: "神和苑 (Kannawaen)",
        hotelMap: "別府+神和苑",
        timeline: [
            { time: "07:00", desc: "🍽️ 早餐：The Basic" },
            { time: "09:00", desc: "The Basic 退房" },
            { time: "10:00", desc: "出發移動至大分縣" },
            { time: "13:00", desc: "神和苑 Check in" },
            { time: "14:00", desc: "地獄蒸工房 (午餐/點心)" },
            { time: "15:00", desc: "血池地獄" },
            { time: "16:00", desc: "海地獄" },
            { time: "18:00", desc: "🍽️ 晚餐：回神和苑吃晚餐" },
            { time: "19:00", desc: "自由時間 / 休息泡湯" }
        ],
        tips: "車程較長，需備妥車上安撫物品；溫泉區移動注意嬰兒車與安全。",
        rainPlan: "提早入住神和苑享受館內溫泉設施與休息"
    },
    {
        day: "9/24 (四)",
        theme: "🦒 九州動物園與由布院",
        hotel: "神和苑 (Kannawaen)",
        hotelMap: "別府+神和苑",
        timeline: [
            { time: "07:00", desc: "🍽️ 早餐：神和苑" },
            { time: "08:00", desc: "前往九州自然動物公園 (African Safari)" },
            { time: "09:00", desc: "動物園遊玩 (叢林巴士餵食體驗)" },
            { time: "12:30", desc: "🍽️ 午餐：動物園內或周邊餐廳" },
            { time: "14:00", desc: "前往由布院散步 (湯之坪街道、金鱗湖)" },
            { time: "17:00", desc: "返回神和苑" },
            { time: "18:00", desc: "🍽️ 晚餐：回神和苑吃晚餐" },
            { time: "19:00", desc: "自由時間 / 休息泡湯" }
        ],
        tips: "叢林巴士非常受小朋友歡迎，建議提前預約。",
        rainPlan: "改為參觀九州大分海洋宮殿水族館 (海之卵)"
    },
    {
        day: "9/25 (五)",
        theme: "🐬 海之中道",
        hotel: "THE LUIGANS",
        hotelMap: "THE+LUIGANS+Spa+and+Resort",
        timeline: [
            { time: "08:30", desc: "🍽️ 早餐：飯店退房並移動回博多" },
            { time: "11:30", desc: "博多車站轉乘 JR 前往海之中道" },
            { time: "12:30", desc: "🍽️ 午餐：建議在博多站內先買齊帶去" },
            { time: "13:30", desc: "Marine World 水族館 / 海之中道海濱公園" },
            { time: "17:00", desc: "入住 THE LUIGANS 度假村" },
            { time: "18:30", desc: "🍽️ 晚餐：度假村內或周邊" }
        ],
        tips: "交通轉乘次數較多，注意行李搬運。",
        rainPlan: "水族館為室內行程，留意轉車雨具即可"
    },
    {
        day: "9/26 (六)",
        theme: "🏖️ 海島度假",
        hotel: "THE LUIGANS",
        hotelMap: "THE+LUIGANS+Spa+and+Resort",
        timeline: [
            { time: "09:00", desc: "🍽️ 早餐：飯店早餐" },
            { time: "10:30", desc: "志賀島海岸散步" },
            { time: "12:30", desc: "🍽️ 午餐：度假村周邊" },
            { time: "14:00", desc: "度假村泳池 / SPA 放鬆" },
            { time: "17:00", desc: "海邊看夕陽" },
            { time: "18:30", desc: "🍽️ 晚餐：度假村最後的晚餐" }
        ],
        tips: "全日低強度放鬆，減少通勤，以飯店接駁或計程車為主。",
        rainPlan: "轉為飯店內設施與 SPA 放鬆"
    },
    {
        day: "9/27 (日)",
        theme: "✈️ 滿載而歸",
        hotel: "溫暖的家",
        hotelMap: "",
        timeline: [
            { time: "07:00", desc: "🍽️ 早餐：早班機，早餐後即退房" },
            { time: "08:00", desc: "前往福岡機場" },
            { time: "09:30", desc: "機場報到 / 安檢 / 處理退稅" },
            { time: "12:20", desc: "起飛 (BR105)" },
            { time: "13:45", desc: "抵達台灣桃園機場，回到溫暖的家" }
        ],
        tips: "預留充分時間處理退稅與嬰兒車托運。",
        rainPlan: "室內行程不受影響"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Changelog
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

    // 2. Render Itinerary with Timeline
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

    // 3. Tab Switching Logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 4. Checklist LocalStorage Logic
    const checkboxes = document.querySelectorAll('.check-list input[type="checkbox"]');
    
    // Load saved states
    const savedChecklist = JSON.parse(localStorage.getItem('fukuokaChecklist')) || {};
    checkboxes.forEach(cb => {
        if(savedChecklist[cb.value]) {
            cb.checked = true;
        }
        
        // Save on change
        cb.addEventListener('change', (e) => {
            savedChecklist[e.target.value] = e.target.checked;
            localStorage.setItem('fukuokaChecklist', JSON.stringify(savedChecklist));
        });
    });
});
