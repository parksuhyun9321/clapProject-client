import { useRef, useState } from "react";

import useToast from "../../hook/useToast";

import imgNull from "../../img/img_none.svg"
import PROFILE_IMG from "../../js/profileImg";
import TOKEN from "../../js/token";


const UploadProfileImg = ({src, cancelCallback, refetchCallback}) => {
    
    const { ToastUpload, setToastStatus } = useToast();

    const [transitionStage, setTransistionStage] = useState("show");

    const endFunc = useRef(null);

    /** @type {string} */
    const [_src, setSrc] = useState(src);

    /** @type {formData} */
    const [files, setFiles] = useState(null);

    const onChange = (e) => {
        const self = e.target;

        setSrc(URL.createObjectURL(self.files[0]));

        setFiles()

        const data = new FormData();

        data.append("item",self.files[0]);

        setFiles(data);

    }

    const imgDelete = () => {
        if(_src) {
            setSrc(src);
            if(files) setFiles(null);
        }
    }

    const Submit = () => {
        
        /** 이미지를 등록하지 않음 */
        if(!files) return setToastStatus("profile img null");

        PROFILE_IMG.update(TOKEN.get(), files)
        .then(rs => {
        console.log(rs)
            if(rs["resultCode"] !== 200) return setToastStatus("api error", rs["errorMsg"])
            endFunc.current = refetchCallback;
            
            setToastStatus("profile img update");            
        })
        .catch(err => {
            console.log("err",err)
            setToastStatus("api error", err["errorMsg"])
        })

        // API.setProfileImg(files)
        // .then(rs => {
        //     endFunc.current = refetchCallback;
        //     setToastStatus("profile img update");
        // })

        
    }

    function AnimEnd() {
        if(transitionStage !== "hide") return

        cancelCallback();

        if(endFunc["current"]) {
            endFunc["current"]();
            endFunc["current"] = null;
        }
    }

    return (
        <>
            <ToastUpload completeCallback={() => {
                setTransistionStage("hide");
            }}/>
            <div className="uploadWrapper" onClick={(e) => {
                if(e.target === e.currentTarget) {
                    setTransistionStage("hide");
                }
            }}>
                <button className="uploadClose" onClick={() => {
                    setTransistionStage("hide");
                }}>
                    <span></span>
                    <span></span>
                </button>
                <div onAnimationEnd={AnimEnd} className={`inner ${transitionStage}`}>
                    <ul className="inputList">
                        <li className="profileImg">
                            <div className="imgBox">
                                {files ? <button className="btnCancel" onClick={imgDelete}>
                                    <span></span>
                                    <span></span>
                                </button> : null}
                                <img src={_src ? _src : imgNull} alt="" />
                            </div>
                            <div className="btnBox">
                                <label htmlFor="profileImg">이미지 선택</label>
                                <input accept="image/*" className="hidden" type="file" id="profileImg" onChange={onChange} />
                                <button className="btnSubmit" onClick={Submit}>등록</button>
                            </div>
                            
                        </li>
                    </ul>
                    
                </div>
            </div>
        </>
    )
}

export default UploadProfileImg