import React, { useState } from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthRightBottom from "../components/AuthRightBottom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCurrUser } from "../../contexts";

function Login() {
  const [hidePassword, setHidePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const { Users } = useAuth();
  const {handleCurrEmail, handleCurrId, handleRememberUser} = useCurrUser()
  const navigate = useNavigate();

  const handleLogin = () => {
    let valid = false;
    let userId = "";
    for (const element of Users) {
      if (element.email === email) {
        if (element.password === password) {
          valid = true;
          userId = element.id
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

    handleCurrEmail(email)
    if(rememberUser) handleRememberUser(userId, email);
    
    console.log("Inside Login", userId, email)
    setEmail("");
    setPassword("");
    navigate("/dashboard");
  };

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div className="flex flex-col items-center w-1/2 gap-4 h-full bg-purple-200 border-r-2 border-gray-300 px-10 py-10">
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
      <div className="w-1/2 h-full flex flex-col px-10 py-10 gap-8">
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
            <h2 className="text-[14px] font-semibold text-purple-600">
              Forgot?
            </h2>
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
            <input type="checkbox" checked={rememberUser} onChange={() => setRememberUser((prev) => !prev)}/>
            <h2 className="text-[14px] text-gray-600">Remember me</h2>
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
    </div>
  );
}

export default Login;
