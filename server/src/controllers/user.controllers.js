import { Users } from "../models/user.models.js"
import jwt from "jsonwebtoken"
import { REFRESH_SECRET_TOKEN } from "../../constants.js"

const userSignIn = async (req, res, next) => {
    try {
        const { 
            firstname, 
            lastname, 
            username, 
            email, 
            password,
        } = req.body

        const usernameExits = await Users.findOne({ $or: [{ username }, { email }]})
        
        if (usernameExits) {
            throw new Error("User already exits. Check if username or email already exists.");
        }

        const data = await Users.create({
            firstname,
            lastname,
            email,
            username,
            password,
        })

        res.status(200).json({
            status: 200,
            message: "User registered successfully.",
            success: true,
            data: data
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            message: error.message,
            success: false
        })
    }
}

const generateRefreshAndAccessTokens = async (userID) => {
    const user = await Users.findById(userID)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
}

const userLogIn = async (req, res, next) => {
    try {
        const {
            username,
            email, 
            password
        } = req.body 

        // we need either username or email
        if (!(username || email)) {
            throw new Error("Username or Email is required."); 
        }

        // find the user in database based on email or username
        const user = await Users.findOne({
            $or: [{ username }, { email }]
        })
        
        if (!user) {
            throw new Error("User dosen't exist.");
        }      

        const isPasswordVallid = await user.isPasswordCorrect(password)


        if (!isPasswordVallid) {
            throw new Error("Password is not vallid");
        }
        
        // generare access and refresh tokesn
        const { accessToken, refreshToken } = await generateRefreshAndAccessTokens(user._id)

        const logedInUser = await Users.findById(user._id)

        const cookie_options = {
            httpOnly : true,
            secure : true,
        }

        res
        .status(200)
        .cookie('ACCESS_TOKEN', accessToken, cookie_options)
        .cookie('REFRESH_TOKEN', refreshToken, cookie_options)
        .json({
            status: 200,
            success: true,
            message: "User logged in successfully.",
            data: logedInUser
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

const userLogOut = async (req, res, next) => {
    try {
        const { refresh_token } = req.body

        if (!refresh_token) {
            throw new Error("USER IS NOT LOGGED IN");
        }

        const decodedToken = jwt.decode(refresh_token, REFRESH_SECRET_TOKEN)

        const user = await Users.findByIdAndUpdate(decodedToken._id , { $unset: { refreshToken: 1 } }, { new: true }).select("-password")

        const cookie_options = {
            httpOnly : true,
            secure : true
        }

        res
        .status(200)
        .clearCookie('ACCESS_TOKEN', cookie_options)
        .clearCookie('REFRESH_TOKEN', cookie_options)
        .json({
            status: 200,
            success: true,
            message: "User logged out successfully",
            data: user
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

const refreshRefreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.cookies?.REFRESH_TOKEN

        if (!refresh_token) {
            throw new Error("User not logged in.");
        }

        // decode the refresh token 

        const decodedToken = jwt.decode(refresh_token, REFRESH_SECRET_TOKEN)

        if (!decodedToken) {
            throw new Error("Invallid refresh token.");
        }

        console.log(decodedToken);
        

        // get the user
        const user = await Users.findById(decodedToken._id)

        console.log(user);
        

        if (!user) {
            throw new Error("Invallid refresh token [2]")
        }

        console.log(user)

        // generate new access and refresh tokens 
        const { accessToken, refreshToken } = await generateRefreshAndAccessTokens(decodedToken._id)

        const user_data = await Users.findById(decodedToken._id).select("-password")

        console.log(user_data)

        const cookie_options = {
            httpOnly : true,
            secure : true
        }

        res.status(200)
        .cookie('ACCESS_TOKEN', accessToken, cookie_options)
        .cookie('REFRESH_TOKEN', refreshToken, cookie_options)
        .json({
            status: 200,
            success: true,
            message: "Access token refreshed successfully.",
            data: user_data
        })  

    } catch (error) {

        console.log(error)

        res.status(401).json({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const {refresh_token} = req.body

        if (!refresh_token) {
            throw new Error("User not logged in.");
            
        }

        const decodedToken = jwt.decode(refresh_token, REFRESH_SECRET_TOKEN)
                
        const user = await Users.findById(decodedToken._id).select("-password -refreshToken")

        res.status(200).json({
            status: 200,
            success: true,
            message: "Current user fetched successfully.",
            data: user
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find()

        res.status(200).json({
            status: 200,
            success: true,
            message: "All users successfully.",
            data: users
        })

    } catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: error.message
        })
    }
}

export { userSignIn, userLogIn, refreshRefreshToken, userLogOut, getCurrentUser, getAllUsers }