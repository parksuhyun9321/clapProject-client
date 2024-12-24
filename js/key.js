import getHeaders from "./headers"

const KEY = {
    check(key){
        
        return new Promise((resolve, reject) => {
            const headers = getHeaders(false, key)

            fetch(`${process["env"]["REACT_APP_API_URL"]}/api/key/${encodeURIComponent(key)}`, {
               method:"get",
               headers 
            })
            .then(data => data.json())
            .then(resolve)
            .catch(reject)
        })
    },
}

export default KEY