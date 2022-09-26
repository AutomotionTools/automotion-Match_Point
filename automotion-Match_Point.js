// Author: Rob Barrett (Automotion) - https://automotion.studio
// Copyright (c) 2022 Rob Barrett. All rights reserved.
// Version: 1.0
// Description: Matches the inPoint or outPoint of each selected layer with the layer above or below.

(function () {
    app.beginUndoGroup("automotion_inoutPointMatch");

    // Default parameters
    var inPoint = false; // true = inPoints; false = outPoints
    var above = false; // true = Layer above; false = Layer below

    // Get comp and layer info
    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;

    // Check if any layers are selected
    if (layers.length > 0) {

        // Loop through each selected layer
        for (var i = 0; i < layers.length; i++) {
            var l = layers[i];
            var layerIndex = l.index;
            var matchLayer = null;

            // Match the inPoint or outPoint of the layer above
            if (above == true && layerIndex != 1) {
                matchLayer = comp.layer(layerIndex - 1);
                /*if (inPoint = true) {
                    var matchInPoint = matchLayer.inPoint;
                    l.inPoint = matchInPoint;
                } else {
                    var matchOutPoint = matchLayer.matchOutPoint;
                    l.outPoint = matchOutPoint;
                }*/
            }
            // Match the inPoint or outPoint of the layer below
            else if (above == false && layerIndex != comp.numLayers) {
                matchLayer = comp.layer(layerIndex + 1);
            }

            function matchTime(matchLayer) {
                if (inPoint == true) {
                    var matchPoint = matchLayer.inPoint;
                    l.inPoint = matchPoint;
                } else {
                    var matchOutPoint = matchLayer.outPoint;
                    l.outPoint = matchOutPoint;
                }
            };
            matchTime(matchLayer);
            
        };
    };
    
        
    app.endUndoGroup();
})();