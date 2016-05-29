/*globals console,chrome,$ */

/**
 * Converts the Data Image URI to a Blob.
 *
 * @param {string} dataURI base64 data image URI.
 * @param {string} mimetype the image mimetype.
 * @param {object} JSON object of data with IP info
 */
function dataURIToBlob(dataURI, callback, data) {
    'use strict';

    var img, xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', dataURI, true);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        img =  this.response;
        
        callback(img, data);
        console.log("loaded: " + img);
    };

    xhr.send();
}

/**
 * Updates the browser icon from the provided blob object
 * @param {blob} blob representing the icon to set
 */
function updateExtensionIcon(dataBlob) {
    'use strict';
    
    var urlCreator, imageUrl, imgDetails;
    
    urlCreator = window.URL || window.webkitURL;
    imageUrl = urlCreator.createObjectURL(dataBlob);
    
    console.log(imageUrl);
    imgDetails = { path : imageUrl };
    chrome.browserAction.setIcon(imgDetails);
    
}

/**
 * calls the whatismyip.com JSON webservice to get the IP info
 * @param callback a function to call when the data is retrieved
 */
function callWebService(callback) {
    'use strict';
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ip-api.com/json", true);
    xhr.onreadystatechange = function () {
        var table_body, img, imgData, dataBlob, data;

        if (xhr.readyState === 4) {
            data = $.parseJSON(xhr.responseText);
            console.log(data);

            dataURIToBlob("https://www.whatismyip.com/images/flags/" + data.countryCode.toLowerCase() + ".png", callback, data);

        }
    };
    xhr.send();
}

/**
 * helper function for background tasks to call to retrieve web service details and update the extension icon
 */
function backgroundIconUpdater() {
    'use strict';
    
    callWebService(function (img, data) {
        updateExtensionIcon(img);
    });
}

/**
 * Helper function to create the alarm handler.
 */
function createAlarmHandler() {
    'use strict';
    console.log("setting up alarm");
    
    var alarmInfo = { when: Date.now(), periodInMinutes: 1 };

    chrome.alarms.create("background task", alarmInfo);
    
    chrome.alarms.onAlarm.addListener(function () {
        console.log("alarm handler called");
        backgroundIconUpdater();
    });
    
}

chrome.runtime.onStartup.addListener(function () {
    'use strict';
    console.log("starting up");
    createAlarmHandler();
});

chrome.runtime.onInstalled.addListener(function () {
    'use strict';
    console.log("installed up");
    createAlarmHandler();
});