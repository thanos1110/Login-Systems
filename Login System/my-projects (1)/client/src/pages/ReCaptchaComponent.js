import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onVerify }) => {
  const handleVerify = (response) => {
    if (response) {
      onVerify(response); // Pass the reCAPTCHA response to the parent component
    }
  };

  return (
    <ReCAPTCHA 
          sitekey="6LcAotQnAAAAACLRFOQiVNgws48_1SPg4tRPtTpC"
          render="explicit"
          // ref={captchaRef}
          onChange={handleVerify}
        />
  );
};

export default ReCaptchaComponent;
