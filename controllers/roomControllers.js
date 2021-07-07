import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import ApiFeatures from '../utils/apiFeatures'

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
        // res.status(400).json({
        //     success: false,
        //     error: 'room not found with this id'
        // })
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
        // res.status(400).json({
        //     success: false,
        //     error: 'room not found with this id'
        // })
        return next(new ErrorHandler('room not found with this id', 404))
    }

    await rooms.remove()

    res.status(200).json({
        success: true,
        message: 'room remove successfully'
    })

})

export {
    AllRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}