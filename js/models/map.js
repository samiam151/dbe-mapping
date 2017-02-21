import * as Marker from "./marker";

export class DataMap {
    constructor(zoom, center) {
        this.selector = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: center});
        this.initialZoom = zoom;
        this.initialCenter = {
            lat: center.lat,
            lng: center.lng
        };
    }

    test() {
        console.log(this.new + "is more more!");
    }

    addMarker(point){
        let coords = { lat: point.Coordinates.Latitude, lng:point.Coordinates.Longitude},
            marker = null;
        if (coords.lat && coords.lng){
            let options = {
                position: coords,
                title: point.CompanyName,
                map: this.selector,
                data: point
            };
            new Marker.Marker(options)
        }
        // return marker;
    }

    static getZoom(){
        return this.initialZoom()
    }
}