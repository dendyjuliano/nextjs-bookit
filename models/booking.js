const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    daysOfStay: {
        type: Number,
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema)