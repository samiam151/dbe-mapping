"use strict";

var _business = require("./models/business");

var _showBusiness = require("./showBusiness");

var _map = require("./map");

var _dataService = require("./services/dataService");

// import { Business } from "./models/business";

var url = window.location.pathname;

if (url.includes('businesses.html')) {
    _dataService.DataService.getData().then(function (data) {
        (0, _showBusiness.showBusinesses)(data);
    });
}

if (url.includes("index.html") || url === '/' || url === "/black-data/") {
    var openWindow = null;
    window.addEventListener('markerCreated', function (e) {
        if (openWindow) {
            openWindow.delete();
            openWindow = null;
        }
        openWindow = e.detail;
    });

    window.initMap = (0, _map.map)();
}