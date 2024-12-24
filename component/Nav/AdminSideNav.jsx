
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

/** api */
import MYINFO from "../../js/myInfo";
import TOKEN from "../../js/token";


const AdminSideNav = ({logoutConfirmCallback, withdrawalConfirmCallback, isCopyCallback, menuCallback}) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const { pathname } = useLocation();

    function myHomeOpen(){

        MYINFO.getMyHome(TOKEN.get())
        .then(rs => {
            menuCallback();
            const link = `${window.location.origin}/${rs["data"]}`;

            console.log(rs["data"])
            window.open(link, "_blank","noopener");
            
        })
    }

    function HomeUrlCopy(){
        MYINFO.getMyHome(TOKEN.get())
        .then(rs => {

            const link = `${window.location.origin}/${rs["data"]}`;

            navigator.clipboard.writeText(link)
            .then(() => {
                isCopyCallback(true);
            })
            .catch(err => {
                console.log("복사 실패",err);
                isCopyCallback(false);
            })
        })
    }

    function ResizeCallback(){

        const windowWidth = window.innerWidth;
        if(windowWidth < 800) {
            // if(!isHide) 
            setIsVisible(true)
        }
        if(windowWidth > 800) {
            // if(isHide) 
            setIsVisible(false);    
        }
    }

    useEffect(() => {

        ResizeCallback()

        window.addEventListener("resize",ResizeCallback);

        return () => {
            window.removeEventListener("resize",ResizeCallback);
        }
        
    },[])
    
    return (
        <>
            <ul className="navList">
                {
                    isVisible ? <>
                        {pathname === "/" ? null : <li><Link to={"/"}>내정보 관리</Link></li>}
                        {pathname === "/project" ? null : <li><Link to={"/project"}>프로젝트 관리</Link></li>}
                        {pathname === "/contact" ? null : <li><Link to={"/contact"}>나에게 온 메세지</Link></li>}
                    </> : null
                }
                
                <li className="btnHome">
                    <button className="utilBtn" onClick={myHomeOpen}>내 홈페이지 열기</button>
                </li>
                {/* <li className="btnLogout">
                    <button className="utilBtn" onClick={HomeUrlCopy}>내 홈페이지 url 복사</button>
                </li> */}
                <li className="btnLogout">
                    <button className="utilBtn" onClick={logoutConfirmCallback}>로그아웃</button>
                </li>
                <li>
                    <button className="utilBtn" onClick={withdrawalConfirmCallback}>회원 탈퇴</button>
                </li>
            </ul>
        </>
    )
}

export default AdminSideNav