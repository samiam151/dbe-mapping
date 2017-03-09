import { Business } from "./models/business";
import { test } from "./showBusiness";
import { map } from "./map";


let url = window.location.pathname;

if (url.includes('businesses.html')){
    test();
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