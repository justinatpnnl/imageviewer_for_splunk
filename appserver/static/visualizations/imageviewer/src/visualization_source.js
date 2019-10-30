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
                
                let id = this.el.dataset.cid;
                let modal = document.createElement("div");
                modal.id = id + "_imageModal";
                modal.classList.add("modal", "large", "hide", "fade");
                modal.setAttribute("role", "dialog");
                modal.setAttribute("aria-hidden", "true");
                modal.setAttribute("tabindex", "-1");

                let modalHeader = document.createElement("div");
                modalHeader.className = "modal-header";

                let modalHeaderButton = document.createElement("button");
                modalHeaderButton.className = "close";
                modalHeaderButton.setAttribute("type", "button");
                modalHeaderButton.setAttribute("aria-hidden", "true");
                modalHeaderButton.setAttribute("data-dismiss", "modal");
                modalHeaderButton.innerText = "x";

                let modalBody = document.createElement("div");
                modalBody.id = id + "_modalBody";
                modalBody.className = "modal-body";

                // Create clickable image element
                let imageLink = document.createElement("a");
                imageLink.href = "#" + modal.id;
                imageLink.setAttribute("data-toggle", "modal")

                let image = new Image();
                image.src = 'data:image/png;base64,'+ imagedata
                image.className = "base64Image";

                let modalImage = new Image();
                modalImage.src = image.src;
                modalImage.className = "modalImage";

                modalHeader.append(modalHeaderButton);
                modalBody.append(modalImage);
                modal.append(modalHeader);
                modal.append(modalBody);

                imageLink.append(image);
                this.el.append(imageLink);
                this.el.append(modal);

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