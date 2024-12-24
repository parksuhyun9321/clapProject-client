import { useLayoutEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

const useKeyCheck = () => {
    const keyCheck = useLoaderData();
    
    const navigation = useNavigate();

    const [data, setData] = useState(null);

    useLayoutEffect(() => {
        
        if(!keyCheck) return 

        if(keyCheck["resultCode"] !== 200) {
            navigation("/errorPage");
        }
        else {
            setData(keyCheck)
        }        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return data
}

export default useKeyCheck