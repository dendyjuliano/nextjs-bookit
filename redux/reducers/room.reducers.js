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

    UPDATE_ROOM_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_RESET,
    UPDATE_ROOM_SUCCESS,

    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_RESET,
    DELETE_ROOM_FAIL,

    ADMIN_ROOMS_FAIL,
    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
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
                rooms: action.payload
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

export const updateRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST:
        case DELETE_ROOM_REQUEST:
            return {
                loading: true,
            }

        case UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ROOM_RESET:
            return {
                success: false
            }

        case DELETE_ROOM_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case UPDATE_ROOM_FAIL:
        case DELETE_ROOM_FAIL:
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

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return {
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
