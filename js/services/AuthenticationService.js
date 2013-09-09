AuthenticationService = (function ($, _) {

    var AuthenticationService = {

        authenticate: function (email, password) {
            if (_.isEmpty(email) || _.isEmpty(password)) {
                return $.Deferred().reject().promise();
            } else {
                return $.ajax({
                    type: 'POST',
                    url: Common.buildUrl('tokens'),
                    dataType: 'json',
                    data: {
                        email: email,
                        password: password
                    }
                });
            }
        }

    };

    return AuthenticationService;
}(jQuery, _));