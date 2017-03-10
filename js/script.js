import { Business } from "./models/business";
import { showBusinesses } from "./showBusiness";
import { map } from "./map";
import { DataService } from "./services/dataService";
// import { Business } from "./models/business";

let url = window.location.pathname;

if (url.includes('businesses.html')){
    DataService.getData().then(data => {
        showBusinesses(data)
    })
}

if (url.includes("index.html") || url === '/' || url === "/black-data/"){
    let openWindow = null;
    window.addEventListener('markerCreated', (e) => {
        if (openWindow){
            openWindow.delete();
            openWindow = null;  
        }
        openWindow = e.detail;
    });

    window.initMap = map();
}