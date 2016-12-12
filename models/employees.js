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
    hourlyPay: { 
        applies: {
            type: Boolean,
            default: false
                    }, 
        rate: Number
        },
    salary: { 
        applies: {
            type: Boolean,
            default: false
                    }, 
        monthlyRate: Number
        },
    currentlyWorking: Boolean,
    comments: Array
});

module.exports = mongoose.model('Employee', employeeSchema);
