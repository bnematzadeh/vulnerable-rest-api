import http from './httpService';
import api from '../config.json';

export function addSubscriber(email){
    return http.post(api.thirdParty, {
        email
    })
}