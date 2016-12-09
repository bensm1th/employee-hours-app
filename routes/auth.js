const   express             = require('express'),
        router              = express.Router( {mergeParams: true} ),
        Authentication      = require('../controllers/authentication'),
        passportService     = require('../services/passport'),
        passport            = require('passport');

const requireAuth = passport.authenticate('manager_jwt', { session: false });
const requireSignin = passport.authenticate('manager_local', { session: false });
const requireOwner = passport.authenticate('owner_jwt', {session: false});
const requireOwnerSignin = passport.authenticate('owner_local', {session: false});

router.get('/', requireAuth, function(req, res) {
    res.send({ message: 'super secret code is ABC123'});
});

router.post('/signup', requireOwner, Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);
router.post('/tlcowner/signin', requireOwnerSignin, Authentication.ownerSignin);
router.post('/tlcowner/signup', Authentication.ownerSignup)
router.get('/tlcowner', requireOwner, function(req, res) {
    res.send({ message: 'OWNER MANAGEMENT TOOLS' });
})

module.exports = router;