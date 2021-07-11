import Booking from '../models/booking'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// Create new Booking => /api/bookings

const newBooking = catchAsyncErrors(async (req, res) => {

    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo
    } = req.body

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        amountPaid,
        daysOfStay,
        paymentInfo,
    })

    res.status(200).json({
        success: true,
        booking
    })
})

export {
    newBooking
}