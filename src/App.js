import { useState, useEffect } from "react";
import "./App.scss";
import { BsPlusCircleFill, BsCircle } from "react-icons/bs";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("./data.json");
      setTodos(result.data.todo);
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="task-container">
        <div className="task-container-header">
          <div className="task-container-heading">
            <span>
              <BsPlusCircleFill className="add-icon" />
            </span>
            <input type="text" placeholder="Add a task" />
          </div>
        </div>
        <div className="all-tasks">
          <h2>Task</h2>

          <div className="tasks">
            {todos.map((todo) => (
              <div key={todo.id} className="task">
                <div className="left">
                  <span>
                    <BsCircle className="circle-icon" />
                  </span>
                  <div className="task-text">
                    <h4>{todo.title}</h4>
                    <span>0/1</span> &nbsp;&nbsp;
                    <span>
                      <MdOutlineCalendarToday /> Today
                    </span>
                  </div>
                </div>
                <span>
                  <BiChevronDown />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
