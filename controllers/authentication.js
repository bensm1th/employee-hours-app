const   User        = require('../models/user'),
        jwt         = require('jwt-simple');
        
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id }, process.env.SECRET);
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'ed, we just need to give them a token
    // we have access to the user through req.user.  Remember, this is just a callback function to the express route.
    res.send({ token: tokenForUser(req.user), id: req.user._id });
}

exports.ownerSignin = function(req, res, next) {
    res.send({ ownerToken: tokenForUser(req.user), id: req.user._id });
}

exports.signup = function(req, res, next) {
    console.log('============== req.body ===============');
    console.log(req.body);
    const { email, password, firstName, lastName, 
        employeeNumber, address, phone, DOB, sickDaysLeft, 
        vacationDaysLeft, hourlyPay, salary} = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }
    // See if user with given email exists
    User.findOne({ email }, function(err, existingUser) {
        if (err) { return next(err) }
        // if a user with email does exist, return an error
        if (existingUser || req.body.secret !== process.env.SECRET) {
            const error = {error: 'There were errors'}
            return res.status(422).send(error);
        }
         // if a user with email does not exist, create and save user record
        const user = new User({ 
            email, password, firstName, lastName, 
            employeeNumber, address, phone, DOB, sickDaysLeft, 
            vacationDaysLeft, hourlyPay, salary});

        user.save(function(err) {
            if(err) {return next(err)};
            // respond to request indicating user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}

exports.ownerSignup = function(req, res, next) {
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
         
         if ( req.body.secret === process.env.SECRET ) {
            user.role = 'Owner'; 
            user.save(function(err) {
                if(err) {return next(err)};
                // respond to request indicating user was created
                return res.json({ ownerToken: tokenForUser(user) });
            });
        }
        if ( req.body.secret !== process.env.SECRET ) {
            const error = {error: 'Incorrect secret'}
            return res.status(422).send(error);
        }        
    });
}