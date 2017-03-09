"use strict";

var _business = require("./models/business");

var _showBusiness = require("./showBusiness");

var _map = require("./map");

var url = window.location.pathname;

if (url.includes('businesses.html')) {
    (0, _showBusiness.test)();
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