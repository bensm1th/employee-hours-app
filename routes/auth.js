const   express             = require('express'),
        router              = express.Router( {mergeParams: true} ),
        Authentication      = require('../controllers/authentication'),
        passportService     = require('../services/passport'),
        passport            = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, function(req, res) {
    res.send({ message: 'super secret code is ABC123'});
});
router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;