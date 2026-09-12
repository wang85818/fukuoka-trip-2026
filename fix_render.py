import re

with open('f:/2026福岡旅遊/src/js/render.js', 'r', encoding='utf-8') as f:
    render_js = f.read()

# Precise replacement for renderReservations
old_html_pattern = r'''            html \+= `
                <div class="info-card" style="margin-bottom: 12px; padding: 15px; display: flex; flex-direction: column; gap: 8px; border-left: 5px solid \$\{typeColor\};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0\.8rem; background: \$\{typeColor\}20; color: \$\{typeColor\}; padding: 3px 8px; border-radius: 12px; font-weight: bold;">\$\{item\.type\}</span>
                            <div style="font-weight: bold; font-size: 1\.1rem; margin-top: 8px; color: #1e293b;">\$\{item\.name\}</div>
                        </div>
                        <button class="action-btn res-del-btn" data-idx="\$\{idx\}" style="background: none; border: none; color: #ef4444; padding: 5px; box-shadow: none;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div style="display: flex; gap: 15px; margin-top: 5px; font-size: 0\.9rem; color: #475569; flex-wrap: wrap;">
                        \$\{item\.time \? `<div><i class="fa-regular fa-clock" style="color:#64748b;"></i> \$\{item\.time\}</div>` : ''\}
                        \$\{item\.note \? `<div><i class="fa-regular fa-note-sticky" style="color:#64748b;"></i> \$\{item\.note\}</div>` : ''\}
                    </div>
                </div>
            `;'''

new_html = '''            html += `
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

if re.search(old_html_pattern, render_js):
    render_js = re.sub(old_html_pattern, new_html, render_js)
else:
    print("Pattern not found in render.js")

with open('f:/2026福岡旅遊/src/js/render.js', 'w', encoding='utf-8') as f:
    f.write(render_js)
