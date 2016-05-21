/*globals $, chrome, console, Uint8Array */

// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    'use strict';
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {

        var tab, url;

        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        console.log(tabs[0].title);
        tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        url = tab.url;

        console.log("url: " + url);
        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url === 'string', 'tab.url should be a string');

        callback(url);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function updateImg(dataBlob, data) {
    'use strict';

    var img, table_body;
    
    // https://www.whatismyip.com/images/flags/se.png
    img = "<img id=\"flagImg\" src=\"https://www.whatismyip.com/images/flags/" + data.countryCode.toLowerCase() + ".png\"/>";

    table_body = img;
    $.each(data, function (k, v) {
        console.log(table_body);
        table_body += "<tr><td>" + k + "</td><td><b>" + v + "</b></td></tr>";
    });
    $("#GeoResults").html(table_body);
    
    updateExtensionIcon(dataBlob);
}

function createTable() {
    'use strict';

    $().fadeIn(2000);

    callWebService(updateImg);
}


document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    console.log("getting started");

    getCurrentTabUrl(function (url) {

        console.log("creating table");

        createTable();

    }, function (errorMessage) {
        console.log('Error: ' + errorMessage);
    });
});





