import * as Map from "./models/map";
import * as Marker from "./models/marker";
import * as Tooltip from "./models/tooltip";

function init(){
    let dc = {lat: 38.917, lng: -77.016420}
    let new_map = new Map.DataMap(11, dc)

    $.get('data/data_fix.json').then(data => {
        data.forEach((business, index) => {
            new_map.addMarker(business);
        }); 
        console.log(new_map.markers)   
    });

    $('.button-map.resize').on('click', function(){
        new_map.selector.setCenter(new_map.initialCenter);
        new_map.selector.setZoom(new_map.initialZoom);
    });
}

window.initMap = init
