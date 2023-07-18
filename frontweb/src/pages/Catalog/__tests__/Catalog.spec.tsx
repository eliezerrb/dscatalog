import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "..";
import { Router } from "react-router-dom";
import history from 'util/history';

test('should render Catalog with products', async () => {

    render(
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