const itineraryData = [
    {
        day: "9/19 (六)",
        theme: "✈️ 飛行抵達",
        hotel: "EN HOTEL Hakata",
        route: "台北出發 → 福岡機場 (BR102) → 飯店入住 → 天神地下街/屋台宵夜",
        tips: "晚間抵達降低強度；機場先處理奶量與小孩餐點。",
        rainPlan: "室內行程不受影響"
    },
    {
        day: "9/20 (日)",
        theme: "⛩️ 太宰府與柳川",
        hotel: "EN HOTEL Hakata",
        route: "飯店 → 太宰府天滿宮/參道 → 柳川川下り遊船 → 博多站周邊晚餐",
        tips: "依小孩體力隨時縮短行程；推車避開參道人潮高峰。",
        rainPlan: "改去 Canal City 或 LaLaport 商場"
    },
    {
        day: "9/21 (一)",
        theme: "🛍️ 市區輕遊換房",
        hotel: "THE BASICS",
        route: "寄放行李 → 人形町今半午餐 → 博多運河城逛街 → 大濠公園散步",
        tips: "下午以室內避暑為主；大濠公園若人多可提早回新飯店。",
        rainPlan: "改往福岡市美術館或周邊咖啡廳"
    },
    {
        day: "9/22 (二)",
        theme: "🌷 豪斯登堡",
        hotel: "THE BASICS",
        route: "搭乘 JR 特急前往 → 豪斯登堡 (主題區/遊船/米飛兔) → 傍晚返回博多",
        tips: "園區廣大，多利用室內休息區與推車；控制步行量。",
        rainPlan: "園區內有眾多室內設施與商場"
    },
    {
        day: "9/23 (三)",
        theme: "♨️ 前往大分 (別府地獄溫泉)",
        hotel: "神和苑 (Kannawaen)",
        route: "The Basic 退房 → 移動大分縣 → 神和苑入住 → 地獄蒸工房 → 血池地獄 → 海地獄 → 神和苑晚餐",
        tips: "車程約3小時較長，需備妥車上安撫物品；溫泉區移動注意嬰兒車與安全。",
        rainPlan: "提早入住神和苑享受館內溫泉設施與休息"
    },
    {
        day: "9/24 (四)",
        theme: "🦒 動植物園",
        hotel: "Nikko Kumamoto",
        route: "熊本市動植物園 → 水前寺成趣園散步 → 鶴屋百貨採買",
        tips: "關鍵任務：於鶴屋百貨買齊 LUIGANS 需要的尿布、奶粉與零食水。",
        rainPlan: "取消戶外，改為熊本車站 AMU PLAZA 逛街"
    },
    {
        day: "9/25 (五)",
        theme: "🐬 海之中道",
        hotel: "THE LUIGANS",
        route: "新幹線回博多轉 JR → 海之中道 → Marine World 水族館 → 入住度假村",
        tips: "交通轉乘次數較多，午餐建議在博多站內先買齊或解決。",
        rainPlan: "水族館為室內行程，留意轉車雨具即可"
    },
    {
        day: "9/26 (六)",
        theme: "🏖️ 海島度假",
        hotel: "THE LUIGANS",
        route: "飯店早餐 → 志賀島海岸散步 → 度假村泳池/SPA → 海邊看夕陽",
        tips: "全日低強度放鬆，減少通勤，以飯店接駁或計程車為主。",
        rainPlan: "轉為飯店內設施與 SPA 放鬆"
    },
    {
        day: "9/27 (日)",
        theme: "✈️ 滿載而歸",
        hotel: "溫暖的家",
        route: "08:00 前往機場 → 報到/安檢 → 12:20 起飛 (BR105) → 抵達台灣",
        tips: "早班機，早餐後即退房；預留充分時間處理退稅與嬰兒車托運。",
        rainPlan: "室內行程不受影響"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const itineraryList = document.getElementById('itinerary-list');

    itineraryData.forEach((dayData, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-header">
                <span class="day-badge">${dayData.day}</span>
                <h3 class="theme">${dayData.theme}</h3>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <span class="icon">🏨</span>
                    <div>
                        <strong>住宿</strong>
                        <p>${dayData.hotel}</p>
                    </div>
                </div>
                <div class="info-row">
                    <span class="icon">📍</span>
                    <div>
                        <strong>行程動線</strong>
                        <p>${dayData.route}</p>
                    </div>
                </div>
                <div class="info-row">
                    <span class="icon">💡</span>
                    <div>
                        <strong>育兒重點與備註</strong>
                        <p>${dayData.tips}</p>
                    </div>
                </div>
                <div class="info-row">
                    <span class="icon">☔</span>
                    <div>
                        <strong>雨天備案</strong>
                        <p>${dayData.rainPlan}</p>
                    </div>
                </div>
            </div>
        `;

        itineraryList.appendChild(card);
    });
});
