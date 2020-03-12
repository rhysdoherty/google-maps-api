// first, this function is called from the Google Maps API.
function initMap() {

    // get DIV to inject map
    var mapEl = document.getElementById('map');

    if (!mapEl) return;

    // add map to document
    var map = new google.maps.Map(mapEl, {
        center: { lat: 52.205276, lng: 0.119167 }, // set to Cambridge by default
        zoom: 13,
        disableDefaultUI: true,
        mapTypeId: 'satellite'
    });

    var circle = null;

    // add traffic layers to document
    var trafficLayer = new google.maps.TrafficLayer();

    // toggle traffic display
    document.getElementById("traffic").addEventListener("click", function () {
        if (trafficLayer.getMap() == null) {
            // enable traffic layer
            trafficLayer.setMap(map);
            document.getElementById("traffic").innerHTML = 'Hide traffic';
        } else {
            // disable traffic layer
            trafficLayer.setMap(null);
            document.getElementById("traffic").innerHTML = 'Show traffic';
        }
    });

    document.getElementById("terrain").addEventListener("click", function () {
        map.setMapTypeId('terrain');
    });

    document.getElementById("satellite").addEventListener("click", function () {
        map.setMapTypeId('satellite');
    });
   

    // set radius to 500m when clicked
    document.getElementById("radius500m").addEventListener("click", function () {
        circle.setRadius(500);
        map.setZoom(14);  
    });

    // set radius to 1000m when clicked
    document.getElementById("radius1000m").addEventListener("click", function () {
        circle.setRadius(1000); 
        map.setZoom(13);     
    });

    // set radius to 2000m when clicked
    document.getElementById("radius2000m").addEventListener("click", function () {
        circle.setRadius(2000); 
        map.setZoom(12);     
    });


    // create infoWindow
    var infoWindow = new google.maps.InfoWindow;

    // get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            
            // add Marker to users current position
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'You are here!'
            });

            // add circle around users current position
            circle = new google.maps.Circle({
                strokeColor: '#0000d8',
                fillColor: '#0000d8',
                fillOpacity: 0.1,
                map: map,
                center: pos,
                radius: 500
            });

            // set marker on users current postion, telling user they're here
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// handle error if browser doesn't support geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}