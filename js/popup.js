// Popup UI Handlers:

$(function () {
  console.log("document ready");

      $("#submit").click(function () {

        AuthenticationService.authenticate(
            $('#email').val(),
            $('#password').val()
        ).done(saveDone).fail(failDone);

      });

        function saveDone(data){
           // TokenService.createSession(data.auth_token);
            var port = chrome.runtime.connect({name: "popup"});
            port.postMessage({name: "auth_token", auth_token: data.auth_token});

        };

        function failDone(data, msg, error){
            console.log(data)
            console.log(msg)
            console.log(error)
        };

});
