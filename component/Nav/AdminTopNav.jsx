import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminTopNav = () => {

    const [isHide, setIsHide] = useState(false);

    const { pathname } = useLocation();

    function ResizeCallback(){
        const windowWidth = window.innerWidth;
        if(windowWidth <= 800) {
            // if(!isHide) 
            setIsHide(true);
        }
        if(windowWidth > 800) {
            // if(isHide) 
            setIsHide(false)
        }
    }
    useEffect(() => {
        ResizeCallback();
        window.addEventListener("resize",ResizeCallback);

        return () => {
            window.removeEventListener("resize",ResizeCallback);
        }
        
    },[])

    if(isHide) return

    return (
        <ul className="navList">
            <li className={pathname === "/" ? "on" : ""}><Link to={"/"}>내정보 관리</Link></li>
            <li className={pathname === "/project" || pathname.indexOf("/project") > -1 ? "on" : ""}><Link to={"/project"}>프로젝트 관리</Link></li>
            <li className={pathname === "/contact" ? "on" : ""}><Link to={"/contact"}>나에게 온 메세지</Link></li>
        </ul>
    )
}

export default AdminTopNav