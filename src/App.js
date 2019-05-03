import React from 'react';
import './App.css';
import Posts from './components/Posts';
import { Segment } from 'semantic-ui-react'
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-content">
      <Segment raised style={{ padding: '1rem' }}>
        <Posts/>        
      </Segment>
      </div>
    </div>
  )
}

export default App;
