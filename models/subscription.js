const mongoose = require('mongoose');

const subsriberSchema = {
    email: {
        type: String,
        required: true
    }
};

const Subscriber = mongoose.model('subscriber', subsriberSchema);
module.exports = Subscriber;