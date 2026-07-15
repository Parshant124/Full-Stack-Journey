document.addEventListener('DOMContentLoaded', ()=>{
    let todoInput = document.getElementById("todo-input");
    let addBtn = document.getElementById("add-task-btn");
    let todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));

    addBtn.addEventListener("click", () => {
      let currTask = todoInput.value.trim();

      if (currTask === "") return;

      const currObj = {
        taskId: Date.now(),
        task: currTask,
        completed: false,
      };

      tasks.push(currObj);
      saveTasks()
      renderTask(currObj)
      todoInput.value = "";
    });

    function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function renderTask(task){
        let li = document.createElement('li')
        li.setAttribute('data_id', task.id);
        if(task.completed){
            li.classList.add('completed')
        }
        li.innerHTML = `
        <span> ${task.task} </span>
        <button>delete </button>
        `;

        todoList.appendChild(li);

        li.addEventListener('click', (event)=>{
            if(event.target.tagName === 'BUTTON') return;

            task.completed =! task.completed;
            li.classList.toggle('completed');

            saveTasks();
        })

        li.querySelector('button').addEventListener('click', (event)=>{
            event.stopPropagation();

            tasks = tasks.filter((t) => t.taskId !== task.taskId);
            li.remove()
            saveTasks()
            
        })
    }
})