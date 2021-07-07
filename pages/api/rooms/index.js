import nc from 'next-connect'

import dbConnect from '../../../config/dbConnect'

import { AllRooms, newRoom } from '../../../controllers/roomControllers'

import onError from '../../../middlewares/errors'

const handler = nc({ onError })

dbConnect()

handler.get(AllRooms)
handler.post(newRoom)

export default handler