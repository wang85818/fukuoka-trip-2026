// app.js - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Render Changelog
    if (window.appData && window.renderUI) {
        window.renderUI.renderChangelog(window.appData.changelogData);
    }

    // 2. Initial Data & Firebase Sync
    
    function fallbackToLocal() {
        const savedItinerary = localStorage.getItem('fukuokaItinerary');
        if (savedItinerary) {
            try {
                window.appData.itineraryData = JSON.parse(savedItinerary);
            } catch(e) {
                console.error("Error parsing saved itinerary", e);
            }
        }
        window.renderUI.renderItinerary(window.appData.itineraryData);
    }

    if (window.db) {
        try {
            const itineraryRef = window.db.ref('itinerary');
            
            // Listen for real-time updates from Firebase
            itineraryRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Use cloud data
                    window.appData.itineraryData = data;
                    window.renderUI.renderItinerary(window.appData.itineraryData);
                } else {
                    // First time setup: push local default data to cloud
                    itineraryRef.set(window.appData.itineraryData);
                    window.renderUI.renderItinerary(window.appData.itineraryData);
                }
            }, (error) => {
                console.error("Firebase permission or config error:", error);
                fallbackToLocal();
            });
        } catch (error) {
            console.error("Firebase DB error:", error);
            fallbackToLocal();
        }
    } else {
        fallbackToLocal();
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
