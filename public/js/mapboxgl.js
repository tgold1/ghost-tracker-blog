mapboxgl.accessToken = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-77.04, 38.907],
    zoom: 11.15
});

map.on('load', () => {
    map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>MoonRiverBrewingCompany</strong><p><a target="_blank" title="Opens in a new window">Ghost Brewing</a> Moon River Brewing Company, the building is said to be haunted by angry spirits. Among them is a lady in white and James Stark, a known gambler who was killed in the building in an altercation.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [32.080776, -81.092164]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Pioneer Park</strong><p><a  target="_blank" title="Opens in a new window">Ghost Park</a>, Pioneer Park, haunted by the ghost of Harriet Webber, wife of the builder of the park.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [39.192974, -106.826149]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Monte Vista Hotel</strong><p> target="_blank" title="Opens in a new window">Phantom Hotel</a> Monte Vista Hotel, a phantom bellboy is said to knock on the door of room 210 and announce room service.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [35.198080, -111.647427

]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Henry Levy House</strong><p> target="_blank" title="Opens in a new window">Haunted House</a> Henry Levy House, the house is filmed with a locked door flying open and is believed to be the ghosts of previous owners Henry and Camille Levy who died in the house.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [34.202060, -119.186602

]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Pedro Benedit Horruytiner House</strong><p><a target="_blank" title="Opens in a new window">Meow Boo House</a> Pedro Benedit Horruytiner house, the ghost of Pedro Benedit and a cat who once lived there haunt the house.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [29.900198, -81.314422]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                        'icon': 'rocket'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-77.043444, 38.909664]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                        'icon': 'music'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-77.031706, 38.914581]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                        'icon': 'music'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-77.020945, 38.878241]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                        'icon': 'music'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-77.007481, 38.876516]
                    }
                }
            ]
        }
    });
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

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
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