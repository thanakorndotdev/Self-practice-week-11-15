const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function createTaskElement(taskText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = () => span.classList.toggle("done");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => li.remove();
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

addBtn.onclick = () => {
const text = taskInput.value.trim();
  if (text) {
    const taskEl = createTaskElement(text);
    taskList.appendChild(taskEl);
    taskInput.value = "";
    }
};

taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addBtn.click();
});