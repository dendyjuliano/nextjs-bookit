import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAIL,

    CLEAR_ERRORS,

    ROOMS_DETAILS_SUCCESS,
    ROOMS_DETAILS_FAIL,

    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,

    REVIEW_AVAILABILITY_FAIL,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,

    NEW_ROOM_FAIL,
    NEW_ROOM_REQUEST,
    NEW_ROOM_RESET,
    NEW_ROOM_SUCCESS,

    ADMIN_ROOMS_FAIL,
    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,
} from '../constants/roomConstans'

// all rooms reducers

export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ADMIN_ROOMS_REQUEST:
            return {
                loading: true
            }

        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.rooms
            }

        case ADMIN_ROOMS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload.rooms
            }

        case ALL_ROOMS_FAIL:
        case ADMIN_ROOMS_FAIL:
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

// new review reducers
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                success: false
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}

// new room reducers
export const newRoomReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case NEW_ROOM_REQUEST:
            return {
                loading: true,
            }

        case NEW_ROOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.room,
            }

        case NEW_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_ROOM_RESET:
            return {
                success: false
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}

// GET review reducers
export const checkReviewReducer = (state = { reviewAvailable: null }, action) => {
    switch (action.type) {
        case REVIEW_AVAILABILITY_REQUEST:
            return {
                loading: true,
            }

        case REVIEW_AVAILABILITY_SUCCESS:
            return {
                loading: false,
                reviewAvailable: action.payload
            }

        case REVIEW_AVAILABILITY_FAIL:
            return {
                loading: false,
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