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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Map {
    constructor(name) {
        this.name = name;
        this.new = "new";
    }

    test() {
        console.log(this.new + "is more!");
    }
}

module.exports = Map;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__map_js__);


let mymap = new __WEBPACK_IMPORTED_MODULE_0__map_js___default.a('test');
console.log(mymap);
mymap.test();

(function(window, $){
    function _initMap(){
        var markers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {lat: 38.917, lng: -77.016420} // center of Wash.DC
        });

        var initialMapSettings = {
            zoom: map.getZoom(),
            center: {
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            }
        }

        var resizeButton = document.querySelector('.button-map.resize');
        resizeButton.addEventListener('click', function(){
            map.setCenter(initialMapSettings.center);
            map.setZoom(initialMapSettings.zoom);
        });

        $.get('data/data_fix.json').then(function(data){
            data.forEach(function(business, index){
                var marker = addMarker(business, index);
                markers.push(marker);
            });    
        });

        


        function addMarker(point, index){
            var coords = { lat: point.Coordinates.Latitude, lng:point.Coordinates.Longitude};
            var content = "<div class='popup'>"+ point.CompanyName +"</div>";
            // var index = 0;

            var infoWindow = new google.maps.InfoWindow({
                content: content
            });
            if (coords.lat && coords.lng){
                
                var marker = new google.maps.Marker({
                    position: coords,
                    title: point.CompanyName,
                    map: map
                });

                marker.addListener('click', function(e){
                    map.setZoom(map.getZoom() + 3);
                    // map.setCenter(marker.position.lat(), marker.position.lng());
                    // map.setCenter(30, 70);
                    infoWindow.open(map, marker)
                });
            }
            return marker;
        } 
    }
    window.initMap = _initMap;
}(window, jQuery));


/***/ })
/******/ ]);