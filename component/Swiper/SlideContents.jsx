import { useEffect, useRef, useState, useMemo } from "react";
import BtnDelete from "./BtnDelete";
import SwiperPagination from "./Pagination";
import SlideItem from "./SlideItem";
import SlideNull from "./SlideNull";



/** @type {number} 트랜지션 속도 */
const TRANSITION_TIME = 0.25;

const SlideContents = ({files, deleteCallback, maxIdx, isSwipeNone}) => {
    const elementRef = useRef({});

    const positionInfo = useRef({

        elements : null,

        /** @type {boolean} true : 터치함 */
        isDown : false,

        /** @type {object} { x : number, y : number } 시작 좌표 */
        startPosition : null,

        /** @type {object} { x : number, y : number } 종료 좌표 */
        endPosition : null,

        /** @type {number} 현재 슬라이드 위치 */
        left : 0,
    });

    const [currentIdx, setCurrentIdx] = useState(0);

    /**
     * 마우스, 터치 좌표 이벤트를 리턴함
     * @param {MouseEvent} e 
     * @returns {object} {x : number, y : number}
     */
     const eventParam = (e) => {

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

    const eventDown = (e) => {
        if(isSwipeNone) return
        if(maxIdx <= 0) return 

        const { x, y } = eventParam(e);
    
        positionInfo["current"]["isDown"] = true;

        positionInfo["current"]["endPosition"] = null;

        positionInfo["current"]["startPosition"] = { x, y };
    }


    const eventMove = (e) => {
        if(isSwipeNone) return
        if(!positionInfo["current"]["isDown"]) return

        const { x, y } = eventParam(e);

        /** @type {number} 시작 x 좌표 */
        const startX = positionInfo["current"]["startPosition"]["x"];
        const startY = positionInfo["current"]["startPosition"]["y"];

        const inner = e.currentTarget;

        positionInfo["current"]["endPosition"] = { x, y };

        if(Math.abs(startX - x) <= 5 && Math.abs(startY - y) <= 5) return

        /** @type {number} 현재 x 좌표 */
        const endX = positionInfo["current"]["endPosition"]["x"];

        /** @type {number} 0보다 크면 오른쪽에서 왼쪽, 0보다 작으면 왼쪽에서 오른쪽 */
        const distance = startX - endX;
        
        /** 오른쪽에서 왼쪽으로 스와이프 하면서 맨마지막 슬라이드 일때 */
        if(distance > 0 && currentIdx >= maxIdx) {
            return inner.style.left = `-${inner.clientWidth*(maxIdx)}px`
        }
        /** 왼쪽에서 오른?쪽으로 스와이프 하면서 맨 처음 슬라이드 일때 */
        else if(distance <= 0 && currentIdx === 0) {
            return inner.style.left = `0px`
        }
        else {
            inner.style.left = `${(endX - startX) + positionInfo["current"]["left"]}px`
        }
    }

    const eventUp = (e) => {
        if(isSwipeNone) return
        if(!positionInfo["current"]["isDown"]) return;
        if (!positionInfo["current"]["startPosition"] || !positionInfo["current"]["endPosition"]) return;

        const startY = positionInfo["current"]["startPosition"]["y"];
        const startX = positionInfo["current"]["startPosition"]["x"];
        const endY = positionInfo["current"]["endPosition"]["y"];
        const endX = positionInfo["current"]["endPosition"]["x"];

        if(Math.abs(startX - endX) <= 5 && Math.abs(startY - endY) <= 5) {
            positionInfo["current"]["isDown"] = false;
            positionInfo["current"]["startPosition"] = null;
            positionInfo["current"]["endPosition"] = null;

            return
        }

        const distance = startX - endX;

        let _left = positionInfo["current"]["left"];
        // let _idx = positionInfo["current"]["currentIdx"];
        let _idx = currentIdx;

        
        if(Math.abs(endX - startX) > (e.currentTarget.clientWidth / 3)) {
            /** 오른쪽에서 왼쪽으로 스와이프 */
            if (distance > 0) {
        
                if(_idx >= maxIdx) return;

                _left-=e.currentTarget.clientWidth;
                _idx+=1;
            } 
            /** 왼쪽에서 오른쪽으로 스와이프 */
            else {
                if(_idx === 0) return;

                _left+=e.currentTarget.clientWidth;
                _idx-=1;
            }    

            positionInfo["current"]["left"] = _left;

            setTransition(e, true);
            setCurrentIdx(_idx);
            e.currentTarget.style.left = `${_left}px`
        }
        else {
            e.currentTarget.style.left = `${_left}px`
        }

        positionInfo["current"]["isDown"] = false;
        positionInfo["current"]["startPosition"] = null;
        positionInfo["current"]["endPosition"] = null;
    }

    const setTransition = (e, init) => {
        const self = e.currentTarget ?? positionInfo["current"]["elements"];

        self.style.transition = init ? `${TRANSITION_TIME}s all` : "none";
    }

    const paginationCallback = (i) => {

        const { elements } = positionInfo["current"];

        let _left = parseInt(-(i * elements.clientWidth));
    
        setCurrentIdx(i);
        positionInfo["current"]["elements"].style.transition = `${TRANSITION_TIME}s`;
        positionInfo["current"]["left"] = _left;
        positionInfo["current"]["elements"].style.left = `${positionInfo["current"]["left"]}px`

    }

    const slideDelete = (i) => {
        const { elements } = positionInfo["current"];

        let _left = parseInt(-(i * elements.clientWidth));

        let result = _left + elements.clientWidth;

        if(result > 0) result = 0;

        let _idx = (i - 1) < 0 ? 0 : (i - 1);

        
        if(deleteCallback) deleteCallback(i);
        setCurrentIdx(_idx);
        positionInfo["current"]["left"] = result;
        positionInfo["current"]["elements"].style.left = `${positionInfo["current"]["left"]}px`
    }
    
    useEffect(() => {
        
        if(Object.keys(elementRef["current"]).length <= 0) return 

        const item = elementRef["current"][currentIdx];

        for(let i in elementRef["current"]) {

            if(elementRef["current"][i]["type"] !== "video") continue;
            if(!elementRef["current"][i]["el"]) continue;
            
            if(Number(i) === currentIdx) {
                item["el"].muted = item["isMuted"];
                
                item["isPaused"] ? item["el"].pause() : item["el"].play();
            }
            else {
                elementRef["current"][i]["el"].pause()
            }
        }
        
    },[files,currentIdx]);

    const slideItems = useMemo(() => {
        return (
            files.length > 0 ? 
            files.map((file, i) => {
                return (
                    <li key={i}>
                        {deleteCallback ? <BtnDelete idx={i} deleteCallback={slideDelete}/> : null}
                        <SlideItem ref={elementRef} key={i} _ref={elementRef} file={file} no={i}/>
                    </li>
                )
            }) : <li><SlideNull/></li>
        )
    },[files])

    return (
        <>

            <div className="slideContents">
                <div className="slideWrapper">
                    <ul 
                    style={{left:"0"}}
                    ref={el => positionInfo["current"]["elements"] = el}
                    onMouseDown={eventDown}
                    onTouchStart={eventDown}
                    onMouseMove={eventMove}
                    onTouchMove={eventMove}
                    onMouseUp={eventUp}
                    onTouchEnd={eventUp}
                    onMouseOut={eventUp}
                    onTouchCancel={eventUp}
                    onTransitionEnd={setTransition}
                    className="slideInner">
                        {slideItems}
                    </ul>
                    <SwiperPagination idx={currentIdx} total={files.length} callback={paginationCallback} />
                </div>
            </div>
        </>
    )
}

export default SlideContents