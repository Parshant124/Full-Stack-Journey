import { useAuth, useBookMark, useNotification } from "../../../contexts";

function ExploreProjectCard({ project, bookmarked }) {
  const { addBookMark, removeBookMark } = useBookMark();
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();

  const userId = currentUser?.id;

  const handleAddBookMark = () => {
    const nowDate = new Date().toISOString().split("T")[0];
    const now = new Date();
    const noti = {
      type: "project bookmarked",
      // userImage: currUser.image || "",
      // projectImage: project.image || "",
      msg: `${currentUser.fullName || "User"} bookmarked your project ${project.name}`,
      to: project.userId,
      read: false,
      id: Date.now(),
      date: nowDate,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${currentUser.id}`,
    };

    addNotification(noti);

    addBookMark(userId, project.createdOn);
  };
  return (
    <div className="flex justify-between items-center pt-4 pb-4 border-b-2 border-gray-300">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 flex">
          <img
            src={
              project.image ||
              "https://cdn-icons-png.flaticon.com/128/9672/9672290.png"
            }
            alt=""
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-semibold line-clamp-1">
            {project.name}
          </h2>
          <h4 className="text-[14px] text-gray-600 line-clamp-1">
            {project.desc}
          </h4>
        </div>
      </div>
      <div>
        {bookmarked && (
          <button
            className="h-6 w-6 flex"
            onClick={() => removeBookMark(userId, project.createdOn)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
              alt=""
              className="w-full h-full"
            />
          </button>
        )}
        {!bookmarked && (
          <button className="h-6 w-6 flex" onClick={handleAddBookMark}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
              alt=""
              className="w-full h-full"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ExploreProjectCard;
