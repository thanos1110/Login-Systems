const User = require("../Models/UserModel");
const OTP = require("../Models/OTPModel");

const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");


const twilio = require('twilio');
const authToken = '5cc15248a522e58f0aac35d34fa2a99a';
const accountSid = 'AC12b2e0653e36549cf3d2c85c4b4c0637';
const client = twilio(accountSid, authToken);

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password, mobile, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password, mobile, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true });
    next()
  } catch (error) {
    console.error(error);
  }
};

module.exports.sendSMS = async (req, res, next) => {
  try {
    // Genrate random 4 digit OTP
    const otp = Math.floor(Math.random() * 9000 + 1000);
    const { mobile } = req.body;
    //Save it to db with user mob
    const df = await OTP.deleteMany({ mobile })
    const otpData = await OTP.create({ mobile, otp });
    //Send in SMS.
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+18156579317',     // Replace with your Twilio phone number
      to: `+91${mobile}`, // Replace with the recipient's phone number
    });
    res.status(201).json({ status: true, message: 'OTP sent', success: true })
    next()
  } catch (error) {
    console.error('Your Error:', error);
  }
};

//When user enters OTP call this func
module.exports.verifyOTP = async (req, res, next) => {
  // check if user entered number and OTP in db matches , if true -> sucesss else error.
  try {
    const { mobile, otp } = req.body;
    var verified = false;
    const otpData = await OTP.findOne({ mobile });
    const user = await User.findOne({ mobile });
    if (user) {
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      console.log('user', user, mobile, token);

    }
    if (otpData && otp == otpData?.otp) {
      verified = true
    }

    res.status(201).json({ status: true, message: otp, success: true, verified })
    next()
  } catch (e) {
    res.status(400).json({ status: false, message: 'Error:' + e, success: false })
  }
}