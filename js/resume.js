import getHeaders from "./headers";

import { dataDecrypt, dataEncrypt } from "./crypto"

const RESUME = {
    get(isAdmin, tokenOrKey, page, limit){
        
        if(window["ApiResumeAbout"] && window["ApiResumeAbout"].about) window["ApiResumeAbout"].about();

        window["ApiResumeAbout"] = new AbortController();

        const headers = getHeaders(isAdmin, tokenOrKey);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/resume/get?offset=${page}&limit=${limit}`,{
                signal : window["ApiResumeAbout"].signal,
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                window["ApiResumeAbout"] = null;
                // delete window["ApiResumeAbout"]
                
                rs["data"] = dataDecrypt(rs["data"])

                resolve(rs)
            })
            .catch(err => {
                window["ApiResumeAbout"] = null;
                // delete window["ApiResumeAbout"]
                console.log("err",err);
                reject(err);
            })
        })
    },

    add(token, data){
        return new Promise((resolve, reject) => {

            const headers = getHeaders(true, token);

            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/resume/add`, {
                method:"post",
                headers,
                body : JSON.stringify({data})
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

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/resume/update`, {
                method:"post",
                headers,
                body : JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    delete(token, resumeId){
        return new Promise((resolve, reject) => {
            const headers = getHeaders(true, token);

            

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/resume/delete`, {
                method:"post",
                headers,
                body : JSON.stringify({ data : dataEncrypt({resumeId}) })
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    }
}

export default RESUME