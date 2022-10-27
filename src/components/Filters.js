import React, { useContext, useEffect } from 'react';
import myContext from '../context/MyContext';

function Filters() {
  const { getFilter, setInputFilter, inputFilter,
    setFilterList, filterList, planetsList, columnFilters,
    setColunmFilters, provideFilter, filterPlanets } = useContext(myContext);

  useEffect(() => {
    setFilterList(planetsList);
  }, [planetsList, setFilterList]);

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
    console.log('bora amigo, funcione mais de uma vez');
  };

  useEffect(() => {
    setInputFilter({
      column: columnFilters[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [columnFilters, setInputFilter]);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ getFilter }
      />
      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
        >
          {
            columnFilters.map((filter) => (
              <option key={ filter } value={ filter }>
                { filter }
              </option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
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
          value={ inputFilter.value }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <br />
      {
        filterList.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
            {' '}
            {console.log(filterList)}
            <button
              type="button"
              onClick={ () => {
                setFilterList(filterList
                  .filter((selec) => selec.column !== filter.column));
                setColunmFilters([...columnFilters, filter.column]);
              } }
            >
              Excluir
            </button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setFilterList([]);
          setColunmFilters(['population', 'obital_period',
            'diameter', 'rotation_period', 'surface_water']);
        } }
      >
        Remove
      </button>
    </div>
  );
}

export default Filters;
