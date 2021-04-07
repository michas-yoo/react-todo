import Task from "./Task";
import Category from "./Category";

const ContainerBlock = ({type, data}) => {
  return (
    <div className={type + "Container"}>
      {data.map(el => {
        return type === "tasks" ?
          <Task key={el.id} data={el}/> :
          <Category key={el.id} data={el} />
      })}
    </div>
  );
};

export default ContainerBlock;
