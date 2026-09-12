import re

with open('f:/2026福岡旅遊/src/js/render.js', 'r', encoding='utf-8') as f:
    render_js = f.read()

# Replace the HTML generation in renderReservations
old_html_pattern = r'html \+= `\s*<div class="info-card".*?</div>\s*</div>\s*`;'

new_html = '''html += `
                <div class="info-card" style="margin-bottom: 12px; padding: 15px; display: flex; flex-direction: column; gap: 8px; border-left: 5px solid ${typeColor}; opacity: ${item.checked ? '0.6' : '1'};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="flex: 1; margin-right: 10px;">
                            <span style="font-size: 0.8rem; background: ${typeColor}20; color: ${typeColor}; padding: 3px 8px; border-radius: 12px; font-weight: bold;">${item.type}</span>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; width: 100%;">
                                <input type="checkbox" class="res-check" data-idx="${idx}" ${item.checked ? 'checked' : ''} style="transform: scale(1.3); cursor: pointer; flex-shrink: 0;">
                                <input type="text" class="res-edit-name" data-idx="${idx}" value="${item.name}" 
                                       style="background: transparent; border: none; border-bottom: 1px dashed #9ca3af; font-weight: bold; font-size: 1.1rem; color: #1e293b; outline: none; flex: 1; width: 100%; ${item.checked ? 'text-decoration: line-through; color: #9ca3af;' : ''}" 
                                       ${item.checked ? 'disabled' : ''}>
                            </div>
                        </div>
                        <button class="action-btn res-del-btn" data-idx="${idx}" style="background: none; border: none; color: #ef4444; padding: 5px; box-shadow: none; flex-shrink: 0;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div style="display: flex; gap: 15px; margin-top: 5px; font-size: 0.9rem; color: #475569; flex-wrap: wrap; padding-left: 25px;">
                        <div style="display: flex; align-items: center; gap: 4px; flex: 1; min-width: 100px;">
                            <i class="fa-regular fa-clock" style="color:#64748b;"></i>
                            <input type="text" class="res-edit-time" data-idx="${idx}" value="${item.time || ''}" placeholder="時間/場次"
                                   style="background: transparent; border: none; border-bottom: 1px dashed #9ca3af; outline: none; width: 100%; color: inherit;"
                                   ${item.checked ? 'disabled' : ''}>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px; flex: 2; min-width: 150px;">
                            <i class="fa-regular fa-note-sticky" style="color:#64748b;"></i>
                            <input type="text" class="res-edit-note" data-idx="${idx}" value="${item.note || ''}" placeholder="備註/代號"
                                   style="background: transparent; border: none; border-bottom: 1px dashed #9ca3af; outline: none; width: 100%; color: inherit;"
                                   ${item.checked ? 'disabled' : ''}>
                        </div>
                    </div>
                </div>
            `;'''

render_js = re.sub(old_html_pattern, new_html, render_js, flags=re.DOTALL)

with open('f:/2026福岡旅遊/src/js/render.js', 'w', encoding='utf-8') as f:
    f.write(render_js)

# Update app.js event listeners
with open('f:/2026福岡旅遊/src/js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

old_change_listener = '''        resContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('res-check')) {
                const idx = parseInt(e.target.getAttribute('data-idx'));
                window.appData.reservationData[idx].checked = e.target.checked;
                localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
                window.renderUI.renderReservations(window.appData.reservationData);
            }
        });'''

new_change_listener = '''        resContainer.addEventListener('change', (e) => {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            if (isNaN(idx)) return;
            
            if (e.target.classList.contains('res-check')) {
                window.appData.reservationData[idx].checked = e.target.checked;
                localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
                window.renderUI.renderReservations(window.appData.reservationData);
            } else if (e.target.classList.contains('res-edit-name')) {
                window.appData.reservationData[idx].name = e.target.value.trim();
                localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
            } else if (e.target.classList.contains('res-edit-time')) {
                window.appData.reservationData[idx].time = e.target.value.trim();
                localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
            } else if (e.target.classList.contains('res-edit-note')) {
                window.appData.reservationData[idx].note = e.target.value.trim();
                localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
            }
        });'''

app_js = app_js.replace(old_change_listener, new_change_listener)

# Bump CURRENT_DATA_VERSION
app_js = re.sub(r'const CURRENT_DATA_VERSION = "8";', 'const CURRENT_DATA_VERSION = "9";', app_js)
app_js = re.sub(r'const CURRENT_DATA_VERSION = "9";', 'const CURRENT_DATA_VERSION = "10";', app_js) # In case it was already 9

with open('f:/2026福岡旅遊/src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

# Update index.html versions
with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'v=30', 'v=32', html)
html = re.sub(r'v=31', 'v=32', html)
html = re.sub(r'v=25', 'v=27', html)
html = re.sub(r'v=28', 'v=30', html)
html = re.sub(r'v=29', 'v=30', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
