import { render, screen } from "@testing-library/react";
import ButtonIcon from "..";

test('ButtonIcon should render button with given text', () => {
    
    // Arrange
    const text = "Fazer login";

    // ACT
    render(
        <ButtonIcon text={text} />
    );

    //ASSERT
    // Espero que o text esteja contido no resultado da renderização
    expect(screen.getByText(text)).toBeInTheDocument();

})