import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                dbConnect()

                const { email, password } = credentials

                //check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password')
                }

                // find user in database
                const user = await User.findOne({ email }).select('+password')

                if (!user) {
                    throw new Error('Invalid email or password')
                }

                //check if password is correct or not
                const isPasswordMatch = await user.comparePassword(password)

                if (!isPasswordMatch) {
                    throw new Error('Invalid email or password 2')
                }

                return Promise.resolve(user)
            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async (session, user) => {
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})