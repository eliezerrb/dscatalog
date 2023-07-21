import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';
import userEvent from "@testing-library/user-event";
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from 'react-toastify';


// antes de iniciar os testes desse arquivo
beforeAll(() => server.listen());

// depois de cada teste
// garantir que os recursos foram zerados
afterEach(() => server.resetHandlers);

// depois que terminado todos os testes desse arquivo
afterAll(() => server.close());

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

    test('should show toast and redirect when submit form correctly', async () => {

        // ACT
        render(
            // Router - é necessário quando seu componente que vai renderizar tenha algum componente do react router DOM
            <Router history={history}>
                 <ToastContainer />
                <Form />
            </Router>
        );

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        // screen.getByRole - papel que o elemente exerce no HTML estou pegando o botão
        // /salvar/i - expressão regular para ignorar maiuscula e minuscula
        const submitButton = screen.getByRole('button', { name: /salvar/i })

        // Simular evento de digitação type(digitação) preechendo o formulário
        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        // Simulando o clique no botão
        userEvent.click(submitButton);

        await waitFor(() => {
            // Pegando o elemento HTML pelo texto, ou seja o toast de Produto cadastrado com sucesso
            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();
        });

        // Não preciso colocar outro wait porque o teste já esperou uma tacada assincrona
        // testando se o redirecionamento funcionou
        expect(history.location.pathname).toEqual('/admin/products');

    })
});

