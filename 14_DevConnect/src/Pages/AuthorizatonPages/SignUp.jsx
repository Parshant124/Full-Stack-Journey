import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthRightBottom from "../components/AuthRightBottom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";

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

  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { Users } = useAuth();
  const navigate = useNavigate();

  const handleFullName = (name) => {
    setFullName(name);

    if (/^[A-Za-z\s]+$/.test(name) && name.length > 0) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }
  };

  const handleUsername = (name) => {
    setUsername(name);

    const exist = Users.some((user) => user.id === name);

    if (exist) {
      setUsernameExist(true);
    } else {
      setUsernameExist(false);
    }

    if (/^[a-z0-9]+$/.test(name) && name.length > 0) {
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

    if (/^\S*$/.test(pass)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    if (pass.length !== 0 && pass.length < 8) {
      setValidPasswordLength(false);
    } else {
      setValidPasswordLength(true);
    }

    if (confirmPassword && pass !== confirmPassword) {
      setPassUnmatch(true);
    } else {
      setPassUnmatch(false);
    }
  };

  const handleConfirmPassword = (pass) => {
    setConfirmPassword(pass);

    if (/^\S*$/.test(pass)) {
      setValidConfirmPassword(true);
    } else {
      setValidConfirmPassword(false);
    }

    if (pass.length !== 0 && pass.length < 8) {
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

  const handleSubmit = async () => {
    setSignupError("");
    setSignupSuccess(false);

    if (labelChecked) {
      setCheckError(false);
    }

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

      if (password.length < 8) {
        setValidPasswordLength(false);
      }

      if (confirmPassword.length < 8) {
        setValidConfirmPasswordLength(false);
      }

      if (!labelChecked) {
        setCheckError(true);
      }

      return;
    }

    if (password !== confirmPassword) {
      setPassUnmatch(true);
      return;
    }

    // Create Supabase Auth account
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
      setSignupError(error.message);
      return;
    }

    if (!data.user) {
      setSignupError("Account could not be created.");
      return;
    }

    // Store user profile in your users table
    // users.id = username
    const { error: profileError } = await supabase.from("users").insert({
      id: username,
      email: email,
      fullName: fullName,
    });

    if (profileError) {
      console.log(profileError.message);
      setSignupError(profileError.message);
      return;
    }

    // If email confirmation is enabled in Supabase
    if (!data.session) {
      setSignupSuccess(true);

      setUsername("");
      setPassword("");
      setEmail("");
      setFullName("");
      setConfirmPassword("");

      return;
    }

    // If email confirmation is disabled
    setUsername("");
    setPassword("");
    setEmail("");
    setFullName("");
    setConfirmPassword("");

    navigate("/dashboard");
  };

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div className="md:flex hidden flex-col items-center w-1/2 gap-4 min-h-full bg-purple-200 border-r-2 border-gray-300 px-10 py-10">
        <AuthLeftSide
          title="Join DevConnect"
          titleDesc="Create your account and become a part of our developer community."
          image="https://uftsixsunvrpbwrmcrre.supabase.co/storage/v1/object/public/devconnect-images/logos/Girl.png"
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

      <div className="md:w-1/2 w-full min-h-full flex flex-col px-10 py-10 gap-8">
        <div>
          <h1 className="font-bold text-3xl">Create Account</h1>

          <h3 className="text-[14px] text-gray-600">
            Let's get you started with DevConnect.
          </h3>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Full Name</h2>

            <h4
              className={`${
                validFullName ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: only Alphabets are allowed
            </h4>
          </div>

          <div
            className={`border-2 ${
              validFullName ? "border-gray-300" : "border-red-400"
            } rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

            <input
              type="text"
              placeholder="Parshant"
              value={fullName}
              onChange={(e) => handleFullName(e.target.value)}
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Email Address</h2>

            <h4
              className={`${
                emailExist ? "block" : "hidden"
              } text-[13px] text-red-800`}
            >
              error: email already exists
            </h4>

            <h4
              className={`${
                emailExist || validEmail ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: not a valid Email Address
            </h4>
          </div>

          <div
            className={`border-2 ${
              validEmail ? "border-gray-300" : "border-red-400"
            } rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Username</h2>

            <h4
              className={`${
                usernameExist ? "block" : "hidden"
              } text-[13px] text-red-800`}
            >
              error: username already exists
            </h4>

            <h4
              className={`${
                !usernameExist && validUsername ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: only lowercase alphabets and numerics allowed
            </h4>
          </div>

          <div
            className={`border-2 ${
              validUsername ? "border-gray-300" : "border-red-400"
            } rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

            <input
              type="text"
              placeholder="parshant01"
              value={username}
              onChange={(e) => handleUsername(e.target.value)}
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Password</h2>

            <h4
              className={`${
                validPassword ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: no spaces allowed
            </h4>

            <h4
              className={`${
                !validPassword || validPasswordLength ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: length must be atleast 8
            </h4>
          </div>

          <div
            className={`border-2 ${
              validPasswordLength && validPassword
                ? "border-gray-300"
                : "border-red-400"
            } rounded-md flex gap-4 items-center px-2 py-2`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt=""
              width="15px"
            />

            <input
              type={hidePassword}
              placeholder="........"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              className="focus:outline-none text-[14px] w-6/7"
            />

            <button
              type="button"
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <h2 className="text-[14px] font-semibold">Confirm Password</h2>

            <h4
              className={`${
                validConfirmPassword ? "hidden" : "block"
              } text-[13px] text-red-800`}
            >
              error: no spaces allowed
            </h4>

            <h4
              className={`${
                !validConfirmPassword || validConfirmPasswordLength
                  ? "hidden"
                  : "block"
              } text-[13px] text-red-800`}
            >
              error: length must be atleast 8
            </h4>

            <h4
              className={`${
                !validConfirmPassword ||
                !validConfirmPasswordLength ||
                !passUnmatch
                  ? "hidden"
                  : "block"
              } text-[13px] text-red-800`}
            >
              password not matching
            </h4>
          </div>

          <div>
            <div
              className={`border-2 ${
                validConfirmPassword && validConfirmPasswordLength
                  ? "border-gray-300"
                  : "border-red-400"
              } rounded-md flex gap-4 items-center px-2 py-2`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />

              <input
                type={hideConfirmPassword}
                placeholder="........"
                value={confirmPassword}
                onChange={(e) => handleConfirmPassword(e.target.value)}
                className="focus:outline-none text-[14px] w-6/7"
              />

              <button
                type="button"
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

        {/* Terms */}
        <div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              id="agree"
              checked={labelChecked}
              onChange={() => setLabelChecked((prev) => !prev)}
            />

            <label htmlFor="agree">
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

          {checkError && (
            <h4 className="text-[13px] text-red-800">
              error: must agree to the above
            </h4>
          )}
        </div>

        {/* Supabase messages */}
        {signupError && (
          <h4 className="text-[13px] text-red-800">{signupError}</h4>
        )}

        {signupSuccess && (
          <h4 className="text-[13px] text-green-700">
            Account created. Please check your email to verify your account.
          </h4>
        )}

        {/* Submit */}
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
              Log In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
