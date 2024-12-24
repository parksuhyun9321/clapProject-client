import { Outlet } from "react-router-dom"

import ClientHeader from "../component/Headers/ClientHeader";
import useKeyCheck from "../hook/useKeyCheck";




const IndexClient = () => {

    const keycheck = useKeyCheck();

    // if(!keycheck) return
    
    return (
        <main id="app">
            <ClientHeader isAdmin={keycheck?.data.admin}/>
            <Outlet/>
        </main>
    )
}

export default IndexClient