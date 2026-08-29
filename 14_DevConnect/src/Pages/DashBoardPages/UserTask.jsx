import { useParams } from "react-router-dom";
import { useAuth, useTasks } from "../../contexts";
import UserTaskCard from "./components/UserTaskCard";

function UserTask() {
  const { userName } = useParams();
  const { tasks } = useTasks();
  const { Users } = useAuth();

  const userTasks = tasks.filter((task) => task.userId === userName);
  const userInfo = Users.find((user) => user.id === userName);

  return (
    <div>
      <div className="p-4 flex justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-purple-600">{userInfo.fullName}'s</span> Tasks
          </h2>
          <h4 className="text-[14px] text-gray-600">
            These are the tasks assigned to {userInfo.fullName}
          </h4>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded-sm"></div>
            <h4 className="text-[14px]">Completed</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-300 rounded-sm"></div>
            <h4 className="text-[14px]">In Progress</h4>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 h-full">
        {userTasks.length > 0 ? (
          userTasks.map((task) => (
            <div className="p-2">
              <UserTaskCard task={task} />
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-3xl font-bold text-gray-600">
            Nothing...
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTask;
