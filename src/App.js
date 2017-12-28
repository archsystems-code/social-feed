import React, { Component } from 'react';
import Feed from './components/feed';
import instaLogo from './instagram_medium.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header--block">
            <div className="App-header--block-logos">
              <object aria-label="twitter" className="bird" data="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIzMjggMzU1IDMzNSAyNzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iCiAgICBNIDYzMCwgNDI1CiAgICBBIDE5NSwgMTk1IDAgMCAxIDMzMSwgNjAwCiAgICBBIDE0MiwgMTQyIDAgMCAwIDQyOCwgNTcwCiAgICBBICA3MCwgIDcwIDAgMCAxIDM3MCwgNTIzCiAgICBBICA3MCwgIDcwIDAgMCAwIDQwMSwgNTIxCiAgICBBICA3MCwgIDcwIDAgMCAxIDM0NCwgNDU1CiAgICBBICA3MCwgIDcwIDAgMCAwIDM3MiwgNDYwCiAgICBBICA3MCwgIDcwIDAgMCAxIDM1NCwgMzcwCiAgICBBIDE5NSwgMTk1IDAgMCAwIDQ5NSwgNDQyCiAgICBBICA2NywgIDY3IDAgMCAxIDYxMSwgMzgwCiAgICBBIDExNywgMTE3IDAgMCAwIDY1NCwgMzYzCiAgICBBICA2NSwgIDY1IDAgMCAxIDYyMywgNDAxCiAgICBBIDExNywgMTE3IDAgMCAwIDY2MiwgMzkwCiAgICBBICA2NSwgIDY1IDAgMCAxIDYzMCwgNDI1CiAgICBaIgogICAgc3R5bGU9ImZpbGw6IzNCQTlFRTsiLz4KPC9zdmc+" type="image/svg+xml"></object>
              <img alt="Instagram" className="provider-logo" src={instaLogo}/>
            </div>  
            <span>Tag your posts with <strong>#ASIMaterials</strong></span>
          </div>
        </header>
        <Feed />
      </div>
    );
  }
}

export default App;
