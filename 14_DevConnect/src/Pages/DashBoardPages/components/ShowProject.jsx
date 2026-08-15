import React from "react";
import {
  useAuth,
  useBookMark,
  useCurrSessionUser,
  useCurrUser,
  useProject,
} from "../../../contexts";

function ShowProject() {
  const { projects } = useProject();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();
  const { bookmarks, addBookMark, removeBookMark } = useBookMark();

  const currId = currSessionUserId || currUserId;

  const showProjects = projects.filter(
    (project) => project.userId !== currId && project.visibility === "Public",
  );

  const ownerFullName = (userId) => {
    const userInfo = Users.filter((user) => user.id === userId);

    return userInfo[0].fullName;
  };

  const checkBookMarked = (projectId) => {
    const exist = bookmarks.filter(
      (prev) => prev.user === currId && prev.project === projectId,
    );

    return exist.length > 0 ? true : false;
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {showProjects.map((project) => (
        <div className="bg-white p-8 w-[30%] h-90 min-h-fit rounded-lg shadow-lg flex flex-col gap-4">
          <div className="flex justify-center w-full h-50">
            <img
              src={project.image ||"https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?_gl=1*etdg79*_ga*NzY2MzQyMzk1LjE3NjE3NTY5ODI.*_ga_8JE65Q40S6*czE3ODYwMTM3ODIkbzE2JGcxJHQxNzg2MDEzODI0JGoxOCRsMCRoMA.."}
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold">{project.name}</h2>
              <h4 className="text-[14px] text-gray-600">{project.desc}</h4>
            </div>
            <div>
              {checkBookMarked(project.createdOn) ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
                  alt=""
                  width="20px"
                  onClick={() => removeBookMark(currId, project.createdOn)}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
                  alt=""
                  width="20px"
                  onClick={() => addBookMark(currId, project.createdOn)}
                />
              )}
            </div>
          </div>
          <div>
            <h4 className="text-[14px]">
              Creator :{" "}
              <span className="text-purple-600">
                {ownerFullName(project.userId)}
              </span>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowProject;
