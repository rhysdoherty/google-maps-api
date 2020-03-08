// First, this function is called from the Google Maps API.
function initMap() {

    // Add map to document
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 52.205276, lng: 0.119167 }, // set to Cambridge by default
        zoom: 13,
        disableDefaultUI: true
    });

    var circle = null;

    // Add traffic layers to document
    var trafficLayer = new google.maps.TrafficLayer();


    document.getElementById("traffic").addEventListener("click", function () {
        if (trafficLayer.getMap() == null) {
            //traffic layer is disabled.. enable it
            trafficLayer.setMap(map);
        } else {
            //traffic layer is enabled.. disable it
            trafficLayer.setMap(null);
        }
    });

    document.getElementById("radius500m").addEventListener("click", function () {
        circle.setRadius(500);    
    });

    document.getElementById("radius1000m").addEventListener("click", function () {
        circle.setRadius(1000);    
    });

    document.getElementById("radius2000m").addEventListener("click", function () {
        circle.setRadius(2000);    
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'You are here!'
            });

            circle = new google.maps.Circle({
                strokeColor: '#0000d8',
                fillColor: '#0000d8',
                fillOpacity: 0.1,
                map: map,
                center: pos,
                radius: 500
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



