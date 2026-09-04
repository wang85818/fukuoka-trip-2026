// app.js - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Initial Data
    if (window.appData && window.renderUI) {
        window.renderUI.renderChangelog(window.appData.changelogData);
        
        // Load custom sorted itinerary if exists
        const savedItinerary = localStorage.getItem('fukuokaItinerary');
        if (savedItinerary) {
            try {
                window.appData.itineraryData = JSON.parse(savedItinerary);
            } catch(e) {
                console.error("Error parsing saved itinerary", e);
            }
        }
        
        window.renderUI.renderItinerary(window.appData.itineraryData);
    } else {
        console.error("Data or Render modules not loaded correctly.");
    }

    // 2. Tab Switching Logic
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            navButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. Checklist LocalStorage Logic
    const checkboxes = document.querySelectorAll('.check-list input[type="checkbox"]');
    
    // Load saved states
    const savedChecklist = JSON.parse(localStorage.getItem('fukuokaChecklist')) || {};
    checkboxes.forEach(cb => {
        if(savedChecklist[cb.value]) {
            cb.checked = true;
        }
        
        // Save on change
        cb.addEventListener('change', (e) => {
            savedChecklist[e.target.value] = e.target.checked;
            localStorage.setItem('fukuokaChecklist', JSON.stringify(savedChecklist));
        });
    });
});
