import { Map } from "./map";
import { InfoWindow } from "./infowindow";

export class Marker {
    constructor(markerOptions) {
        this.selector = new google.maps.Marker({
            position: markerOptions.position,
            title: markerOptions.title,
            map: markerOptions.map
        });

        this.map = markerOptions.map;
        let business = markerOptions.business
        // Adds a click event listener to the marker
        this.selector.addListener('click', function(e){
            // 'this' is the google map marker selector
            let currentZoom = this.map.getZoom()

            this.map.setZoom(determineZoom(currentZoom));
            this.map.setCenter({lat: business.Coordinates.Latitude, lng: business.Coordinates.Longitude });
            // infoWindow.open(map, marker)
            let window = new InfoWindow(business)
            window.selector.open(this.map, this)

            function determineZoom(currentZoom){
                return currentZoom;
            }
        });
    }
}
