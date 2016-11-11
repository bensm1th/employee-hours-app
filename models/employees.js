
var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    employeeNumber: Number,
    address: String,
    phone: String,
    DOB: Date,
    sickDaysLeft: String,
    vacationDaysLeft: Number,
    hourlyPay: { applies: Boolean, rate: Number},
    salary: { applies: Boolean, rate: Number},
    currentlyWorking: Boolean
});

module.exports = mongoose.model('Employee', employeeSchema);
