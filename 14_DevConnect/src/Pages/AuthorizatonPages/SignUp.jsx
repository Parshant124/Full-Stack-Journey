import React, { useState } from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthRightBottom from "../components/AuthRightBottom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCurrUser } from "../../contexts";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailExist, setEmailExist] = useState(false);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [usernameExist, setUsernameExist] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [validPasswordLength, setValidPasswordLength] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [validConfirmPasswordLength, setValidConfirmPasswordLength] =
    useState(true);
  const [hidePassword, setHidePassword] = useState("password");
  const [hideConfirmPassword, setHideConfirmPassword] = useState("password");
  const [labelChecked, setLabelChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [passUnmatch, setPassUnmatch] = useState(false);
  const { Users, addUser } = useAuth();
  const navigate = useNavigate();
  const{handleCurrId, handleCurrEmail} = useCurrUser()

  const handleFullName = (name) => {
    setFullName(name);
    if (/^[A-Za-z\s]+$/.test(name)) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }
  };

  const handleUsername = (name) => {
    setUsername(name);

    if (Users.length > 0) {
      const exist = Users.some((user) => user.id === name);
      if (exist) {
        setUsernameExist(true);
        return;
      } else {
        setUsernameExist(false);
      }
    }

    if (/^[a-z0-9]+$/.test(name) && name.length) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  const handleEmail = (emailAddress) => {
    setEmail(emailAddress);

    const exist = Users.some((user) => user.email === emailAddress);
    if (exist) {
      setEmailExist(true);
      return;
    } else {
      setEmailExist(false);
    }

    if (/^[^\s@]+@[^\s@]+\.com$/.test(emailAddress)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handlePassword = (pass) => {
    setPassword(pass);
    if (/^[^ ]*$/.test(pass)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    if (pass.length != 0 && pass.length < 8) {
      setValidPasswordLength(false);
    } else {
      setValidPasswordLength(true);
    }
  };

  const handleConfirmPassword = (pass) => {
    setConfirmPassword(pass);
    if (/^[^ ]*$/.test(pass)) {
      setValidConfirmPassword(true);
    } else {
      setValidConfirmPassword(false);
    }

    if (pass.length != 0 && pass.length < 8) {
      setValidConfirmPasswordLength(false);
    } else {
      setValidConfirmPasswordLength(true);
    }

    if (password !== pass) {
      setPassUnmatch(true);
    } else {
      setPassUnmatch(false);
    }
  };

  const handleSubmit = () => {
    if (labelChecked) setCheckError(false);
    if (
      !validFullName ||
      !validEmail ||
      !validUsername ||
      !validPassword ||
      !validConfirmPassword ||
      !labelChecked ||
      emailExist ||
      usernameExist
    ) {
      handleFullName(fullName);
      handleEmail(email);
      handleUsername(username);
      handlePassword(password);
      handleConfirmPassword(confirmPassword);
      if (password.length < 8) setValidPasswordLength(false);
      if (confirmPassword.length < 8) setValidConfirmPasswordLength(false);
      if (!labelChecked) setCheckError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPassUnmatch(true);
      return;
    }

    handleCurrId(username);
    handleCurrEmail(email)
    addUser(username, password, email, fullName);
    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
    setConfirmPassword("");
    setValidFullName(false);

    navigate("/dashboard");
  };

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div className="flex flex-col items-center w-1/2 gap-4 min-h-full bg-purple-200 border-r-2 border-gray-300 px-10 py-10">
        <AuthLeftSide
          title="Join DevConnect"
          titleDesc="Create your account and become a part of our developor coummunity."
          image=".\src\Pages\assets\Girl.png"
          infoCards={[
            {
              img: "https://cdn-icons-png.flaticon.com/128/978/978012.png",
              title: "Connect",
              desc: "Meet and collaborate with developers.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/13543/13543945.png",
              title: "Learn",
              desc: "Share knowledge and grow together.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/9930/9930221.png",
              title: "Build",
              desc: "Work on amazing projects together.",
            },
          ]}
        />
      </div>
      <div className="w-1/2 min-h-full flex flex-col px-10 py-10 gap-8">
        <div>
          <h1 className="font-bold text-3xl">Create Account</h1>
          <h3 className="text-[14px] text-gray-600">
            Let's get you started with DevConnect.
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Full Name</h2>
            <h4
              className={`${validFullName ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: only Alphabets are allowed
            </h4>
          </div>
          <div
            className={`border-2 ${validFullName ? "border-gray-300" : "border-red-400"} rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="text"
              placeholder="Parshant"
              className="focus:outline-none text-[14px] w-full"
              value={fullName}
              onChange={(e) => handleFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Email Address</h2>
            <h4
              className={`${emailExist ? "block" : "hidden"} text-[13px] text-red-800`}
            >
              error: email already exists
            </h4>
            <h4
              className={`${emailExist || validEmail ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: not a valid Email Address
            </h4>
          </div>
          <div
            className={`border-2 ${validEmail ? "border-gray-300" : "border-red-400"} rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Username</h2>
            <h4
              className={`${usernameExist ? "block" : "hidden"} text-[13px] text-red-800`}
            >
              error: username already exists
            </h4>
            <h4
              className={`${!usernameExist && validUsername ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: only lowercase alphabets and numerics allowed
            </h4>
          </div>
          <div
            className={`border-2 ${validUsername ? "border-gray-300" : "border-red-400"}  rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="text"
              placeholder="parshant01"
              className="focus:outline-none text-[14px] w-full"
              value={username}
              onChange={(e) => handleUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Password</h2>
            <h4
              className={`${validPassword ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: no spaces allowed
            </h4>
            <h4
              className={`${!validPassword || validPasswordLength ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: length must be atleast 8
            </h4>
          </div>
          <div
            className={`border-2 ${validPasswordLength && validPassword ? "border-gray-300" : "border-red-400"} rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type={hidePassword}
              placeholder="........"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              className="focus:outline-none text-[14px] w-6/7"
            />
            <button
              onClick={() =>
                setHidePassword((prev) =>
                  prev === "password" ? "text" : "password",
                )
              }
            >
              <img
                src={
                  hidePassword === "password"
                    ? "https://cdn-icons-png.flaticon.com/128/10898/10898993.png"
                    : "https://cdn-icons-png.flaticon.com/128/11502/11502607.png"
                }
                alt=""
                width="20px"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Confirm Password</h2>
            <h4
              className={`${validConfirmPassword ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: no spaces allowed
            </h4>
            <h4
              className={`${!validConfirmPassword || validConfirmPasswordLength ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              error: length must be atleast 8
            </h4>
            <h4
              className={`${!validConfirmPassword || !validConfirmPasswordLength || !passUnmatch ? "hidden" : "block"} text-[13px] text-red-800`}
            >
              password not matching
            </h4>
          </div>
          <div>
            <div
              className={`border-2 ${validConfirmPassword && validConfirmPasswordLength ? "border-gray-300" : "border-red-400"}  rounded-md flex gap-4 items-center px-2 py-2`}
            >
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                  width="15px"
                />
              </div>
              <input
                type={hideConfirmPassword}
                placeholder="........"
                value={confirmPassword}
                onChange={(e) => handleConfirmPassword(e.target.value)}
                className="focus:outline-none text-[14px] w-6/7"
              />
              <button
                onClick={() =>
                  setHideConfirmPassword((prev) =>
                    prev === "password" ? "text" : "password",
                  )
                }
              >
                <img
                  src={
                    hideConfirmPassword === "password"
                      ? "https://cdn-icons-png.flaticon.com/128/10898/10898993.png"
                      : "https://cdn-icons-png.flaticon.com/128/11502/11502607.png"
                  }
                  alt=""
                  width="20px"
                />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              name=""
              id=""
              checked={labelChecked}
              onChange={() => setLabelChecked((prev) => !prev)}
            />
            <label>
              I agree to the{" "}
              <Link to="#" className="text-purple-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-purple-600">
                Privacy Policy
              </Link>
            </label>
          </div>
          <div>
            <h4
              className={`${checkError ? "block" : "hidden"} text-[13px] text-red-800`}
            >
              error: must agree to the above
            </h4>
          </div>
        </div>
        <div className="w-full">
          <button
            className="bg-purple-600 text-white text-[14px] py-2 w-full rounded hover:bg-purple-700"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
        <div>
          <AuthRightBottom msg="Sign up" />
        </div>
        <div className="w-full">
          <h2 className="text-[14px] text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 font-semibold">
              {" "}
              Log In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
