// map.js - Leaflet Map Integration

const mapModule = {
    map: null,
    markers: [],
    routeLine: null,

    initMap: function() {
        if (this.map) return; // Already initialized

        // Initialize Leaflet Map
        this.map = L.map('map').setView([33.5901, 130.4132], 12); // Default to Fukuoka

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    },

    clearMap: function() {
        if (this.routeLine) {
            this.map.removeLayer(this.routeLine);
        }
        this.markers.forEach(m => this.map.removeLayer(m));
        this.markers = [];
    },

    openMobileMap: function() {
        if(window.innerWidth < 768) {
            document.getElementById('map-container').classList.add('active');
            setTimeout(() => {
                if(this.map) {
                    this.map.invalidateSize();
                }
            }, 300); // 300ms matches typical transition times, ensuring it's shown
        }
    },

    updateRouteForDay: async function(dayData, openModal = true) {
        this.clearMap();

        if (!dayData || !dayData.timeline || dayData.timeline.length === 0) {
            return;
        }

        const validStops = dayData.timeline.filter(t => t.lat && t.lng);
        if (validStops.length === 0) return;

        if (openModal) {
            this.openMobileMap();
        }

        // Add markers for each stop
        const bounds = L.latLngBounds();
        validStops.forEach((stop, index) => {
            const marker = L.marker([stop.lat, stop.lng], {
                title: stop.desc
            }).bindPopup(`<b>第 ${index + 1} 站</b><br>${stop.desc}`);
            
            marker.addTo(this.map);
            this.markers.push(marker);
            bounds.extend([stop.lat, stop.lng]);
        });

        this.map.fitBounds(bounds, { padding: [50, 50] });

        // If there's more than one stop, fetch route from OSRM
        if (validStops.length > 1) {
            try {
                // OSRM expects lon,lat
                const coordinates = validStops.map(s => `${s.lng},${s.lat}`).join(';');
                const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
                
                const response = await fetch(url);
                const data = await response.json();

                if (data.code === 'Ok' && data.routes.length > 0) {
                    const routeGeoJSON = data.routes[0].geometry;
                    
                    // Draw line
                    this.routeLine = L.geoJSON(routeGeoJSON, {
                        style: {
                            color: '#3b82f6',
                            weight: 5,
                            opacity: 0.7
                        }
                    }).addTo(this.map);
                }
            } catch (err) {
                console.error("Failed to fetch OSRM route:", err);
            }
        }
    },

    showPOI: function(lat, lng, name, openModal = true) {
        this.clearMap();
        if (openModal) {
            this.openMobileMap();
        }
        const marker = L.marker([lat, lng]).bindPopup(`<b>${name}</b>`).addTo(this.map);
        this.markers.push(marker);
        this.map.setView([lat, lng], 14);
        marker.openPopup();
    }
};

window.mapModule = mapModule;
