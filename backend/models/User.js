const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    service: [{
        serviceName: { type: String },
        description: { type: String },
        offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }],
    location: {
        toleName: { type: String },
        ward: { type: String },
        city: { type:String },
        state: { type:String }
    },
    isSeller: { type: Boolean, default: false},
    reviews:[{
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        rating: Number,
        comment: String,
    }],
    additionalInfo: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String },
    phoneNo: { type: String },
});

module.exports = mongoose.model('User', userSchema)