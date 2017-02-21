var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: "./dist/"
  }
};