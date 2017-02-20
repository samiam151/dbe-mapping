(function(window){
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
            if (coords.lat && coords.lng){
                new google.maps.Marker({
                    position: coords,
                    map: map 
                });
            }
        } 
    }
    window.initMap = _initMap;
}(window));
