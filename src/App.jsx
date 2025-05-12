import "./App.css";
import Button from "./components/Button/Button";
import FuncButton from "./components/FuncButton/FuncButton";
import { useEffect, useState } from "react";
import Navigate from "./components/Navigate.jsx"

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function getToDo() {
    try {
      let response = await fetch("http://localhost:3000/todos");
      if (!response.ok) {
        console.log("Error in response");
        return;
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addToDo() {
    if (!inputValue.trim()) return;

    const newTodo = {
      text: inputValue,
      done: false,
    };

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        console.log("Error in addToDo");
        return;
      }
      const data = await response.json();

      setTodos([...todos, data]);
      setInputValue("");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteToDo(ToDo_id) {
    if (!ToDo_id) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${ToDo_id}`, {
        method: "DELETE",
      });

      setTodos((prev) => prev.filter((todo) => todo.id !== ToDo_id));
    } catch (err) {
      console.log(err);
    }
  }

  const activateEdit = (id, currentText) => {
    setEditingId(id);
    setInputValue(currentText);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    if (editingId) {
      await editToDo(editingId);
    } else {
      await addToDo();
    }

    setInputValue("");
    setEditingId(null);
  };

  async function editToDo(id) {
    if (!inputValue.trim() || !id) return;

    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputValue }),
      });

      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
      }
    } catch (err) {
      console.error("Edit error:", err);
    }
  }

  async function complectedToDo(id) {
    if (!id) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: true }),
      });

      if (!response.ok) {
        console.log("Error in complectedToDo");
        return;
      }
      
      const data = await response.json();

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? data : todo
      );
      setTodos(updatedTodos);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getToDo();
  }, []);

  return (
    <main>
      <div className="ToDO">
        <h2>Creat your ToDo-list</h2>
        <div className="nav-block">
          <Navigate>Home</Navigate>
          <Navigate route="/complected">Complected</Navigate>
        </div>
        <div className="add-block">
          <input
            id="input"
            type="text"
            placeholder="What are your tasks for today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addToDo()}
          />
          <Button onClick={handleSubmit} className="add-btn">
            {editingId ? "Save" : "Add"}{" "}
          </Button>
        </div>
        <div className="todo-blocks">
          {todos
            .filter((item) => {
              return item.done == false;
            })
            .map((item) => (
              <div className="todo-block" key={item.id}>
                <p className="todo-header">{item.text}</p>

                <FuncButton
                  color="green"
                  onClick={() => activateEdit(item.id, item.text)}
                >
                  Edit
                </FuncButton>

                <FuncButton color="orange"
                onClick={() => complectedToDo(item.id)}
                >
                  Complected</FuncButton>

                <FuncButton color="red" onClick={deleteToDo} todoId={item.id}>
                  Delete
                </FuncButton>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
