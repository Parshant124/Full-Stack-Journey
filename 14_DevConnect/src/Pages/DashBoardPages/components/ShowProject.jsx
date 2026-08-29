import React from "react";
import {
  useAuth,
  useBookMark,
  useNotification,
  useProject,
} from "../../../contexts";

function ShowProject() {
  const { projects } = useProject();
  const { Users, currentUser } = useAuth();
  const { bookmarks, addBookMark, removeBookMark } = useBookMark();
  const { addNotification } = useNotification();

  const currId = currentUser?.id;

  const showProjects = projects.filter(
    (project) => project.userId !== currId && project.visibility === "Public",
  );

  const checkBookMarked = (projectId) => {
    const exist = bookmarks.filter(
      (prev) => prev.user === currId && prev.project === projectId,
    );

    return exist.length > 0 ? true : false;
  };

  const handleAddBookMark = (project) => {
    const currUser = Users.find((user) => user.id === currId);

    const now = new Date();
    const noti = {
      type: "project bookmarked",
      // userImage: currUser.image || "",
      // projectImage: project.image || "",
      msg: `${currUser.fullName || "User"} bookmarked your project ${project.name}`,
      to: project.userId,
      read: false,
      id: Date.now(),
      date:
        `${String(now.getDate()).padStart(2, "0")}/` +
        `${String(now.getMonth() + 1).padStart(2, "0")}/` +
        `${now.getFullYear()}`,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${currUser.id}`,
    };

    addNotification(noti);

    addBookMark(currId, project.createdOn);
  };

  return (
    <div className="flex gap-4 flex-wrap justify-around">
      {showProjects.map((project) => (
        <div className="bg-white p-8 w-80 h-90 rounded-lg shadow-lg flex flex-col gap-4">
          <div className="flex justify-center w-full h-50">
            <img
              src={
                project.image ||
                "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?_gl=1*etdg79*_ga*NzY2MzQyMzk1LjE3NjE3NTY5ODI.*_ga_8JE65Q40S6*czE3ODYwMTM3ODIkbzE2JGcxJHQxNzg2MDEzODI0JGoxOCRsMCRoMA.."
              }
              alt=""
              className="w-full h-full object-fill rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-60">
              <h2 className="font-semibold line-clamp-1">{project.name}</h2>
              <h4 className="text-[14px] text-gray-600 line-clamp-2">
                {project.desc}
              </h4>
            </div>
            <div className="w-5">
              {checkBookMarked(project.createdOn) ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
                  alt=""
                  onClick={() => removeBookMark(currId, project.createdOn)}
                  className="w-full"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
                  alt=""
                  onClick={() => handleAddBookMark(project)}
                  className="w-full"
                />
              )}
            </div>
          </div>
          <div>
            <h4 className="text-[14px]">
              Creator :{" "}
              <span className="text-purple-600">{project.creator}</span>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowProject;
