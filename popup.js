/*globals $, chrome, console, Uint8Array */

function filterData(data) {
    'use strict';
    
    var interestingKeys, filteredData;
    
    interestingKeys = ["city", "country", "countryCode", "isp", "org", "lat", "lon", "query", "regionName", "timezone", "zip"];
    filteredData = {};
    
    $.each(data, function (k, v) {
        
        if (interestingKeys.indexOf(k) !== -1) {
            if (k === 'query') {
                k = 'IP';
            } else if (k === 'org') {
                k = 'organization';
            }
            filteredData[k] = v;
        }
        
    });
    return filteredData;
}

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

        data = filterData(data);
        
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





