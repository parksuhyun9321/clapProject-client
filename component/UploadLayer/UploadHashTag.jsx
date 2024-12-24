import { useRef, useState } from "react";

/** custom hook */
import useToast from "../../hook/useToast";

/** component */
import InputHashTag from "./input/InputHashTag";
import HashTagList from "./list/HashTagList";

/** api */
import HASHTAG from "../../js/hashTag";
import TOKEN from "../../js/token";



const UploadHashTag = ({ data, cancelCallback, refetchCallback}) => {

    const [hashTag, setHashTag] = useState([...data]);

    const [transitionStage, setTransistionStage] = useState("show");

    const { ToastUpload, setToastStatus } = useToast();

    const endFunc = useRef(null);

    const hashTagInput = useRef(null);

    /** 해시 태그 데이터 등록 */
    function AddHashTag() {
        if(!hashTagInput["current"]) return
        if(!hashTagInput["current"].value) return
        
        setHashTag(arr => {
            const newArr = [...arr];

            newArr.push(hashTagInput["current"].value);

            hashTagInput["current"].value = "";
            hashTagInput["current"].focus();

            return newArr
        });
    }

    /** 추가한 해시태그 저장 */
    function Submit(){

        if(JSON.stringify(hashTag) === JSON.stringify(data)) return console.log("이전의 데이터와 같음");

        HASHTAG.update(TOKEN.get(), hashTag)
        .then(rs => {

            endFunc["current"] = refetchCallback;
            setToastStatus("update hashTag");
        })
        .catch(err => {

        })
    }

    /** 추가한 해시태그 삭제 */
    function Delete(target){
        if(hashTag.length <= 0) return 

        setHashTag(arr => {
            let newArr = [...arr];

            const idx = newArr.findIndex(el => el === target);
    
            newArr.splice(idx, 1);

            return newArr
        })
    }
    
    function AllDelete(){
        setHashTag([]);
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
                <div className={`inner ${transitionStage}`} onAnimationEnd={AnimEnd}>
                    <div className="hashTagBox">
                        <HashTagList data={hashTag} deleteCallback={Delete} />
                        <h3>해시태그 추가</h3>
                        <div className="inputBox">
                            <InputHashTag ref={hashTagInput} addCallback={AddHashTag}/>
                            <button onClick={AddHashTag}>추가</button>
                        </div>
                    </div>

                    {
                        hashTag.length > 0 ? <button className="btnAllDelete" onClick={AllDelete}>전체 삭제</button> : null
                    }
                    <button className="btnSubmit" onClick={Submit}>수정</button>
                    
                    
                </div>
            </div>
        </>
    )
}

export default UploadHashTag