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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__marker__ = __webpack_require__(1);


class DataMap {
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
            new __WEBPACK_IMPORTED_MODULE_0__marker__["a" /* Marker */](options)
        }
        // return marker;
    }

    static getZoom(){
        return this.initialZoom()
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DataMap;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(0);


class Marker {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Marker;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tooltip {
    constructor() {}
}
/* unused harmony export Tooltip */


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_map__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_marker__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_tooltip__ = __webpack_require__(2);




function init(){
    let dc = {lat: 38.917, lng: -77.016420}
    let new_map = new __WEBPACK_IMPORTED_MODULE_0__models_map__["a" /* DataMap */](11, dc)

    $.get('data/data_fix.json').then(data => {
        data.forEach((business, index) => {
            new_map.addMarker(business);
            // var marker = addMarker(business, index);
            // markers.push(marker);
        });    
    });

    $('.button-map.resize').on('click', function(){
        new_map.selector.setCenter(new_map.initialCenter);
        new_map.selector.setZoom(new_map.initialZoom);
    });
}

window.initMap = init


/***/ })
/******/ ]);