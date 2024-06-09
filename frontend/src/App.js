import React from 'react'
import Register from './components/Register';
import Login from './components/Login';
import BaseRouter from './routes';
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
        <Router>
          <BaseRouter />
        </Router>
      </div>
  );
}

export default App;
