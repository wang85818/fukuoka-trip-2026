const changelogData = [
    {
        version: "v2.0.0",
        date: "2026-09-04",
        changes: [
            "地圖引擎升級：導入 Leaflet.js 與 OSRM，全面實現開源免費的互動式路線地圖。",
            "智慧路線優化：一鍵根據地理位置重新排序行程，並自動計算車程時間。",
            "景點庫 (POI) 系統：內建精選福岡景點，點擊即可輕鬆加入行程中。"
        ]
    }
];

const poiDatabase = [
    { id: "p1", name: "福岡塔 (Fukuoka Tower)", category: "attraction", lat: 33.5933, lng: 130.3515, desc: "福岡地標，海濱百道海濱公園旁。" },
    { id: "p2", name: "太宰府天滿宮", category: "attraction", lat: 33.5215, lng: 130.5349, desc: "祈求學業順利的著名神社，參道有許多美食。" },
    { id: "p3", name: "博多運河城 (Canal City)", category: "attraction", lat: 33.5898, lng: 130.4107, desc: "大型複合式購物中心，定時有水舞秀。" },
    { id: "p4", name: "大濠公園", category: "attraction", lat: 33.5861, lng: 130.3768, desc: "廣大的市區水景公園，非常適合散步與兒童放電。" },
    { id: "p5", name: "一蘭拉麵 本社總本店", category: "food", lat: 33.5932, lng: 130.4046, desc: "來福岡必吃的知名豚骨拉麵總店。" },
    { id: "p6", name: "中洲屋台街", category: "food", lat: 33.5912, lng: 130.4072, desc: "體驗福岡道地夜晚路邊攤文化的最佳去處。" },
    { id: "p7", name: "Shin-Shin 拉麵 (天神本店)", category: "food", lat: 33.5925, lng: 130.3980, desc: "極細麵與濃厚不膩的豚骨湯頭，深受在地人喜愛。" },
    { id: "p8", name: "EN HOTEL Hakata", category: "hotel", lat: 33.5901, lng: 130.4132, desc: "博多市區高CP值住宿。" },
    { id: "p9", name: "THE BASICS FUKUOKA", category: "hotel", lat: 33.5888, lng: 130.4283, desc: "極具設計感的奢華圖書館風格飯店。" },
    { id: "p10", name: "福岡機場 (FUK)", category: "attraction", lat: 33.5859, lng: 130.4496, desc: "九州最大的國際機場。" }
];

const itineraryData = [
    {
        day: "9/19 (六)",
        theme: "✈️ 飛行抵達與入住",
        hotel: "EN HOTEL Hakata",
        timeline: [
            { id: "t1_1", time: "18:20", desc: "福岡機場 (FUK) - BR102 抵達", lat: 33.5859, lng: 130.4496, isOptimized: false },
            { id: "t1_2", time: "19:30", desc: "[車程 15 分鐘] 前往飯店", lat: 33.5859, lng: 130.4496, isOptimized: false },
            { id: "t1_3", time: "20:00", desc: "EN HOTEL Hakata (Check-in)", lat: 33.5901, lng: 130.4132, isOptimized: false },
            { id: "t1_4", time: "20:30", desc: "晚餐：Shin-Shin 拉麵 (博多車站旁)", lat: 33.5905, lng: 130.4201, isOptimized: false },
            { id: "t1_5", time: "22:00", desc: "返回 EN HOTEL 休息", lat: 33.5901, lng: 130.4132, isOptimized: false }
        ]
    },
    {
        day: "9/20 (日)",
        theme: "⛩️ 太宰府與柳川",
        hotel: "EN HOTEL Hakata",
        timeline: [
            { id: "t2_1", time: "09:00", desc: "EN HOTEL Hakata 出發", lat: 33.5901, lng: 130.4132, isOptimized: false },
            { id: "t2_2", time: "09:45", desc: "[火車 45 分鐘] 太宰府天滿宮", lat: 33.5215, lng: 130.5349, isOptimized: false },
            { id: "t2_3", time: "12:30", desc: "午餐：太宰府參道美食 (一蘭或梅枝餅)", lat: 33.5198, lng: 130.5312, isOptimized: false },
            { id: "t2_4", time: "14:00", desc: "[火車 45 分鐘] 柳川遊船", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_5", time: "18:00", desc: "[火車 1 小時] 返回博多車站", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t2_6", time: "18:30", desc: "晚餐：博多車站美食街", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t2_7", time: "20:00", desc: "返回 EN HOTEL 休息", lat: 33.5901, lng: 130.4132, isOptimized: false }
        ]
    },
    {
        day: "9/21 (一)",
        theme: "🛍️ 市區輕遊與換房",
        hotel: "THE BASICS",
        timeline: [
            { id: "t3_1", time: "09:30", desc: "EN HOTEL 退房", lat: 33.5901, lng: 130.4132, isOptimized: false },
            { id: "t3_2", time: "09:45", desc: "[步行/車 10 分鐘] THE BASICS (寄放行李)", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t3_3", time: "10:30", desc: "[公車 15 分鐘] 博多運河城 (Canal City)", lat: 33.5898, lng: 130.4107, isOptimized: false },
            { id: "t3_4", time: "12:30", desc: "午餐：人形町今半 (壽喜燒)", lat: 33.5898, lng: 130.4190, isOptimized: false },
            { id: "t3_5", time: "14:30", desc: "[地鐵 15 分鐘] 大濠公園", lat: 33.5861, lng: 130.3768, isOptimized: false },
            { id: "t3_6", time: "18:00", desc: "晚餐：天神周邊餐廳", lat: 33.5913, lng: 130.3989, isOptimized: false },
            { id: "t3_7", time: "20:00", desc: "THE BASICS (Check-in 休息)", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/22 (二)",
        theme: "🌷 豪斯登堡一日遊",
        hotel: "THE BASICS",
        timeline: [
            { id: "t4_1", time: "08:15", desc: "THE BASICS 出發", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t4_2", time: "08:55", desc: "[JR 特急 1h50m] 搭乘豪斯登堡號", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_3", time: "11:00", desc: "豪斯登堡", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_4", time: "12:30", desc: "午餐：園區內餐廳", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_5", time: "17:30", desc: "[JR 特急 1h50m] 返回博多", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_6", time: "19:30", desc: "晚餐：THE BASICS 附近居酒屋", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/23 (三)",
        theme: "♨️ 前往別府溫泉",
        hotel: "神和苑",
        timeline: [
            { id: "t5_1", time: "09:00", desc: "THE BASICS 退房", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t5_2", time: "09:30", desc: "[JR音速號 2h10m] 往別府車站", lat: 33.2796, lng: 131.5063, isOptimized: false },
            { id: "t5_3", time: "12:30", desc: "午餐：地獄蒸工房 鐵輪", lat: 33.3146, lng: 131.4756, isOptimized: false },
            { id: "t5_4", time: "14:30", desc: "海地獄 / 血池地獄", lat: 33.3155, lng: 131.4715, isOptimized: false },
            { id: "t5_5", time: "16:00", desc: "[計程車 5 分鐘] 神和苑 (Check-in)", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t5_6", time: "18:00", desc: "晚餐：神和苑 飯店會席料理", lat: 33.3159, lng: 131.4727, isOptimized: false }
        ]
    },
    {
        day: "9/24 (四)",
        theme: "🦒 九州動物園與由布院",
        hotel: "神和苑",
        timeline: [
            { id: "t6_1", time: "08:30", desc: "神和苑 出發", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_2", time: "09:00", desc: "[巴士 30 分鐘] 九州自然動物公園", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_3", time: "12:30", desc: "午餐：動物園內餐廳", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_4", time: "14:00", desc: "[車程 40 分鐘] 由布院 (金鱗湖散步)", lat: 33.2662, lng: 131.3683, isOptimized: false },
            { id: "t6_5", time: "17:30", desc: "[車程 50 分鐘] 返回神和苑", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_6", time: "18:30", desc: "晚餐：神和苑", lat: 33.3159, lng: 131.4727, isOptimized: false }
        ]
    },
    {
        day: "9/25 (五)",
        theme: "🐬 海之中道生態遊",
        hotel: "THE LUIGANS",
        timeline: [
            { id: "t7_1", time: "09:30", desc: "神和苑 退房", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t7_2", time: "10:00", desc: "[JR+電車 3小時] 往海之中道", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_3", time: "13:00", desc: "午餐：水族館餐廳", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_4", time: "14:00", desc: "海之中道海洋生態科學館", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_5", time: "17:00", desc: "THE LUIGANS Spa and Resort (Check-in)", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t7_6", time: "18:30", desc: "晚餐：渡假村內餐廳", lat: 33.6609, lng: 130.3168, isOptimized: false }
        ]
    },
    {
        day: "9/26 (六)",
        theme: "🏖️ 海島度假放鬆",
        hotel: "THE LUIGANS",
        timeline: [
            { id: "t8_1", time: "09:00", desc: "THE LUIGANS (享用飯店早餐/設施)", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t8_2", time: "11:00", desc: "[租借腳踏車] 志賀島環島", lat: 33.6653, lng: 130.3015, isOptimized: false },
            { id: "t8_3", time: "13:00", desc: "午餐：志賀島海鮮餐廳", lat: 33.6653, lng: 130.3015, isOptimized: false },
            { id: "t8_4", time: "15:00", desc: "返回渡假村放鬆", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t8_5", time: "18:30", desc: "晚餐：THE LUIGANS 餐廳", lat: 33.6609, lng: 130.3168, isOptimized: false }
        ]
    },
    {
        day: "9/27 (日)",
        theme: "✈️ 滿載而歸",
        hotel: "溫暖的家",
        timeline: [
            { id: "t9_1", time: "08:30", desc: "THE LUIGANS 退房", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t9_2", time: "08:45", desc: "[車程 50 分鐘] 前往機場", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t9_3", time: "09:35", desc: "福岡機場 (FUK) 報到", lat: 33.5859, lng: 130.4496, isOptimized: false },
            { id: "t9_4", time: "12:20", desc: "BR105 班機起飛返回台北", lat: 33.5859, lng: 130.4496, isOptimized: false }
        ]
    }
];

window.appData = {
    changelogData,
    poiDatabase,
    itineraryData,
    checklistData: [
        {
            id: "baby",
            title: "👶 育兒必備",
            items: [
                { id: "diapers", text: "尿布 (隨身+行李箱)", checked: false },
                { id: "milk", text: "奶粉 / 奶瓶 / 奶粉分裝盒", checked: false },
                { id: "stroller", text: "嬰兒推車 (輕便可摺疊)", checked: false },
                { id: "snacks", text: "寶寶零食 / 安撫玩具", checked: false },
                { id: "wipes", text: "濕紙巾 / 衛生紙", checked: false },
                { id: "baby-clothes", text: "寶寶換洗衣物 / 外套", checked: false }
            ]
        },
        {
            id: "docs",
            title: "📄 重要文件與物品",
            items: [
                { id: "passport", text: "護照 (確認效期>6個月)", checked: false },
                { id: "vjw", text: "Visit Japan Web 截圖/QR Code", checked: false },
                { id: "credit-card", text: "信用卡 (綁定 Apple Pay / 實體卡)", checked: false },
                { id: "cash", text: "日幣現金", checked: false },
                { id: "wifi", text: "網卡 / WiFi 機", checked: false },
                { id: "power-bank", text: "行動電源 / 充電線", checked: false }
            ]
        },
        {
            id: "clothes",
            title: "👕 隨身衣物與藥品",
            items: [
                { id: "clothes", text: "大人換洗衣物 (9天份或可洗)", checked: false },
                { id: "jacket", text: "防風薄外套", checked: false },
                { id: "umbrella", text: "雨傘 / 輕便雨衣", checked: false },
                { id: "medicine", text: "常備藥品 (退燒、腸胃、暈車藥)", checked: false },
                { id: "skincare", text: "保養品 / 防曬乳", checked: false }
            ]
        }
    ],
    shoppingListData: [],
    reservationData: [],
    sharedExpenseData: []
};
