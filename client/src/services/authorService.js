import http from './httpService';
import api from '../config.json';

export function getAuthors() {
    return http.get(api.apiEndpoint + "/authors");
}

export function getAuthor(id){
    return http.get(api.apiEndpoint + "/authors/" + id);
}

export function addAuthor(author){
    return http.post(api.apiEndpoint + "/authors", author);
}

export function updateAuthor(authorId, author){
    return http.put(api.apiEndpoint + "/authors/" + authorId, author);
}

export function deleteAuthor(id){
    return http.delete(api.apiEndpoint + "/authors/" + id);
}
