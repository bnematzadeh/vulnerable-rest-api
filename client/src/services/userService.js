import http from './httpService';
import auth from './authService';
import api from '../config.json';

export function register(user, ref){
        return http.post(api.apiEndpoint + '/users',{
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password,
            ref: ref ? ref : ''
        })
}

export function getUsers(){
    return http.get(api.apiEndpoint + "/users");
}


export function getUser(userName){
    return http.get(api.apiEndpoint + "/users/" + userName);
}

export function updateUser(user){
    return http.put(api.apiEndpoint + "/users/" + auth.getUser()._id, {
        name: user.name,
        email: user.email,
        url: user.url,
        currentPass: user.currentPass,
        newPass: user.newPass
    });
}

export function deleteUser(userId){
    return http.delete(api.apiEndpoint + "/users/" + userId);
}

export function sendLink(user){
    return http.post(api.apiEndpoint + "/users/otp", user);
}

export function changePassword(value, user){
    console.log({password: value, user});
    return http.post(api.apiEndpoint + "/users/verify", {password: value, user});
}
