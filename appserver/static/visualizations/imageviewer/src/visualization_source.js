/*
 * Visualization source
 */
define([
        'api/SplunkVisualizationBase'
    ],
    function(
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
});