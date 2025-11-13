const apiUrl = "http://localhost:5000/api/todos";

async function loadTodos() {
  const res = await fetch(apiUrl);
  const todos = await res.json();
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    li.onclick = () => deleteTodo(t._id);
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todo-input");
  if (input.value.trim() === "") return;
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  });
  input.value = "";
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadTodos();
}

document.addEventListener("DOMContentLoaded", loadTodos);
