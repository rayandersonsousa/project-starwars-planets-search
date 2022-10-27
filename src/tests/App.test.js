import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import renderWithContext from './renderWithContext';
import userEvent from '@testing-library/user-event';

describe('Testes para o App Star Wars', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch)
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Testa se os campos de pesquisa são renderizados na tela', () => {
    render(<App />)
    const nameFilter = screen.getByTestId(/name-filter/i);
    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    const btnFilter = screen.getByTestId(/button-filter/i);

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  });

  it('Testa se está sendo feita a requisição da API corretamente', async () => {
    renderWithContext(<App />);
    
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());
  });

  it('Testa se o filtro por nome funciona corretamente', async () => {
    renderWithContext(<App />);
    
    const nameFilter = screen.getByTestId(/name-filter/i); 
    await waitFor(() => expect(screen.getByText(/tatooine/i)).toBeInTheDocument());
    const tatooine = screen.getByText(/tatooine/i);
    userEvent.type(nameFilter, 'ru');
    expect(tatooine).not.toBeInTheDocument();
  });

  it('Testa se os filtros por coluna funcionam corretamente', async () => {
    renderWithContext(<App />);

    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    const btnFilter = screen.getByTestId(/button-filter/i);

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(valueFilter, '7200');
    userEvent.click(btnFilter);

    expect(await screen.findByRole('cell', { name: /hoth/i })).toBeInTheDocument();
  })

  it('Testa o filtro de comparação', async () => {
    renderWithContext(<App />);

    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const valueFilter = screen.getByTestId(/value-filter/i);
    const btnFilter = screen.getByTestId(/button-filter/i);

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(valueFilter, '7200');
    userEvent.click(btnFilter);

    expect(await screen.findByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
  });
});
