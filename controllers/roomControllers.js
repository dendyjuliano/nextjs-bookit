import Room from '../models/room'
import Booking from '../models/booking'
import ErrorHandler from '../utils/errorHandler'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import ApiFeatures from '../utils/apiFeatures'


import cloudinary from 'cloudinary'


// Get single room => /api/rooms/:id

const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
    const rooms = await Room.findById(req.query.id)

    if (!rooms) {
        // res.status(400).json({
        //     success: false,
        //     error: 'room not found with this id'
        // })
        return next(new ErrorHandler('room not found with this id', 404))
    }

    res.status(200).json({
        success: true,
        rooms
    })

})

// Get all room => /api/rooms/:id

const AllRooms = catchAsyncErrors(async (req, res) => {

    const resPerPage = 4
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new ApiFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query

    apiFeatures.pagination(resPerPage)
    rooms = await apiFeatures.query
    let filteredRoomsCount = rooms.length

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })

})

// Create new room => /api/rooms

const newRoom = catchAsyncErrors(async (req, res) => {

    const images = req.body.images

    let imagesLink = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/rooms',
            width: '150',
            crop: 'scale'
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.user = req.user._id

    const room = await Room.create(req.body)

    res.status(200).json({
        success: true,
        room
    })
})

// Update single room => /api/rooms/:id

const updateRoom = catchAsyncErrors(async (req, res) => {
    let rooms = await Room.findById(req.query.id)

    if (!rooms) {
        return next(new ErrorHandler('room not found with this id', 404))
    }

    rooms = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        rooms
    })

})

// Delete single room => /api/rooms/:id

const deleteRoom = catchAsyncErrors(async (req, res) => {
    let rooms = await Room.findById(req.query.id)

    if (!rooms) {
        return next(new ErrorHandler('room not found with this id', 404))
    }

    await rooms.remove()

    res.status(200).json({
        success: true,
        message: 'room remove successfully'
    })

})


// Create new review => /api/reviews
const createRoomReview = catchAsyncErrors(async (req, res) => {

    const { rating, comment, roomId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const room = await Room.findById(roomId)

    const isReviewed = room.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        room.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment,
                    review.rating = rating
            }
        })
    } else {
        room.reviews.push(review)
        room.numOfReviews = room.reviews.length
    }

    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length

    await room.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

})

// Check Review Availability => /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {

    const { roomId } = req.query

    const bookings = await Booking.find({ user: req.user._id, room: roomId })

    let isReviewAvailable = false
    if (bookings.length > 0) isReviewAvailable = true

    res.status(200).json({
        success: true,
        isReviewAvailable
    })

})

// Get all rooms - ADMIN => /api/admin/rooms
const allAdminRooms = catchAsyncErrors(async (req, res) => {

    const rooms = await Room.find()

    res.status(200).json({
        success: true,
        rooms
    })

})

export {
    AllRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkReviewAvailability,
    // Admin
    allAdminRooms
}