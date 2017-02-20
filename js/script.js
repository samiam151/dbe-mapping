(function(window, $){
    function _initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {lat: 38.917, lng: -77.016420} // center of Wash.DC
        });

        $.get('data/data_fix.json').then(function(data){
            data.forEach(function(business){
                addMarker(business);
            });      
        });

        function addMarker(point){
            var coords = { lat: point.Coordinates.Latitude, lng:point.Coordinates.Longitude};
            var content = "<div class='popup'>"+ point.CompanyName +"</div>"

            var infoWindow = new google.maps.InfoWindow({
                content: content
            });
            if (coords.lat && coords.lng){
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map 
                });

                marker.addListener('click', function(e){
                    // map.setZoom(map.getZoom() + 3);
                    // map.setCenter(marker.position.lat(), marker.position.lng());
                    // map.setCenter(30, 70);
                    console.log(marker.position.lat);
                    infoWindow.open(map, marker)
                });
            }
            return marker;
        } 
    }
    window.initMap = _initMap;
}(window, jQuery));
