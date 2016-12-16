var mongoose        = require('mongoose');

var tableSchema = new mongoose.Schema({
    dates: Array,
    data: Array,
    comments: Array,
    salariedEmployees: Array,
    approved: {
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        status: {
            type: Boolean,
            default: false
            }
        },
    finalized: {
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        status: {
            type: Boolean,
            default: false
            }
        },
    createdBy: Object
});

module.exports = mongoose.model('Table', tableSchema);