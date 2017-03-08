"use strict";

var _map = require("./models/map");

var _marker = require("./models/marker");

var _infowindow = require("./models/infowindow");

var _business = require("./models/business");

// import * as DataService from "./services/dataService";
var openWindow = null;

window.addEventListener('markerCreated', function (e) {
    if (openWindow) {
        openWindow.delete();
        openWindow = null;
    }
    openWindow = e.detail;
});

function init() {
    var dc = { lat: 38.917, lng: -77.016420 };
    var map = new _map.DataMap(11, dc);

    // Resize Button
    $('.button-map.resize').on('click', function () {
        map.selector.setCenter(map.initialCenter);
        map.selector.setZoom(map.initialZoom);
    });

    // Place Markers
    $.get('data/data_new.json').then(function (businesses) {
        // businesses is a json object of containing the data of each business

        var Businesses = [];

        // each business is an object  
        businesses.forEach(function (business, index) {
            Businesses.push(new _business.Business(business));
            map.addMarker(business);
        });
    });
}

window.initMap = init;