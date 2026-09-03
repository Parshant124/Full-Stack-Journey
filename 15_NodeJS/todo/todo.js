const fs = require("fs");
const { argv } = require("process");
const filePath = "./tasks.json";

const command = argv[2];
const argument = argv[3];

function isDigitsOnly(str) {
  return /^\d+$/.test(str);
}

const loadTasks = () => {
  try {
    const dataStored = fs.readFileSync(filePath);
    const dataJSON = dataStored.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
};

const listTasks = () => {
  const tasks = loadTasks();

  tasks.map((task, index) => console.log(`${index + 1} - ${task}`));
};

const removeTask = (argument) => {
  const tasks = loadTasks();
  const toRemove = Number(argument);

  const newTasks = tasks.filter((task, index) => index + 1 !== toRemove);

  saveTasks(newTasks);
};

const removeAll = () => {
    saveTasks([]);
}

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  if (isDigitsOnly(argument)) removeTask(argument);
  else console.log("Enter a valid Index");
} else if (command === "remove all") {
    removeAll();
}
else {
  console.log("Code Pending");
}
