async function getResults() {
  const endPoint = 'https://swapi.dev/api/planets';
  const request = await fetch(endPoint);
  const response = await request.json();

  response.results.forEach((resp) => {
    delete resp.residents;
  });

  return response.results;
}

export default getResults;
