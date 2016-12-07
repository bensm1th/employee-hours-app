const   User        = require('../models/user'),
        jwt         = require('jwt-simple');
        
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id }, process.env.SECRET);
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'ed, we just need to give them a token
    // we have access to the user through req.user.  Remember, this is just a callback function to the express route.
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }
    // See if user with given email exists
    User.findOne({ email }, function(err, existingUser) {
        if (err) { return next(err) }
        // if a user with email does exist, return an error
        if (existingUser) {
            const error = {error: 'Email is in use'}
            return res.status(422).send(error);
        }
         // if a user with email does not exist, create and save user record
         const user = new User({
             email,
             password
         });
         user.save(function(err) {
             if(err) {return next(err)};
             // respond to request indicating user was created
             res.json({ token: tokenForUser(user) });
         });
    });
}