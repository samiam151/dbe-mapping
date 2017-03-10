import { DataMap } from "./models/map";
import { Marker } from "./models/marker";
import { Tooltip } from "./models/infowindow";
import { Business } from "./models/business";
import { DataService } from "./services/dataService";

export function map(){

    let init = function(){
        let dc = {lat: 38.917, lng: -77.016420}
        let map = new DataMap(11, dc)

        // Resize Button
        $('.button-map.resize').on('click', () => {
            map.selector.setCenter(map.initialCenter);
            map.selector.setZoom(map.initialZoom);
        });
        
        // Place Markers
        DataService.getData().then(businesses => {
            businesses.forEach((business, index) => {
                map.addMarker(business);
            }); 
        });
    }

    return init
}