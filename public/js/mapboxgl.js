const Post = require('../models');
var geo = require('mapbox-geocoding')
geo.setAccessToken('pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg');

geo.geocode('mapbox.places', `${post.city}, ${post.state}`, function (err, geoData) {
    console.log(geoData);
});

mapboxgl.accessToken = 'pk.eyJ1IjoidGdvbGQxIiwiYSI6ImNsaDdzejVzNjAxdGYzam13MGkzOXpmdmsifQ.mTffg5HogZ3NwE5ibJzpIg';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [39.645891, -99.311362],
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
                        'coordinates': [35.198080, -111.647427]
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
                        'coordinates': [34.202060, -119.186602]
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
                            '<strong>Hull House</strong><p><a target="_blank" title="Opens in a new window">Haunted Hull House</a> Hull House, the wife of Charles Hull the original owner is said to haunt the attic of the house.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [41.871607, -87.647144]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Chesapeake and Ohio Canal</strong><p>target="_blank" title="Opens in a new window">Scary Waters</a>Chesapeake and Ohio Canal, haunted by the ghosts of soldiers who fought in the Civil War.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [39.625966, -78.757423]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Landmark Inn</strong><p> target="_blank" title="Opens in a new window">Book Shelf Boo</a> Landmark Inn, a room is haunted by a librarian who lost her lover in a shipwreck</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [46.544817, -87.392310]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>1st Avenue</strong><p target="_blank">Traffic Light Scary</a>1st Avenue, haunted by a woman who died during World War II.</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [44.969411, -93.276465]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Emlen Physick Estate</strong><p target="_blank">Ghost Estate</a>haunted by the original owner and his family</p>',
                        'icon': 'ghost'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [38.940461, -74.915233]
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