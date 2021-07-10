import Layout from "../../components/layout/Layout"
import RoomDetails from "../../components/room/RoomDetails"

import { getRoomDetail } from '../../redux/actions/room.actions'
import { wrapper } from '../../redux/store'

export default function RoomDetailsPage() {
    return (
        <Layout>
            <RoomDetails />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    await store.dispatch(getRoomDetail(req, params.id))
})
