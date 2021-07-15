import nc from 'next-connect'

import dbConnect from '../../../config/dbConnect'

import { AllRooms, newRoom } from '../../../controllers/roomControllers'

import onError from '../../../middlewares/errors'

import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler.get(AllRooms)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(newRoom)

export default handler