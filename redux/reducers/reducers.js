import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, updateRoomReducer, roomReviewsReducer, reviewReducer } from './room.reducers'
import { authReducer, userReducer, forgotPasswordReducer, loadedUserReducer, allUsersReducer, userDetailsReducer } from './user.reducers'
import { checkBookingReducer, bookedDatesReducer, myBookingsReducer, bookingDetailsReducer, deleteBookingReducer } from './booking.reducers'

const reducer = combineReducers({
    auth: authReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    user: userReducer,

    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,

    newRoom: newRoomReducer,
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    updateRoom: updateRoomReducer,

    bookingDetails: bookingDetailsReducer,
    deleteBooking: deleteBookingReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    myBookings: myBookingsReducer,

    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    roomReviews: roomReviewsReducer,
    review: reviewReducer,
})

export default reducer