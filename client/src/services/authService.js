import http from './httpService';
import api from '../config.json';
import jwtDecode from 'jwt-decode';

const token = "authToken";

http.setJwt(getJwt());

export async function login(username, password){
     const {headers} = await http.post(api.apiEndpoint + '/auth', {username, password});
     localStorage.setItem(token, headers['x-auth-token']);
}

export async function adminLogin(username, password){
    const {headers} = await http.post(api.apiEndpoint + '/adminAuth', {username, password});
    localStorage.setItem(token, headers['x-auth-token']);
}

export function logout(){
    localStorage.removeItem(token);
}

export function getUser(){
    try{
        const jwt = localStorage.getItem("authToken");
        return jwtDecode(jwt);
      }catch(ex){
        return null;
    }
}

export function getJwt(){
    return localStorage.getItem(token);
}

export default{
    login,
    adminLogin,
    logout,
    getUser,
    getJwt
}