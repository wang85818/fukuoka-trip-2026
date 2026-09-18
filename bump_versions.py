import re

# app.js
with open('f:/2026福岡旅遊/src/js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

app_js = re.sub(r'const CURRENT_DATA_VERSION = "10";', 'const CURRENT_DATA_VERSION = "11";', app_js)

with open('f:/2026福岡旅遊/src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

# index.html
with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'v=32', 'v=33', html)
html = re.sub(r'v=27', 'v=28', html)
html = re.sub(r'v=30', 'v=31', html)
html = re.sub(r'v=23', 'v=24', html) # map and optimize

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
