import { formatPrice } from "util/formatters";

describe('formatPrice for positive numbers', () => {

    test('formartPrice should format number pt-br when given 10.1', () => {

        // ARRANGE
        const value = 10.1;
    
        // ACT
        const result = formatPrice(value);
    
        // ASSERT
        expect(result).toEqual("10,10");
    });
    
    test('formartPrice should format number pt-br when given 0.1', () => {
      
        const result = formatPrice(0.1);
    
        expect(result).toEqual("0,10");
    });
});

describe('formatPrice for non-positive numbers', () => {

    test('formartPrice should format number pt-br when given 0', () => {

        const result = formatPrice(0);

        expect(result).toEqual("0,00");
    });
    
    test('formartPrice should format number pt-br when given -5.1', () => {
      
        const result = formatPrice(-5.1);
    
        expect(result).toEqual("-5,10");
    });
});

