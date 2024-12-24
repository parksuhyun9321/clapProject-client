import getHeaders from "./headers";
import { dataDecrypt, dataEncrypt } from "./crypto"


const HASHTAG = {

    get(isAdmin, tokenOrKey){

        return new Promise((resolve, reject) => {
            const headers = getHeaders(isAdmin, tokenOrKey);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/hashTag/get`, {
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"])
                resolve(rs)
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    update(token, data){

        return new Promise((resolve, reject) => {
            const headers = getHeaders(true, token);
            
            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/hashTag/update`,{
                method:"post",
                headers,
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(rs => {
                resolve(rs)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default HASHTAG