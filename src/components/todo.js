import { BsCircle } from "react-icons/bs";
import { MdDelete, MdEdit, MdAdd, MdOutlineCountertops } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import moment from "moment";
import { getRelativeDate } from "../utils/helper.utils";

const Todo = ({
  todo,
  title,
  setTitle,
  edit,
  setEdit,
  showSubtodo,
  setShowSubtodo,
  removeTodo,
  markTodoAsComplete,
  updateTodo,
  handleEditChange,
  subTaskInput,
  setSubTaskInput,
  setDueDate,
}) => {
  return (
    <div className="task">
      <div className="left">
        <span onClick={() => markTodoAsComplete(todo.id)}>
          <BsCircle className="circle-icon" />
        </span>
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
            <div className="down">
              {todo.subTodos.length === 0 ? null : (
                <span className="sub-task-count">
                  <MdOutlineCountertops />
                  &nbsp;
                  {todo.subTodos.filter((t) => t.completed).length}/
                  {todo.subTodos.length}
                </span>
              )}
              <span className="due-date">
                <input
                  type="date"
                  placeholder=""
                  onChange={(event) => {
                    if (!moment(event.target.value).isBefore(moment(), "day")) {
                      setDueDate(todo.id, event.target.value);
                    } else {
                      alert("You can pick a day that has passed");
                    }
                  }}
                  required
                />
                {todo.dueDate === undefined
                  ? "No due date"
                  : getRelativeDate(todo.dueDate).toLocaleUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
      {edit === todo.id ? (
        <div>
          <button onClick={() => updateTodo(todo.id, title)}>Edit todo</button>
          <button
            onClick={() => {
              setEdit(false);
              setTitle("");
            }}
          >
            Cancel Edit
          </button>
        </div>
      ) : (
        <div className="todo-icons">
          {!subTaskInput && (
            <div className="todo-icons-inner">
              <span onClick={() => setSubTaskInput(todo.id)}>
                <MdAdd />
              </span>
              <span onClick={() => handleEditChange(todo.id, todo.title)}>
                <MdEdit />
              </span>
              <span onClick={() => removeTodo(todo.id)}>
                <MdDelete />
              </span>
            </div>
          )}
          {showSubtodo === todo.id ? (
            <span className="arrow" onClick={() => setShowSubtodo(false)}>
              <BiChevronUp />
            </span>
          ) : (
            <span
              className="arrow"
              onClick={() => {
                if (todo.subTodos.length === 0) {
                  alert("Add a sub todo");
                  return;
                }

                setShowSubtodo(todo.id);
              }}
            >
              <BiChevronDown />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
