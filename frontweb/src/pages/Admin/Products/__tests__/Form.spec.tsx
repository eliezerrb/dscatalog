import { render, screen } from "@testing-library/react";
import Form from "../Form";
import { Router } from "react-router-dom";
import history from 'util/history';

test('should render form', () => {

    // ACT
    render(
        // Router - é necessário quando seu componente que vai renderizar tenha algum componente do react router DOM
        <Router history={history}>
            <Form />
        </Router>
    );

    screen.debug();
})