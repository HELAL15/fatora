
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL, LANG } from '../constant';





export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "accept-language": LANG,
    Lang: LANG,
  },
});

request.interceptors.request.use(
  (config) => {
    
    try {
      const token = window.location.pathname.startsWith('/dashboard') ? Cookies.get("accessTokenAdmin") :Cookies.get("access_token")
      // const token =
      //   Cookies.get("accessTokenAdmin") || Cookies.get("access_token") ;



      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (LANG) {
        config.headers["Accept-Language"] = LANG;
        config.headers["Lang"] = LANG;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
   
    return Promise.reject({
      message: "Error in request interceptor",
      error,
    });
  }
);

request.interceptors.response.use(
  (response) => {
 
    return response;
  },
  (error) => {

    if (error?.status === 403 || error?.status === 401 &&  window.location.pathname.startsWith('/dashboard')) {
      Cookies.remove("accessTokenAdmin");
    }
    // if (error.response?.status === 401) {
    // }
    return Promise.reject(error);
  }
);
