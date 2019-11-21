const UserModel = require('../models/UserSchema');
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require('../utils/errorResponse');

exports.login = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorResponse("Please provide ab email and password", 400));
  }

    const findUser = await UserModel.findOne({ email }).select("+password");

    if(!findUser) {
      return next(new ErrorResponse("Invalid credentials: user doesn't exist", 401));
    }
    
    const isMatch = await findUser.validatePassword(password);
    if(!isMatch) {
      return next(new ErrorResponse("Invalid credentials: wrong password", 401));
    }

    sendTokenResponse(findUser, 200, res);
})

exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password
    });
    sendTokenResponse(newUser, 200, res);
})

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode)
  .cookie("token", token, options)
  .json({ success: true, token });
}