import getHeaders from "./headers";
import { dataDecrypt } from "./crypto"

const PROFILE_IMG = {
    get(isAdmin, tokenOrKey){
        
        return new Promise((resolve, reject) => {
            const headers = getHeaders(isAdmin, tokenOrKey);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/profileImg/get`, {
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"]);
                resolve(rs)
            })
        })
    },

    update(token, files){
        return new Promise((resolve, reject) => {
            // const headers = getHeaders(true, token);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/profileImg/update`, {
                method:"post",
                headers : {
                    // "content-type" : "multipart/form-data",
                    "auth" : token
                },
                body:files
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

export default PROFILE_IMG