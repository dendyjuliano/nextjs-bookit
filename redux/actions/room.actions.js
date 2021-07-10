import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAIL,
    ROOMS_DETAILS_SUCCESS,
    ROOMS_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/roomConstans'

import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

// Get all Rooms
export const getRooms = (req, currentPage = 1, location = '', guests, category) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)

        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`
        if (guests) link = link.concat(`&guestCapacity=${guests}`)
        if (category) link = link.concat(`&category=${category}`)

        const { data } = await axios.get(link)
        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all Rooms

export const getRoomDetail = (req, id) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)
        const { data } = await axios.get(`${origin}/api/rooms/${id}`)
        dispatch({
            type: ROOMS_DETAILS_SUCCESS,
            payload: data.rooms
        })
    } catch (error) {
        dispatch({
            type: ROOMS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}