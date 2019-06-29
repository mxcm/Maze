import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Grid from './grid';
import Maze from './components/Maze';

function App() {
  return (
    <div className="App">
      {/* <Grid seed='225' size='15' /> */}
      <Maze mazeSize="10" />
    </div>
  );
}

export default App;
