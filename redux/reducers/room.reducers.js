import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAIL,
    CLEAR_ERRORS,
    ROOMS_DETAILS_SUCCESS,
    ROOMS_DETAILS_FAIL
} from '../constants/roomConstans'

// all rooms reducers

export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.rooms
            }

        case ALL_ROOMS_FAIL:
            return {
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}

// detail rooms reducers
export const roomDetailsReducer = (state = { rooms: {} }, action) => {
    switch (action.type) {
        case ROOMS_DETAILS_SUCCESS:
            return {
                room: action.payload
            }

        case ROOMS_DETAILS_FAIL:
            return {
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}