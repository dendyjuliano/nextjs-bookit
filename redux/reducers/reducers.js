import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './room.reducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer
})

export default reducer