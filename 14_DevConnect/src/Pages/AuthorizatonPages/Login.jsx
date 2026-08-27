import React, { useState } from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthRightBottom from "../components/AuthRightBottom";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth, useCurrUser, useCurrSessionUser } from "../../contexts";

function Login() {
  const [hidePassword, setHidePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [showEnterEmail, setShowEnterEmail] = useState(false);
  const [showpassChange, setShowPassChange] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [validCheckEmail, setValidCheckEmail] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [hideNewPassword, setHideNewPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hideConfirmPassword, setHideConfirmPassword] = useState("password");
  const [validPassword, setValidPassword] = useState(true);

  const { Users, changePass } = useAuth();
  const {
    handleCurrEmail,
    handleCurrId,
    handleCurrUserFullName,
    handleRememberUser,
  } = useCurrUser();
  const {
    handleSessionCurrEmail,
    handleSessionCurrId,
    handleSessionUser,
    handleSessionCurrFullName,
  } = useCurrSessionUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    let valid = false;
    let userId = "";
    let UserFullName = "";
    for (const element of Users) {
      if (element.email === email) {
        if (element.password === password) {
          valid = true;
          userId = element.id;
          UserFullName = element.fullName;
        }
        break;
      }
    }

    if (!valid) {
      setWrongInfo(true);
      return;
    }
    setWrongInfo(false);
    handleCurrId(userId);
    handleCurrEmail(email);
    handleCurrUserFullName(UserFullName);
    if (rememberUser) handleRememberUser(userId, email, UserFullName);

    handleSessionCurrEmail(email);
    handleSessionCurrId(userId);
    handleSessionUser(userId, email, UserFullName);
    handleSessionCurrFullName(UserFullName);

    setEmail("");
    setPassword("");
    navigate("/dashboard");
  };

  const handleCheckEmail = () => {
    const validUser = Users.find((user) => user.email === checkEmail);

    if(validUser){
      setShowEnterEmail(false);
      setShowPassChange(true);
      setValidCheckEmail(true);
    } else {
      setValidCheckEmail(false);
    }
  }

  const handleBackLogin = () => {
    setShowEnterEmail(false);
    setShowPassChange(false);
    setValidCheckEmail(true);
  } 

  const handlePassChange = () => {
    if(newPassword !== confirmPassword || newPassword.length < 8 || confirmPassword.length < 8){
      setValidPassword(false);
      return;
    }
    else setValidPassword(true);

    const user = Users.find((user) => user.email === checkEmail);

    changePass(user.id, newPassword);
    setShowEnterEmail(false);
    setShowPassChange(false);
    setValidPassword(true);
    setValidCheckEmail(true);
    setCheckEmail("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div className="md:flex hidden flex-col items-center w-1/2 gap-4 h-full bg-purple-200 border-r-2 border-gray-300 px-10 py-10">
        <AuthLeftSide
          title="Welcome Back!"
          titleDesc="Log in to your account and continue connecting with developers."
          image=".\src\Pages\assets\Boy.png"
          infoCards={[
            {
              img: "https://cdn-icons-png.flaticon.com/128/2592/2592317.png",
              title: "Secure & Private",
              desc: "Your data is safe with us.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/12773/12773678.png",
              title: "Developer Focused",
              desc: "Built for developers, by developers.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/18672/18672128.png",
              title: "Fast & Efficient",
              desc: "Seamless experience, every time.",
            },
          ]}
        />
      </div>
      {!showEnterEmail && !showpassChange && (
        <div className="md:w-1/2 w-full h-full flex flex-col px-10 py-10 gap-8">
          <div>
            <h1 className="font-bold text-3xl">Log In</h1>
            <h3 className="text-[14px] text-gray-600">
              Enter your credentials to access your account
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <h2 className="text-[14px] font-semibold">Email Address</h2>
            </div>
            <div
              className={`border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2`}
            >
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                  width="15px"
                />
              </div>
              <input
                ttype="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none text-[14px] w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <h2 className="text-[14px] font-semibold">Password</h2>
              <button
                className="text-[14px] font-semibold text-purple-600"
                onClick={() => setShowEnterEmail(true)}
              >
                Forgot?
              </button>
            </div>
            <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
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
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={rememberUser}
                onChange={() => setRememberUser((prev) => !prev)}
                id="remember"
              />
              <label htmlFor="remember" className="text-[14px] text-gray-600">
                Remember me
              </label>
            </div>
            <div className="w-full">
              <h4
                className={`${wrongInfo ? "block" : "hidden"} text-[13px] text-red-800`}
              >
                error: either email or password is incorrect
              </h4>
              <button
                className="bg-purple-600 text-white text-[14px] py-2 w-full rounded hover:bg-purple-700"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </div>
          <div>
            <AuthRightBottom msg="Continue" />
          </div>
          <div className="w-full">
            <h2 className="text-[14px] text-gray-600 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-700 font-semibold">
                {" "}
                Sign Up
              </Link>
            </h2>
          </div>
        </div>
      )}
      {showEnterEmail && !showpassChange && (
        <div className="md:w-1/2 p-4 flex flex-col gap-4 w-full">
          <button
            onClick={handleBackLogin}
            className="text-[14px] text-gray-600 w-fit"
          >
            {" "}
            {"<"} Back to Login
          </button>
          <div>
            <h2 className="text-2xl font-bold">Forget Password?</h2>
            <h4 className="text-[14px] text-gray-600">
              Enter your email address to locate your account.
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <h2 className="text-[14px] font-semibold">Email Address</h2>
            </div>
            <div
              className={`border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2`}
            >
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                  width="15px"
                />
              </div>
              <input
                ttype="email"
                placeholder="you@example.com"
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
                className="focus:outline-none text-[14px] w-full"
              />
            </div>
          </div>
          {!validCheckEmail && (
            <h4 className="text-[14px] text-red-600">
              Email address not registered.
            </h4>
          )}
          <button
            className="bg-purple-600 text-white font-semibold py-2 rounded-md"
            onClick={handleCheckEmail}
          >
            Submit
          </button>
          <div>
            <AuthRightBottom msg="Continue" />
          </div>
          <div className="w-full">
            <h2 className="text-[14px] text-gray-600 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-700 font-semibold">
                {" "}
                Sign Up
              </Link>
            </h2>
          </div>
        </div>
      )}
      {!showEnterEmail && showpassChange && (
        <div className="md:w-1/2 p-4 flex flex-col gap-4 w-full">
          <button
            onClick={handleBackLogin}
            className="text-[14px] text-gray-600 w-fit"
          >
            {" "}
            {"<"} Back to Login
          </button>
          <div>
            <h2 className="text-2xl font-bold">Change Password</h2>
            <h4 className="text-[14px] text-gray-600">
              Enter new Password for your account.
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <h2 className="text-[14px] font-semibold">New Password</h2>
            </div>
            <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                  width="15px"
                />
              </div>
              <input
                type={hideNewPassword}
                placeholder="........"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="focus:outline-none text-[14px] w-6/7"
              />
              <button
                onClick={() =>
                  setHideNewPassword((prev) =>
                    prev === "password" ? "text" : "password",
                  )
                }
              >
                <img
                  src={
                    hideNewPassword === "password"
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
            </div>
            <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          {!validPassword && (
            <h4 className="text-[14px] text-red-600">
              Passwords are not matching.
            </h4>
          )}
          <button
            className="bg-purple-600 text-white font-semibold py-2 rounded-md"
            onClick={handlePassChange}
          >
            Change Password
          </button>
          <div>
            <AuthRightBottom msg="Continue" />
          </div>
          <div className="w-full">
            <h2 className="text-[14px] text-gray-600 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-700 font-semibold">
                {" "}
                Sign Up
              </Link>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
