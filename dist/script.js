"use strict";

var _map = require("./models/map");

var Map = _interopRequireWildcard(_map);

var _marker = require("./models/marker");

var Marker = _interopRequireWildcard(_marker);

var _tooltip = require("./models/tooltip");

var Tooltip = _interopRequireWildcard(_tooltip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function init() {
    var dc = { lat: 38.917, lng: -77.016420 };
    var new_map = new Map.DataMap(11, dc);

    $.get('data/data_fix.json').then(function (data) {
        data.forEach(function (business, index) {
            new_map.addMarker(business);
        });
        console.log(new_map.markers);
    });

    $('.button-map.resize').on('click', function () {
        new_map.selector.setCenter(new_map.initialCenter);
        new_map.selector.setZoom(new_map.initialZoom);
    });
}

window.initMap = init;