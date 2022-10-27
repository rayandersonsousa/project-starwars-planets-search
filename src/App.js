import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';

function App() {
  return (
    <div>
      <span>Star Wars Planets</span>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
