import Booking from '../models/booking'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

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
        paidAt: Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })
})

// Check room booking availability => /api/bookings/check
const checkRoomBooking = catchAsyncErrors(async (req, res) => {

    let { roomId, checkInDate, checkOutDate } = req.query

    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)

    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]
    })

    // Check if there is any booking available
    let isAvailable

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    })
})

// Check book dates of a room => /api/bookings/check-book-dates
const checkBookDates = catchAsyncErrors(async (req, res) => {

    const { roomId } = req.query

    const bookings = await Booking.find({ room: roomId })

    let bookedDates = []

    const timeDifference = moment().utcOffset() / 60

    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDifference, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate))
        const dates = Array.from(range.by('day'))
        bookedDates = bookedDates.concat(dates)
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
})

export {
    newBooking,
    checkRoomBooking,
    checkBookDates
}