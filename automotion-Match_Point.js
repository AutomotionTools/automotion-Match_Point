// Author: Rob Barrett (Automotion) - https://automotion.studio
// Copyright (c) 2022 Rob Barrett. All rights reserved.
// Version: 1.0
// Description: Matches the inPoint or outPoint of each selected layer to that of the layer above or below.

(function () {
    app.beginUndoGroup("automotion_MatchPoint");

    // Default parameters
    var layerPoint = "both"; // in = inPoints; out = outPoints; both = inPoints and outPoints
    var layerAbove = true; // true = Layer above; false = Layer below

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
            var valid = null;

            // Match the inPoint or outPoint of the layer above
            if (layerAbove == true && layerIndex != 1) {
                matchLayer = comp.layer(layerIndex - 1);
                valid = true;
            }
            // Match the inPoint or outPoint of the layer below
            else if (layerAbove == false && layerIndex != comp.numLayers) {
                matchLayer = comp.layer(layerIndex + 1);
                valid = true;
            }

            function matchTime(matchLayer) {
                if (layerPoint == "in" || layerPoint == "both") {
                    var matchStart = matchLayer.startTime;
                    var matchPoint = matchLayer.inPoint;
                    var thisPoint = l.inPoint;
                    l.startTime = matchPoint - thisPoint;
                    l.inPoint = matchPoint;
                }
                if (layerPoint == "out" || layerPoint == "both") {
                    var matchOutPoint = matchLayer.outPoint;
                    l.outPoint = matchOutPoint;
                }
            };
            if (valid == true) {
                matchTime(matchLayer);
            };
            
        };
    };
        
    app.endUndoGroup();
})();