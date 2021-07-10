import React from 'react';
import { getSession } from 'next-auth/client'

import Layout from "../../components/layout/Layout"
import Profile from "../../components/user/Profile"

const UpdateProfilePage = () => {
    return (
        <Layout title='update profile'>
            <Profile />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}

export default UpdateProfilePage