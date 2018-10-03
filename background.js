// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/*
    add menu item on content page
*/
// The onClicked callback function.
function addBTCValueToBox(info, tab) {
  // if (info.menuItemId == "contextselection") {
  console.log("info: " + JSON.stringify(info));

  //for sending a message
  chrome.extension.onConnect.addListener(function(port) {
    
    console.log("Connected .....");
    // check selection text can be converted into digit
    if (parseFloat(info.selectionText)) {
      
      port.onMessage.addListener(function(msg) {
        console.log("message recieved " + msg);
        const requestParams = { type: info.menuItemId, value: info.selectionText };

        port.postMessage(JSON.stringify(requestParams));
      });

    }

  });
  // }
};

// add event when right-clicking item
chrome.contextMenus.onClicked.addListener(addBTCValueToBox);

/*
  initialize the app
*/
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  // Create one test item for each context type.
  var contexts = ["selection"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var addTitle = "Add value to box";
    var removeTitle = "Remove value to box";

    var addMenu = chrome.contextMenus.create({"title": addTitle, "contexts":[context],
                                        "id": "add"});
    var removeMenu = chrome.contextMenus.create({"title": removeTitle, "contexts":[context],
                                        "id": "remove"});
  }
});

//for listening any message which comes from runtime
chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg) {
   // Do your work here
   console.log('Background receive: ', msg);
}
