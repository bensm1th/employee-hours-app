var express             = require('express'),
    router              = express.Router( {mergeParams: true} ),
    mongoose            = require('mongoose'),
    User                = require('../models/user'),
    Authentication      = require('../controllers/authentication'),
    passportService     = require('../services/passport'),
    passport            = require('passport'),
    OWNER_ROUTE         = '/tlcowner';

const requireOwner = passport.authenticate('owner_jwt', {session: false});

// RESTful routes

//index
router.get(OWNER_ROUTE, requireOwner, function(req, res) {
    User.find({}, function(err, managers) {
        if (err) console.log(err);
        res.send({managers});
    })
})

//edit
router.put(`${OWNER_ROUTE}/:user_id`, requireOwner, function(req, res) {
    // console.log('============== req.body ===================');
    // console.log(req.body);
    User.findByIdAndUpdate(req.params.user_id, req.body, {new: true}, function(err, manager) {
        // console.log('============== updated Manager ===================');
        // console.log(manager);
        if (err) console.log(err);
        else {
            res.send({manager});
        }
    })
});
//create
//show

//destroy
router.delete(`${OWNER_ROUTE}/:user_id`, requireOwner, function(req, res) {
    User.findByIdAndRemove(req.params.user_id, function(err, user) {
        if (err) console.log(err);
        res.send('user deleted');
    })
});
module.exports = router;
