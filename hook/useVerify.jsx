import { useLayoutEffect, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

/** api */
import TOKEN from "../js/token";


const useVerify = () => {
    const tokenVerify = useLoaderData();

    const navigation = useNavigate();

    const [next, setNext] = useState(false);
    
    useLayoutEffect(() => {
        if(tokenVerify["resultCode"] !== 200) {
            TOKEN.remove();
            navigation("/account/login");

            return 
        }

        setNext(true);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return next
}

export default useVerify