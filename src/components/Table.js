import React, { useContext, useEffect } from 'react';
import getResults from '../services/getAPI';
import myContext from '../context/MyContext';

function Table() {
  const { setPlanets, filterPlanets, filterList,
    provideFilter, planetsList } = useContext(myContext);

  const worlds = provideFilter(planetsList, filterPlanets, filterList);

  useEffect(() => {
    const resultsFunc = async () => {
      const results = await getResults();
      setPlanets(results);
    };
    resultsFunc();
  }, [setPlanets]);

  return (
    <main className="table">
      <table className="table__body">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
        </thead>

        <tbody>
          {
            worlds.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
