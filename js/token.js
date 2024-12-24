import getHeaders from "./headers";


const TOKEN = {

    storageName : "clap-portfolio-auth",
    

    /** 
     * 로컬스토리지에 토큰 저장
     * @param {object}
     */
    set(data) {
        localStorage.setItem(
            this.storageName,
            encodeURIComponent(JSON.stringify(data))
        );  
    },

    /** 
     * 로컬스토리지 토큰 불러오기
     * @returns {object} { a : string, r : string }
     */
    get(){

        if(!localStorage.getItem(this.storageName)) return null

        const result = JSON.parse(decodeURIComponent(localStorage.getItem(this.storageName)));

        return result
    },

    /** 로컬스토리지 토큰 지우기 */
    remove(){
        localStorage.removeItem(this.storageName);
    },

    verify(){
        return new Promise((resolve, reject) => {
            const token = TOKEN.get();
            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/token/verify`,{
                method:"get",
                headers : getHeaders(true, token)
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    }
}

export default TOKEN