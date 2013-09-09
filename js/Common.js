Common = (function () {

    var Common = {
        buildUrl: function (path) {
            //return 'http://b2io-phone-home.herokuapp.com/api/v1/' + path;
            return 'http://localhost:3000/api/v1/' + path;
        },

        userType: '',
        authToken: '',
        deviceId: '',

        ProductRequests: null,

        Brands: null
    };


    return Common;

}());