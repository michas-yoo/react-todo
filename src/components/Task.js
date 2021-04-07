import {Form} from "react-bootstrap";

const Task = ({data}) => {
  // console.log(data);

  return (
    <div className="task">
      <Form className="container-fluid">
        <Form.Group controlId={"status-" + data.id} className="row align-items-center justify-content-between">
          <Form.Check type="checkbox" label={data.name} defaultChecked={data.completed} />
          <div className="dot" style={{backgroundColor: data.color}}/>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Task;
