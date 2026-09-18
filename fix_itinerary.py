import re
import json
import sys
sys.path.append('f:/2026福岡旅遊')
import update_itinerary

with open('f:/2026福岡旅遊/src/data/data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

new_itinerary_json = json.dumps(update_itinerary.new_itinerary, indent=4, ensure_ascii=False)

pattern = r'const itineraryData = \[\n.*?\];\n\nwindow\.appData'
replacement = f'const itineraryData = {new_itinerary_json};\n\nwindow.appData'
new_data_js = re.sub(pattern, replacement, data_js, flags=re.DOTALL)

with open('f:/2026福岡旅遊/src/data/data.js', 'w', encoding='utf-8') as f:
    f.write(new_data_js)
