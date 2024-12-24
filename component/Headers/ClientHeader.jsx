import { useState } from "react"

/** img */
import logoImg from "../../img/logo.svg";

/** component */
import TimerBox from "./TimerBox";
import ClientSideNav from "../Nav/ClientSideNav";

const ClientHeader = () => {
    
    const [isMenu, setMenu] = useState(false);

    function ToggleMenu(){
        let is = isMenu ? false : true
                        
        setMenu(is);
    }
    

    return (
        <>
            <header id="clientHeader" className={`header ${isMenu ? "on" : ""}`}>
                <h1 className="logo">
                    <button>
                        <img src={logoImg} alt="로고" />
                    </button>
                </h1>    
                <TimerBox/>
                <button 
                    className={`btnMenu ${isMenu ? "on" : ""}`}
                    title="메뉴열기"
                    onClick={ToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>
            <nav className={`navBox ${isMenu ? "show" : "close"}`} >
                <ClientSideNav menuCloseCallback={ToggleMenu} />
            </nav>
        </>
    )
}

export default ClientHeader