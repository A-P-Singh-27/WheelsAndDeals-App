const mongoose = require('mongoose');


const carDetailsSchema = new mongoose.Schema({

    listingTitle: { type: String, required: true },
    tagline: { type: String },
    originalPrice: { type: String },
    sellingPrice: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    driveType: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    mileage: { type: Number, required: true },
    engineSize: { type: String },
    cylinder: { type: Number },
    color: { type: String, required: true },
    door: { type: Number, required: true },
    vin: { type: String },
    offerType: { type: String },
    listingDescription: { type: String, required: true, trim: true },
    features: [
        {
            title: { type: String, required: true },
            type: { type: Boolean, required: true },
        },
    ],
    createdby: { type: String, required: true },
    createdOn: { type: String, default: Date.now },
    username: { type: String, required: true, default: 'Anonunymous' },
    userImageUrl: {
        type: String, required: true,
        default: 'https://t3.ftcdn.net/jpg/01/91/01/78/360_F_191017886_YIfoLtRxVw8PIeAMtR0i4ZDwAyKutVI2.jpg'
    },
    imageUrls: {
        type: [String], // Array of strings for image URLs
        default: [] // Default is an empty array
    }

});

module.exports = mongoose.model('MyCarLists', carDetailsSchema);