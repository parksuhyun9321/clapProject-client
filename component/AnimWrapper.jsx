import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AnimWrapper = ({children}) => {
        
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location.pathname);
    const [transitionStage, setTransistionStage] = useState("show");

    function animEnd() {
        if(transitionStage === "hide") {
            setTransistionStage("show")

            setDisplayLocation(location.pathname)
        }
    }

    useEffect(() => {
        if(location.pathname !== displayLocation) {
            
            setTransistionStage("hide");
        }
    },[location.pathname, displayLocation])

    return (
        <div id="animWrapper" className={transitionStage}  onAnimationEnd={animEnd}>
            {children}
        </div> 
    )
}

export default AnimWrapper