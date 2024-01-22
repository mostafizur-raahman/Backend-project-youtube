import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;


    if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fileds are required")
    }
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) throw new ApiError(409, "User email or username already exists.");

    //multer
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required.");

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    if (!createdUser) throw new ApiError(500, "Something went wrong while register the user");

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User register successfully.")
    )
})

export { registerUser }