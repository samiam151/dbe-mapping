import { Marker } from "./marker";

export class DataMap {
    constructor(zoom, center) {
        this.selector = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: center,
            gestureHandling: 'auto'
         });
        this.initialZoom = zoom;
        this.initialCenter = {
            lat: center.lat,
            lng: center.lng
        };
        this.markers = [];
    }

    addMarker(business){
        let coords = { lat: business.Coordinates.Latitude, lng:business.Coordinates.Longitude},
            marker = null;
        if (coords.lat && coords.lng){
            let options = {
                position: coords,
                title: business.CompanyName,
                map: this.selector,
                business: business
            };
            marker = new Marker(options)       
        }
        this.markers.push(marker)
    }

    getZoom(){
        return this.initialZoom()
    }
}