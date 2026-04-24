const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            default: '/images/default-service.jpg'
        },
        price: {
            type: Number,
            default: 0
        },
        duration: {
            type: String,
            default: '1 hour'
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
