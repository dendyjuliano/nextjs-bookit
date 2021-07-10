import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './room.reducers'
import { authReducer, userReducer } from './user.reducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer
})

export default reducer