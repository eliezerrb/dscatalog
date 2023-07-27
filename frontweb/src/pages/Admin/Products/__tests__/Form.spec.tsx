import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from 'util/history';
import userEvent from "@testing-library/user-event";
import { productResponse, server } from "./fixtures";
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
    });



    test('should show 5 validation messages when just clicking submit', async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i })

        userEvent.click(submitButton);

        await waitFor(() => {
            // Procurar todas as ocorrencias de elementos que tenham campo obrigatorio
            const messages = screen.getAllByText('Campo obrigatório');

            // Testar o tamanho de um Array
            expect(messages).toHaveLength(5);
        });
    });

    test('should clear validation messages when filling out the form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );
    
        const submitButton = screen.getByRole('button', { name: /salvar/i})

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório');
            expect(messages).toHaveLength(5);
        });

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        await waitFor(() => {
            const messages = screen.queryAllByText('Campo obrigatório');
            expect(messages).toHaveLength(0);
        });
    });
});



describe('Product form update tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '2'
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

        await waitFor(() => {
            const nameInput = screen.getByTestId("name");
            const priceInput = screen.getByTestId("price");
            const imgUrlInput = screen.getByTestId("imgUrl");
            const descriptionInput = screen.getByTestId("description");

            const formElement = screen.getByTestId("form");
    
            // Testando valor do input preeenchido, verificando se no imput tem o valor que eu mockei no productResponse
            expect(nameInput).toHaveValue(productResponse.name);
            expect(priceInput).toHaveValue(String(productResponse.price));
            expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
            expect(descriptionInput).toHaveValue(productResponse.description);

            // Estou percorrendo a lista de categoria mockada e pegando o id
            const ids = productResponse.categories.map(x => String(x.id));
            expect(formElement).toHaveFormValues({categories: ids});
        })

        const submitButton = screen.getByRole('button', { name: /salvar/i})

        // Simulando o clique no botão
        userEvent.click(submitButton);

        await waitFor(() => {
            // Pegando o elemento HTML pelo texto, ou seja o toast de Produto cadastrado com sucesso
            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();
        });

        
        expect(history.location.pathname).toEqual('/admin/products');
 
    });

});