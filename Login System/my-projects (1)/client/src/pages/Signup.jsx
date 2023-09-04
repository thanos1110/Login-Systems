import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

const Signup = () => {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm("service_13lvkfl", "template_tur9beb", e.target, "YnBLh3WffB2Ij9dl8").then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  }
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { name, email, password, mobile } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
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
      mobile: "",
    });
  };

  return (
    <div className="form_container" onSubmit={sendEmail}>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your Name"
            onChange={handleOnChange}
          />
        </div>
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
          <label htmlFor="email">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            placeholder="Enter your mobile"
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
        <ReCAPTCHA
          sitekey="6LcAotQnAAAAACLRFOQiVNgws48_1SPg4tRPtTpC"
          render="explicit"
        // ref={captchaRef}
        />
        <button type="submit" >Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;


// 1
// import React from "react";

// const Signup = () => {
//   return <h1>Signup Page</h1>;
// };

// export default Signup;