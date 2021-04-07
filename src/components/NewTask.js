import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";

import "../styles/newTask.css";

const NewTask = ({categories, sendData}) => {
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [category, setCategory] = useState("");
  let history = useHistory();

  const addNew = async () => {
    if (!name) {
      alert("Введите название задачи!")
      return;
    }

    let data = {
      name,
      completed,
      dueDate,
      dueTime,
      category
    };

    await sendData("tasks", data).then(res => {
      alert(res.name + " добавлен!");

      history.goBack();
    })
  };

  const openSettings = (e) => setCurrent(e.target.innerText);

  const buttons = [
    {
      xs: {span: 2},
      text: "Date"
    },
    {
      xs: {span: 2},
      text: "Time"
    },
    {
      xs: {
        span: 3,
        offset: 5
      },
      style: {textAlign: "right"},
      text: "Category"
    }
  ];

  return (
    <div className="newTask container-fluid">
      <header className="newTask__header">
        <Link to="/">Cancel</Link>
        <Button variant="link" onClick={addNew}>Done</Button>
      </header>

      <Form className="newTask__form">
        <FormGroup as={Row} controlId="newTask">
          <Col xs="2">
            <Form.Control type="checkbox" onChange={(e) => setCompleted(e.target.checked)}/>
          </Col>
          <Col xs="10">
            <Form.Control type="text" placeholder="Task" onChange={(e) => setName(e.target.value)}/>
            <div className="newTask__form-info">
              {dueDate && <span className="additional">D: {dueDate}</span>}
              {dueTime && <span className="additional">T: {dueTime}</span>}
            </div>
          </Col>
        </FormGroup>
      </Form>

      <hr/>
      <Row className="newTask__control-strip">
        {buttons.map((el, i) => <Col key={i} xs={el.xs}><Button variant="light" onClick={openSettings}
                                                                style={el.style}>{el.text}</Button> </Col>)}
      </Row>

      <br/>

      <div className="newTask__input-settings">
        {current === "Date" && <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>}
        {current === "Time" && <Form.Control type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)}/>}
        {current === "Category" && <Form className="newTask__category-select">
          {categories.map(el => <FormLabel className="newTask__category-item" key={el.id}
                                           style={{backgroundColor: el.color}}>
              <span className="newTask__category-info">
                <span className="newTask__category-name">{el.name}</span>
                <span className="newTask__category-count">{el.count} задач</span>
                </span>
            <FormControl type="radio" name="category" onChange={(e) => setCategory(e.target.dataset.value)}
                         data-value={el.id}/>
          </FormLabel>)}
        </Form>}
      </div>
    </div>
  );
};

export default NewTask;
