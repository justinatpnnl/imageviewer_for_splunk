var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'visualization_source'),
    output: {
        path: __dirname,
        filename: 'visualization.js',
        libraryTarget: 'amd'
    },
    externals: [
        'api/SplunkVisualizationBase'
    ]
};