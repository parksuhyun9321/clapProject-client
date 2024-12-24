import getHeaders from "./headers";

import { dataDecrypt } from "./crypto"

const FILES = {
    uploadSwiperData(token, data){

        return new Promise((resolve, reject) => {

            if(data.length === 0) return resolve({data});

            const swiperData = new FormData();

            for(let i = 0; i < data.length; i++) {
                if(data[i] instanceof File) swiperData.append("item", data[i]);
            }

            if(swiperData.getAll("item").length <= 0) return resolve({
                data : data??[]
            });

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/files/swiperData`, {
                method : "post",
                headers: { "auth" : token },
                body : swiperData
            })
            .then(data => data.json())
            .then(rs => {

                rs["data"] = dataDecrypt(rs["data"]);

                resolve(rs)
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    uploadAttachedFiles(token, data){
        return new Promise((resolve, reject) => {

            if(data.length === 0) return resolve({data});

            const fileData = new FormData();

            for(let i = 0; i < data.length; i++) {
                if(data[i] instanceof File) fileData.append("item", data[i]);
            }

            if(fileData.getAll("item").length <= 0) return resolve({
                data : data??[]
            });
            
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/files/attachedFiles`, {
                method : "post",
                headers: { "auth" : token },
                body : fileData
            })
            .then(data => data.json())
            .then(rs => {
                rs["data"] = dataDecrypt(rs["data"]);

                resolve(rs)
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    deleteFiles(token, data){
        
        return new Promise((resolve, reject) => {

            if(data.length <= 0) return resolve();

            const headers = getHeaders(true, token)
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/files/deleteFiles`, {
                method : "post",
                headers,
                body : JSON.stringify(data)
            })
            .then(data => data.json())
            .then(rs => {
                resolve(rs)
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    download(isAdmin, tokenOrKey, item){
        const headers = getHeaders(isAdmin, tokenOrKey);

        fetch(`${process["env"]["REACT_APP_API_URL"]}/api/files/download`, {
            method:"post",
            headers,
            body:JSON.stringify(item)
        })
        .then(data => data.blob())
        .then(rs => {
            
            const url = window.URL.createObjectURL(rs);
            const link = document.createElement('a');
            link.href = url;
            link.download = item["name"]; // 다운로드할 파일 이름 지정
            document.body.appendChild(link);
            link.click(); // 클릭 이벤트로 다운로드 트리거
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // URL 해제
        })
    }
}

export default FILES