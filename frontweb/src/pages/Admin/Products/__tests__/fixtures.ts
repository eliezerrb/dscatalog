import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { BASE_URL } from 'util/requests';

const findCategoriesResponse = {
    "content": [
        {
            "id": 1,
            "name": "Livros"
        },
        {
            "id": 2,
            "name": "Eletrônicos"
        },
        {
            "id": 3,
            "name": "Computadores"
        }
    ],
    "pageable": {
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 20,
        "paged": true,
        "unpaged": false
    },
    "totalElements": 3,
    "totalPages": 1,
    "last": true,
    "size": 20,
    "number": 0,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "numberOfElements": 3,
    "first": true,
    "empty": false
};

export const server = setupServer(
    // Describe the requests to mock.
    // Estou simulando a requisição
    rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(findCategoriesResponse),
        )
    }),
)