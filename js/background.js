// Called when the url of a tab changes.
function checkForValidUrl (tabId, changeInfo, tab) {

    chrome.pageAction.show(tabId);

};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

$(function () {
    TokenService.restoreSession();

    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name == "content_script");
        port.onMessage.addListener(function(msg) {
            console.log(msg)
            if (msg.message == "create_tracker")
                TrackerService.create().success(function(data){
                    port.postMessage({message: "createsuccess", id:data.id})
                });
            else if (msg.message == "activate_tracker")
                TrackerService.activate(msg.id).success(function(data){
                    port.postMessage({message: "activated", url: ("http://b2io-phone-home.herokuapp.com/images/" + data.token)})
                })
        });
    });

    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name == "popup");
        port.onMessage.addListener(function(msg) {
            if (msg.name == "auth_token")
                TokenService.createSession(msg.auth_token);
        });
    });


});