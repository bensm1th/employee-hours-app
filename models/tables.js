var mongoose        = require('mongoose');

var tableSchema = new mongoose.Schema({
    dates: Array,
    data: Array,
    comments: Array,
    salariedEmployees: Array
});

module.exports = mongoose.model('Table', tableSchema);