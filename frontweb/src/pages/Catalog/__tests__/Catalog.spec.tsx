import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "..";
import { Router } from "react-router-dom";
import history from 'util/history';
import { server } from './fixtures';

// antes de iniciar os testes desse arquivo
beforeAll(() => server.listen());

// depois de cada teste
// garantir que os recursos foram zerados
afterEach(() => server.resetHandlers);

// depois que terminado todos os testes desse arquivo
afterAll(() => server.close());

test('should render Catalog with products', async () => {

    render(
        // Router - é necessário quando seu componente que vai renderizar tenha algum componente do react router DOM, nesse caso o <LINK>
        <Router history={history}>
            <Catalog />
        </Router>
    );

    // para debugar
    // screen.debug();

    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

    // await esperar o resultado da requisição
    await waitFor(() => {
        expect(screen.getByText('Smart TV')).toBeInTheDocument()
    });

});