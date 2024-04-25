import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponsse.js"

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation not empty
    //check if account already exists:  username , email
    //check for images,check for coverImages
    //upload them to cloudinary,avatar.
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const {fullName, email, password, username}= req.body
    console.log("email:-",email);

    // if(fullName===""){
    //    throw new ApiError(400,"fullname is required")
    // }

    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"all fields are required")
    }

    User.findOne({
        $or:[{username},{email}]
    })
    if(existUser){
        throw new ApiError(409,"user name with email or username already exist")
    }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

  const avatar =  await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400,"Avatar file is required")
  }

  const user = User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"somthing went wrong while registering a user")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
  )
})

export {registerUser}