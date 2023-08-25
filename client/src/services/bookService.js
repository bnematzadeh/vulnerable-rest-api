import http from './httpService';
import api from '../config.json';

export function getBooks() {
    return http.get(api.apiEndpoint + "/books");
}

export function getBook(id){
    return http.get(api.apiEndpoint + "/books/" + id);
}


export function addBook(book){
    return http.post(api.apiEndpoint + "/books", book);
}

export function updateBook(bookId, book){
    return http.put(api.apiEndpoint + "/books/" + bookId, book );
}

export function deleteBook(id) {
    return http.delete(api.apiEndpoint + "/books/" + id);
}
