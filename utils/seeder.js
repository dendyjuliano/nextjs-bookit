const Room = require('../models/room')
const mongoose = require('mongoose')
const rooms = require('../data/rooms')

mongoose.connect('mongodb+srv://bookit_dendy:dendylords123@cluster0.nijfq.mongodb.net/bookit?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const seedRooms = async () => {
    try {
        await Room.deleteMany()
        console.log('rooms are deleted')

        await Room.insertMany(rooms)
        console.log('all rooms are added')

        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms()