import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './room.reducers'
import { authReducer, userReducer, forgotPasswordReducer, loadedUserReducer } from './user.reducers'
import { checkBookingReducer, bookedDatesReducer } from './booking.reducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer
})

export default reducer