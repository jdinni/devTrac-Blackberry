// invoked when application is resumed (brought to foregroud)
function doResume() {
    console.log('doResume()');
}

// invoked when application is paused (sent to background)
function doPause() {
    console.log('doPause()');
}

// register PhoneGap event listeners when DOM content loaded
function init() {
    console.log('init()');
    document.addEventListener("resume", doResume, false);
    document.addEventListener("pause", doPause, false);
}

function unload() {
    console.log('unload()');
}

function fail(error) {
    navigator.notification.alert(error, null, "Error");
}

function callService(dataString, callback) {
    var response;
    $.ajax({
        type: 'POST',
        url: 'http://test.devtrac.org/services/json',
        data: dataString,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: callback,
        error: function(data) {
            fail(data.responseText);
        }
    });
}

function alert(message, callback, title) {
    navigator.notification.alert(message, callback, title);
}

function debug(message) {
    navigator.notification.alert(message, null, "Debug");
}

function performLogin() {
    var userName = $("#username").val();
    var password = $("#password").val();
    debug("Username: " + userName);
    debug("Password: " + password);
    callService('method=system.connect', function(data) {
        var sessionId = data['#data']['sessid'];
        debug("SessionID: " + sessionId);
        var data = {
            method: 'user.login',
            sessid: sessionId,
            username: userName,
            password: password
        }
        callService(data, function(data) {
            debug(data['#data']['sessid']);
        });
    });

}

