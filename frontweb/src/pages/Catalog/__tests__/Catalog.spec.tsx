import { render, screen } from "@testing-library/react";
import Catalog from "..";
import { Router } from "react-router-dom";
import history from 'util/history';

test('should render Catalog with products', () => {

    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    screen.debug();

    expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();
})