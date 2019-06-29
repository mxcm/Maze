import React from 'react';
import './App.css';
import Controller from './components/Controller';

function App() {
  return (
    <div className="App">
      <h3>Maze for 灿灿</h3>
      <Controller mazeSize="5" />
    </div>
  );
}

export default App;
