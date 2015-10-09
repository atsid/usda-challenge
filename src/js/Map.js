(function (global) {

    var Map = function () {

        var map = new google.maps.Map($('#map')[0], {
            center: { lat: 42, lng: -94 },
            zoom: 7
        });


        //supports map search
        var markers = [];
        var input = document.getElementById('pac-input');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var searchBox = new google.maps.places.SearchBox(input);

        google.maps.event.addListener(searchBox, 'places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            for (var i = 0, m, l = markers.length; i < l; i++) {
                m = markers[i];
                m.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var j = 0, place, l2 = places.length; j < l2; j++) {
                place = places[j];
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location
                });

                markers.push(marker);

                bounds.extend(place.geometry.location);
            }

            // center the map on the search result
            if (places.length === 1) {
                map.setCenter(places[0].geometry.location);
                //this should be more dynamic
                map.setZoom(8);
            }
        });

        google.maps.event.addListener(map, 'bounds_changed', function () {
            var bounds = map.getBounds();
            searchBox.setBounds(bounds);
        });

        this.map = map;

    };

    global.usda.Map = Map;

}(this));