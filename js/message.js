import getHeaders from "./headers";
import { dataDecrypt, dataEncrypt } from "./crypto"

const MESSAGE = {
    get(token, page, limit){
        if(window["ApiMessageAbout"] && window["ApiMessageAbout"].about) window["ApiMessageAbout"].about();

        window["ApiMessageAbout"] = new AbortController();

        const headers = getHeaders(true, token);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/message/get?offset=${page}&limit=${limit}`,{
                signal : window["ApiMessageAbout"].signal,
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                window["ApiMessageAbout"] = null;
                
                rs["data"] = dataDecrypt(rs["data"])
                resolve(rs)
            })
            .catch(err => {
                window["ApiMessageAbout"] = null;
                // delete window["ApiMessageAbout"]
                console.log("err",err);
                reject(err);
            })
        })
    },

    read(token, messageId){

        const headers = getHeaders(true, token);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/message/read`,{
                method:"post",
                headers,
                body:JSON.stringify({ data : dataEncrypt({messageId}) }),
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    delete(token, deleteData){
        const headers = getHeaders(true, token);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/message/delete`,{
                method:"post",
                headers,
                body:JSON.stringify({ data : dataEncrypt({deleteData})}),
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    post(key,messageData){
    
        return new Promise((resolve, reject) => {

            const headers = getHeaders(false, key);

            const data = dataEncrypt(messageData);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/message/post`,{
                method:"post",
                headers,
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    }
}

export default MESSAGE