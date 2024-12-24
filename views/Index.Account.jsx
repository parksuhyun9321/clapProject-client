import { useLayoutEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"




const IndexAccount = () => {
    const isLogin = useLoaderData();

    const navigation = useNavigate();

    useLayoutEffect(() => {
        if(isLogin) {
            navigation("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return <Outlet/>
}

export default IndexAccount