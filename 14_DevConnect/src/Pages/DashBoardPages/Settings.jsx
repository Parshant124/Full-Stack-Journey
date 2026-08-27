import React, { useEffect, useState } from "react";
import { useAuth, useCurrSessionUser, useCurrUser } from "../../contexts";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [validFullName, setValidFullName] = useState(true);
  const [validAbout, setValidAbout] = useState(true);
  const [validBio, setValidBio] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const { currUserId } = useCurrUser();
  const { currSessionUserId } = useCurrSessionUser();
  const { Users, changePass, changeBio, changeImage, changeFullName, changeAbout, changeDomain, changeCourse, changeCollege } =
    useAuth();
  const domains = [
    "Select your domain...",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile App Development",
    "AI / Machine Learning",
    "Data Science",
    "Data Engineering",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Blockchain / Web3",
    "Game Development",
    "UI / UX Design",
    "Database Management",
    "Embedded Systems",
    "IoT",
    "Software Testing / QA",
    "Automation",
    "Open Source",
    "Computer Networks",
    "System Design",
    "Competitive Programming",
    "Research",
    "Other",
  ];
  const courses = [
    "Select your course",
    "B.Tech / B.E.",
    "M.Tech / M.E.",
    "BCA",
    "MCA",
    "B.Sc. Computer Science",
    "M.Sc. Computer Science",
    "B.Sc. IT",
    "M.Sc. IT",
    "B.Sc. Data Science",
    "M.Sc. Data Science",
    "B.Sc. AI / ML",
    "M.Sc. AI / ML",
    "B.Sc. Cybersecurity",
    "M.Sc. Cybersecurity",
    "Diploma",
    "Ph.D.",
    "Other",
  ];
  const navigate = useNavigate();

  const currUser = Users.find(
    (user) => user.id === currUserId || user.id === currSessionUserId,
  );

  const [fullNameValue, setFullNameValue] = useState(currUser.fullName || "");
  const [aboutValue, setAboutValue] = useState(currUser.about || "");
  const [image, setImage] = useState(currUser.image || "");
  const [domain, setDomain] = useState(currUser.domain || "");
  const [bioValue, setBioValue] = useState(currUser.bio || "");
  const [course, setCourse] = useState(currUser.course || "");
  const [college, setCollege] = useState(currUser.college || "");

  const handleFullName = (name) => {
    setFullNameValue(name);
    if (/^[A-Za-z\s]+$/.test(name) && name.length >= 4) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }
  };

  const handleAbout = (about) => {
    if (about.length > 200) {
      setValidAbout(false);
      return;
    }
    setValidAbout(true);

    setAboutValue(about);
  };
  const handleBio = (bio) => {
    if (bio.length > 100) {
      setValidBio(false);
      return;
    }
    setValidBio(true);

    setBioValue(bio);
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
      changeAbout(currUser.id, aboutValue);
    }
    if (validNewPassword && validConfirmPassword && newPassword.length) {
      changePass(currUser.id, newPassword);
    }
    if (image !== currUser.image) {
      changeImage(currUser.id, image);
    }
    if(domain !== currUser.domain){
      changeDomain(currUser.id, domain);
    }
    if(bioValue !== currUser.bio){
      changeBio(currUser.id, bioValue);
    }
    if(course !== currUser.course){
      changeCourse(currUser.id, course);
    }
    if(college !== currUser.college){
      changeCollege(currUser.id, college);
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
    <div className="p-4 flex flex-col gap-4 bg-gray-100">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <h4 className="text-[14px] text-gray-600">
          Update your personal information.
        </h4>
      </div>
      <div className="bg-white w-full min-h-fit h-full rounded-lg shadow-lg p-4 gap-4 flex flex-col">
        <div className="flex justify-between sm:flex-row flex-col">
          <div className="flex flex-col gap-4 sm:w-1/2 sm:order-1 order-2">
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
          <div className="bg-gray-100 p-4 rounded-lg flex sm:flex-col items-center gap-4 sm:order-2 order-1">
            {image ? (
              <div className="sm:h-22 sm:w-22 h-40 w-40 flex">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : currUser.image ? (
              <div className="sm:h-22 sm:w-22 h-40 w-40 flex">
                <img
                  src={currUser.image}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-red-500 rounded-full w-40 h-40 sm:h-22 sm:w-22 flex justify-center items-center">
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
              About
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
              {aboutValue.length} / 200
            </h4>
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="font-semibold text-[14px]">
              Bio
            </label>
            <textarea
              name=""
              placeholder="write your bio here..."
              id="bio"
              className={`border-2 ${validBio ? "border-gray-300 focus:outline-purple-600" : "border-red-600 focus:outline-red-600"}  px-2 py-1 rounded-md text-[14px]`}
              value={bioValue}
              onChange={(e) => handleBio(e.target.value)}
              rows="3"
            />
            <h4
              className={`text-[12px] font-semibold text-right ${validBio ? "text-purple-600" : "text-red-600"}`}
            >
              {bioValue.length} / 100
            </h4>
          </div>
          <div className="flex justify-between flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:w-2/5">
              <label htmlFor="collegeName" className="text-[14px] font-semibold">College</label>
              <input
                type="text"
                name=""
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter your college name..."
                id=""
                className="px-2 py-1 rounded-md text-[14px] border-gray-300 border-2 text-gray-600 focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:w-2/5">
              <label htmlFor="domain" className="font-semibold text-[14px]">
                Select course
              </label>
              <select
                name=""
                id="domain"
                onChange={(e) => setCourse(e.target.value)}
                value={course}
                className="px-2 py-1 outline-none border-2 border-gray-300 rounded-md active:border-purple-600"
              >
                {courses.map((course) => (
                  <option
                    key={course}
                    value={course === "Select your domain..." ? "" : course}
                  >
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:w-2/5">
            <label htmlFor="domain" className="font-semibold text-[14px]">
              Select domain
            </label>
            <select
              name=""
              id="domain"
              onChange={(e) => setDomain(e.target.value)}
              value={domain}
              className="px-2 py-1 outline-none border-2 border-gray-300 rounded-md active:border-purple-600"
            >
              {domains.map((domain) => (
                <option
                  key={domain}
                  value={domain === "Select your domain..." ? "" : domain}
                >
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between sm:flex-row flex-col gap-4">
            <div className="flex flex-col sm:w-2/5">
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

            <div className="flex flex-col sm:w-2/5">
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
