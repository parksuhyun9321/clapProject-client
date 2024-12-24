import { useRef, useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import PROJECT from "../../js/project";

import SlideContents from "../Swiper/SlideContents";

function ProjectAnimationCard(){

    const[projectData, setProjectData] = useState([]);

    const { key } = useParams();
    useEffect(() => {

        PROJECT.get(false, key, 0, 1000)
        .then(rs => {
            const { project, total } = rs["data"];

            for(let i = 0; i < total; i++){
                currentInfo["current"]["coordinates"].push({x : i*100, y : i*15, z : i*10})
            }

            setProjectData(project)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const currentInfo = useRef({
        currentIdx : 0,

        isDown : false,
        isMove : false,

        startX: null,
        startY : null,

        coordinates : [],
        coordinates2 : new Map([]),

        items : [],

        elements : null,

        isTransition : false,

        timer : null,
    })

    /**
     * 마우스, 터치 좌표 이벤트를 리턴함
     * @param {MouseEvent} e 
     * @returns {object} {x : number, y : number}
     */
    function EventParam(e) {

        let x = undefined;
        let y = undefined;

        if (e.touches && e.touches.length > 0){
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }
        if (e.changedTouches && e.changedTouches.length > 0){
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }
        if (x === undefined){
            x = e.pageX;
        }
        if (y === undefined){
            y = e.pageY;
        }

        return {
            x : x,
            y : y
        }
    }

    function Start(e){

        const { x, y } = EventParam(e);

        currentInfo["current"]["isDown"] = true;
        currentInfo["current"]["startX"] = x;
        currentInfo["current"]["startY"] = y;
    }

    function Move(e) {
        if(!currentInfo["current"]["isDown"]) return
        if(currentInfo["current"]["isMove"]) return

        const { x } = EventParam(e);
            
        /** @type {number} 0 보다 작을시 아래로 드래그, 0보다 클시 위로 드래그  */
        const direction = x - currentInfo["current"]["startX"];

        /** 왼쪽에서 오른쪽 */
        if(direction > 10) {
            let first = currentInfo["current"]["coordinates"].pop();
            currentInfo["current"]["coordinates"].unshift(first);
            currentInfo["current"]["isMove"] = true;
            currentInfo["current"]["currentIdx"]+=1; 
        }
        /** 오른쪽에서 왼쪽 */
        else if(direction < -10) {
            let first = currentInfo["current"]["coordinates"].shift();
            currentInfo["current"]["coordinates"].push(first);
            currentInfo["current"]["isMove"] = true;

            if(currentInfo["current"]["currentIdx"]-1 <= 0) {
                currentInfo["current"]["currentIdx"] = 0
            }
            else {
                currentInfo["current"]["currentIdx"]-=1;
            }
        }

    }

    function End() {
        currentInfo["current"]["isDown"] = false;
        currentInfo["current"]["startX"] = null;
        currentInfo["current"]["startY"] = null;

        if(currentInfo["current"]["isMove"]) {
            currentInfo["current"]["isMove"] = false;

            const arr = currentInfo["current"]["coordinates"]
            
            for(let i = 0; i < arr.length; i++){     
                const item = arr[i];

                if(!currentInfo["current"]["items"][i]) break

                currentInfo["current"]["items"][i].style.transform = `translate3d(-${item["x"]}px, -${item["y"]}px, -${item["z"]}px)`;

            }
        }
    }

    function WheelAime(e) {
        if(currentInfo["current"]["isTransition"]) return

        currentInfo["current"]["isTransition"] = true;

        if(e.deltaY > 0) {
            let first = currentInfo["current"]["coordinates"].shift();
            currentInfo["current"]["coordinates"].push(first);
            currentInfo["current"]["isMove"] = true;
        }
        else {
            let first = currentInfo["current"]["coordinates"].pop();
            currentInfo["current"]["coordinates"].unshift(first);
        }

        const arr = currentInfo["current"]["coordinates"]

        for(let i = 0; i < arr.length; i++){     
            const item = arr[i];

            if(!currentInfo["current"]["items"][i]) break

            currentInfo["current"]["items"][i].style.transform = `translate3d(-${item["x"]}px, -${item["y"]}px, -${item["z"]}px)`;
        }
    }

    if(!projectData) return

    return (
        <>
            <ul 
                className="list"
                onMouseDown={Start} 
                onMouseMove={Move} 
                onMouseUp={End} 
                onTouchStart={Start}
                onTouchMove={Move}
                onTouchEnd={End}
                onWheel={WheelAime}
                onTransitionEnd={() => {
                                
                    if(!currentInfo["current"]["isTransition"]) return
                    if(currentInfo["current"]["timer"]) return 

                    currentInfo["current"]["timer"] = setTimeout(() => {
                        
                        currentInfo["current"]["isTransition"] = false;

                        clearTimeout(currentInfo["current"]["timer"]);
                        currentInfo["current"]["timer"] = null;
                    }, 800);
                }}
            >
                {
                    projectData.map((item, i) => {
                        console.log("item",item)
                        return (
                            <li
                             ref={el => currentInfo["current"]["items"][i] = el} style={{
                                transform : `translate3d(-${currentInfo["current"]["coordinates"][i]["x"]}px, -${currentInfo["current"]["coordinates"][i]["y"]}px, -${currentInfo["current"]["coordinates"][i]["z"]}px)`
                            }} key={i}>
                                <div className="imgBox"><img src={`${process.env.REACT_APP_CONTENTS_URL??window.location.origin}/contents/${item["swiperFiles"][0]["id"]}/file/${item["swiperFiles"][0]["fileName"]}`} /></div>
                                {/* <SlideContents files={item["swiperFiles"]} maxIdx={item["swiperFiles"].length-1} isSwipeNone={true} /> */}
                                <dl>
                                    <dt>{item["title"]}</dt>
                                    <dd>{item["contents"]}</dd>
                                </dl>
                            </li>
                        )
                    })
                }
                
            </ul>
        </>
        
        
    )
}

export default ProjectAnimationCard