import { Map } from "./map";
import { Tooltip } from "./infowindow";

export class Marker {
    constructor(options) {
        this.selector = new google.maps.Marker({
            position: options.position,
            title: options.title,
            map: options.map
        });
        this.map = options.map;
        this.data = options.data

        this.selector.addListener('click', (e) => {
            this.map.setZoom(this.map.getZoom() + 3);
            this.map.setCenter(this.selector.position.lat(), this.selector.position.lng());
            // map.setCenter(30, 70);
            // infoWindow.open(map, marker)
        });
    }
}
