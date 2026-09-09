import re

def create_transport_desc(line, start, end, time, duration, url):
    return f"""<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 {line}</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> {start} ➔ {end}</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> {time} 出發 (乘車約 {duration})</div><div style='margin-top: 4px;'><a href='{url}' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看列車時刻表</a></div></div></div>"""

content = """const itineraryData = [
    {
        day: "9/19 (六)",
        theme: "✈️ 飛行抵達與入住",
        hotel: "EN HOTEL Hakata",
        timeline: [
            { id: "t1_1", time: "18:20", desc: "福岡機場 (FUK) - BR102 抵達", lat: 33.5859, lng: 130.4496, isOptimized: false },
            { id: "t1_2", time: "19:30", desc: "T_1_2", lat: 33.5859, lng: 130.4496, isOptimized: false },
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
            { id: "t2_2", time: "09:30", desc: "T_2_2", lat: 33.5215, lng: 130.5349, isOptimized: false },
            { id: "t2_3", time: "10:30", desc: "太宰府天滿宮參拜與參道散策", lat: 33.5215, lng: 130.5349, isOptimized: false },
            { id: "t2_4", time: "12:30", desc: "午餐：太宰府參道美食 (一蘭或梅枝餅)", lat: 33.5198, lng: 130.5312, isOptimized: false },
            { id: "t2_5", time: "13:45", desc: "T_2_5", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_6", time: "15:00", desc: "柳川川下り遊船 (已預約乘船)", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_7", time: "17:30", desc: "晚餐：柳川名物 本吉屋 鰻魚飯", lat: 33.1610, lng: 130.4023, isOptimized: false },
            { id: "t2_8", time: "19:00", desc: "T_2_8", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t2_9", time: "20:30", desc: "返回 EN HOTEL 休息", lat: 33.5901, lng: 130.4132, isOptimized: false }
        ]
    },
    {
        day: "9/21 (一)",
        theme: "🛍️ 市區輕遊與換房",
        hotel: "THE BASICS",
        timeline: [
            { id: "t3_1", time: "09:30", desc: "EN HOTEL 退房", lat: 33.5901, lng: 130.4132, isOptimized: false },
            { id: "t3_2", time: "09:45", desc: "T_3_2", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t3_3", time: "10:30", desc: "T_3_3", lat: 33.5898, lng: 130.4107, isOptimized: false },
            { id: "t3_4", time: "11:00", desc: "博多運河城 (Canal City) 逛街", lat: 33.5898, lng: 130.4107, isOptimized: false },
            { id: "t3_5", time: "12:30", desc: "午餐：人形町今半 (壽喜燒)", lat: 33.5898, lng: 130.4190, isOptimized: false },
            { id: "t3_6", time: "14:30", desc: "T_3_6", lat: 33.5861, lng: 130.3768, isOptimized: false },
            { id: "t3_7", time: "15:00", desc: "大濠公園 散步與兒童遊戲區", lat: 33.5861, lng: 130.3768, isOptimized: false },
            { id: "t3_8", time: "17:30", desc: "T_3_8", lat: 33.5913, lng: 130.3989, isOptimized: false },
            { id: "t3_9", time: "18:00", desc: "晚餐：天神地下街 / 周邊餐廳", lat: 33.5913, lng: 130.3989, isOptimized: false },
            { id: "t3_10", time: "20:00", desc: "T_3_10", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/22 (二)",
        theme: "🌷 豪斯登堡一日遊",
        hotel: "THE BASICS",
        timeline: [
            { id: "t4_1", time: "08:15", desc: "THE BASICS 出發 前往博多車站", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t4_2", time: "08:55", desc: "T_4_2", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_3", time: "11:00", desc: "抵達豪斯登堡 開始遊玩", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_4", time: "12:30", desc: "午餐：園區內餐廳", lat: 33.0863, lng: 129.7892, isOptimized: false },
            { id: "t4_5", time: "17:30", desc: "T_4_5", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t4_6", time: "19:30", desc: "晚餐：THE BASICS 附近居酒屋 / 車站便當", lat: 33.5888, lng: 130.4283, isOptimized: false }
        ]
    },
    {
        day: "9/23 (三)",
        theme: "♨️ 前往別府溫泉",
        hotel: "神和苑",
        timeline: [
            { id: "t5_1", time: "09:00", desc: "THE BASICS 退房", lat: 33.5888, lng: 130.4283, isOptimized: false },
            { id: "t5_2", time: "09:30", desc: "T_5_2", lat: 33.2796, lng: 131.5063, isOptimized: false },
            { id: "t5_3", time: "11:50", desc: "抵達別府車站 (寄放行李或搭車)", lat: 33.2796, lng: 131.5063, isOptimized: false },
            { id: "t5_4", time: "12:15", desc: "T_5_4", lat: 33.3146, lng: 131.4756, isOptimized: false },
            { id: "t5_5", time: "12:45", desc: "午餐：地獄蒸工房 鐵輪", lat: 33.3146, lng: 131.4756, isOptimized: false },
            { id: "t5_6", time: "14:30", desc: "海地獄 / 血池地獄 巡禮", lat: 33.3155, lng: 131.4715, isOptimized: false },
            { id: "t5_7", time: "16:00", desc: "T_5_7", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t5_8", time: "18:00", desc: "晚餐：神和苑 飯店會席料理", lat: 33.3159, lng: 131.4727, isOptimized: false }
        ]
    },
    {
        day: "9/24 (四)",
        theme: "🦒 九州動物園與溫泉放鬆",
        hotel: "神和苑",
        timeline: [
            { id: "t6_1", time: "08:30", desc: "神和苑 出發", lat: 33.3159, lng: 131.4727, isOptimized: false },
            { id: "t6_2", time: "08:50", desc: "T_6_2", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_3", time: "09:40", desc: "抵達 九州自然動物公園 (African Safari)", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_4", time: "10:30", desc: "搭乘叢林巴士 (Jungle Bus) 餵食動物", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_5", time: "12:30", desc: "午餐：動物園內餐廳 或 輕食", lat: 33.3512, lng: 131.3916, isOptimized: false },
            { id: "t6_6", time: "14:00", desc: "T_6_6", lat: 33.3159, lng: 131.4727, isOptimized: false },
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
            { id: "t7_2", time: "10:00", desc: "T_7_2", lat: 33.5897, lng: 130.4207, isOptimized: false },
            { id: "t7_3", time: "12:30", desc: "T_7_3", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_4", time: "13:30", desc: "午餐：海之中道水族館 餐廳", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_5", time: "14:30", desc: "海之中道海洋生態科學館 (Marine World)", lat: 33.6627, lng: 130.3204, isOptimized: false },
            { id: "t7_6", time: "17:00", desc: "T_7_6", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t7_7", time: "18:30", desc: "晚餐：渡假村內餐廳", lat: 33.6609, lng: 130.3168, isOptimized: false }
        ]
    },
    {
        day: "9/26 (六)",
        theme: "🏖️ 海島度假放鬆",
        hotel: "THE LUIGANS",
        timeline: [
            { id: "t8_1", time: "09:00", desc: "THE LUIGANS (享用飯店早餐與美麗泳池)", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t8_2", time: "11:00", desc: "T_8_2", lat: 33.6653, lng: 130.3015, isOptimized: false },
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
            { id: "t9_2", time: "08:45", desc: "T_9_2", lat: 33.6609, lng: 130.3168, isOptimized: false },
            { id: "t9_3", time: "09:35", desc: "福岡機場 (FUK) 報到掛行李", lat: 33.5859, lng: 130.4496, isOptimized: false },
            { id: "t9_4", time: "12:20", desc: "BR105 班機起飛返回台北", lat: 33.5859, lng: 130.4496, isOptimized: false }
        ]
    }
];"""

replacements = {
    "T_1_2": create_transport_desc("地鐵機場線", "福岡機場站", "博多站", "19:30", "5 分鐘", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"),
    "T_2_2": create_transport_desc("西鐵大牟田線轉太宰府線", "西鐵福岡(天神)站", "太宰府站 (需在二日市轉乘)", "09:30", "45 分鐘", "https://jik.nishitetsu.jp/"),
    "T_2_5": create_transport_desc("西鐵大牟田線 (特急)", "太宰府站", "西鐵柳川站 (需在二日市轉乘)", "13:45", "45 分鐘", "https://jik.nishitetsu.jp/"),
    "T_2_8": create_transport_desc("西鐵大牟田線 (特急) 後轉地鐵", "西鐵柳川站", "西鐵福岡(天神)站轉地鐵回博多", "19:00", "50 分鐘", "https://jik.nishitetsu.jp/"),
    "T_3_2": create_transport_desc("步行", "EN HOTEL", "THE BASICS (寄放行李)", "09:45", "10 分鐘", "#"),
    "T_3_3": create_transport_desc("西鐵巴士 (302等路線)", "博多站前", "運河城前", "10:30", "10 分鐘", "https://nimbus.nishitetsu.jp/"),
    "T_3_6": create_transport_desc("地鐵機場線", "中洲川端站", "大濠公園站", "14:30", "10 分鐘", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"),
    "T_3_8": create_transport_desc("地鐵機場線", "大濠公園站", "天神站", "17:30", "5 分鐘", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"),
    "T_3_10": create_transport_desc("地鐵機場線", "天神站", "博多站", "20:00", "6 分鐘", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"),
    "T_4_2": create_transport_desc("JR 特急豪斯登堡號 (Huis Ten Bosch)", "博多站", "豪斯登堡站", "08:55", "1h50m", "https://www.jrkyushu-timetable.jp/jr-k_time/map.html"),
    "T_4_5": create_transport_desc("JR 特急豪斯登堡號 (Huis Ten Bosch)", "豪斯登堡站", "博多站", "17:30", "1h50m", "https://www.jrkyushu-timetable.jp/jr-k_time/map.html"),
    "T_5_2": create_transport_desc("JR 特急音速號 (Sonic)", "博多站", "別府站", "09:30", "2h10m", "https://www.jrkyushu-timetable.jp/jr-k_time/map.html"),
    "T_5_4": create_transport_desc("龜之井巴士 (5/7/9號)", "別府站西口", "鐵輪", "12:15", "20 分鐘", "https://kamenoibus.com/rosenbus/"),
    "T_5_7": create_transport_desc("計程車", "鐵輪", "神和苑", "16:00", "5 分鐘", "#"),
    "T_6_2": create_transport_desc("龜之井巴士 (41號)", "鐵輪", "九州自然動物公園", "08:50", "30 分鐘", "https://kamenoibus.com/rosenbus/"),
    "T_6_6": create_transport_desc("龜之井巴士 (41號)", "九州自然動物公園", "鐵輪", "14:00", "30 分鐘", "https://kamenoibus.com/rosenbus/"),
    "T_7_2": create_transport_desc("JR 特急音速號 (Sonic)", "別府站", "博多站", "10:00", "2h10m", "https://www.jrkyushu-timetable.jp/jr-k_time/map.html"),
    "T_7_3": create_transport_desc("JR 鹿兒島本線轉香椎線", "博多站", "海之中道站 (需在香椎站轉乘)", "12:30", "40 分鐘", "https://www.jrkyushu-timetable.jp/jr-k_time/map.html"),
    "T_7_6": create_transport_desc("步行", "海之中道站", "THE LUIGANS Spa and Resort", "17:00", "5 分鐘", "#"),
    "T_8_2": create_transport_desc("自行車或渡假村免費接駁巴士", "渡假村", "志賀島 / 海之中道海濱公園", "11:00", "自行決定", "#"),
    "T_9_2": create_transport_desc("渡假村免費接駁巴士", "THE LUIGANS", "福岡機場 (經博多站)", "08:45", "50 分鐘", "https://www.luigans.com/access/")
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('f:/2026福岡旅遊/src/data/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'const itineraryData = \[.*?\];', content, text, flags=re.DOTALL)
text = re.sub(r'src/data/data.js\?v=\d+', 'src/data/data.js?v=26', text)

with open('f:/2026福岡旅遊/src/data/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()
    
html = re.sub(r'src/data/data.js\?v=\d+', 'src/data/data.js?v=26', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
