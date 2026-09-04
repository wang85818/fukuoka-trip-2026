// optimize.js - Smart Route Optimization (TSP)

const optimizeModule = {
    // Haversine formula as a fast fallback heuristic
    getDistance: function(lat1, lon1, lat2, lon2) {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },

    optimizeDay: async function(dayIndex) {
        const dayData = window.appData.itineraryData[dayIndex];
        if (!dayData || dayData.timeline.length <= 2) {
            return; // Nothing to optimize if 2 or fewer stops
        }

        const validStops = dayData.timeline.filter(t => t.lat && t.lng);
        if (validStops.length < dayData.timeline.length) {
            alert("有些行程沒有地理座標，無法最佳化！");
            return;
        }

        // Keep the first stop fixed (usually starting point/hotel)
        const startStop = validStops[0];
        let unvisited = validStops.slice(1);
        const optimizedRoute = [startStop];
        let currentStop = startStop;

        try {
            // Fetch distance matrix from OSRM for accurate routing
            const coordinates = validStops.map(s => `${s.lng},${s.lat}`).join(';');
            const url = `https://router.project-osrm.org/table/v1/driving/${coordinates}?annotations=duration`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 'Ok') {
                // Use OSRM durations
                while (unvisited.length > 0) {
                    const currentIndex = validStops.findIndex(s => s.id === currentStop.id);
                    let nearestIndex = -1;
                    let minDuration = Infinity;

                    for (let i = 0; i < unvisited.length; i++) {
                        const targetIndex = validStops.findIndex(s => s.id === unvisited[i].id);
                        const duration = data.durations[currentIndex][targetIndex];
                        if (duration < minDuration) {
                            minDuration = duration;
                            nearestIndex = i;
                        }
                    }

                    currentStop = unvisited[nearestIndex];
                    optimizedRoute.push(currentStop);
                    unvisited.splice(nearestIndex, 1);
                }
            } else {
                throw new Error("OSRM Matrix failed");
            }
        } catch (err) {
            console.warn("Falling back to straight-line distance heuristic", err);
            // Fallback: Greedy TSP with Haversine distance
            while (unvisited.length > 0) {
                let nearestIndex = -1;
                let minDistance = Infinity;

                for (let i = 0; i < unvisited.length; i++) {
                    const dist = this.getDistance(currentStop.lat, currentStop.lng, unvisited[i].lat, unvisited[i].lng);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestIndex = i;
                    }
                }
                currentStop = unvisited[nearestIndex];
                optimizedRoute.push(currentStop);
                unvisited.splice(nearestIndex, 1);
            }
        }

        // Preserve original times? Or just reset times?
        // Let's keep original time slots but swap the content.
        const originalTimes = dayData.timeline.map(t => t.time);
        optimizedRoute.forEach((stop, idx) => {
            stop.time = originalTimes[idx];
            stop.isOptimized = true;
        });

        dayData.timeline = optimizedRoute;
        
        // Save to local storage
        localStorage.setItem('fukuokaItinerary', JSON.stringify(window.appData.itineraryData));

        // Re-render UI
        window.renderUI.renderItinerary(window.appData.itineraryData);
        
        // Update map
        if (window.mapModule) {
            window.mapModule.updateRouteForDay(dayData);
        }
        
        alert("✨ 路線最佳化完成！");
    }
};

window.optimizeModule = optimizeModule;
