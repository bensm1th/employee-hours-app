const   mongoose        = require('mongoose'),
        Schema          = mongoose.Schema,
        bcrypt          = require('bcrypt-nodejs');

// Define our model
// I need lowercase: true, so that case insensitive emails are that are the same are recognized as different: ben@gmail.com, BEN@gmail.com
const userSchema = new Schema({
    email: { 
        type: String, 
        unique: true, 
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Manager', 'Owner'],
        default: 'Manager'
    },
    firstName: String,
    lastName: String,
    employeeNumber: Number,
    address: String,
    phone: String,
    DOB: Date,
    sickDaysLeft: Number,
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
});
    
// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
    //get access to the user model
    const user = this;

    //generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            //overwrite plaintext password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
