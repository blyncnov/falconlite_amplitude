import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// Axios Config
import { instance } from "../../components/util/axios";

// Image
import falconiteLogo from "../../public/falconite.png";
import falconiteBanner from "../../public/falconite-banner.png";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("error");
  const [momentaryHide, setmomentaryHide] = useState(false);

  const router = useRouter();

  const SubmitFormHandler = (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      var config: any = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        responseType: "json",
        redirect: "follow",
      };

      instance
        .post(
          "send-email",
          new URLSearchParams({
            name: name,
            email: email,
            phone: phone,
            password: password,
          }),
          config
        )
        .then((response) => {
          setMessage(response.data.data.message);
          setmomentaryHide(true);
          setTimeout(() => {
            setMessage("");
            setmomentaryHide(false);
          }, 3000);
          // If it pass, Save OTP to local storage
          localStorage.setItem("OTP", response.data.data.verification_code);
          // Redirect to OTP Page
          if (response.data.data.message === "This email already exist") {
            return;
          } else {
            setStatus("sucess");
            setTimeout(() => {
              router.push("/auth/otp");
            }, 4000);
          }
        });
    } catch (error: any) {
      // If it Fails
      console.log(error);
    }
  };

  return (
    <section>
      <div className="test--auth__container">
        <div className="test--grid__container test--auth__details">
          <header className="test--public-logo-img">
            <div>
              <Image src={falconiteLogo} alt="falconite" priority={true} />
            </div>
          </header>
          <section>
            <section className="test--public-info">
              <h2>Create an account</h2>
              <p>
                Register on our website with your correct email address and
                information.
              </p>
            </section>
            {momentaryHide && (
              <>
                <summary>
                  <div
                    className="test--message"
                    style={{
                      backgroundColor: status == "error" ? "red" : "green",
                    }}
                  >
                    <p>{message}</p>
                  </div>
                </summary>
              </>
            )}

            <section>
              <form onSubmit={SubmitFormHandler}>
                <div className="test--auth-form-container">
                  <label htmlFor="first_name">First Name </label>
                  <input
                    autoComplete="false"
                    autoSave="true"
                    autoFocus={true}
                    name="name"
                    onChange={(e) => e.target.value}
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="test--auth-form-container">
                  <label htmlFor="first_name">Email Address </label>
                  <input
                    autoComplete="false"
                    autoSave="true"
                    autoFocus={true}
                    name="email"
                    onChange={(e) => e.target.value}
                    type="email"
                    placeholder=""
                  />
                </div>
                <div className="test--auth-form-container">
                  <label htmlFor="first_name">Phone Number </label>
                  <input
                    autoComplete="false"
                    autoSave="true"
                    autoFocus={true}
                    name="phone"
                    onChange={(e) => e.target.value}
                    type="number"
                    placeholder=""
                  />
                </div>
                <div className="test--auth-form-container">
                  <label htmlFor="first_name">Password </label>
                  <input
                    autoComplete="false"
                    autoSave="true"
                    autoFocus={true}
                    name="password"
                    onChange={(e) => e.target.value}
                    type="password"
                  />
                </div>
                <div className="test--auth-remember-me">
                  <input type="checkbox" name="remember-me" id="remember-me" />
                  <li>Remember me</li>
                </div>
                <div className="test--auth-form-container">
                  <button>Sign Up</button>
                </div>
                <div className="test--auth-already-have-an-account">
                  <li>Already have an account ? </li>
                  <Link href="/">Sign in</Link>
                </div>
              </form>
            </section>
          </section>
        </div>
        <div className="test--grid__container test--info__details">
          <div className="test--fake-img">
            <Image
              src={falconiteBanner}
              alt="falconite banner"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
