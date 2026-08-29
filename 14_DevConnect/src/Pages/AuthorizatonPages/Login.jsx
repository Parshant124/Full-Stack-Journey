import { supabase } from "../../lib/supabaseClient";
import React, { useState } from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthRightBottom from "../components/AuthRightBottom";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [hidePassword, setHidePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongInfo, setWrongInfo] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setWrongInfo(true);
      return;
    }

    setWrongInfo(false);

    setEmail("");
    setPassword("");

    navigate("/dashboard");
  };

  const handleForgotPassword = async () => {
    setResetMessage("");

    if (!email) {
      setResetMessage("Please enter your email first.");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email.trim())
      .maybeSingle();

    if (error) {
      setResetMessage("Error checking account.");
      return;
    }

    if (!data) {
      setResetMessage("No account found with this email.");
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: "http://localhost:5173/update-password",
      },
    );

    if (resetError) {
      console.log("Reset error:", resetError.message);
      setResetMessage(resetError.message);
      return;
    }

    setResetMessage("Password reset email sent. Check your inbox.");
  };

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

      <div className="md:w-1/2 w-full h-full flex flex-col px-10 py-10 gap-8">
        <div>
          <h1 className="font-bold text-3xl">Log In</h1>
          <h3 className="text-[14px] text-gray-600">
            Enter your credentials to access your account
          </h3>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Email Address</h2>

          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Password</h2>

            <button
              className="text-[14px] font-semibold text-purple-600"
              onClick={handleForgotPassword}
            >
              Forgot?
            </button>
          </div>

          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

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

        {/* Remember + Login */}
        <div className="flex flex-col gap-4">
          <div className="w-full">
            {wrongInfo && (
              <h4 className="text-[13px] text-red-800 mb-2">
                Error: either email or password is incorrect
              </h4>
            )}

            {resetMessage && (
              <h4 className="text-[13px] text-purple-700 mb-2">
                {resetMessage}
              </h4>
            )}

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
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
