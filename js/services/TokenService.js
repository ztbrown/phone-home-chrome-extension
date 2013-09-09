TokenService = (function (_) {

    var TokenService = {

        set: function (profile) {
            // Store the properties in localStorage.
            _.each(profile, function (value, key) {
                window.localStorage.setItem('PhoneHome.profile.' + key, value);
            });
        },

        get: function (property) {
            // Return the property from localStorage.
            return window.localStorage.getItem('PhoneHome.profile.' + property);
        },

        createSession: function (authToken) {
            if (!_.isEmpty(authToken)) {
                // Store the properties in the Common namespace for easy access.
                Common.authToken = authToken;

                // Store the properties in local storage for later.
                TokenService.set({ authToken: authToken });

                return true;
            } else {
                return false;
            }
        },

        restoreSession: function () {
            return TokenService.createSession(
                TokenService.get('authToken')
            );
        },

        destroySession: function () {
            // Clear the local-storage.
            window.localStorage.clear();
        }

    };

    return TokenService;

}(_));