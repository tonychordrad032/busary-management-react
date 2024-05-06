import axiosInstance from './axiosInstance';

export default class HttpFunction {

    // GET METHOD
    async get(url) {
        //console.log(url);
        try{
            let res = await axiosInstance().get(url);
            return {code: res.status, data: res.data};
        }catch(error) {
            return {code: error.response.status, message: error.message, data: error};
        }
    }

    // POST METHOD
    async post(url, data) {
        try{
            let res = await axiosInstance().post(url, data);
            return {code: res.status, data: res.data};
        }catch(error) {
            return {code: error.response.status, message: error.message, data: error};
        }
    }

    // UPDATE METHOD
    async update(url, data) {
        try{
            let res = await axiosInstance().put(url, data);
            return {code: res.status, data: res.data};
        }catch(error) {
            console.log(error);
            return {code: error.response.status, message: error.message, data: error};
        }
    }

    // DELETE METHOD
    async delete(url) {
        try{
            let res = await axiosInstance().delete(url);
            return {code: res.status, data: res.data};
        }catch(error) {
            return {code: error.response.status, message: error.message, data: error};
        }
    }
}

//export default HttpFunction;