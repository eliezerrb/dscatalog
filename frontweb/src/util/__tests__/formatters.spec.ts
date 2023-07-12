import { formatPrice } from "util/formatters";

test('formartPrice should format number pt-br when given 10.1', () => {

    // ARRANGE
    const value =10.1;

    // ACT
    const result = formatPrice(value);

    // ASSERT
    expect(result).toEqual("10,10");
});