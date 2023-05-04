var apiKey = "1a6e242c584145cebf5c8827e5e6e268";
var mapKey =
    "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";
mapboxgl.accessToken =
    "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";
    const cityName = "Savannah"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

mapboxgl.accessToken = mapKey;
            const map = new mapboxgl.Map({
                container: "map", // container ID
                style: "mapbox://styles/mapbox/streets-v12", // style URL
                center: [cityLon, cityLat], // starting position [lng, lat]
                zoom: 6, // starting zoom
            });
            map.on("load", () => {
                // Load an image from an external URL.
                map.loadImage(
                    'http://clipart-library.com/img/825036.png',
                    (error, image) => {
                        if (error) throw error;

                        // Add the image to the map style.
                        map.addImage("logo", image);

                        // Add a data source containing one point feature.
                        map.addSource("point", {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: [
                                    {
                                        type: "Feature",
                                        geometry: {
                                            type: "Point",
                                            coordinates: [cityLon, cityLat],
                                        },
                                    },
                                ],
                            },
                        });

                        // Add a layer to use the image to represent the data.
                        map.addLayer({
                            id: "points",
                            type: "symbol",
                            source: "point", // reference the data source
                            layout: {
                                "icon-image": "logo", // reference the image
                                "icon-size": 0.02,
                            },
                        });
                    }
                );
            });
        });
            // }
        
    
// var apiKey = "1a6e242c584145cebf5c8827e5e6e268";
// var mapKey = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg'

// const cityName = "Savannah"
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (response) {
//         var cityLon = response.coord.lon;
//         var cityLat = response.coord.lat;
//         mapboxgl.accessToken = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg';
//         const map = new mapboxgl.Map({
//             container: 'map',
//             // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//             style: 'mapbox://styles/mapbox/streets-v12',
//             center: [cityLon, cityLat],
//             zoom: 11.15
//         });

//         // for (const feature of geojson.features) {
//         //     // create a HTML element for each feature
//         //     const el = document.createElement('div');
//         //     el.className = 'marker';
          
//         //     // make a marker for each feature and add to the map
//         //     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
//         //   }


//         map.on('load', () => {
//             map.addSource('places', {
//                 // This GeoJSON contains features that include an "icon"
//                 // property. The value of the "icon" property corresponds
//                 // to an image in the Mapbox Streets style's sprite.
//                 'type': 'geojson',
//                 'data': {
//                     'type': 'FeatureCollection',
//                     'features': [
//                         {
//                             'type': 'Feature',
//                             'properties': {
//                                 'description':
//                                     '<strong>MoonRiverBrewingCompany</strong><p><a target="_blank" title="Opens in a new window">Ghost Brewing</a> Moon River Brewing Company, the building is said to be haunted by angry spirits. Among them is a lady in white and James Stark, a known gambler who was killed in the building in an altercation.</p>',
//                                 'icon': 'http://clipart-library.com/img/825036.png'
//                             },
//                             'geometry': {
//                                 'type': 'Point',
//                                 'coordinates': [cityLon, cityLat]
//                             }
//                         },

//                     ]
                    
//                 }
//             });
//         });
//         for (const feature of geojson.features) {
//             // create a HTML element for each feature
//             const el=document.createElement('div');
//             el.className='marker';

//             // make a marker for each feature and add to the map
//             new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
//         }
//         console.log(cityLon)
//         console.log(cityLat)
//         // Add a layer showing the places.
//         map.addLayer({
//             'id': 'places',
//             'type': 'symbol',
//             'source': 'places',
//             'layout': {
//                 'icon-image': ['get', 'icon'],
//                 'icon-allow-overlap': true
//             }
//         });

//     //    When a click event occurs on a feature in the places layer, open a popup at the
//     //     location of the feature, with description HTML from its properties .
//         map.on('click', 'places', (e) => {
//             // Copy coordinates array.
//             const coordinates = e.features[0].geometry.coordinates.slice();
//             const description = e.features[0].properties.description;

//             // Ensure that if the map is zoomed out such that multiple
//             // copies of the feature are visible, the popup appears
//             // over the copy being pointed to.
//             while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                 coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//             }

//             new mapboxgl.Popup()
//                 .setLngLat(coordinates)
//                 .setHTML(description)
//                 .addTo(map);
//         });

//         // Change the cursor to a pointer when the mouse is over the places layer.
//         map.on('mouseenter', 'places', () => {
//             map.getCanvas().style.cursor = 'pointer';
//         });

//         // Change it back to a pointer when it leaves.
//         map.on('mouseleave', 'places', () => {
//             map.getCanvas().style.cursor = '';
//         });
//     });