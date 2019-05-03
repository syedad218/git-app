import React from 'react';
import './App.css';
import Posts from './components/Posts';
import PostForm from './components/Postform';
import { Segment} from 'semantic-ui-react'
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        </header>
        <div className="App-content">
        <Segment className="app" color="blue" raised style={{ padding: '1.2rem' }}>
          <PostForm/>
          <Posts/>        
        </Segment>
        </div>
      </div>
    </Provider>
  )
}

export default App;
