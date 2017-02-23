"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _map = require("./models/map");

var _marker = require("./models/marker");

var _infowindow = require("./models/infowindow");

var _business = require("./models/business");

// import * as DataService from "./services/dataService";

function init() {
    var dc = { lat: 38.917, lng: -77.016420 };
    var map = new _map.DataMap(11, dc);

    $.get('data/data_fix.json').then(function (data) {
        var Businesses = [];

        data.forEach(function (business, index) {
            Businesses.push(new _business.Business(business));
            map.addMarker(business);
        });

        console.log(Businesses);
        console.log(map);
    });

    $('.button-map.resize').on('click', function () {
        map.selector.setCenter(map.initialCenter);
        map.selector.setZoom(map.initialZoom);
    });

    for (var key in map.initialCenter) {
        console.log(_typeof(map.initialCenter[key]));
    }
}

window.initMap = init;