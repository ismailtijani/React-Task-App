import { useEffect, useState } from "react";
import "./App.scss";
import CompletedTodos from "./components/completed-todos";
import TodoInput from "./components/todo-input";
import Todo from "./components/todo";
import SubTodoList from "./components/sub-todo-list";
import { BsPlusCircleFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import baseUrl from "./constant";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [showSubtodo, setShowSubtodo] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [unCompletedTodos, setUnCompletedTodos] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [subTaskInput, setSubTaskInput] = useState(false);

  const getTodos = async () => {
    const res = await fetch(baseUrl);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    const completedTodo = todos.filter((todo) => todo.completed === true);
    setCompletedTodos(completedTodo);

    const unCompletedTodo = todos.filter((todo) => todo.completed === false);
    setUnCompletedTodos(unCompletedTodo);
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Empty input, pls add a todo/task");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      subTodos: [],
    };

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setTodos([...todos, newTodo]);
      setTitle("");
    });
  };

  const addSubTodo = async (subTask, id) => {
    if (subTask === "") {
      alert("Empty input, pls add a sub todo/task");
      return;
    }

    const newTodo = [...todos];

    const subTodo = newTodo.find((t) => t.id === id).subTodos;

    const newSubTodo = {
      id: uuidv4(),
      title: subTask,
      completed: false,
    };

    const subTodos = [...subTodo, newSubTodo];

    await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subTodos }),
    }).then(() => {
      getTodos();
      setSubTask("");
      setSubTaskInput(false);
    });
  };

  const setDueDate = async (id, date) => {
    await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dueDate: date,
      }),
    }).then(() => getTodos());
  };

  const update = async (id) =>
    await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    }).then(() => getTodos());

  const markTodoAsComplete = async (id) => {
    const newTodo = [...todos];

    const subTodo = newTodo.find((t) => t.id === id);

    const completedSubTodos = subTodo.subTodos.every(
      (subTodo) => subTodo.completed
    );

    if (subTodo.subTodos.length === 0) {
      update(id);
      return;
    } else if (subTodo.subTodos.length > 0) {
      if (completedSubTodos) {
        update(id);
      } else {
        alert("Complete all sub task");
        return;
      }
    }
  };

  const markSubTodoAsComplete = async (todoId, todoIndex, subTodoIndex) => {
    const newTodo = [...todos];

    let subTodos = newTodo.find((t) => t.id === todoId).subTodos;

    subTodos[subTodoIndex].completed = true;
    newTodo[todoIndex].subTodos = subTodos;

    console.log("new todos", newTodo);

    await fetch(`${baseUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subTodos,
      }),
    }).then(() => getTodos());
  };

  const updateTodo = async (id, text) => {
    await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
      }),
    }).then(() => {
      getTodos();
      setTitle("");
      setEdit(false);
    });
  };

  const handleEditChange = (id, text) => {
    setEdit(id);
    setTitle(text);
  };

  const removeTodo = async (id) => {
    await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then(() => getTodos());
  };

  return (
    <div className="app">
      <div className="task-container">
        <div className="task-container-header">
          <TodoInput addTodo={addTodo} title={title} setTitle={setTitle} />
        </div>

        <div className="all-tasks">
          <h3>Task - {unCompletedTodos.length}</h3>

          <div className="tasks">
            {unCompletedTodos.map((todo, index) => (
              <div key={todo.id}>
                <Todo
                  todo={todo}
                  title={title}
                  setTitle={setTitle}
                  edit={edit}
                  setEdit={setEdit}
                  showSubtodo={showSubtodo}
                  setShowSubtodo={setShowSubtodo}
                  removeTodo={removeTodo}
                  markTodoAsComplete={markTodoAsComplete}
                  updateTodo={updateTodo}
                  handleEditChange={handleEditChange}
                  subTaskInput={subTaskInput}
                  setSubTaskInput={setSubTaskInput}
                  setDueDate={setDueDate}
                />

                {subTaskInput === todo.id && (
                  <div className="add-sub-task">
                    <div className="add-sub-task-inner">
                      <span onClick={addTodo}>
                        <BsPlusCircleFill className="add-icon" />
                      </span>
                      <input
                        type="text"
                        placeholder="Add sub-task"
                        onChange={(e) => setSubTask(e.target.value)}
                        value={subTask}
                      />
                    </div>

                    <div className="add-sub-task-inner">
                      <button
                        className="edit-button"
                        onClick={() => addSubTodo(subTask, todo.id, index)}
                      >
                        Add Sub Todo
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => setSubTaskInput(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {todo.subTodos &&
                  todo.subTodos.map((subTodo, subTodoIndex) => (
                    <SubTodoList
                      key={subTodo.id}
                      todo={todo}
                      subTodo={subTodo}
                      todoIndex={index}
                      subTodoIndex={subTodoIndex}
                      showSubtodo={showSubtodo}
                      markSubTodoAsComplete={markSubTodoAsComplete}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {completedTodos.length !== 0 && (
          <CompletedTodos
            completedTodos={completedTodos}
            removeTodo={removeTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
