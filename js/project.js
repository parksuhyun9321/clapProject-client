import { dataDecrypt, dataEncrypt } from "./crypto"
import getHeaders from "./headers";

const PROJECT = {
    get(isAdmin, tokenOrKey, offset, limit){

        if(window["ApiProjectAbout"] && window["ApiProjectAbout"].about) window["ApiProjectAbout"].about();

        window["ApiProjectAbout"] = new AbortController();

        return new Promise((resolve, reject) => {

            const headers = getHeaders(isAdmin, tokenOrKey);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/project/get?offset=${offset}&limit=${limit}`, {
                signal : window["ApiProjectAbout"].signal,
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                window["ApiProjectAbout"] = null;

                rs["data"] = dataDecrypt(rs["data"])

                resolve(rs);
            })
            .catch(err => {
                window["ApiProjectAbout"] = null;
                reject(err);
            })
        })
    },

    add(token, data){
        return new Promise((resolve, reject) => {
            const headers = getHeaders(true, token);

            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/project/add`,{
                method:"post",
                headers,
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    update(token, data){
        return new Promise((resolve, reject) => {
            const headers = getHeaders(true, token);

            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/project/update`,{
                method:"post",
                headers,
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    delete(token, deleteData) {

        return new Promise((resolve, reject) => {
            const headers = getHeaders(true, token);

            const data = dataEncrypt(deleteData);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/project/delete`, {
                method:"post",
                headers,
                body : JSON.stringify({ data })
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)  
        })
    },

    searchItem(isAdmin, tokenOrKey, itemKey){
        return new Promise((resolve, reject) => {
            const headers = getHeaders(isAdmin, tokenOrKey);
            
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/project/${itemKey}`, {
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"]);

                resolve(rs)
            })
            .catch(reject)
        })
    }
}

export default PROJECT