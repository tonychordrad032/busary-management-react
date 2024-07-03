import axios from 'axios';

import { SecurityEnum } from './SecurityEnum';

export default (history = null) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;


  let headers = {};

  if (localStorage.dut_management_access_token) {
    headers.Authorization = `Bearer ${localStorage.getItem(SecurityEnum.AccessToken)}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401) {
        localStorage.removeItem(SecurityEnum.AccessToken);

        if (history) {
          history.push("/login");
        } else {
          window.location = "/login";
        }
        window.location = "/login";
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};