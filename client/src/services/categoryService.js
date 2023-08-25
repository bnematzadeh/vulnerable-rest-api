import http from './httpService';
import api from '../config.json';

export function getCategories() {
    return http.get(api.apiEndpoint + "/categories");
}
