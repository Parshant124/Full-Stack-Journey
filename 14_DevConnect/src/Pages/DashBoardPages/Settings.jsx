import React, { useState } from "react";
import { useAuth, useCurrSessionUser, useCurrUser } from "../../contexts";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [validFullName, setValidFullName] = useState(true);
  const [validAbout, setValidAbout] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const { currUserId } = useCurrUser();
  const { currSessionUserId } = useCurrSessionUser();
  const { Users, changePass, changeBio, changeImage, changeFullName } =
    useAuth();

  const navigate = useNavigate();

  const currUser = Users.find(
    (user) => user.id === currUserId || user.id === currSessionUserId,
  );

  const [fullNameValue, setFullNameValue] = useState(currUser.fullName || "");
  const [aboutValue, setAboutValue] = useState(currUser.about || "");
  const [image, setImage] = useState(currUser.image || "");

  const handleFullName = (name) => {
    setFullNameValue(name);
    if (/^[A-Za-z\s]+$/.test(name) && name.length >= 4) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }
  };

  const handleAbout = (about) => {
    if (about.length > 100) {
      setValidAbout(false);
      return;
    }
    setValidAbout(true);

    setAboutValue(about);
  };

  const handleNewPassword = (password) => {
    setNewPassword(password);

    if (password.length >= 8) {
      setValidNewPassword(true);
    } else {
      setValidNewPassword(false);
    }
  };

  const handleConfirmPassword = (password) => {
    setConfirmPassword(password);

    if (password.length >= 8 && password === newPassword) {
      setValidConfirmPassword(true);
    } else {
      setValidConfirmPassword(false);
    }
  };

  const handleSave = () => {
    if (!validFullName || !validNewPassword || !validConfirmPassword) return;

    if (validFullName && fullNameValue !== currUser.fullName) {
      changeFullName(currUser.id, fullNameValue);
    }
    if (aboutValue !== currUser.about) {
      changeBio(currUser.id, aboutValue);
    }
    if (validNewPassword && validConfirmPassword && newPassword.length) {
      changePass(currUser.id, newPassword);
    }
    if (image !== currUser.image) {
      changeImage(currUser.id, image);
    }
    navigate("/dashboard");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    console.log("FILE:", file);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    console.log("Image stored", image);

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-100 h-full">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <h4 className="text-[14px] text-gray-600">
          Update your personal information.
        </h4>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-lg p-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col">
              <label htmlFor="userName" className="font-semibold text-[14px]">
                User Name
              </label>
              <input
                type="text"
                name=""
                id="userName"
                className="border-2 border-gray-300 px-2 py-1 rounded-md text-[14px] text-gray-600"
                disabled
                value={currUser.id}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullName" className="font-semibold text-[14px]">
                Full Name
              </label>
              <input
                type="text"
                name=""
                id="fullName"
                className={`border-2 ${validFullName ? "border-gray-300 focus:outline-purple-600" : "border-red-600 focus:outline-red-600"}  px-2 py-1 rounded-md text-[14px]`}
                value={fullNameValue}
                onChange={(e) => handleFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center gap-4">
            {currUser.image ? (
              <div>
                <img src={currUser.image} alt="" />
              </div>
            ) : image ? (
              <div className="w-20 h-20 flex">
                <img src={image} alt=""  className="rounded-full w-full h-full object-cover"/>
              </div>
            ) : (
              <div className="bg-red-500 rounded-full w-20 h-20 flex justify-center items-center">
                <h3 className="text-white text-4xl">
                  {currSessionUserId
                    ? currSessionUserId[0].toUpperCase()
                    : currUserId
                      ? currUserId[0].toUpperCase()
                      : "U"}
                </h3>
              </div>
            )}
            <label htmlFor="userImage" className="font-semibold text-[14px]">
              Change Photo
            </label>
            <input
              id="userImage"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleImage}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-[14px]">
              Email
            </label>
            <input
              type="text"
              name=""
              id="email"
              className={`border-2 border-gray-300  px-2 py-1 rounded-md text-[14px] text-gray-600`}
              value={currUser.email}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="about" className="font-semibold text-[14px]">
              Bio
            </label>
            <textarea
              name=""
              placeholder="tell us something about yourself..."
              id="about"
              className={`border-2 ${validAbout ? "border-gray-300 focus:outline-purple-600" : "border-red-600 focus:outline-red-600"}  px-2 py-1 rounded-md text-[14px]`}
              value={aboutValue}
              onChange={(e) => handleAbout(e.target.value)}
              rows="3"
            />
            <h4
              className={`text-[12px] font-semibold text-right ${validAbout ? "text-purple-600" : "text-red-600"}`}
            >
              {aboutValue.length} / 100
            </h4>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-2/5">
              <label
                htmlFor="newPassword"
                className="font-semibold text-[14px]"
              >
                New Password
              </label>
              <div
                className={`flex border-2 w-full ${validNewPassword ? "border-gray-300 focus:outline-purple-600" : "border-red-600 focus:outline-red-600"} pr-2 rounded-md justify-between`}
              >
                <input
                  type="text"
                  name=""
                  id="newPassword"
                  className={`${showNewPassword ? "block" : "hidden"}  px-2 py-1 rounded-md text-[14px] text-gray-600 focus:outline-none w-4/5`}
                  placeholder="Enter your new Password here..."
                  value={newPassword}
                  onChange={(e) => handleNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  name=""
                  id="newPassword"
                  className={`${showNewPassword ? "hidden" : "block"} px-2 py-1 rounded-md text-[14px] text-gray-600 focus:outline-none w-4/5`}
                  placeholder="Enter your new Password here..."
                  value={newPassword}
                  onChange={(e) => handleNewPassword(e.target.value)}
                />
                <div
                  className="flex items-center"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/709/709612.png"
                    alt=""
                    width="20px"
                    className={`${showNewPassword ? "hidden" : "block"}`}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                    alt=""
                    width="20px"
                    className={`${showNewPassword ? "block" : "hidden"}`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-2/5">
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-[14px]"
              >
                Confirm Password
              </label>
              <div
                className={`flex border-2 w-full ${validConfirmPassword ? "border-gray-300 focus:outline-purple-600" : "border-red-600 focus:outline-red-600"} pr-2 rounded-md justify-between`}
              >
                <input
                  type="text"
                  name=""
                  id="confirmPassword"
                  className={`${showConfirmPassword ? "block" : "hidden"}  px-2 py-1 rounded-md text-[14px] text-gray-600 focus:outline-none w-4/5`}
                  placeholder="Confirm your new Password..."
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPassword(e.target.value)}
                  disabled={!(newPassword.length && validNewPassword)}
                />
                <input
                  type="password"
                  name=""
                  id="confirmPassword"
                  className={`${showConfirmPassword ? "hidden" : "block"} px-2 py-1 rounded-md text-[14px] text-gray-600 focus:outline-none w-4/5`}
                  placeholder="Confirm your new Password..."
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPassword(e.target.value)}
                  disabled={!(newPassword.length && validNewPassword)}
                />
                <div
                  className="flex items-center"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/709/709612.png"
                    alt=""
                    width="20px"
                    className={`${showConfirmPassword ? "hidden" : "block"}`}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                    alt=""
                    width="20px"
                    className={`${showConfirmPassword ? "block" : "hidden"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            className="bg-purple-600 text-white px-2 py-1 rounded-md text-[14px]"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
