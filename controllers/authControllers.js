import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'

import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import sendEmail from '../utils/sendEmail'

import absoluteUrl from 'next-absolute-url'

import cloudinary from 'cloudinary'

import crypto from 'crypto'

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: true,
        message: 'Account register success'
    })
})

//Current user profile => /api/mee
const currentUserProfile = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})

//Update user profile => /api/me/update
const updateProfile = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name
        user.email = req.body.email

        if (req.body.password) user.password = req.body.password
    }

    //update avatar
    if (req.body.avatar !== '') {
        const image_id = user.avatar.publid_id

        //delete user previous image
        await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save()

    res.status(200).json({
        success: true
    })
})

//Forgot Password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // get origin 
    const { origin } = absoluteUrl(req)

    // Create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`

    const message = `Your password reset url is as follow : \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Book IT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpired = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }


})

//Reset password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler(`Password reset token is invalid or has been expired ${user}`, 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(`Password does not match ${req.body.password}`, 400))
    }

    // Setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpired = undefined

    await user.save()

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })
})

export {
    registerUser,
    currentUserProfile,
    updateProfile,
    forgotPassword,
    resetPassword
}