import { useAuth, useBookMark, useProject } from "../../../contexts";

function BookMarkCard({ projectId }) {
  const { projects } = useProject();
  const { removeBookMark } = useBookMark();
  const { currentUser } = useAuth();

  const currId = currentUser?.id;

  const currProject = projects.find(
    (project) =>
      project.createdOn === projectId && project.visibility === "Public",
  );

  const handleRemove = () => {
    removeBookMark(currId, currProject.createdOn);
  };
  return (
    <div>
      {currProject && (
        <div className="p-2 flex items-center border-b border-gray-300 pb-6 justify-between">
          <div className="w-1/2 flex items-center gap-4">
            <div className="bg-purple-300 p-1 rounded flex h-12 w-12">
              <img
                src={
                  currProject.projectImage ||
                  "https://cdn-icons-png.flaticon.com/256/6596/6596459.png"
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-[14px] line-clamp-1">
                {currProject.name}
              </h2>
              <h4 className="text-gray-600 text-[14px] line-clamp-1">
                {currProject.desc}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-4 w-1/2 justify-between">
            <div className="w-1/4">
              <h4 className="text-gray-600 px-2 py-1 text-[14px] rounded-md">
                {currProject.userId}
              </h4>
            </div>
            <div className="max-w-fit w-1/2 flex justify-start">
              <h4 className="bg-purple-200 text-purple-800 text-[14px] px-2 py-1 rounded-md truncate">
                {currProject.category}
              </h4>
            </div>
            <div onClick={handleRemove} className="cursor-pointer w-5">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4942/4942539.png"
                alt=""
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookMarkCard;
