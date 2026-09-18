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
        "day": "9/19 (六)",
        "theme": "✈️ 飛行抵達與入住",
        "hotel": "EN HOTEL Hakata",
        "timeline": [
            {
                "id": "t1_1",
                "time": "09:00",
                "desc": "前往桃園機場 TPE",
                "lat": 25.0797,
                "lng": 121.2342,
                "isOptimized": false
            },
            {
                "id": "t1_2",
                "time": "10:00",
                "desc": "桃園機場報到／托運 / 出境安檢／午餐",
                "lat": 25.0797,
                "lng": 121.2342,
                "isOptimized": false
            },
            {
                "id": "t1_3",
                "time": "15:10",
                "desc": "BR102 起飛 (TPE ➔ FUK)",
                "lat": 25.0797,
                "lng": 121.2342,
                "isOptimized": false
            },
            {
                "id": "t1_4",
                "time": "18:20",
                "desc": "抵達福岡 FUK／入境 / 領行李",
                "lat": 33.5859,
                "lng": 130.4496,
                "isOptimized": false
            },
            {
                "id": "t1_5",
                "time": "19:30",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 福岡機場站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 19:30 出發 (乘車約 5 分鐘)</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5859,
                "lng": 130.4496,
                "isOptimized": false
            },
            {
                "id": "t1_6",
                "time": "20:00",
                "desc": "EN HOTEL Hakata (Check-in) & 天神地下街",
                "lat": 33.5913,
                "lng": 130.3989,
                "isOptimized": false
            },
            {
                "id": "t1_7",
                "time": "21:00",
                "desc": "吃宵夜(屋台)",
                "lat": 33.5912,
                "lng": 130.4072,
                "isOptimized": false
            },
            {
                "id": "t1_8",
                "time": "22:00",
                "desc": "回房整理／休息",
                "lat": 33.5901,
                "lng": 130.4132,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/20 (日)",
        "theme": "⛩️ 太宰府與柳川",
        "hotel": "EN HOTEL Hakata",
        "timeline": [
            {
                "id": "t2_1",
                "time": "07:00",
                "desc": "EN HOTEL 早餐",
                "lat": 33.5901,
                "lng": 130.4132,
                "isOptimized": false
            },
            {
                "id": "t2_2",
                "time": "08:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線轉太宰府線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 西鐵福岡(天神)站 ➔ 太宰府站 (二日市轉乘)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:00 出發 (乘車約 45 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5901,
                "lng": 130.4132,
                "isOptimized": false
            },
            {
                "id": "t2_3",
                "time": "09:00",
                "desc": "太宰府天滿宮 & 太宰府參道／梅枝餅",
                "lat": 33.5215,
                "lng": 130.5349,
                "isOptimized": false
            },
            {
                "id": "t2_4",
                "time": "12:00",
                "desc": "午餐：一蘭拉麵",
                "lat": 33.5198,
                "lng": 130.5312,
                "isOptimized": false
            },
            {
                "id": "t2_5",
                "time": "13:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 太宰府站 ➔ 西鐵柳川站 (二日市轉乘)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 13:00 出發 (乘車約 45 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5215,
                "lng": 130.5349,
                "isOptimized": false
            },
            {
                "id": "t2_6",
                "time": "15:00",
                "desc": "柳川川下り遊船(三點)",
                "lat": 33.161,
                "lng": 130.4023,
                "isOptimized": false
            },
            {
                "id": "t2_7",
                "time": "16:00",
                "desc": "柳川 吃飯",
                "lat": 33.161,
                "lng": 130.4023,
                "isOptimized": false
            },
            {
                "id": "t2_8",
                "time": "17:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 西鐵大牟田線轉地鐵</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 西鐵柳川站 ➔ 西鐵福岡(天神)站轉地鐵回博多</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:00 出發 (乘車約 50 分鐘)</div><div style='margin-top: 4px;'><a href='https://jik.nishitetsu.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.161,
                "lng": 130.4023,
                "isOptimized": false
            },
            {
                "id": "t2_9",
                "time": "19:00",
                "desc": "回 EN HOTEL 休息",
                "lat": 33.5901,
                "lng": 130.4132,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/21 (一)",
        "theme": "🛍️ 市區輕遊與換房",
        "hotel": "THE BASICS FUKUOKA",
        "timeline": [
            {
                "id": "t3_1",
                "time": "09:00",
                "desc": "EN HOTEL 退房／行李整理",
                "lat": 33.5901,
                "lng": 130.4132,
                "isOptimized": false
            },
            {
                "id": "t3_2",
                "time": "10:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 步行</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> EN HOTEL ➔ THE BASICS FUKUOKA (寄放行李)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 10:00 出發 (步行約 10 分鐘)</div><div style='margin-top: 4px;'><a href='#' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            },
            {
                "id": "t3_3",
                "time": "11:00",
                "desc": "博多AMU PLAZA / 阪急百貨 人形町今半",
                "lat": 33.5898,
                "lng": 130.419,
                "isOptimized": false
            },
            {
                "id": "t3_4",
                "time": "13:00",
                "desc": "博多運河城 (Canal City Hakata)",
                "lat": 33.5898,
                "lng": 130.4107,
                "isOptimized": false
            },
            {
                "id": "t3_5",
                "time": "15:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多運河城 ➔ 大濠公園</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 14:30 出發</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5861,
                "lng": 130.3768,
                "isOptimized": false
            },
            {
                "id": "t3_6",
                "time": "15:30",
                "desc": "大濠公園 ＆ 舞鶴公園",
                "lat": 33.5861,
                "lng": 130.3768,
                "isOptimized": false
            },
            {
                "id": "t3_7",
                "time": "17:30",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 地鐵</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 大濠公園站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:30 出發</div><div style='margin-top: 4px;'><a href='https://subway.city.fukuoka.lg.jp/cha_trad/route/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5861,
                "lng": 130.3768,
                "isOptimized": false
            },
            {
                "id": "t3_8",
                "time": "18:00",
                "desc": "AMU EST 博多拉麵街道",
                "lat": 33.5898,
                "lng": 130.4207,
                "isOptimized": false
            },
            {
                "id": "t3_9",
                "time": "20:00",
                "desc": "回 THE BASICS FUKUOKA 休息",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/22 (二)",
        "theme": "🚢 門司港懷舊一日遊",
        "hotel": "THE BASICS FUKUOKA",
        "timeline": [
            {
                "id": "t4_1",
                "time": "07:00",
                "desc": "The Basic 早餐",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            },
            {
                "id": "t4_2",
                "time": "08:00",
                "desc": "櫛田神社參拜 / 飾山笠展示區",
                "lat": 33.593,
                "lng": 130.4106,
                "isOptimized": false
            },
            {
                "id": "t4_3",
                "time": "09:00",
                "desc": "東長寺（福岡大佛）本堂參拜",
                "lat": 33.5951,
                "lng": 130.414,
                "isOptimized": false
            },
            {
                "id": "t4_4",
                "time": "10:00",
                "desc": "步行至博多站 / 提早午餐",
                "lat": 33.5898,
                "lng": 130.4207,
                "isOptimized": false
            },
            {
                "id": "t4_5",
                "time": "11:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 鹿兒島本線 / 特急</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站 ➔ 門司港站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 11:00 出發 (乘車約 1h20m, 需在小倉轉車)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5898,
                "lng": 130.4207,
                "isOptimized": false
            },
            {
                "id": "t4_6",
                "time": "12:00",
                "desc": "門司港車站與懷舊建築群",
                "lat": 33.9449,
                "lng": 130.961,
                "isOptimized": false
            },
            {
                "id": "t4_7",
                "time": "13:00",
                "desc": "海峽廣場散策 & 香蕉人",
                "lat": 33.9458,
                "lng": 130.9634,
                "isOptimized": false
            },
            {
                "id": "t4_8",
                "time": "14:00",
                "desc": "藍翼橋（開合橋）& 關門海峽散步",
                "lat": 33.9467,
                "lng": 130.9641,
                "isOptimized": false
            },
            {
                "id": "t4_9",
                "time": "15:00",
                "desc": "門司港懷舊展望室",
                "lat": 33.9441,
                "lng": 130.9648,
                "isOptimized": false
            },
            {
                "id": "t4_10",
                "time": "16:00",
                "desc": "門司港周邊採買 & 準備返程",
                "lat": 33.9449,
                "lng": 130.961,
                "isOptimized": false
            },
            {
                "id": "t4_11",
                "time": "17:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 鹿兒島本線 / 特急</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 門司港站 ➔ 博多站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:00 出發 (乘車約 1h20m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.9449,
                "lng": 130.961,
                "isOptimized": false
            },
            {
                "id": "t4_12",
                "time": "18:00",
                "desc": "回 The Basic 休息",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/23 (三)",
        "theme": "♨️ 前往別府溫泉",
        "hotel": "山莊 神和苑",
        "timeline": [
            {
                "id": "t5_1",
                "time": "07:00",
                "desc": "The Basic(早餐)",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            },
            {
                "id": "t5_2",
                "time": "09:00",
                "desc": "The Basic(退房)",
                "lat": 33.5888,
                "lng": 130.4283,
                "isOptimized": false
            },
            {
                "id": "t5_3",
                "time": "10:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急音速號 (Sonic)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 博多站 ➔ 別府站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 10:00 出發 (乘車約 2h10m)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.5898,
                "lng": 130.4207,
                "isOptimized": false
            },
            {
                "id": "t5_4",
                "time": "12:30",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 別府站 ➔ 鐵輪 (神和苑)</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 12:30 出發 (乘車約 20 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.2796,
                "lng": 131.5063,
                "isOptimized": false
            },
            {
                "id": "t5_5",
                "time": "13:00",
                "desc": "神和苑(check in)",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            },
            {
                "id": "t5_6",
                "time": "14:00",
                "desc": "地獄蒸工房",
                "lat": 33.3146,
                "lng": 131.4756,
                "isOptimized": false
            },
            {
                "id": "t5_7",
                "time": "15:00",
                "desc": "血池地獄",
                "lat": 33.3267,
                "lng": 131.4815,
                "isOptimized": false
            },
            {
                "id": "t5_8",
                "time": "16:00",
                "desc": "海地獄",
                "lat": 33.3155,
                "lng": 131.4715,
                "isOptimized": false
            },
            {
                "id": "t5_9",
                "time": "18:00",
                "desc": "回神和苑吃晚餐",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/24 (四)",
        "theme": "🦁 九州自然動物公園",
        "hotel": "山莊 神和苑",
        "timeline": [
            {
                "id": "t6_1",
                "time": "07:00",
                "desc": "神和苑(早餐)",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            },
            {
                "id": "t6_2",
                "time": "08:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士 (41號)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 鐵輪 ➔ 九州自然動物公園</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:00 出發 (乘車約 40 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            },
            {
                "id": "t6_3",
                "time": "09:00",
                "desc": "九州自然動物公園 (Jungle Bus & 自由活動)",
                "lat": 33.337,
                "lng": 131.3995,
                "isOptimized": false
            },
            {
                "id": "t6_4",
                "time": "17:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 龜之井巴士 (41號)</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 九州自然動物公園 ➔ 鐵輪</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 17:00 出發 (乘車約 40 分鐘)</div><div style='margin-top: 4px;'><a href='https://kamenoibus.com/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.337,
                "lng": 131.3995,
                "isOptimized": false
            },
            {
                "id": "t6_5",
                "time": "18:00",
                "desc": "回神和苑吃晚餐與休息",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/25 (五)",
        "theme": "🐬 海之中道水族館",
        "hotel": "THE LUIGANS Spa & Resort",
        "timeline": [
            {
                "id": "t7_1",
                "time": "07:00",
                "desc": "山莊 神和苑 早餐",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            },
            {
                "id": "t7_2",
                "time": "10:00",
                "desc": "山莊 神和苑 退房",
                "lat": 33.3159,
                "lng": 131.4727,
                "isOptimized": false
            },
            {
                "id": "t7_3",
                "time": "10:30",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 特急音速號 + 香椎線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 別府站 ➔ 博多站 ➔ 海之中道站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 10:30 出發 (車程約 3小時)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.2796,
                "lng": 131.5063,
                "isOptimized": false
            },
            {
                "id": "t7_4",
                "time": "14:00",
                "desc": "THE LUIGANS Check-in",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t7_5",
                "time": "15:00",
                "desc": "Marine World 海之中道水族館",
                "lat": 33.6606,
                "lng": 130.3461,
                "isOptimized": false
            },
            {
                "id": "t7_6",
                "time": "17:00",
                "desc": "THE LUIGANS 海灘 散步放鬆",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t7_7",
                "time": "18:00",
                "desc": "回飯店吃飯",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t7_8",
                "time": "19:00",
                "desc": "海邊散步／度假村夜景",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/26 (六)",
        "theme": "🏝️ 志賀島與度假村放鬆",
        "hotel": "THE LUIGANS Spa & Resort",
        "timeline": [
            {
                "id": "t8_1",
                "time": "07:00",
                "desc": "LUIGANS 早餐",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_2",
                "time": "08:00",
                "desc": "海邊散步／度假村設施",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_3",
                "time": "09:00",
                "desc": "志賀島海岸線／金印公園",
                "lat": 33.6644,
                "lng": 130.309,
                "isOptimized": false
            },
            {
                "id": "t8_4",
                "time": "10:00",
                "desc": "志賀島海景散步",
                "lat": 33.6644,
                "lng": 130.309,
                "isOptimized": false
            },
            {
                "id": "t8_5",
                "time": "11:00",
                "desc": "海鮮午餐",
                "lat": 33.6644,
                "lng": 130.309,
                "isOptimized": false
            },
            {
                "id": "t8_6",
                "time": "12:00",
                "desc": "返回 LUIGANS／休息",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_7",
                "time": "13:00",
                "desc": "度假村泳池／海邊",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_8",
                "time": "14:00",
                "desc": "大人 Spa／小孩休息",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_9",
                "time": "16:00",
                "desc": "日落海邊拍照",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_10",
                "time": "18:00",
                "desc": "LUIGANS 晚餐",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t8_11",
                "time": "20:00",
                "desc": "回房整理行李",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            }
        ]
    },
    {
        "day": "9/27 (日)",
        "theme": "🛫 滿載而歸",
        "hotel": "溫暖的家",
        "timeline": [
            {
                "id": "t9_1",
                "time": "07:00",
                "desc": "LUIGANS 早餐／退房整理",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t9_2",
                "time": "08:00",
                "desc": "<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 JR 香椎線轉機場線</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> 海之中道站 ➔ 福岡機場站</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> 08:00 出發 (車程約 1小時)</div><div style='margin-top: 4px;'><a href='https://www.jrkyushu-timetable.jp/' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>",
                "lat": 33.6545,
                "lng": 130.3475,
                "isOptimized": false
            },
            {
                "id": "t9_3",
                "time": "09:00",
                "desc": "福岡機場報到／托運",
                "lat": 33.5859,
                "lng": 130.4496,
                "isOptimized": false
            },
            {
                "id": "t9_4",
                "time": "10:00",
                "desc": "出境安檢／候機 / 登機準備",
                "lat": 33.5859,
                "lng": 130.4496,
                "isOptimized": false
            },
            {
                "id": "t9_5",
                "time": "12:20",
                "desc": "BR105 起飛 (FUK ➔ TPE)",
                "lat": 33.5859,
                "lng": 130.4496,
                "isOptimized": false
            },
            {
                "id": "t9_6",
                "time": "13:45",
                "desc": "抵達台灣 TPE / 入境取行李",
                "lat": 25.0797,
                "lng": 121.2342,
                "isOptimized": false
            },
            {
                "id": "t9_7",
                "time": "15:00",
                "desc": "回家",
                "lat": 25.0797,
                "lng": 121.2342,
                "isOptimized": false
            }
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
