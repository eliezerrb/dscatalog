import { render, screen } from "@testing-library/react";
import Pagination from "..";
import userEvent from "@testing-library/user-event";

describe('Pagination tests', () => {
    test('should render pagination', () => {

        // Arrange
        const pageCount = 3;
        const range = 3;

        // ACT
        render(
            <Pagination
                pageCount={pageCount}
                range={range}
            />
        );

        //ASSERT
        const page1 = screen.getByText("1");
        const page2 = screen.getByText("2");
        const page3 = screen.getByText("3");

         // Não usar o getBy porque ele sempre lança erro então usar o queryBy porque retonar null
        const page4 = screen.queryByText("4");

        expect(page1).toBeInTheDocument();
        // page1 deve ter o estilo css pagination-link-active
        expect(page1).toHaveClass("pagination-link-active");

        expect(page2).toBeInTheDocument();
         // page2 não deve ter o estilo css pagination-link-active
        expect(page2).not.toHaveClass("pagination-link-active");

        expect(page3).toBeInTheDocument();
        expect(page3).not.toHaveClass("pagination-link-active");

        expect(page4).not.toBeInTheDocument();

    })


    test('next arrow should call onChange', () => {

        // Arrange
        const pageCount = 3;
        const range = 3;

        //jest.fn() - cria um obj de mentira para simular um comportamente de evento (uma chamada de função)
        const OnChange = jest.fn();

        // ACT
        render(
            <Pagination
                pageCount={pageCount}
                range={range}
                OnChange={OnChange}
            />
        );

        const arrowNext = screen.getByTestId("arrow-next");

        // Simular o clique no arrowNext que pegamos pelo data-testid
        userEvent.click(arrowNext);

        //ASSERT
        // Verificando se o evento foi chamado com o parametro 1, pois a bolinha começa no 0 então a pagina 2 é o parametro 1
        expect(OnChange).toHaveBeenCalledWith(1)
    })


    test('previus arrow should call onChange', () => {

        // Arrange
        const pageCount = 3;
        const range = 3;
        const forcePage = 1;

        const OnChange = jest.fn();

        // ACT
        render(
            <Pagination
                pageCount={pageCount}
                range={range}
                OnChange={OnChange}
                forcePage={forcePage}
            />
        );

        const arrowPrevius = screen.getByTestId("arrow-previous");

        // Simular o clique no arrowNext que pegamos pelo data-testid
        userEvent.click(arrowPrevius);

        //ASSERT
        // Iniciou a paginação com 1 ("forcePage = 1") clicou no link do anterior tem que chamar o onChange com o valor 0
        expect(OnChange).toHaveBeenCalledWith(0)
    })



    test('page link should call onChange', () => {

        // Arrange
        const pageCount = 3;
        const range = 3;

        //jest.fn() - cria um obj de mentira para simular um comportamente de evento (uma chamada de função)
        const OnChange = jest.fn();

        // ACT
        render(
            <Pagination
                pageCount={pageCount}
                range={range}
                OnChange={OnChange}
            />
        );

        const page2 = screen.getByText("2");

        // Simular o clique na pagina 2
        userEvent.click(page2);

        //ASSERT
        // Verificando se o evento foi chamado com o parametro 1, pois a bolinha começa no 0 então a pagina 2 é o parametro 1
        expect(OnChange).toHaveBeenCalledWith(1)
    })

})

