var mongoose        = require('mongoose');

var hoursSchema = new mongoose.Schema({
    periodLength: Number,
    periodString: String,
    periodStart: Date,
    periodEnd: Date,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    } 
});

module.exports = mongoose.model('Hours', hoursSchema);