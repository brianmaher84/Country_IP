/*globals $, chrome, console, Uint8Array */

/**
 * creates the table data and updates the extension icon
 */
function createPopUpPage() {
    'use strict';

    $().fadeIn(2000);

    callWebService(function (dataBlob, data) {

        var img, table_body;

        // https://www.whatismyip.com/images/flags/se.png
        img = "<img id=\"flagImg\" src=\"https://www.whatismyip.com/images/flags/" + data.countryCode.toLowerCase() + ".png\"/>";

        table_body = img;
        $.each(data, function (k, v) {
            table_body += "<tr><td>" + k + "</td><td><b>" + v + "</b></td></tr>";
        });
        $("#GeoResults").html(table_body);

        updateExtensionIcon(dataBlob);
        
        initMapInternal(data.lat, data.lon);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    console.log("getting started");
    createPopUpPage();

});





