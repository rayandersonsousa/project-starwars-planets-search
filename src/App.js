import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import logo from './Star_Wars_Logo.png';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <img src={ logo } alt="logo" />
      <Filters />
      <Table />
    </div>
  );
}

export default App;
