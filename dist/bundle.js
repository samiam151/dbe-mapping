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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InfoWindow {
    constructor(business) {
        this.business = business;
        this.content = `
            <div class="infowindow">
                <h3>${this.business.CompanyName}</h3>           
                <p>${this.business.BusinessPhone}</p>
                <p>${this.business.ContactName}</p>
                <p>
                    <small>${this.business.BusinessAddress1}</small>
                    <small>${this.business.BusinessAddress2}</small>
                    <small>${this.business.BusinessAddress3}</small>
                </p>
            </div>
        `
        this.selector = new google.maps.InfoWindow({
            content: this.content
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InfoWindow;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__marker__ = __webpack_require__(2);


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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infowindow__ = __webpack_require__(0);



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
            console.log(business);
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Business {
    constructor(business) {
        this.name = business.CompanyName;
        this.address = [
            business.BusinessAddress1,
            business.BusinessAddress2,
            business.BusinessAddress3];
        this.owner = business.ContactName;
        this.email = business.BusinessEMail;
        this.phone = business.BusinessPhone;

        if (business.LsdbeOptions){
            this.labels = business.LsdbeOptions.replace(/\s/g,'').split(',');
        }
        
        this.businessNumber = business.LsdbeNumber;
        this.coords = business.Coordinates;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Business;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_map__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_marker__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_infowindow__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_business__ = __webpack_require__(3);





// import * as DataService from "./services/dataService";

function init(){
    let dc = {lat: 38.917, lng: -77.016420}
    let map = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* DataMap */](11, dc)

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
            Businesses.push(new __WEBPACK_IMPORTED_MODULE_3__models_business__["a" /* Business */](business));
            map.addMarker(business);
        }); 
    });

}

window.initMap = init


/***/ })
/******/ ]);