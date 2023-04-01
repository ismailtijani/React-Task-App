import { AiFillCheckCircle } from "react-icons/ai";

const CompletedTodos = ({ completedTodos }) => {
  return (
    <div className="completed-tasks">
      <h3>Completed - {completedTodos.length}</h3>

      {completedTodos.map((todo) => (
        <div key={todo.id} className="completed-task">
          <span>
            <AiFillCheckCircle className="circle-icon" />
          </span>
          <h4>{todo.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodos;
