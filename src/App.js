import { useEffect, useState } from "react";
import "./App.scss";
import data from "./data.json";
import CompletedTodos from "./components/completed-todos";
import TodoInput from "./components/todo-input";
import Todo from "./components/todo";
import SubTodoList from "./components/sub-todo-list";
import { BsPlusCircleFill } from "react-icons/bs";
// import writeFileP from "write-file-p";

function App() {
  const [todos, setTodos] = useState(data);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [showSubtodo, setShowSubtodo] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [unCompletedTodos, setUnCompletedTodos] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [subTaskInput, setSubTaskInput] = useState(false);

  useEffect(() => {
    const completedTodo = todos.filter((todo) => todo.completed === true);
    setCompletedTodos(completedTodo);

    const unCompletedTodo = todos.filter((todo) => todo.completed === false);
    setUnCompletedTodos(unCompletedTodo);

    // handleSaveToPC(todos)
    // writeFileP.sync(`${__dirname}/data.json`, todos);
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Empty input, pls add a todo/task");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      subTodos: [],
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const addSubTodo = (subTask, id) => {
    if (subTask === "") {
      alert("Empty input, pls add a sub todo/task");
      return;
    }

    const newTodo = [...todos];

    const len = newTodo[id - 1].subTodos.length;

    const newSubTodo = {
      id: len + 1,
      title: subTask,
      completed: false,
    };

    newTodo[id - 1].subTodos.push(newSubTodo);
    setTodos(newTodo);
    setSubTask("");
    setSubTaskInput(false);
  };

  const setDueDate = (id, date) => {
    const updatedTodoList = [...todos];
    updatedTodoList[id - 1].dueDate = date;
    setTodos(updatedTodoList);
  };

  const markTodoAsComplete = (id) => {
    const newTodo = [...todos];

    if (newTodo[id - 1].subTodos.length === 0) {
      newTodo[id - 1].completed = true;
      setTodos(newTodo);
    } else {
      const completedSubTodos = newTodo[id - 1].subTodos.every(
        (subTodo) => subTodo.completed
      );

      if (completedSubTodos) {
        newTodo[id - 1].completed = true;
        setTodos(newTodo);
      } else {
        alert("Complete your sub tasks");
      }
    }
  };

  const markSubTodoAsComplete = (todoId, subTodoId) => {
    const newTodo = [...todos];

    const subTodos = newTodo[todoId - 1].subTodos;

    subTodos[subTodoId - 1].completed = true;
    newTodo[todoId - 1].subTodos = subTodos;
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

  const handleSaveToPC = (jsonData) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
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
                    <span onClick={addTodo}>
                      <BsPlusCircleFill className="add-icon" />
                    </span>
                    <input
                      type="text"
                      placeholder="Add sub-task"
                      onChange={(e) => setSubTask(e.target.value)}
                      value={subTask}
                    />
                    <button
                      className="edit-button"
                      onClick={() => addSubTodo(subTask, todo.id)}
                    >
                      Add Sub Todo
                    </button>
                  </div>
                )}

                {todo.subTodos &&
                  todo.subTodos.map((subTodo) => (
                    <SubTodoList
                      key={subTodo.id}
                      todo={todo}
                      subTodo={subTodo}
                      showSubtodo={showSubtodo}
                      markSubTodoAsComplete={markSubTodoAsComplete}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* <TodoList
          todos={unCompletedTodos}
          title={title}
          setTitle={setTitle}
          edit={edit}
          showSubtodo={showSubtodo}
          setShowSubtodo={setShowSubtodo}
          removeTodo={removeTodo}
          markTodoAsComplete={markTodoAsComplete}
          updateTodo={updateTodo}
          handleEditChange={handleEditChange}
          markSubTodoAsComplete={markSubTodoAsComplete}
        /> */}

        {completedTodos.length !== 0 && (
          <CompletedTodos completedTodos={completedTodos} />
        )}
      </div>
    </div>
  );
}

export default App;
