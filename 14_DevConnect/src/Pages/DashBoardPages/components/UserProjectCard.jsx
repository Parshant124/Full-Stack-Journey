import { useAuth, useBookMark, useNotification } from "../../../contexts";

function UserProjectCard({ project, bookmarked, userId }) {
  const { addBookMark, removeBookMark } = useBookMark();
  const { Users } = useAuth();
  const { addNotification } = useNotification();

  const handleAddBookMark = () => {
    const currUser = Users.find((user) => user.id === userId);
    const nowDate = new Date().toISOString().split("T")[0];

    const now = new Date();
    const noti = {
      type: "project bookmarked",
      // userImage: currUser.image || "",
      // projectImage: project.image || "",
      msg: `${currUser.fullName || "User"} bookmarked your project ${project.name}`,
      to: project.userId,
      read: false,
      id: Date.now(),
      date: nowDate,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${currUser.id}`,
    };

    addNotification(noti);

    addBookMark(userId, project.createdOn);
  };

  return (
    <div className="w-80 h-90 bg-white p-2 rounded-md shadow-lg flex flex-col gap-2">
      <div className="h-55 flex w-full">
        <img
          src={
            project.image ||
            `https://images.pexels.com/photos/30547618/pexels-photo-30547618.jpeg`
          }
          alt=""
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg line-clamp-1 overflow-hidden">
            {project.name}
          </h2>
          <h4 className="text-[14px] text-gray-600 line-clamp-2 overflow-hidden">
            {project.desc}
          </h4>
          <h4 className="text-[14px] text-purple-800 bg-purple-200 w-fit px-2 py-1 rounded-full">
            {project.category}
          </h4>
        </div>
        <div>
          {bookmarked ? (
            <div
              className="h-7 flex"
              onClick={() => removeBookMark(userId, project.createdOn)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2740/2740595.png"
                alt=""
              />
            </div>
          ) : (
            <div className="h-7 flex" onClick={handleAddBookMark}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3106/3106777.png"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProjectCard;
