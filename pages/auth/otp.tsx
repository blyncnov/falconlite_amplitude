import React, { useState, useEffect } from "react";
// import OtpInput from "react-otp-input";
import Image from "next/image";
import { useRouter } from "next/router";

// Axios Config
import { instance } from "../../components/util/axios";

// Image
import falconiteLogo from "../../public/falconite.png";
import falconiteBanner from "../../public/falconite-banner.png";

const OTP = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleChange = (code: any) => setCode(code);

  const SubmitOTPHandler = (e: any) => {
    e.preventDefault();

    // IF OTP Entered === OTP saved in local Storage
    if (code === localStorage.getItem("OTP")) {
      try {
        var config: any = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          responseType: "json",
        };

        instance
          .post(
            "verify-email",
            new URLSearchParams({
              code: code,
            }),
            config
          )
          .then((response) => {
            alert("Email verification successful");
            // Redirect to Home Page
            router.push("/");
            // Delete local storage
            localStorage.clear();
          });
      } catch (error) {
        // If it Fails
        console.log(error);
      }
    } else {
      alert("OTP DOES NOT MATCH ");
    }
  };

  return (
    <section>
      <div className="test--auth__container">
        <div className="test--grid__container test--auth__details">
          <header className="test--public-logo-img">
            <div>
              <Image priority={true} src={falconiteLogo} alt="falconite" />
            </div>
          </header>
          <section>
            <section className="test--public-info">
              <h2>Kindly enter Email Verification code</h2>
              <p>
                To sign up, kindly enter the verification code sent to youe
                email address
              </p>
            </section>
            <section>
              <div className="test-otp-container">
                <form onSubmit={SubmitOTPHandler}>
                  <div>
                    {/* <OtpInput
                      value={code}
                      onChange={handleChange}
                      numInputs={5}
                      separator={<span style={{ width: "8px" }}></span>}
                      isInputNum={false}
                      shouldAutoFocus={true}
                      inputStyle={{
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        width: "54px",
                        height: "54px",
                        fontSize: "12px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "blue",
                      }}
                      focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none",
                      }}
                    /> */}
                  </div>
                  <div className="test--auth-form-container">
                    <button>PROCEED</button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        </div>
        <div className="test--grid__container test--info__details">
          <div className="test--fake-img">
            <Image
              priority={true}
              src={falconiteBanner}
              alt="falconite banner"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTP;
