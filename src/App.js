import {useEffect, useState} from "react";
import {useLocation, Switch, Route} from "react-router-dom";

import ContainerBlock from "./components/ContainerBlock";
import AddButton from "./components/AddButton";
import NewTask from "./components/NewTask";
import NewCategory from "./components/NewCategory";

import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  // Fetch categories
  const fetchData = async (url, single = "") => {
    const res = await fetch(`http://localhost:5000/${url}/${single}`);
    return await res.json();
  };

  // Send data to the server
  const sendData = async (url, data) => {
    return await fetch("http://localhost:5000/" + url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(e => e.json());
  }

  // get element id (without unneeded iterations)
  const getElById = (arr, id) => {
    let res = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        res = arr[i];
        break;
      }
    }
    return res;
  }

  // setup data flow
  const getData = async () => {
    let localCategories = await fetchData("categories");
    let localTasks = await fetchData("tasks");

    const updateCats = () => {
      if (localCategories.length && localTasks.length) {
        setCategories(localCategories.map(el => {
          const count = localTasks.filter(task => task.category === el.id).length;

          return {
            count,
            ...el
          };
        }));
      } else
        setTimeout(() => {
          updateCats();
        }, 50);
    }

    updateCats();

    const updateTasks = () => {
      if (localCategories.length > 0 && localTasks.length > 0) {
        setTasks(localTasks.map(el => {
          const theCategory = getElById(localCategories, el.category);
          const color = theCategory.color ?? "white";

          return {
            color,
            ...el
          }
        }));
      } else {
        setTimeout(() => {
          updateTasks();
        }, 50);
      }
    }

    updateTasks();

  };

  // fetch data on location change
  useEffect(() => {
    if (location.pathname === "/")
      getData()
  }, [location]);

  return (
    <div className="App container-fluid">
      <Switch>
        <Route path="/" exact>
          <h1>Сегодня</h1>
          <ContainerBlock type="tasks" data={tasks}/>

          <br/>
          <h3>Списки дел</h3>

          <ContainerBlock type="categories" data={categories}/>
          <AddButton/>
        </Route>
        <Route path="/newTask"><NewTask categories={categories} sendData={sendData}/></Route>
        <Route path="/newCategory"><NewCategory sendData={sendData}/></Route>
      </Switch>
    </div>
  );
}

export default App;
