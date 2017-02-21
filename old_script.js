(function(window, $){
    function _initMap(){
        var markers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {lat: 38.917, lng: -77.016420} // center of Wash.DC
        });

        var initialMapSettings = {
            zoom: map.getZoom(),
            center: {
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            }
        }

        var resizeButton = document.querySelector('.button-map.resize');
        resizeButton.addEventListener('click', function(){
            map.setCenter(initialMapSettings.center);
            map.setZoom(initialMapSettings.zoom);
        });

        $.get('data/data_fix.json').then(function(data){
            data.forEach(function(business, index){
                var marker = addMarker(business, index);
                markers.push(marker);
            });    
        });

        


        function addMarker(point, index){
            var coords = { lat: point.Coordinates.Latitude, lng:point.Coordinates.Longitude};
            var content = "<div class='popup'>"+ point.CompanyName +"</div>";
            // var index = 0;

            var infoWindow = new google.maps.InfoWindow({
                content: content
            });
            if (coords.lat && coords.lng){
                
                var marker = new google.maps.Marker({
                    position: coords,
                    title: point.CompanyName,
                    map: map
                });

                marker.addListener('click', function(e){
                    map.setZoom(map.getZoom() + 3);
                    // map.setCenter(marker.position.lat(), marker.position.lng());
                    // map.setCenter(30, 70);
                    infoWindow.open(map, marker)
                });
            }
            return marker;
        } 
    }
    window.initMap = _initMap;
}(window, jQuery));
