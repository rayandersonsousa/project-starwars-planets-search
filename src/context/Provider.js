import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import getResults from '../services/getAPI';

function Provider({ children }) {
  const [planetsList, setPlanets] = useState([]);
  const [filterPlanets, setFilters] = useState('');

  const getFilter = (event) => {
    const { value } = event.target;
    setFilters(value);
  };

  const valueContext = useMemo(() => ({
    planetsList,
    setPlanets,
    filterPlanets,
    getFilter,
  }), [planetsList, filterPlanets]);

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
