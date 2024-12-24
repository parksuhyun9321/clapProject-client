import { dataEncrypt, dataDecrypt } from "./crypto"
import getHeaders from "./headers";


const ACCOUNT = {
    login(id, pw){


        return new Promise((resolve, reject) => {

            const data = dataEncrypt({id,pw});

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/login`,{
                method:"post",
                headers: {
                    "content-type" : "application/json",
                },
                body:JSON.stringify({data})
            })
            .then(data => data.json({data}))
            .then(rs => {
                resolve(rs)
            })
            .catch(err => {
                console.log("login error",err)
                reject(err)
            })
        })
    },

    logout(token){
        return new Promise((resolve, reject) => {

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/logout`, {
                method:"get",
                headers: {
                    "content-type" : "application/json",
                    "auth" : token
                },
            })
            .then(data => data.json())
            .then(rs => {
    
                // TOKEN.remove();
                resolve()
            })
        })
    },

    register(data){

        data = dataEncrypt(data);

        return new Promise((resolve, reject) => {
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/register`,{
                method:"post",
                headers : {
                    "content-type" : "application/json",
                },
                body: JSON.stringify({data})
            })
            .then(data=>data.json())
            .then(rs => {
                resolve(rs)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    idSearch(data) {
        return new Promise((resolve, reject) => {
            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/idSearch`,{
                method:"post",
                headers: {
                    "content-type" : "application/json",
                },
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(rs => {
                if(rs["resultCode"] === 200) {
                    rs["data"] = dataDecrypt(rs["data"]);
                }

                resolve(rs)
            })
            .catch(err => {
                console.log("idSearch error",err)
                reject(err)
            })
        })
    },

    pwUserSearch(data){
        return new Promise((resolve, reject) => {
            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/pwSearch`,{
                method:"post",
                headers: {
                    "content-type" : "application/json",
                },
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    pwChange(data){
        return new Promise((resolve, reject) => {
            data = dataEncrypt(data);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/pwChange`,{
                method:"post",
                headers: {
                    "content-type" : "application/json",
                },
                body:JSON.stringify({data})
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },

    withdrawal(token){
        return new Promise((resolve, reject) => {

            const headers = getHeaders(true, token);

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/withdrawal`,{
                method:"get",
                headers
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    }
}

export default ACCOUNT