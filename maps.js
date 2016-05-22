/*global google,console, $, Crypto */

var map;
function initMapInternal(latitude, longitude) {
    'use strict';
    
    var mapElement, mapsUri, imgElement, mapApiDomain, fullMapUri;
    
    console.log("rendering map at latitude: " + latitude + ", longitude: " + longitude);
    
    mapApiDomain = "https://maps.googleapis.com";
    
    mapsUri = "/maps/api/staticmap?markers=" + latitude + "," + longitude + "&zoom=16&maptype=hybrid&size=500x400";
    
    fullMapUri = mapApiDomain + mapsUri;
    
    imgElement = "<img src=\"" + fullMapUri + "\">";
    
    mapElement = $("#map");
    mapElement.html(imgElement);
    
}

function initMap() {
    'use strict';
    initMapInternal(0.0, 0.0);
}
