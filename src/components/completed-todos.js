import { AiFillCheckCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { getRelativeDate } from "../utils/helper.utils";

const CompletedTodos = ({ completedTodos, removeTodo }) => {
  return (
    <div className="completed-tasks">
      <h3>Completed - {completedTodos.length}</h3>

      {completedTodos.map((todo) => (
        <div key={todo.id} className="completed-task">
          <div className="completed-task-inner">
            <span>
              <AiFillCheckCircle className="circle-icon" />
            </span>
            <div>
              <h4>{todo.title}</h4>
              <p>
                {" "}
                {todo.dueDate === undefined
                  ? null
                  : getRelativeDate(todo.dueDate).toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <span onClick={() => removeTodo(todo.id)}>
            <MdDelete />
          </span>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodos;
