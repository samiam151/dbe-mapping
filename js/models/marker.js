import * as Map from "./map";
import * as tooltip from "./tooltip";

export class Marker {
    constructor(options) {
        this.selector = new google.maps.Marker({
            position: options.position,
            title: options.title,
            map: options.map
        });
        this.map = options.map;
        this.data = options.data

        this.selector.addListener('click', function(e){
            this.map.setZoom(this.map.getZoom() + 3);
            // map.setCenter(marker.position.lat(), marker.position.lng());
            // map.setCenter(30, 70);
            // infoWindow.open(map, marker)
        });
    }
}
