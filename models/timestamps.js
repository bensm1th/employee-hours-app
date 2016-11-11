var mongoose        = require('mongoose');

var timestampSchema = new mongoose.Schema({
    time: Date,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    inappropriate: { type: Boolean, default: false },
    //if true, it's a login, if false, a logout'
    logIn:  Boolean
});

module.exports = mongoose.model('Timestamp', timestampSchema);