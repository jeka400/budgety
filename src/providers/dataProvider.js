import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
    fetchUtils
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'http://localhost:3001';

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                _page: page,
                _limit: perPage,
                _sort: field,
                _order: order,
                q: params.filter.q,
            };
            if(params.filter.userId) {
                query.userId = params.filter.userId
            }
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }
        
        case GET_ONE:
            return { url: `${API_URL}/${resource}/${params.id}` };

        case GET_MANY: {
            let query = "";
            query = params.ids.map( (id, i) => {
                return query += "&id=" + params.ids[i];
            })
            return { url: `${API_URL}/${resource}?${query}` };
        }

        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                page: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            return { url: `${API_URL}/${resource}?${stringify(query)}` };
        }

        case UPDATE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'PUT', body: JSON.stringify(params.data) },
            };

        case CREATE:
            return {
                url: `${API_URL}/${resource}`,
                options: { method: 'POST', body: JSON.stringify(params.data) },
            };

        case DELETE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                options: { method: 'DELETE' },
            };

        case DELETE_MANY:
            const query = { filter: JSON.stringify({ id: params.ids }) };
            return { 
                url: `${API_URL}/${resource}?${stringify(query)}`,
                options: { method: 'DELETE' }
            };

        default:
            throw new Error(`Unsupported fetch action type ${type}`);
        }
};

const convertHTTPResponseToDataProvider = (response, type, params) => {
    const { json } = response;

    switch (type) {
        case GET_LIST:
            return {
                data: json.map(singleResource => singleResource),
                total: json.length,
            };
        case CREATE:
            return { data: { ...params.data, id: json.id } };
        default:
            return { data: json };
    }
};


export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, params));
};