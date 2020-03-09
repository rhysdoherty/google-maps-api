// first, this function is called from the Google Maps API.
function initMap() {

    // add map to document
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 52.205276, lng: 0.119167 }, // set to Cambridge by default
        zoom: 13,
        disableDefaultUI: true
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

    // set radius to 500m when clicked
    document.getElementById("radius500m").addEventListener("click", function () {
        circle.setRadius(500);    
    });

    // set radius to 1000m when clicked
    document.getElementById("radius1000m").addEventListener("click", function () {
        circle.setRadius(1000);    
    });

    // set radius to 2000m when clicked
    document.getElementById("radius2000m").addEventListener("click", function () {
        circle.setRadius(2000);    
    });


    // create infoWindow
    infoWindow = new google.maps.InfoWindow;

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