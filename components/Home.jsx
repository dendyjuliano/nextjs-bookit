import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

import RoomItem from './room/RoomItem';
import { clearErrors } from '../redux/actions/room.actions'

const Home = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } = useSelector(state => state.allRooms)

    let { location, page = 1 } = router.query
    page = Number(page)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [])

    const handlePagination = (pageNumber) => {
        window.location.href = `/?page=${pageNumber}`
    }

    let count = roomsCount
    if (location) {
        count = filteredRoomsCount
    }

    return (
        <>
            <section id="rooms" class="container mt-5">

                <h2 class='mb-3 ml-2 stays-heading'>
                    {location ? `Rooms in ${location}` : 'All Rooms'}
                </h2>

                <Link href='/search'>
                    <a class='ml-2 back-to-search'> <i class='fa fa-arrow-left'></i> Back to Search</a>
                </Link>

                <div class="row">
                    {rooms && rooms.length === 0 ?
                        <div className="alert alert-danger mt-5 w-100">
                            <b>No Room exist</b>
                        </div>
                        :
                        rooms && rooms.map(room => (
                            <RoomItem key={room._id} room={room} />
                        ))
                    }
                </div>
            </section>
            {resPerPage < count &&
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={handlePagination}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            }
        </>
    )
}

export default Home