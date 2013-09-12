TrackerService = (function ($, _) {

    var TrackerService = {

        create: function (name) {
            return $.ajax({
                type: 'POST',
                url: Common.buildUrl('trackers'),
                dataType: 'json',
                data: {
                    'auth_token': Common.authToken,
                    'tracker' : {name: name}
                }
            });
        },

        activate: function(id){
            return $.ajax({
                type: 'PUT',
                url: Common.buildUrl('trackers/' + id + '/activate'),
                dataType: 'json',
                data: {
                    'auth_token': Common.authToken
                }
            });
        }
    };

    return TrackerService;
}(jQuery, _));