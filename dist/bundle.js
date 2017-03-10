/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Business {
    constructor(business) {        
        let info = business.info;
        
        this.name = info.CompanyName;
        this.address = info.BusinessAddress1;
        this.owner = info.PrincipalOwner;
        this.contact = info.ContactName
        this.email = info.BusinessEMail;
        this.phone = info.BusinessPhone;
        this.website = info.BusinessWebsite;
        this.description = info.Description;
        this.dateEstablished = info.DateEstablished;
        this.ward = info.Ward;
        this.points = info.RefPoints.replace('/[\n\t]/g', "");

        this.address = business.address;
        this.types = business.types;
        this.coords = business.Coordinates;
    }
    static count(){
        
    }

    toString() {
        return `${this.name}, by ${this.owner}`;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Business;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DataService {
    constructor() {}

    static getData() {
        console.log('Getting...')
        return $.get('data/data_new.json');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DataService;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InfoWindow {
    constructor(business) {
        this.business = business;
        this.content = `
            <div class="infowindow">
                <h3>${this.business.info.CompanyName}</h3>           
                <p>${this.business.info.BusinessPhone}</p>
                <p>${this.business.info.ContactName}</p>
                <p>${this.business.info.BusinessEMail}</p>
                <a target="_blank" href="http://${this.business.info.BusinessWebsite}">${this.business.info.BusinessWebsite}</a>
                <p>
                    <small>${this.business.info.BusinessAddress1}, </small>
                </p>
            </div>
        `
        this.selector = new google.maps.InfoWindow({
            content: this.content
        })

        window.dispatchEvent(new CustomEvent('markerCreated', {
            'detail': this
        }));
        
    }

    delete() {
        this.selector.setMap(null);
    }
        
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InfoWindow;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__marker__ = __webpack_require__(4);


class DataMap {
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
            marker = new __WEBPACK_IMPORTED_MODULE_0__marker__["a" /* Marker */](options)       
        }
        this.markers.push(marker)
    }

    getZoom(){
        return this.initialZoom()
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DataMap;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infowindow__ = __webpack_require__(2);



class Marker {
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
            let window = new __WEBPACK_IMPORTED_MODULE_1__infowindow__["a" /* InfoWindow */](business)
            window.selector.open(this.map, this)

            function determineZoom(currentZoom){
                return currentZoom;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Marker;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_map__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_marker__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_infowindow__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_business__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_dataService__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = map;






function map(){

    let init = function(){
        let dc = {lat: 38.917, lng: -77.016420}
        let map = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* DataMap */](11, dc)

        // Resize Button
        $('.button-map.resize').on('click', () => {
            map.selector.setCenter(map.initialCenter);
            map.selector.setZoom(map.initialZoom);
        });
        
        // Place Markers
        __WEBPACK_IMPORTED_MODULE_4__services_dataService__["a" /* DataService */].getData().then(businesses => {
            businesses.forEach((business, index) => {
                map.addMarker(business);
            }); 
        });
    }

    return init
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_business__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = showBusinesses;


function showBusinesses(data){
    let businesses = data.map(datum => new __WEBPACK_IMPORTED_MODULE_0__models_business__["a" /* Business */](datum)),
        numBusinesses = businesses.length

    businesses.slice(0,25).forEach(n => {
        console.log(n)
    })
    console.log(numBusinesses)
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_business__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__showBusiness__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_dataService__ = __webpack_require__(1);




// import { Business } from "./models/business";

let url = window.location.pathname;

if (url.includes('businesses.html')){
    __WEBPACK_IMPORTED_MODULE_3__services_dataService__["a" /* DataService */].getData().then(data => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__showBusiness__["a" /* showBusinesses */])(data)
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

    window.initMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__map__["a" /* map */])();
}

/***/ })
/******/ ]);