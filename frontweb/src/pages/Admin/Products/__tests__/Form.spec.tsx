import { render, screen } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';

// ...jest.requireActual aproveitar tudo que já tem no react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe('Product form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

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
});

