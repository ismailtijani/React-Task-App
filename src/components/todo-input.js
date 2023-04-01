import { BsPlusCircleFill } from "react-icons/bs";

const TodoInput = ({ addTodo, setTitle, title }) => {
  return (
    <div className="task-container-heading">
      <span onClick={addTodo}>
        <BsPlusCircleFill className="add-icon" />
      </span>
      <input
        type="text"
        placeholder="Add a task"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );
};

export default TodoInput;
