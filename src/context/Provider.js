import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import getResults from '../services/getAPI';

function Provider({ children }) {
  const [planetsList, setPlanets] = useState([]);
  const [filterPlanets, setFilters] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [columnFilters, setColunmFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [inputFilter, setInputFilter] = useState({
    column: columnFilters[0],
    comparison: 'maior que',
    value: 0,
  });

  const getFilter = (event) => {
    const { value } = event.target;
    setFilters(value);
  };

  const provideFilter = useCallback((planets, names, values) => (
    values.length === 0
      ? planets.filter((planet) => planet.name.includes(names))
      : values.reduce(
        (index, { column, comparison, value }) => index.filter((world) => {
          switch (comparison) {
          case 'igual a':
            return (
              world.name.includes(names)
              && world[column] === value
            );
          case 'menor que':
            return (
              world.name.includes(names)
              && world[column] < Number(value)
            );
          case 'maior que':
            return (
              world.name.includes(names)
              && world[column] > Number(value)
            );
          default:
            return world.name.includes(names);
          }
        }),
        planets,
      )
  ), []);

  const valueContext = useMemo(() => ({
    planetsList,
    setPlanets,
    filterPlanets,
    getFilter,
    inputFilter,
    setInputFilter,
    filterList,
    setFilterList,
    columnFilters,
    setColunmFilters,
    provideFilter,
    filterData,
    setFilterData,
  }), [planetsList, filterPlanets, inputFilter, filterList,
    columnFilters, provideFilter, filterData]);

  return (
    <MyContext.Provider value={ valueContext }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
