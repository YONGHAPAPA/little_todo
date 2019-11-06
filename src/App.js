import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import CreateTodo from "./component/create-todo.component";
import EditTodo from "./component/edit-todo.component";
import TodoList from "./component/edit-todo.component";

import logo from "./logo.png";


class App extends Component {
  render(){

    return (
      <Router>
        <div className='container'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href=" https://obscure-journey-76711.herokuapp.com" target="_blank">
              <img src={logo} with="30" height="30" alt="Little-Todo" />
            </a>
            <Link to="/" className="navbar-brand">Little-Todo App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}


export default App;