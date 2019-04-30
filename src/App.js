import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    name: '',
    id: '',
  };
  handleNameChange = value => {
    this.setState({ name: value });
  };
  handleIdChange = value => {
    this.setState({ id: value });
  };
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }
  handleDelete(id) {
    fetch(`/users/${id}`, {
      method: 'delete',
    })
      .then(res => console.log(res))
      .then(this.getUsers());
  }
  handleSend(e) {
    e.preventDefault();
    const { name, id } = this.state;
    const data = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, id }),
    };
    fetch('/users', data).then(res => console.log(res));
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    if (!users) {
      return <h1>loading</h1>;
    }
    return (
      <>
        <ul>
          {users.map(item => (
            <li onClick={() => this.handleDelete(item.id)} key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
        <form>
          <input
            onChange={e => this.handleNameChange(e.target.value)}
            type="text"
            name="name"
          />
          name
          <input
            onChange={e => this.handleIdChange(e.target.value)}
            type="text"
            name="id"
          />
          id
          <button onClick={e => this.handleSend(e)} type="submit">
            Send
          </button>
        </form>
      </>
    );
  }
}

export default App;
