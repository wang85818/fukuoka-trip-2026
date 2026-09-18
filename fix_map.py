import re

with open('f:/2026福岡旅遊/src/js/map.js', 'r', encoding='utf-8') as f:
    map_js = f.read()

# We look for:
#        // If there's more than one stop, fetch route from OSRM
#        if (validStops.length > 1) {
#            try {
#                // OSRM expects lon,lat

old_code = '''        // If there's more than one stop, fetch route from OSRM
        if (validStops.length > 1) {
            try {
                // OSRM expects lon,lat'''

new_code = '''        // If there's more than one stop, fetch route from OSRM
        // Skip routing if any point is in Taiwan (lng < 125) to prevent OSRM 400 cross-ocean errors
        const hasOverseas = validStops.some(s => s.lng < 125);
        if (validStops.length > 1 && !hasOverseas) {
            try {
                // OSRM expects lon,lat'''

map_js = map_js.replace(old_code, new_code)

with open('f:/2026福岡旅遊/src/js/map.js', 'w', encoding='utf-8') as f:
    f.write(map_js)

# Bump index.html version for map.js
with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src/js/map.js\?v=\d+', 'src/js/map.js?v=25', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
