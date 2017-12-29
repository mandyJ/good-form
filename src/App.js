import React, { Component } from 'react';
import TextInput from "./Fields/TextInput";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="App-title">Welcome to good-form!</h1>
        </header>
        <TextInput/>
      </div>
    );
  }
}

export default App;
