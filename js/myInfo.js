import getHeaders from "./headers";
import { dataEncrypt, dataDecrypt } from "./crypto"

 
const MYINFO = {
    setInfo(token, target, value){

        const headers = getHeaders(true, token);

        const data = dataEncrypt({
            target,
            value
        });
  
        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/myInfo/update`, {
                method:"post",
                headers,
                body:JSON.stringify({
                    data
                })
            })
            .then(data => data.json())
            .then(rs => {
                resolve(rs)
            })
            .catch(err => {
                console.log("err",err);
                reject(err);
            })
        })
    },

    get(isAdmin, tokenOrKey){

        return new Promise((resolve, reject) => {
            
            const headers = getHeaders(isAdmin, tokenOrKey);
 
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/myInfo/get`, {
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"])
                resolve(rs)
            })
            .catch(err => {
                console.log("err",err);
                reject(err);
            })
        })
    },

    getMyHome(token){
        const headers = getHeaders(true, token);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/myInfo/Home`, {
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"])
                resolve(rs)
            })
            .catch(err => {
                console.log("err",err);
                reject(err);
            })
        })
    },

    // getAdmin(token) {

    //     return new Promise((resolve, reject) => {
    //         const headers = getHeaders(true, token);
    
    //         fetch("/api/myInfo", {
    //             method:"get",
    //             headers
    //         })
    //         .then(data => data.json())
    //         .then(rs => {
    //             resolve(rs)
    //         })
    //         .catch(err => {
    //             console.log("err",err);
    //             reject(err);
    //         })
    //     })
    // }

    // getClient(key){

    //     const headers = getHeaders(false, key);

    //     fetch("/api/myInfo", {
    //         method:"get",
    //         headers
    //     })
    // }
}

export default MYINFO