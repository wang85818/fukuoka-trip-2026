import re

with open('f:/2026福岡旅遊/src/js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

old_weather = '''    // 16. Weather Forecast Fetch (Open-Meteo)
    const fetchWeather = async () => {
        const el = document.getElementById('weather-text');
        if (!el) return;
        try {
            // Fetch current weather for Fukuoka (33.59, 130.41)
            const url = "https://api.open-meteo.com/v1/forecast?latitude=33.59&longitude=130.41&current_weather=true";
            const response = await fetch(url);
            const data = await response.json();
            
            if(data.current_weather) {
                const temp = data.current_weather.temperature;
                const weathercode = data.current_weather.weathercode;
                let icon = 'fa-cloud'; // default
                
                // simple mapping for WMO weather codes
                if(weathercode <= 1) icon = 'fa-sun';
                else if (weathercode <= 3) icon = 'fa-cloud-sun';
                else if (weathercode <= 45) icon = 'fa-smog';
                else if (weathercode <= 67) icon = 'fa-cloud-rain';
                else if (weathercode <= 77) icon = 'fa-snowflake';
                else if (weathercode <= 99) icon = 'fa-cloud-bolt';

                el.innerHTML = `福岡 <i class="fa-solid ${icon}" style="margin: 0 4px;"></i> ${temp}°C`;
            }
        } catch(err) {
            el.innerHTML = "天氣更新失敗";
        }
    };'''

new_weather = '''    // 16. Weather Forecast Fetch (With Timeout and Fallback)
    const fetchWeather = async () => {
        const el = document.getElementById('weather-text');
        if (!el) return;
        
        const fetchWithTimeout = async (url, ms = 3000) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), ms);
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return response;
        };

        try {
            // Try Open-Meteo first
            const url = "https://api.open-meteo.com/v1/forecast?latitude=33.59&longitude=130.41&current_weather=true";
            const response = await fetchWithTimeout(url, 4000);
            const data = await response.json();
            
            if(data.current_weather) {
                const temp = data.current_weather.temperature;
                const weathercode = data.current_weather.weathercode;
                let icon = 'fa-cloud';
                
                if(weathercode <= 1) icon = 'fa-sun';
                else if (weathercode <= 3) icon = 'fa-cloud-sun';
                else if (weathercode <= 45) icon = 'fa-smog';
                else if (weathercode <= 67) icon = 'fa-cloud-rain';
                else if (weathercode <= 77) icon = 'fa-snowflake';
                else if (weathercode <= 99) icon = 'fa-cloud-bolt';

                el.innerHTML = `福岡 <i class="fa-solid ${icon}" style="margin: 0 4px;"></i> ${temp}°C`;
                return;
            }
        } catch(err) {
            console.warn("Open-Meteo failed, trying fallback...", err);
        }

        try {
            // Fallback to wttr.in JSON API
            const fallbackUrl = "https://wttr.in/Fukuoka?format=j1";
            const response = await fetchWithTimeout(fallbackUrl, 4000);
            const data = await response.json();
            
            if (data.current_condition && data.current_condition[0]) {
                const temp = data.current_condition[0].temp_C;
                el.innerHTML = `福岡 <i class="fa-solid fa-cloud-sun" style="margin: 0 4px;"></i> ${temp}°C`;
                return;
            }
        } catch(err) {
            console.warn("Fallback weather API failed.", err);
            // Graceful degradation instead of ugly error message
            el.innerHTML = `福岡 <i class="fa-solid fa-plane" style="margin: 0 4px;"></i> 期待出發`;
        }
    };'''

app_js = app_js.replace(old_weather, new_weather)

# Bump version
app_js = re.sub(r'const CURRENT_DATA_VERSION = "11";', 'const CURRENT_DATA_VERSION = "12";', app_js)

with open('f:/2026福岡旅遊/src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

# Bump index.html version for app.js
with open('f:/2026福岡旅遊/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src/js/app.js\?v=\d+', 'src/js/app.js?v=30', html)

with open('f:/2026福岡旅遊/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
