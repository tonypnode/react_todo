import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/layout/header";
import AddTodo from "./components/addTodo";
import Todos from "./components/Todos";
import About from "./components/pages/about";
// import uuidv4 from 'uuid';
import Axios from "axios";


class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos: res.data}))
  }

  // toggle Complete
  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
      })})
  }

  // Delete a thing
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => this.setState( { todos: [...this.state.todos.filter( todo => todo.id !== id)]}))
  }

  // Add a thing
  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res =>     this.setState( {todos: [...this.state.todos, res.data]})
    )
  }



  render() {
    return (
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Route exact path="/" render={props => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                  </React.Fragment>
                  )} />
              <Route path='/about' component={About}/>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
