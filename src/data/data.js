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
            { id: "t1_2", time: "19:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 福岡機場站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 19:30 出發 (乘車約 5 分鐘)</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5859, lng: 130.4496, isOptimized: false },
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
            { id: "t2_2", time: "09:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線轉太宰府線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 西鐵福岡(天神)站 ➔ 太宰府站 (需在二日市轉乘)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 09:30 出發 (乘車約 45 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5215, lng: 130.5349, isOptimized: false },
            { id: "t2_3", time: "10:30", desc: "太宰府天滿宮參拜與參道散策", lat: 33.5215, lng: 130.5349, isOptimized: false },
            { id: "t2_4", time: "12:30", desc: "午餐：太宰府參道美食 (一蘭或梅枝餅)", lat: 33.5198, lng: 130.5312, isOptimized: false },
            { id: "t2_5", time: "13:45", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線 (特急)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 太宰府站 ➔ 西鐵柳川站 (需在二日市轉乘)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 13:45 出發 (乘車約 45 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_6", time: "15:00", desc: "柳川川下り遊船 (已預約乘船)", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_7", time: "17:30", desc: "晚餐：柳川名物 本吉屋 鰻魚飯", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_8", time: "19:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線 (特急) 後轉地鐵</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 西鐵柳川站 ➔ 西鐵福岡(天神)站轉地鐵回博多</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 19:00 出發 (乘車約 50 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t2_9", time: "20:30", desc: "返回 EN HOTEL 休息", lat: 33.5901, lng: 130.4132, isOptimized: false }
        ]
    },
    {
        day: "9/21 (一)",
        theme: "🛍️ 市區輕遊與換房",
        hotel: "THE BASICS",
        timeline: [
            { id: "t3_1", time: "09:30", desc: "EN HOTEL 退房", lat: 33.5901, lng: 130.4132, isOptimized: false },
            { id: "t3_2", time: "09:45", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 步行</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> EN HOTEL ➔ THE BASICS (寄放行李)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 09:45 出發 (乘車約 10 分鐘)</div><div style='margin-top: 4px;'><a href='#' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t3_3", time: "10:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵巴士 (302等路線)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站前 ➔ 運河城前</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 10:30 出發 (乘車約 10 分鐘)</div><div style='margin-top: 4px;'><a href='https://nimbus.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5898, lng: 130.4107, isOptimized: false },
            { id: "t3_4", time: "11:00", desc: "博多運河城 (Canal City) 逛街", lat: 33.5898, lng: 130.4107, isOptimized: false },
            { id: "t3_5", time: "12:30", desc: "午餐：人形町今半 (壽喜燒)", lat: 33.5898, lng: 130.4190, isOptimized: false },
            { id: "t3_6", time: "14:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 中洲川端站 ➔ 大濠公園站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 14:30 出發 (乘車約 10 分鐘)</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5861, lng: 130.3768, isOptimized: false },
            { id: "t3_7", time: "15:00", desc: "大濠公園 散步與兒童遊戲區", lat: 33.5861, lng: 130.3768, isOptimized: false },
            { id: "t3_8", time: "17:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 大濠公園站 ➔ 天神站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:30 出發 (乘車約 5 分鐘)</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5913, lng: 130.3989, isOptimized: false },
            { id: "t3_9", time: "18:00", desc: "晚餐：天神地下街 / 周邊餐廳", lat: 33.5913, lng: 130.3989, isOptimized: false },
            { id: "t3_10", time: "20:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 天神站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 20:00 出發 (乘車約 6 分鐘)</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/22 (二)",
        theme: "🌷 豪斯登堡一日遊",
        hotel: "THE BASICS",
        timeline: [
            { id: "t4_1", time: "08:15", desc: "THE BASICS 出發 前往博多車站", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t4_2", time: "08:55", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急豪斯登堡號 (Huis Ten Bosch)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站 ➔ 豪斯登堡站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:55 出發 (乘車約 1h50m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/jr-k_time/map.html' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_3", time: "11:00", desc: "抵達豪斯登堡 開始遊玩", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_4", time: "12:30", desc: "午餐：園區內餐廳", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_5", time: "17:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急豪斯登堡號 (Huis Ten Bosch)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 豪斯登堡站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:30 出發 (乘車約 1h50m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/jr-k_time/map.html' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_6", time: "19:30", desc: "晚餐：THE BASICS 附近居酒屋 / 車站便當", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/23 (三)",
        theme: "♨️ 前往別府溫泉",
        hotel: "神和苑",
        timeline: [
            { id: "t5_1", time: "09:00", desc: "THE BASICS 退房", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t5_2", time: "09:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急音速號 (Sonic)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站 ➔ 別府站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 09:30 出發 (乘車約 2h10m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/jr-k_time/map.html' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.2796, lng: 131.5063, isOptimized: false },
            { id: "t5_3", time: "11:50", desc: "抵達別府車站 (寄放行李或搭車)", lat: 33.2796, lng: 131.5063, isOptimized: false },
            { id: "t5_4", time: "12:15", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士 (5/7/9號)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 別府站西口 ➔ 鐵輪</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 12:15 出發 (乘車約 20 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/rosenbus/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.3146, lng: 131.4756, isOptimized: false },
            { id: "t5_5", time: "12:45", desc: "午餐：地獄蒸工房 鐵輪", lat: 33.3146, lng: 131.4756, isOptimized: false },
            { id: "t5_6", time: "14:30", desc: "海地獄 / 血池地獄 巡禮", lat: 33.3155, lng: 131.4715, isOptimized: false },
            { id: "t5_7", time: "16:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 計程車</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 鐵輪 ➔ 神和苑</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 16:00 出發 (乘車約 5 分鐘)</div><div style='margin-top: 4px;'><a href='#' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t5_8", time: "18:00", desc: "晚餐：神和苑 飯店會席料理", lat: 33.3159, lng: 131.4727, isOptimized: false }
        ]
    },
    {
        day: "9/24 (四)",
        theme: "🦒 九州動物園與溫泉放鬆",
        hotel: "神和苑",
        timeline: [
            { id: "t6_1", time: "08:30", desc: "神和苑 出發", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_2", time: "08:50", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士 (41號)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 鐵輪 ➔ 九州自然動物公園</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:50 出發 (乘車約 30 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/rosenbus/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_3", time: "09:40", desc: "抵達 九州自然動物公園 (African Safari)", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_4", time: "10:30", desc: "搭乘叢林巴士 (Jungle Bus) 餵食動物", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_5", time: "12:30", desc: "午餐：動物園內餐廳 或 輕食", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_6", time: "14:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士 (41號)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 九州自然動物公園 ➔ 鐵輪</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 14:00 出發 (乘車約 30 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/rosenbus/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_7", time: "15:00", desc: "鐵輪溫泉老街散策與足湯 / 或回飯店休息", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_8", time: "16:00", desc: "返回 神和苑 享受溫泉與絕美能樂堂庭園", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_9", time: "18:30", desc: "晚餐：神和苑", lat: 33.3159, lng: 131.4727, isOptimized: false }
        ]
    },
    {
        day: "9/25 (五)",
        theme: "🐬 海之中道生態遊",
        hotel: "THE LUIGANS",
        timeline: [
            { id: "t7_1", time: "09:30", desc: "神和苑 退房", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t7_2", time: "10:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急音速號 (Sonic)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 別府站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 10:00 出發 (乘車約 2h10m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/jr-k_time/map.html' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t7_3", time: "12:30", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 鹿兒島本線轉香椎線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站 ➔ 海之中道站 (需在香椎站轉乘)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 12:30 出發 (乘車約 40 分鐘)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/jr-k_time/map.html' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_4", time: "13:30", desc: "午餐：海之中道水族館 餐廳", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_5", time: "14:30", desc: "海之中道海洋生態科學館 (Marine World)", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_6", time: "17:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 步行</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 海之中道站 ➔ THE LUIGANS Spa and Resort</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:00 出發 (乘車約 5 分鐘)</div><div style='margin-top: 4px;'><a href='#' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t7_7", time: "18:30", desc: "晚餐：渡假村內餐廳", lat: 33.6609, lng: 130.3168, isOptimized: false }
        ]
    },
    {
        day: "9/26 (六)",
        theme: "🏖️ 海島度假放鬆",
        hotel: "THE LUIGANS",
        timeline: [
            { id: "t8_1", time: "09:00", desc: "THE LUIGANS (享用飯店早餐與美麗泳池)", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t8_2", time: "11:00", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 自行車或渡假村免費接駁巴士</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 渡假村 ➔ 志賀島 / 海之中道海濱公園</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 11:00 出發 (乘車約 自行決定)</div><div style='margin-top: 4px;'><a href='#' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.6653, lng: 130.3015, isOptimized: false },
            { id: "t8_3", time: "13:00", desc: "午餐：當地海鮮或公園內野餐", lat: 33.6653, lng: 130.3015, isOptimized: false },
            { id: "t8_4", time: "15:00", desc: "返回渡假村徹底放鬆", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t8_5", time: "18:30", desc: "晚餐：THE LUIGANS 餐廳 (可預約 BBQ)", lat: 33.6609, lng: 130.3168, isOptimized: false }
        ]
    },
    {
        day: "9/27 (日)",
        theme: "✈️ 滿載而歸",
        hotel: "溫暖的家",
        timeline: [
            { id: "t9_1", time: "08:30", desc: "THE LUIGANS 退房", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t9_2", time: "08:45", desc: "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 渡假村免費接駁巴士</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> THE LUIGANS ➔ 福岡機場 (經博多站)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:45 出發 (乘車約 50 分鐘)</div><div style='margin-top: 4px;'><a href='https://www.luigans.com/access/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t9_3", time: "09:35", desc: "福岡機場 (FUK) 報到掛行李", lat: 33.5859, lng: 130.4496, isOptimized: false },
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
        },
        {
            id: "tickets",
            title: "🎟️ 必備票券與預約",
            items: [
                { id: "tk1", text: "【9/20】柳川川下り遊船 乘船券", checked: false },
                { id: "tk2", text: "【9/22】豪斯登堡 1 DAY Passport", checked: false },
                { id: "tk3", text: "【9/22】JR 特急豪斯登堡號 劃位指定席", checked: false },
                { id: "tk4", text: "【9/23】別府地獄溫泉門票", checked: false },
                { id: "tk5", text: "【9/24】九州動物園門票 + 叢林巴士券 (極重要)", checked: false },
                { id: "tk6", text: "【9/25】海之中道海洋生態科學館門票", checked: false }
            ]
        }
    ],
    shoppingListData: [],
    reservationData: [
        { type: "🎟️ 景點門票", name: "柳川川下り遊船 (乘船券)", time: "9/20", note: "未購票", checked: false },
        { type: "🎟️ 景點門票", name: "豪斯登堡 1 DAY Passport", time: "9/22", note: "未購票", checked: false },
        { type: "🚅 交通車票", name: "JR 特急豪斯登堡號 (指定席)", time: "9/22", note: "未劃位", checked: false },
        { type: "🎟️ 景點門票", name: "別府地獄溫泉門票 (海地獄/血池)", time: "9/23", note: "現場購買", checked: false },
        { type: "🎟️ 景點門票", name: "九州自然動物公園 (門票+叢林巴士)", time: "9/24", note: "務必提前預約", checked: false },
        { type: "🎟️ 景點門票", name: "海之中道海洋生態科學館", time: "9/25", note: "未購票", checked: false },
        { type: "🎟️ 景點門票", name: "海之中道海濱公園 (入園費)", time: "9/26", note: "現場購買", checked: false }
    ],
    sharedExpenseData: []
};
