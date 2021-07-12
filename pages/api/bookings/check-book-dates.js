import nc from 'next-connect'

import dbConnect from '../../../config/dbConnect'

import { checkBookDates } from '../../../controllers/bookingControllers'

import onError from '../../../middlewares/errors'

const handler = nc({ onError })

dbConnect()

handler.get(checkBookDates)

export default handler