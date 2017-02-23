import { DataMap } from "./models/map";
import { Marker } from "./models/marker";
import { Tooltip } from "./models/infowindow";
import { Business } from "./models/business";

// import * as DataService from "./services/dataService";

function init(){
    let dc = {lat: 38.917, lng: -77.016420}
    let map = new DataMap(11, dc)
    
    $.get('data/data_fix.json').then(data => {
        let Businesses = [];

        data.forEach((business, index) => {
            Businesses.push(new Business(business));
            map.addMarker(business);
        }); 

        console.log(Businesses);
        console.log(map)   
    });

    $('.button-map.resize').on('click', function(){
        map.selector.setCenter(map.initialCenter);
        map.selector.setZoom(map.initialZoom);
    });

    for (let key in map.initialCenter){
        console.log(typeof map.initialCenter[key]);
    }
}

window.initMap = init
