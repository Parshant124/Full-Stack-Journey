import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useAuth, useConnection, useProject, useTasks } from "../../contexts";
import DashInfoCards from "./components/DashInfoCards";
import DashTasks from "./components/DashTasks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function DashBoard() {
  const { projects } = useProject();
  const { tasks } = useTasks();
  const { connections } = useConnection();
  const { currentUser} = useAuth();

  const firstWord = currentUser?.fullName.substring(
    0,
    currentUser?.fullName.indexOf(" ") === -1
      ? currentUser?.fullName.length
      : currentUser?.fullName.indexOf(" "),
  );

  const userId = currentUser?.id;

  const myProjects = projects.filter((prev) => prev.userId === userId);
  const myTasks = tasks.filter((prev) => prev.userId === userId);

  const myCompletedTasks = myTasks.filter((prev) => prev.completed);

  const connectedUsers =
    connections
      .filter((conn) => conn.senderId === userId || conn.receiverId === userId)
      .map((conn) =>
        conn.senderId === userId ? conn.receiverId : conn.senderId,
      ) || [];
  return (
    <div className="overflow-y-auto h-full p-4 gap-6 flex flex-col bg-gray-50">
      <div
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/7135053/pexels-photo-7135053.jpeg)`,
        }}
        className="w-full h-40 flex items-center p-4 justify-between rounded-lg shadow-lg"
      >
        <div>
          <h2 className="font-bold text-2xl">Welcome back, {firstWord}</h2>
          <h4 className="text-[14px] text-gray-600">
            Let's build something important today.
          </h4>
        </div>
        <div className="">
          <img
            src="https://cdn-icons-png.flaticon.com/256/11933/11933140.png"
            alt=""
            className="h-35"
          />
        </div>
      </div>
      <div className="flex gap-4 py-4 sm:justify-between flex-wrap justify-center">
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/256/7457/7457274.png"
          title="Total Projects"
          data={myProjects.length}
          bgColor="purple-200"
          linkTo="/myprojects"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/128/190/190411.png"
          title="Task Completed"
          data={myCompletedTasks.length}
          bgColor="green-200"
          linkTo="/tasks"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/128/12196/12196745.png"
          title="Task Pending"
          data={myTasks.length - myCompletedTasks.length}
          bgColor="blue-200"
          linkTo="/tasks"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/128/3437/3437297.png"
          title="Connections"
          data={connectedUsers.length}
          bgColor="orange-200"
          linkTo="/connections"
        />
      </div>
      <div className="w-full h-full flex gap-4 md:flex-row flex-col">
        <div className="md:w-3/5 w-full shadow-md h-80 rounded-lg bg-white p-4">
          <h2 className="font-semibold">Activity</h2>
          <div className="h-[90%]">
            <Line
              data={{
                labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                datasets: [
                  {
                    label: "Projects",
                    data: [3, 4, 3, 2, 5, 4],

                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,

                    borderColor: "#7c3aed",
                    backgroundColor: "rgba(124, 58, 237, 0.15)",

                    fill: true,
                  },
                  {
                    label: "Tasks",
                    data: [5, 6, 5, 4, 4, 7],

                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,

                    borderColor: "blue",
                    backgroundColor: "rgba(12, 58, 237, 0.15)",

                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },

                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                    grid: {
                      display: true,
                    },
                  },

                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="md:w-2/5 shadow-md h-full rounded-lg bg-white">
          {" "}
          <DashTasks />{" "}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
