define(["api/SplunkVisualizationBase"], function(__WEBPACK_EXTERNAL_MODULE_1__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Visualization source
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        SplunkVisualizationBase
	    ) {
	  
	    // Extend from SplunkVisualizationBase
	    return SplunkVisualizationBase.extend({
	  
	        initialize: function() {
	            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
	        },

	        // Optionally implement to format data returned from search. 
	        // The returned object will be passed to updateView as 'data'
	        formatData: function(data) {

	            // Format data 

	            return data;
	        },
	  
	        // Implement updateView to render a visualization.
	        //  'data' will be the data object returned from formatData or from the search
	        //  'config' will be the configuration property object
	        updateView: function(data, config) {
	            // Guard for empty data
	            if(data.rows.length < 1){
	                return;
	            }
	            
	            // Get the first field of the first row
	            var imagedata = data.rows[0][0];

	            if(imagedata && imagedata.substring(0,11) == "iVBORw0KGgo") {
	                // Clear the div
	                this.el.innerHTML = "";

	                // Create new image element
	                var image = new Image();
	                image.src = 'data:image/png;base64,'+ imagedata
	                image.className = "base64Image";
	                this.el.append(image);
	            }
	            else {
	                this.el.innerHTML = '<div class="message-single"><div class="alert alert-error">No image detected.</div></div>';
	            }
	        },

	        // Search data params
	        getInitialDataParams: function() {
	            return ({
	                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
	                count: 1
	            });
	        },

	        // Override to respond to re-sizing events
	        reflow: function() {}
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ])});;