import { forwardRef, useState } from "react"

import btnPlay from "../../img/play.svg"
import btnPause from "../../img/pause.svg"
import btnSound from "../../img/sound.svg"


import btnMute from "../../img/mute.svg"


const SlideItem = ({ file, no}, ref) => {

    
    const [mutedSrc, setMutedSrc] = useState(btnSound);
    const [playSrc, setPlaySrc] = useState(btnPause);

    if(file["type"].indexOf("video") > -1) {

        let url;

        if(file instanceof File) {
            url = URL.createObjectURL(file);
        }
        else if(typeof file === "object"){
            url = `${process.env.REACT_APP_CONTENTS_URL??window.location.origin}/contents/${file["id"]}/file/${file["fileName"]}`
        }

        const playToggleEvent = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if(!ref["current"][no]) return
            if(!ref["current"][no]["el"]) return

            const isPaused = ref["current"][no]["el"].paused;

            ref["current"][no]["isPaused"] = isPaused ? false : true;

            if(isPaused) {
                ref["current"][no]["el"].play();    
            }
            else {
                ref["current"][no]["el"].pause(); 
            }

            setPlaySrc(isPaused ? btnPause : btnPlay);
        }

        const soundToggleEvent = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(no,"????",ref["current"][no])
            if(!ref["current"][no]) return
            if(!ref["current"][no]["el"]) return

            const isMuted = ref["current"][no]["el"].muted;

            ref["current"][no]["isMuted"] = isMuted ? false : true

            ref["current"][no]["el"].muted = isMuted ? false : true

            setMutedSrc(isMuted ? btnMute : btnSound)
        }
        
        return (
            <>
                <ul className="btnList">
                    <li>
                        <button onClick={soundToggleEvent}>
                            <img src={mutedSrc} alt="" />
                        </button>
                    </li>
                    <li>
                        <button onClick={playToggleEvent}>
                            <img src={playSrc} alt="" />
                        </button>
                    </li>
                </ul>
                <div className="contentsBox">
                    <video id={`test-${no}`} ref={el => {

                        if(ref["current"][no]) return

                        let obj = {
                            type : "video",
                            el : el,
                            isMuted : true,
                            isPaused : false,
                        }
                        ref["current"][no] = obj;
                    }} autoPlay={no === 0} loop playsInline muted >
                        <source src={url} />
                    </video>
                </div>
            </>
        )
    }   
    else if(file["type"].indexOf("image") > -1) {

        let url;

        if(file instanceof File) {
            url = URL.createObjectURL(file);
        }
        else if(typeof file === "object"){
            url = `${process.env.REACT_APP_CONTENTS_URL??window.location.origin}/contents/${file["id"]}/file/${file["fileName"]}`
        }

        return (
            <>
                <div className="contentsBox">
                    <img ref={el => {

                        if(ref["current"][no]) return

                        let obj = {
                            type : "img",
                            el : el,
                        }
                        ref["current"][no] = obj
                    }} src={url} alt={file["name"]}/>
                </div>
            </>
        )
    }
}

export default forwardRef(SlideItem)