var redis = require('redis');
var Treasury = require('treasury');
var cacheClient = redis.createClient();
var treasury = new Treasury({client: cacheClient});
var User = User || {};

module.exports = {
    testit: function(req, res) {
        var params = req.allParams();
        var id = params.id;

        treasury.invest(User.find.bind(User, id), {id: id})
            .then(function(modelData) {
                console.log('treasury.invest found data:', modelData);
                res.ok(modelData);
            })
            .catch(function(error) {
                console.log('treasury.invest could not find data, err', error);
                res.serverError(error);
            });
    }
};
