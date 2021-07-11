import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './room.reducers'
import { authReducer, userReducer, forgotPasswordReducer, loadedUserReducer } from './user.reducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
})

export default reducer