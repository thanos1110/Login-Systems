import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReCaptchaComponent from './ReCaptchaComponent';


const Login = () => {
  const captchaRef = useRef(null)
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [inputValueNew, setInputValueNew] = useState({
    mobile: "",
    otp: "",
  });
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(null);
  const [otpPage, setotpPage] = useState(false);


  const { email, password } = inputValue;
  const { mobile, otp } = inputValueNew;
  const [otpSent, setotpSent] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleOnChangeNew = (e) => {
    console.log('handleOnChangeNew');
    const { name, value } = e.target;
    setInputValueNew({
      ...inputValueNew,
      [name]: value,
    });
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    if (isCaptchaVerified) {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/login",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    } else {
      alert('please verifly captcha');

    }
  };

  const handleCaptchaVerify = (response) => {
    // Here you can perform any action after the reCAPTCHA is verified.
    console.log("reCAPTCHA response:", response);
    setIsCaptchaVerified(true);
  };

  const handleLoginPage = () => {
    console.log('clicked');
    setotpPage(!otpPage);
  }//togle page

  const handleSendOTP = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        "http://localhost:4000/sendSMS",
        {
          mobile: mobile,
          otp: otp
        },
      );
      console.log('data', data);
      const { success, message } = data;
      setotpPage(true);
      setotpSent(true);

      if (success) {
        handleSuccess(message);

      } else {
        handleError(message);
      }
    } catch (e) {

    }
  }

  const handleVerifyOTP = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(
        "http://localhost:4000/verifyOTP",
        {
          mobile: mobile,
          otp: otp
        },
        { withCredentials: true }
      );
      console.log('data9090', data);
      const { success, message, verified } = data;
      // setotpPage(true);
      // setotpSent(true);

      if (success && verified) {
        handleSuccess(message);

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        handleError(message);
      }
    } catch (e) {

    }
  }

  if (otpPage) {
    return (
      <div className="form_container">
        <h2>Login Account</h2>
        <form>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              placeholder="Enter your Mobile"
              onChange={handleOnChangeNew}
              disabled={otpSent ? true : false}
            />
          </div>
          {!otpSent && (<button type="submit" onClick={handleSendOTP}>Send OTP </button>)}
          {otpSent && (<> <div>
            <label htmlFor="password">OTP</label>
            <input
              type="number"
              name="otp"
              value={otp}
              placeholder="Enter your OTP"
              onChange={handleOnChangeNew}
            />
          </div>

            <button type="submit" onClick={handleVerifyOTP}>Verify OTP </button> </>)
          }

          <ReCaptchaComponent onVerify={handleCaptchaVerify} />
          {/* <ReCAPTCHA
              sitekey="6LcAotQnAAAAACLRFOQiVNgws48_1SPg4tRPtTpC"
              render="explicit"
              // ref={captchaRef}
            /> */}


          <span onClick={handleLoginPage}>
            <a className="loginWith">Login With Password</a>
          </span>
          <span>
            Crete a new account <Link to={"/signup"}>Signup</Link>
          </span>

        </form>
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>

          <ReCaptchaComponent onVerify={handleCaptchaVerify} />
          {/* <ReCAPTCHA
              sitekey="6LcAotQnAAAAACLRFOQiVNgws48_1SPg4tRPtTpC"
              render="explicit"
              // ref={captchaRef}
            /> */}

          <button type="submit">Submit</button>
          <span onClick={handleLoginPage}>
            <a className="loginWith">Login With OTP</a>
          </span>
          <span>
            Crete a new account <Link to={"/signup"}>Signup</Link>
          </span>

        </form>
        <ToastContainer />
      </div>
    );
  }
};

export default Login;



//1
// import React from "react";

// const Login = () => {
//   return <h1>Login Page</h1>;
// };

// export default Login