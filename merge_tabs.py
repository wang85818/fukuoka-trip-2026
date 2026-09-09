import re

with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove checklist nav button
html = re.sub(
    r' *<button class="nav-btn" data-target="tab-checklist">\s*<i class="fa-solid fa-list-check"></i>\s*<span>行李</span>\s*</button>\n',
    '', html)

# 2. Rename reservations nav button
html = re.sub(
    r'<button class="nav-btn" data-target="tab-reservations">\s*<i class="fa-solid fa-ticket-simple"></i>\s*<span>預約</span>\s*</button>',
    '<button class="nav-btn" data-target="tab-reservations">\n                        <i class="fa-solid fa-list-check"></i>\n                        <span>清單/預約</span>\n                    </button>',
    html)

# 3. Remove old tab-checklist section
old_checklist_pattern = r' *<!-- TAB 3: 行李清單 -->\s*<section id="tab-checklist" class="tab-content">\s*<div class="section-header">\s*<h2><i class="fa-solid fa-suitcase-rolling"></i> 專屬行李清單</h2>\s*<p class="section-subtitle">點擊項目打勾，進度會自動儲存喔！</p>\s*</div>\s*<div class="checklist-container" id="dynamic-checklist-container">\s*<!-- Dynamically rendered by JS -->\s*</div>\s*</section>\n*'
html = re.sub(old_checklist_pattern, '', html)

# 4. Modify tab-reservations section
old_res_pattern = r'<section id="tab-reservations" class="tab-content">\s*<div class="section-header">\s*<h2><i class="fa-solid fa-ticket-simple"></i> 預約與票券紀錄</h2>\s*<p class="section-subtitle">餐廳訂位、交通車票、景點門票一目了然</p>\s*</div>'

new_res_content = '''<section id="tab-reservations" class="tab-content">
                    <div class="section-header">
                        <h2><i class="fa-solid fa-list-check"></i> 行前清單與預約紀錄</h2>
                        <p class="section-subtitle">行李準備、門票購買、餐廳訂位一目了然，進度自動儲存</p>
                    </div>
                    
                    <h3 style="margin-bottom: 10px; font-size: 1.1rem; color: var(--primary-color);"><i class="fa-solid fa-suitcase-rolling"></i> 行前檢查清單</h3>
                    <div class="checklist-container" id="dynamic-checklist-container" style="margin-bottom: 30px;">
                        <!-- Dynamically rendered by JS -->
                    </div>

                    <h3 style="margin-bottom: 10px; font-size: 1.1rem; color: var(--primary-color);"><i class="fa-solid fa-ticket-simple"></i> 預約與票券紀錄</h3>'''

html = re.sub(old_res_pattern, new_res_content, html)

# 5. Bump version
html = re.sub(r'v=28', 'v=29', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
