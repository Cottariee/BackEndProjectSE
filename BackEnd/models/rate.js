const mongoose = require('mongoose');

const RateSchema=new mongoose.Schema({
    rateContent: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    campground : {
        type: mongoose.Schema.ObjectId,
        ref: 'Campground',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=mongoose.model('Rate',RateSchema);