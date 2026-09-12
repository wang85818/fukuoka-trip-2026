import re

# Update render.js
with open('f:/2026福岡旅遊/src/js/render.js', 'r', encoding='utf-8') as f:
    render_js = f.read()

render_js_pattern = r'<span style="font-size: 0\.8rem; background: \$\{typeColor\}20; color: \$\{typeColor\}; padding: 3px 8px; border-radius: 12px; font-weight: bold;">\$\{item\.type\}</span>\s*<div style="font-weight: bold; font-size: 1\.1rem; margin-top: 8px; color: #1e293b;">\$\{item\.name\}</div>'

render_js_replacement = '''<span style="font-size: 0.8rem; background: ${typeColor}20; color: ${typeColor}; padding: 3px 8px; border-radius: 12px; font-weight: bold;">${item.type}</span>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                                <input type="checkbox" class="res-check" data-idx="${idx}" ${item.checked ? 'checked' : ''} style="transform: scale(1.3); cursor: pointer;">
                                <div style="font-weight: bold; font-size: 1.1rem; color: #1e293b; ${item.checked ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${item.name}</div>
                            </div>'''

render_js = re.sub(render_js_pattern, render_js_replacement, render_js)

# Also dim the card if checked
card_pattern = r'<div class="info-card" style="margin-bottom: 12px; padding: 15px; display: flex; flex-direction: column; gap: 8px; border-left: 5px solid \$\{typeColor\};">'
card_replacement = r'<div class="info-card" style="margin-bottom: 12px; padding: 15px; display: flex; flex-direction: column; gap: 8px; border-left: 5px solid ${typeColor}; opacity: ${item.checked ? \'0.6\' : \'1\'};">'
render_js = re.sub(card_pattern, card_replacement, render_js)

with open('f:/2026福岡旅遊/src/js/render.js', 'w', encoding='utf-8') as f:
    f.write(render_js)

# Update app.js
with open('f:/2026福岡旅遊/src/js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Add event listener for res-check
res_listener_code = '''
    // Reservations Event Delegation
    document.getElementById('reservations-container').addEventListener('change', (e) => {
        if (e.target.classList.contains('res-check')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            window.appData.reservationData[idx].checked = e.target.checked;
            localStorage.setItem('fukuokaReservations', JSON.stringify(window.appData.reservationData));
            window.renderUI.renderReservations(window.appData.reservationData);
        }
    });

    document.getElementById('reservations-container').addEventListener('click', (e) => {
'''

app_js = app_js.replace("document.getElementById('reservations-container').addEventListener('click', (e) => {", res_listener_code)

# Bump data version to 8
app_js = re.sub(r'const CURRENT_DATA_VERSION = "7";', 'const CURRENT_DATA_VERSION = "8";', app_js)

with open('f:/2026福岡旅遊/src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

# Update index.html
with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'v=29', 'v=30', html)
html = re.sub(r'v=24', 'v=25', html)
html = re.sub(r'v=27', 'v=28', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
