const { Signup, Login,sendSMS, verifyOTP } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.post('/sendSMS',sendSMS)
router.post('/verifyOTP',verifyOTP)

module.exports = router;

/*
{
    "email": "testing@gmail.com",
    "password": "test_password",
    "mobile": "the_testing_guy"
}
*/