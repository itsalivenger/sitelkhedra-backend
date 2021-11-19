let mongoose = require('mongoose');

let clientHistorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    order: {
        type: Array,
        required: true
    }
}, { timestamps: true });

let ClientHistory = mongoose.model('history', clientHistorySchema);

module.exports =  ClientHistory;