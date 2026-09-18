import re
import json

def make_transport_card(transport_type, route, time, url):
    return f"<div style='margin-bottom: 5px; color: #1e293b; font-weight: bold;'>搭乘 {transport_type}</div><div style='background: #f8fafc; padding: 8px; border-radius: 6px; border-left: 4px solid #3b82f6; font-size: 0.85rem; line-height: 1.5;'><div style='display: flex; flex-direction: column; gap: 4px;'><div style='color: #475569;'><i class='fa-solid fa-location-dot'></i> {route}</div><div style='color: #475569;'><i class='fa-regular fa-clock'></i> {time}</div><div style='margin-top: 4px;'><a href='{url}' target='_blank' style='color: #3b82f6; text-decoration: underline; font-weight: bold;'><i class='fa-solid fa-link'></i> 查看時刻表</a></div></div></div>"

new_itinerary = [
    {
        "day": "9/19 (六)",
        "theme": "✈️ 飛行抵達與入住",
        "hotel": "EN HOTEL Hakata",
        "timeline": [
            { "id": "t1_1", "time": "09:00", "desc": "前往桃園機場 TPE", "lat": 25.0797, "lng": 121.2342, "isOptimized": False },
            { "id": "t1_2", "time": "10:00", "desc": "桃園機場報到／托運 / 出境安檢／午餐", "lat": 25.0797, "lng": 121.2342, "isOptimized": False },
            { "id": "t1_3", "time": "15:10", "desc": "BR102 起飛 (TPE ➔ FUK)", "lat": 25.0797, "lng": 121.2342, "isOptimized": False },
            { "id": "t1_4", "time": "18:20", "desc": "抵達福岡 FUK／入境 / 領行李", "lat": 33.5859, "lng": 130.4496, "isOptimized": False },
            { "id": "t1_5", "time": "19:30", "desc": make_transport_card("地鐵機場線", "福岡機場站 ➔ 博多站", "19:30 出發 (乘車約 5 分鐘)", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"), "lat": 33.5859, "lng": 130.4496, "isOptimized": False },
            { "id": "t1_6", "time": "20:00", "desc": "EN HOTEL Hakata (Check-in) & 天神地下街", "lat": 33.5913, "lng": 130.3989, "isOptimized": False },
            { "id": "t1_7", "time": "21:00", "desc": "吃宵夜(屋台)", "lat": 33.5912, "lng": 130.4072, "isOptimized": False },
            { "id": "t1_8", "time": "22:00", "desc": "回房整理／休息", "lat": 33.5901, "lng": 130.4132, "isOptimized": False }
        ]
    },
    {
        "day": "9/20 (日)",
        "theme": "⛩️ 太宰府與柳川",
        "hotel": "EN HOTEL Hakata",
        "timeline": [
            { "id": "t2_1", "time": "07:00", "desc": "EN HOTEL 早餐", "lat": 33.5901, "lng": 130.4132, "isOptimized": False },
            { "id": "t2_2", "time": "08:00", "desc": make_transport_card("西鐵大牟田線轉太宰府線", "西鐵福岡(天神)站 ➔ 太宰府站 (二日市轉乘)", "08:00 出發 (乘車約 45 分鐘)", "https://jik.nishitetsu.jp/"), "lat": 33.5901, "lng": 130.4132, "isOptimized": False },
            { "id": "t2_3", "time": "09:00", "desc": "太宰府天滿宮 & 太宰府參道／梅枝餅", "lat": 33.5215, "lng": 130.5349, "isOptimized": False },
            { "id": "t2_4", "time": "12:00", "desc": "午餐：一蘭拉麵", "lat": 33.5198, "lng": 130.5312, "isOptimized": False },
            { "id": "t2_5", "time": "13:00", "desc": make_transport_card("西鐵大牟田線", "太宰府站 ➔ 西鐵柳川站 (二日市轉乘)", "13:00 出發 (乘車約 45 分鐘)", "https://jik.nishitetsu.jp/"), "lat": 33.5215, "lng": 130.5349, "isOptimized": False },
            { "id": "t2_6", "time": "15:00", "desc": "柳川川下り遊船(三點)", "lat": 33.1610, "lng": 130.4023, "isOptimized": False },
            { "id": "t2_7", "time": "16:00", "desc": "柳川 吃飯", "lat": 33.1610, "lng": 130.4023, "isOptimized": False },
            { "id": "t2_8", "time": "17:00", "desc": make_transport_card("西鐵大牟田線轉地鐵", "西鐵柳川站 ➔ 西鐵福岡(天神)站轉地鐵回博多", "17:00 出發 (乘車約 50 分鐘)", "https://jik.nishitetsu.jp/"), "lat": 33.1610, "lng": 130.4023, "isOptimized": False },
            { "id": "t2_9", "time": "19:00", "desc": "回 EN HOTEL 休息", "lat": 33.5901, "lng": 130.4132, "isOptimized": False }
        ]
    },
    {
        "day": "9/21 (一)",
        "theme": "🛍️ 市區輕遊與換房",
        "hotel": "THE BASICS FUKUOKA",
        "timeline": [
            { "id": "t3_1", "time": "09:00", "desc": "EN HOTEL 退房／行李整理", "lat": 33.5901, "lng": 130.4132, "isOptimized": False },
            { "id": "t3_2", "time": "10:00", "desc": make_transport_card("步行", "EN HOTEL ➔ THE BASICS FUKUOKA (寄放行李)", "10:00 出發 (步行約 10 分鐘)", "#"), "lat": 33.5888, "lng": 130.4283, "isOptimized": False },
            { "id": "t3_3", "time": "11:00", "desc": "博多AMU PLAZA / 阪急百貨 人形町今半", "lat": 33.5898, "lng": 130.4190, "isOptimized": False },
            { "id": "t3_4", "time": "13:00", "desc": "博多運河城 (Canal City Hakata)", "lat": 33.5898, "lng": 130.4107, "isOptimized": False },
            { "id": "t3_5", "time": "15:00", "desc": make_transport_card("地鐵", "博多運河城 ➔ 大濠公園", "14:30 出發", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"), "lat": 33.5861, "lng": 130.3768, "isOptimized": False },
            { "id": "t3_6", "time": "15:30", "desc": "大濠公園 ＆ 舞鶴公園", "lat": 33.5861, "lng": 130.3768, "isOptimized": False },
            { "id": "t3_7", "time": "17:30", "desc": make_transport_card("地鐵", "大濠公園站 ➔ 博多站", "17:30 出發", "https://subway.city.fukuoka.lg.jp/cha_trad/route/"), "lat": 33.5861, "lng": 130.3768, "isOptimized": False },
            { "id": "t3_8", "time": "18:00", "desc": "AMU EST 博多拉麵街道", "lat": 33.5898, "lng": 130.4207, "isOptimized": False },
            { "id": "t3_9", "time": "20:00", "desc": "回 THE BASICS FUKUOKA 休息", "lat": 33.5888, "lng": 130.4283, "isOptimized": False }
        ]
    },
    {
        "day": "9/22 (二)",
        "theme": "🚢 門司港懷舊一日遊",
        "hotel": "THE BASICS FUKUOKA",
        "timeline": [
            { "id": "t4_1", "time": "07:00", "desc": "The Basic 早餐", "lat": 33.5888, "lng": 130.4283, "isOptimized": False },
            { "id": "t4_2", "time": "08:00", "desc": "櫛田神社參拜 / 飾山笠展示區", "lat": 33.5930, "lng": 130.4106, "isOptimized": False },
            { "id": "t4_3", "time": "09:00", "desc": "東長寺（福岡大佛）本堂參拜", "lat": 33.5951, "lng": 130.4140, "isOptimized": False },
            { "id": "t4_4", "time": "10:00", "desc": "步行至博多站 / 提早午餐", "lat": 33.5898, "lng": 130.4207, "isOptimized": False },
            { "id": "t4_5", "time": "11:00", "desc": make_transport_card("JR 鹿兒島本線 / 特急", "博多站 ➔ 門司港站", "11:00 出發 (乘車約 1h20m, 需在小倉轉車)", "https://www.jrkyushu-timetable.jp/"), "lat": 33.5898, "lng": 130.4207, "isOptimized": False },
            { "id": "t4_6", "time": "12:00", "desc": "門司港車站與懷舊建築群", "lat": 33.9449, "lng": 130.9610, "isOptimized": False },
            { "id": "t4_7", "time": "13:00", "desc": "海峽廣場散策 & 香蕉人", "lat": 33.9458, "lng": 130.9634, "isOptimized": False },
            { "id": "t4_8", "time": "14:00", "desc": "藍翼橋（開合橋）& 關門海峽散步", "lat": 33.9467, "lng": 130.9641, "isOptimized": False },
            { "id": "t4_9", "time": "15:00", "desc": "門司港懷舊展望室", "lat": 33.9441, "lng": 130.9648, "isOptimized": False },
            { "id": "t4_10", "time": "16:00", "desc": "門司港周邊採買 & 準備返程", "lat": 33.9449, "lng": 130.9610, "isOptimized": False },
            { "id": "t4_11", "time": "17:00", "desc": make_transport_card("JR 鹿兒島本線 / 特急", "門司港站 ➔ 博多站", "17:00 出發 (乘車約 1h20m)", "https://www.jrkyushu-timetable.jp/"), "lat": 33.9449, "lng": 130.9610, "isOptimized": False },
            { "id": "t4_12", "time": "18:00", "desc": "回 The Basic 休息", "lat": 33.5888, "lng": 130.4283, "isOptimized": False }
        ]
    },
    {
        "day": "9/23 (三)",
        "theme": "♨️ 前往別府溫泉",
        "hotel": "山莊 神和苑",
        "timeline": [
            { "id": "t5_1", "time": "07:00", "desc": "The Basic(早餐)", "lat": 33.5888, "lng": 130.4283, "isOptimized": False },
            { "id": "t5_2", "time": "09:00", "desc": "The Basic(退房)", "lat": 33.5888, "lng": 130.4283, "isOptimized": False },
            { "id": "t5_3", "time": "10:00", "desc": make_transport_card("JR 特急音速號 (Sonic)", "博多站 ➔ 別府站", "10:00 出發 (乘車約 2h10m)", "https://www.jrkyushu-timetable.jp/"), "lat": 33.5898, "lng": 130.4207, "isOptimized": False },
            { "id": "t5_4", "time": "12:30", "desc": make_transport_card("龜之井巴士", "別府站 ➔ 鐵輪 (神和苑)", "12:30 出發 (乘車約 20 分鐘)", "https://kamenoibus.com/"), "lat": 33.2796, "lng": 131.5063, "isOptimized": False },
            { "id": "t5_5", "time": "13:00", "desc": "神和苑(check in)", "lat": 33.3159, "lng": 131.4727, "isOptimized": False },
            { "id": "t5_6", "time": "14:00", "desc": "地獄蒸工房", "lat": 33.3146, "lng": 131.4756, "isOptimized": False },
            { "id": "t5_7", "time": "15:00", "desc": "血池地獄", "lat": 33.3267, "lng": 131.4815, "isOptimized": False },
            { "id": "t5_8", "time": "16:00", "desc": "海地獄", "lat": 33.3155, "lng": 131.4715, "isOptimized": False },
            { "id": "t5_9", "time": "18:00", "desc": "回神和苑吃晚餐", "lat": 33.3159, "lng": 131.4727, "isOptimized": False }
        ]
    },
    {
        "day": "9/24 (四)",
        "theme": "🦁 九州自然動物公園",
        "hotel": "山莊 神和苑",
        "timeline": [
            { "id": "t6_1", "time": "07:00", "desc": "神和苑(早餐)", "lat": 33.3159, "lng": 131.4727, "isOptimized": False },
            { "id": "t6_2", "time": "08:00", "desc": make_transport_card("龜之井巴士 (41號)", "鐵輪 ➔ 九州自然動物公園", "08:00 出發 (乘車約 40 分鐘)", "https://kamenoibus.com/"), "lat": 33.3159, "lng": 131.4727, "isOptimized": False },
            { "id": "t6_3", "time": "09:00", "desc": "九州自然動物公園 (Jungle Bus & 自由活動)", "lat": 33.3370, "lng": 131.3995, "isOptimized": False },
            { "id": "t6_4", "time": "17:00", "desc": make_transport_card("龜之井巴士 (41號)", "九州自然動物公園 ➔ 鐵輪", "17:00 出發 (乘車約 40 分鐘)", "https://kamenoibus.com/"), "lat": 33.3370, "lng": 131.3995, "isOptimized": False },
            { "id": "t6_5", "time": "18:00", "desc": "回神和苑吃晚餐與休息", "lat": 33.3159, "lng": 131.4727, "isOptimized": False }
        ]
    },
    {
        "day": "9/25 (五)",
        "theme": "🐬 海之中道水族館",
        "hotel": "THE LUIGANS Spa & Resort",
        "timeline": [
            { "id": "t7_1", "time": "07:00", "desc": "山莊 神和苑 早餐", "lat": 33.3159, "lng": 131.4727, "isOptimized": False },
            { "id": "t7_2", "time": "10:00", "desc": "山莊 神和苑 退房", "lat": 33.3159, "lng": 131.4727, "isOptimized": False },
            { "id": "t7_3", "time": "10:30", "desc": make_transport_card("JR 特急音速號 + 香椎線", "別府站 ➔ 博多站 ➔ 海之中道站", "10:30 出發 (車程約 3小時)", "https://www.jrkyushu-timetable.jp/"), "lat": 33.2796, "lng": 131.5063, "isOptimized": False },
            { "id": "t7_4", "time": "14:00", "desc": "THE LUIGANS Check-in", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t7_5", "time": "15:00", "desc": "Marine World 海之中道水族館", "lat": 33.6606, "lng": 130.3461, "isOptimized": False },
            { "id": "t7_6", "time": "17:00", "desc": "THE LUIGANS 海灘 散步放鬆", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t7_7", "time": "18:00", "desc": "回飯店吃飯", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t7_8", "time": "19:00", "desc": "海邊散步／度假村夜景", "lat": 33.6545, "lng": 130.3475, "isOptimized": False }
        ]
    },
    {
        "day": "9/26 (六)",
        "theme": "🏝️ 志賀島與度假村放鬆",
        "hotel": "THE LUIGANS Spa & Resort",
        "timeline": [
            { "id": "t8_1", "time": "07:00", "desc": "LUIGANS 早餐", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_2", "time": "08:00", "desc": "海邊散步／度假村設施", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_3", "time": "09:00", "desc": "志賀島海岸線／金印公園", "lat": 33.6644, "lng": 130.3090, "isOptimized": False },
            { "id": "t8_4", "time": "10:00", "desc": "志賀島海景散步", "lat": 33.6644, "lng": 130.3090, "isOptimized": False },
            { "id": "t8_5", "time": "11:00", "desc": "海鮮午餐", "lat": 33.6644, "lng": 130.3090, "isOptimized": False },
            { "id": "t8_6", "time": "12:00", "desc": "返回 LUIGANS／休息", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_7", "time": "13:00", "desc": "度假村泳池／海邊", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_8", "time": "14:00", "desc": "大人 Spa／小孩休息", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_9", "time": "16:00", "desc": "日落海邊拍照", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_10", "time": "18:00", "desc": "LUIGANS 晚餐", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t8_11", "time": "20:00", "desc": "回房整理行李", "lat": 33.6545, "lng": 130.3475, "isOptimized": False }
        ]
    },
    {
        "day": "9/27 (日)",
        "theme": "🛫 滿載而歸",
        "hotel": "溫暖的家",
        "timeline": [
            { "id": "t9_1", "time": "07:00", "desc": "LUIGANS 早餐／退房整理", "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t9_2", "time": "08:00", "desc": make_transport_card("JR 香椎線轉機場線", "海之中道站 ➔ 福岡機場站", "08:00 出發 (車程約 1小時)", "https://www.jrkyushu-timetable.jp/"), "lat": 33.6545, "lng": 130.3475, "isOptimized": False },
            { "id": "t9_3", "time": "09:00", "desc": "福岡機場報到／托運", "lat": 33.5859, "lng": 130.4496, "isOptimized": False },
            { "id": "t9_4", "time": "10:00", "desc": "出境安檢／候機 / 登機準備", "lat": 33.5859, "lng": 130.4496, "isOptimized": False },
            { "id": "t9_5", "time": "12:20", "desc": "BR105 起飛 (FUK ➔ TPE)", "lat": 33.5859, "lng": 130.4496, "isOptimized": False },
            { "id": "t9_6", "time": "13:45", "desc": "抵達台灣 TPE / 入境取行李", "lat": 25.0797, "lng": 121.2342, "isOptimized": False },
            { "id": "t9_7", "time": "15:00", "desc": "回家", "lat": 25.0797, "lng": 121.2342, "isOptimized": False }
        ]
    }
]

# Read original file
with open('f:/2026福岡旅遊/src/data/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

# Replace itineraryData
import json
new_itinerary_json = json.dumps(new_itinerary, indent=4, ensure_ascii=False)
# Fix the escaped quotes inside HTML that json.dumps might have created differently, or just trust json.dumps

# the original JS has: const itineraryData = [ ... ];
pattern = r'const itineraryData = \[.*?\];\n\nconst checklistData'
replacement = f'const itineraryData = {new_itinerary_json};\n\nconst checklistData'
new_data_js = re.sub(pattern, replacement, data_js, flags=re.DOTALL)

with open('f:/2026福岡旅遊/src/data/data.js', 'w', encoding='utf-8') as f:
    f.write(new_data_js)
