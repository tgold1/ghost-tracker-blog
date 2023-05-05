var apiKey = "1a6e242c584145cebf5c8827e5e6e268";
var mapKey = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg'


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        var cityLon = response.coord.lon;
        var cityLat = response.coord.lat;
        mapboxgl.accessToken = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg';
        const map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [cityLon, cityLat],
            zoom: 11.15
        });

        const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [cityLon, cityLat]
                    },
                    'properties': {
                        'title': 'Mapbox',
                        'description': 'Savannah'
                    }
                },

            ]
        };

        // add markers to map
        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';

            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                        )
                )
                .addTo(map);
        }

        map.on('click', 'places', (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
        });
    });
const container = document.querySelector('#pastPosts')
function mapZoom(event) {
    const element = event.target
    if (element.matches("h2")) {
        const city = element.getAttribute("city")
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                var cityLon = response.coord.lon;
                var cityLat = response.coord.lat;
                mapboxgl.accessToken = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg';
                const map = new mapboxgl.Map({
                    container: 'map',
                    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [cityLon, cityLat],
                    zoom: 11.15
                });

                const geojson = {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [cityLon, cityLat]
                            },
                            'properties': {
                                'title': 'Mapbox',
                                'description': 'Savannah'
                            }
                        },

                    ]
                };

                // add markers to map
                for (const feature of geojson.features) {
                    // create a HTML element for each feature
                    const el = document.createElement('div');
                    el.className = 'marker';

                    // make a marker for each feature and add it to the map
                    new mapboxgl.Marker(el)
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }) // add popups
                                .setHTML(
                                    `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                                )
                        )
                        .addTo(map);
                }

                map.on('click', 'places', (e) => {
                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(map);
                });

                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', 'places', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'places', () => {
                    map.getCanvas().style.cursor = '';
                });
            });
    }
}
container.addEventListener("click", mapZoom)