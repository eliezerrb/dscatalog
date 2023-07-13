import { hasAnyRoles } from "util/auth";
import * as TokenModule from "util/token";

describe('hasAnyRoles tests', () => {
    test('should return true when empty list', () => {
        const result = hasAnyRoles([]);
        expect(result).toEqual(true);
    });

    // test.only - para testar só o teste que vocês está editando no modo watch ao salvar
    test('should return true when user has given role', () => {

        // Mocando a função getTokenData que está sento utilizada dentro do hasAnyRoles
        jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
            exp: 0,
            user_name: '',
            authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        })

        const result = hasAnyRoles(['ROLE_ADMIN']);
        expect(result).toEqual(true);
    });

});