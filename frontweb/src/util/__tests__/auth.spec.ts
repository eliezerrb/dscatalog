import { hasAnyRoles } from "util/auth";

describe('hasAnyRoles tests', () => {
    test('should return true when empty list', () => {
        const result = hasAnyRoles([]);
        expect(result).toEqual(true);
    });

});