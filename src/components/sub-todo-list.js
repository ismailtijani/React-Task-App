import { BsCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

const SubTodoList = ({ todo, subTodo, showSubtodo, markSubTodoAsComplete }) => {
  return (
    <div className={showSubtodo === todo.id ? "sub-todo" : "none"}>
      <div className="sub-todo-content">
        <span onClick={() => markSubTodoAsComplete(todo.id, subTodo.id)}>
          {subTodo.completed ? (
            <AiFillCheckCircle className="circle-icon" />
          ) : (
            <BsCircle className="circle-icon" />
          )}
        </span>
        <div className="task-text">
          <h4>{subTodo.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default SubTodoList;
