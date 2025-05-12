import "./App.css";
import Button from "./components/Button/Button";
import FuncButton from "./components/FuncButton/FuncButton";
import { useEffect, useState } from "react";
import Navigate from "./components/Navigate.jsx"

export default function Complected(){
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    getToDo();
  }, []);

    return (
        <main>
              <div className="ToDO">
                <h2>Your completed tasks</h2>
                <div className="nav-block">
                  <Navigate>Home</Navigate>
                  <Navigate route="/complected">Complected</Navigate>
                </div>
                <div className="todo-blocks">
                  {todos.filter((item) => {
                      return item.done == true;
                    })
                    .map((item) => (
                      <div className="todo-block" key={item.id}>
                        <p className="todo-header">{item.text}</p>
        
                        <FuncButton color="red" onClick={deleteToDo} todoId={item.id}>
                          Delete
                        </FuncButton>
                      </div>
                    ))}
                </div>
              </div>
            </main>
    )
}