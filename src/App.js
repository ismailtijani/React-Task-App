import { useEffect, useState } from "react";
import "./App.scss";
import { BsPlusCircleFill, BsCircle } from "react-icons/bs";
import {
  MdOutlineCalendarToday,
  MdDelete,
  MdEdit,
  MdAdd,
} from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import data from "./data.json";

function App() {
  const [todos, setTodos] = useState(data);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [showSubtodo, setShowSubtodo] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const completedTodo = todos.filter((todo) => todo.completed === true);
    setCompletedTodos(completedTodo);
  }, [todos]);

  // console.log(sCompletedTodos);

  const addTodo = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Add a todo");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      subTodos: [],
    };

    setTodos([...todos, newTodo]);
  };

  const markTodoAsComplete = (id) => {
    const newTodo = [...todos];
    newTodo[id - 1].completed = true;
    setTodos(newTodo);
  };

  const updateTodo = (id, text) => {
    const newTodos = [...todos];
    newTodos[id - 1].title = text;
    setTodos(newTodos);
    setEdit(false);
  };

  const handleEditChange = (id, text) => {
    setEdit(id);
    setTitle(text);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.splice(id - 1, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="task-container">
        <div className="task-container-header">
          <div className="task-container-heading">
            <span onClick={addTodo}>
              <BsPlusCircleFill className="add-icon" />
            </span>
            <input
              type="text"
              placeholder="Add a task"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="all-tasks">
          <h3>Task - {todos.length}</h3>

          <div className="tasks">
            {todos.map((todo) => (
              <div key={todo.id}>
                <div className="task">
                  <div className="left">
                    <span onClick={() => markTodoAsComplete(todo.id)}>
                      {todo.completed ? (
                        <AiFillCheckCircle className="circle-icon" />
                      ) : (
                        <BsCircle className="circle-icon" />
                      )}
                    </span>

                    {/* <span>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => markTodoAsComplete(todo.id)}
                      />
                    </span> */}
                    <div className="task-text">
                      {edit === todo.id ? (
                        <input
                          type="text"
                          className="edit-todo-input"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      ) : (
                        <h4>{todo.title}</h4>
                      )}
                      {edit === todo.id ? (
                        ""
                      ) : (
                        <div>
                          <span>0/1</span> &nbsp;&nbsp;
                          <span>
                            <MdOutlineCalendarToday /> Today
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {edit === todo.id ? (
                    <button
                      className="edit-button"
                      onClick={() => updateTodo(todo.id, title)}
                    >
                      Edit todo
                    </button>
                  ) : (
                    <div className="todo-icons">
                      <div className="todo-icons-inner">
                        <span onClick={() => removeTodo(todo.id)}>
                          <MdAdd />
                        </span>
                        <span
                          onClick={() => handleEditChange(todo.id, todo.title)}
                        >
                          <MdEdit />
                        </span>
                        <span onClick={() => removeTodo(todo.id)}>
                          <MdDelete />
                        </span>
                      </div>
                      <span
                        className="arrow"
                        onClick={() => {
                          if (todo.subTodos.length === 0) {
                            alert("Add a todo");
                            return;
                          }

                          setShowSubtodo(!showSubtodo);
                        }}
                      >
                        {showSubtodo ? <BiChevronUp /> : <BiChevronDown />}
                      </span>
                    </div>
                  )}
                </div>
                {todo.subTodos &&
                  todo.subTodos.map((subTodo) => (
                    <div
                      key={subTodo.id}
                      className={showSubtodo ? "sub-todo" : "none"}
                    >
                      <div className="sub-todo-content">
                        <span>
                          {todo.completed ? (
                            <AiFillCheckCircle className="circle-icon" />
                          ) : (
                            <BsCircle className="circle-icon" />
                          )}
                        </span>
                        {/* <span>
                          <input
                            type="checkbox"
                            checked={subTodo.completed}
                            onChange={() => markTodoAsComplete(subTodo.id)}
                          />
                        </span> */}
                        <div className="task-text">
                          <h4>{subTodo.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {completedTodos.length !== 0 && (
          <div className="completed-tasks">
            <h3>Completed - {completedTodos.length}</h3>

            {completedTodos.map((todo) => (
              <div key={todo.id} className="completed-task">
                <span onClick={() => markTodoAsComplete(todo.id)}>
                  {todo.completed ? (
                    <AiFillCheckCircle className="circle-icon" />
                  ) : (
                    <BsCircle className="circle-icon" />
                  )}
                </span>
                {/* <span>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => markTodoAsComplete(todo.id)}
                  />
                </span> */}
                <h4>{todo.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
