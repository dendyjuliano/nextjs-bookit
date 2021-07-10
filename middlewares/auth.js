import catchAsycErrors from './catchAsyncErrors'
import ErrorHandler from '../utils/errorHandler'
import { getSession } from 'next-auth/client'

const isAuthenticatedUser = catchAsycErrors(async (req, res, next) => {

    // getSession gets auth-token from req.headers
    const session = await getSession({ req })

    if (!session) {
        return next(new ErrorHandler('Login first to access this resource', 401))
    }

    req.user = session.user
    next()
})

export {
    isAuthenticatedUser
}