import React, { useContext, useEffect } from 'react';
import myContext from '../context/MyContext';
import '../App.css';

function Filters() {
  const { getFilter, setInputFilter, inputFilter,
    setFilterList, filterList, planetsList, columnFilters,
    setColunmFilters, provideFilter, filterPlanets } = useContext(myContext);

  // useEffect(() => {
  //   setFilterList(planetsList);
  // }, [planetsList, setFilterList]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputFilter((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const { column } = inputFilter;
    let columns = columnFilters;
    columns = columnFilters.filter((selColumn) => selColumn !== column);
    provideFilter(planetsList, filterPlanets, filterList);
    setFilterList((oldState) => ([
      ...oldState,
      inputFilter,
    ]));
    setColunmFilters(columns);
  };

  useEffect(() => {
    setInputFilter({
      column: columnFilters[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [columnFilters, setInputFilter]);

  return (
    <div className="filter-container">
      <div className="search-bar">
        <input
          type="text"
          data-testid="name-filter"
          id="name-filter"
          placeholder="Planeta"
          onChange={ getFilter }
        />
      </div>
      <div className="select-container">
        <select
          data-testid="column-filter"
          name="column"
          className="select-filters column-filter"
          onChange={ handleChange }
        >
          {
            columnFilters.map((filter, index) => (
              <option key={ index } value={ filter }>
                { filter }
              </option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          className="select-filters comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          className="select-filters number-input"
          value={ inputFilter.value }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          id="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <br />
      {
        filterList.map((filter, index) => (
          <div className="filter-div" data-testid="filter" key={ index }>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
            {' '}
            <button
              type="button"
              id="delete-filter"
              onClick={ () => {
                setFilterList(filterList
                  .filter((selec) => selec.column !== filter.column));
                setColunmFilters([...columnFilters, filter.column]);
              } }
            >
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        id="button-remove-filters"
        onClick={ () => {
          setFilterList([]);
          setColunmFilters(['population', 'obital_period',
            'diameter', 'rotation_period', 'surface_water']);
        } }
      >
        <span className="material-symbols-outlined">
          delete
        </span>
      </button>
    </div>
  );
}

export default Filters;
