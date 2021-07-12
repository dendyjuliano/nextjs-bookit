import {
    CHECK_BOOKING_FAIL,
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_SUCCESS,

    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,

    CLEAR_ERRORS,
} from '../constants/bookingConstans'

import axios from 'axios'

// Check Room Booking
export const checkBooking = (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
        dispatch({ type: CHECK_BOOKING_REQUEST })

        let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

        const { data } = await axios.get(link)

        dispatch({
            type: CHECK_BOOKING_SUCCESS,
            payload: data.isAvailable
        })
    } catch (error) {
        dispatch({
            type: CHECK_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Room Dates
export const getBookedDates = (id) => async (dispatch) => {
    try {

        const { data } = await axios.get(`/api/bookings/check-book-dates?roomId=${id}`)

        dispatch({
            type: BOOKED_DATES_SUCCESS,
            payload: data.bookedDates
        })
    } catch (error) {
        dispatch({
            type: BOOKED_DATES_FAIL,
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
