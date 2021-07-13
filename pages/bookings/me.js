
import React from 'react'
import { getSession } from 'next-auth/client'

import MyBooking from '../../components/booking/Mybookings'
import Layout from '../../components/layout/Layout'

import { myBookings } from '../../redux/actions/booking.actions'
import { wrapper } from '../../redux/store'

const MyBookingsPage = () => {
    return (
        <Layout title='My Bookings'>
            <MyBooking />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))

})

export default MyBookingsPage