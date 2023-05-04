var apiKey = "1a6e242c584145cebf5c8827e5e6e268";
var mapKey = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg'


fetch(`https://api.openweathermap.org/data/2.5/weather?q=Savannah&appid=${apiKey}`)
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
        // for (const feature of geojson.features) {
        //     // create a HTML element for each feature
        //     const el=document.createElement('div');
        //     el.className='marker';

        //     // make a marker for each feature and add to the map
        //     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
        // }
        console.log(cityLon)
        console.log(cityLat)
        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });

        //    When a click event occurs on a feature in the places layer, open a popup at the
        //     location of the feature, with description HTML from its properties .
        map.on('click', 'places', (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

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