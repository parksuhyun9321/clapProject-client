import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"

const ClientSideNav = ({ menuCloseCallback }) => {
    const { pathname } = useLocation();

    const { key } = useParams();

    const [isHomeContact, setIsHomeContact] = useState(false);

    const navigation = useNavigate();

    function ResizeCallback(){
        
        const windowWidth = window.innerWidth;
        if(windowWidth > 850) {
            setIsHomeContact(false);
        }
        if(windowWidth < 850 && pathname !== `/${key}/contact`) {
            setIsHomeContact(true);
        }
    }

    function ClickNavi(e){
        
        const self = e.currentTarget;

        const isNavi = self.dataset.navi;

        menuCloseCallback();

        navigation(isNavi);
    
    }

    /** 체험하기 새창 열기 */
    function MoveToExperience(){
        window.open(`${window.location.origin}/experience`, "_blank","noopener");
    }

    useEffect(() => {

        ResizeCallback()

        window.addEventListener("resize",ResizeCallback);

        return () => {
            window.removeEventListener("resize",ResizeCallback);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <ul className="navList">
            {
                pathname !== `/${key}` ? <li><button data-navi={`/${key}`} onClick={ClickNavi} >home</button></li>  : null 
            }
            {
                pathname !== `/${key}/about` ? <li><button data-navi="about" onClick={ClickNavi}>about</button></li> : null
            }
            {
                pathname !== `/${key}/project` ? <li><button data-navi="project" onClick={ClickNavi}>project</button></li> : null
            }
            {
                isHomeContact ? <li><button data-navi="contact" onClick={ClickNavi}>contact</button></li> : null
            }

            {
                key === "eNozNjLULSjOsIQQxkaGACtYBLw=" ? <li><button className="utilBtn" onClick={MoveToExperience}>체험하기</button></li> : null
            }
            
        </ul>
    )
}

export default ClientSideNav