// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ListEmployees from './components/ListEmployees';
import AddEmployee from './components/AddEmployee';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <h1></h1>
      <Navbar />
      <AddEmployee />
      <ListEmployees />
    </div>
  );
}

export default App;
