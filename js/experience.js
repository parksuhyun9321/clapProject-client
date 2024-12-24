import { dataEncrypt } from "./crypto"

const EXPERIENCE = {
    /**
     * 테스트 계정 생성
     * @param {object} accountObj { id : string, pw : string }
     */
     setExperience(accountObj){
        return new Promise((resolve, reject) => {
            const obj = {
                accountObj, 
                key : process["env"]["REACT_APP_SECRET_KEY"]
            }

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/account/experience`, {
                method:"post",
                headers : {
                    "content-type" : "application/json",
                },
                body: JSON.stringify({data : dataEncrypt(obj)})
            })
            .then(data=>data.json())
            .then(resolve)
            .catch(reject)
        })
    }
}

export default EXPERIENCE