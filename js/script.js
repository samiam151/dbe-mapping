import { DataMap } from "./models/map";
import { Marker } from "./models/marker";
import { Tooltip } from "./models/infowindow";
import { Business } from "./models/business";

// import * as DataService from "./services/dataService";
let openWindow = null;

window.addEventListener('markerCreated', (e) => {
    if (openWindow){
        openWindow.delete();
        openWindow = null;  
    }
    openWindow = e.detail;
});


function init(){
    let dc = {lat: 38.917, lng: -77.016420}
    let map = new DataMap(11, dc)

    // Resize Button
    $('.button-map.resize').on('click', () => {
        map.selector.setCenter(map.initialCenter);
        map.selector.setZoom(map.initialZoom);
    });
    
    // Place Markers
    $.get('data/data_fix.json').then(businesses => {
        // businesses is a json object of containing the data of each business
        
        let Businesses = [];

        // each business is an object  
        businesses.forEach((business, index) => {
            Businesses.push(new Business(business));
            map.addMarker(business);
        }); 
    });

}

window.initMap = init
