import React, { Component } from 'react';
import Feed from './components/feed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">#ASIMaterials</h1>
        </header>
        <Feed />
      </div>
    );
  }
}

export default App;
