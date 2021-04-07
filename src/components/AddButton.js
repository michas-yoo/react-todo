import {useState} from "react";
import {Link} from "react-router-dom";

const AddButton = () => {
  const [canShowForm, setCanShowForm] = useState(false);

  const onClick = () => {
    setCanShowForm(!canShowForm);
  }

  return (
    <div className={"addButton" + (canShowForm ? " open" : "")}>
      <div className="addButton__links">
        <Link className="addButton__link" to="/newTask">Task</Link>
        <Link className="addButton__link" to="/newCategory">Category</Link>
      </div>

      <button className="addButton__button" onClick={onClick}>+</button>
    </div>
  );
};

export default AddButton;
