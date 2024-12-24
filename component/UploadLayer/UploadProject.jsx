import { useState, useRef, useEffect } from "react"

/** custom hook */
import useLoading from "../../hook/useLoading";
import useToast from "../../hook/useToast"

/** api */
import TOKEN from "../../js/token";
import PROJECT from "../../js/project";
import FILES from "../../js/files";

/** component */
import InputProjectName from "./input/InputProjectName";
import SelectStart from "./select/SelectStart";
import SelectEnd from "./select/SelectEnd";
import SlideContents from "../Swiper/SlideContents";
import CheckOnGoing from "./checkBox/CheckOnGoing";
import InputHashTag from "./input/InputHashTag";
import HashTagList from "./list/HashTagList";
import InputUrls from "./input/InputUrls";
import UrlsList from "./list/UrlsList";
import FilesList from "./list/FilesList";
// import DragBox from "./dropBox/DropBox";
import TextAreaContents from "./textarea/TextAreaContents";



const UploadProject = ({data, cancelCallback, refetchCallback}) => {
    const cmd = data ? "U" : "C";
    const projectId = data ? data["projectId"] : "";
    const [projectName, setProjectName] = useState(data ? data["projectName"] : "");
    const [startYear, setStartYear] = useState(data ? data["startYear"] :"");
    const [startMonth, setStartMonth] = useState(data ? data["startMonth"] : "");
    const [endYear, setEndYear] = useState(data ? data["endYear"] : "");
    const [endMonth, setEndMonth] = useState(data ? data["endMonth"] : "");
    const [onGoing, setOnGoing] = useState(data ? data["onGoing"] : false);
    const [hashTag, setHashTag] = useState(data ? data["hashTag"] : []);
    const [urls, setUrls] = useState(data ? data["urls"] : []);
    const [swiperFiles, setSwiperFiles] = useState(data ? data["swiperFiles"] : []);
    const [attachedFiles, setAttachedFiles] = useState(data ? data["attachedFiles"] : []);
    const [contents, setContents] = useState(data ? data["contents"] : "");

    const [previousData, setPreviousData] = useState(null);

    const [deleteSwipe, setDeleteSwipe] = useState([]);

    const [deleteAttached, setDeleteAttached] = useState([]);

    const { ToastUpload, setToastStatus } =  useToast();

    const { loadingHide, loadingShow, IconElement } = useLoading();

    const [transitionStage, setTransistionStage] = useState("show");

    const endFunc = useRef(null);

    const hashTagInput = useRef(null);

    const UrlsInput = useRef(null);

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

    /** 추가한 해시태그 삭제 */
    function DeleteHashTag(target){
        if(hashTag.length <= 0) return 

        setHashTag(arr => {
            let newArr = [...arr];

            const idx = newArr.findIndex(el => el === target);
    
            newArr.splice(idx, 1);

            return newArr
        })
    }

    /** urls 데이터 등록 */
    function AddUrls(){
        if(!UrlsInput["current"]) return
        if(!UrlsInput["current"].value) return

        setUrls(arr => {
            const newArr = [...arr];

            newArr.push(UrlsInput["current"].value);

            UrlsInput["current"].value = "https://";
            UrlsInput["current"].focus();

            return newArr
        })
    }

    function DelelteUrls(target){
        if(urls.length <= 0) return 

        setUrls(arr => {
            let newArr = [...arr];

            const idx = newArr.findIndex(el => el === target);
    
            newArr.splice(idx, 1);

            return newArr
        })
    }

    function DeleteSwiper(targetIdx) {
        setSwiperFiles(arr => {
            const newArr = [...arr];

            let item = newArr.splice(targetIdx, 1);

            if(cmd === "U") {

                setDeleteSwipe(prev => [...prev, item[0]]);
                // deleteSwipe.push(item[0]);
                // setDeleteSwipe(deleteSwipe);
            }

            return newArr
        })
    }
    
    // function AddAttachedFiles(e){
    //     if(e.dataTransfer.files.length <= 0) return 

    //     const file = e.dataTransfer.files[0];

    //     setAttachedFiles(arr => {
    //         const newArr = [...arr];

    //         newArr.push(file);

    //         return newArr;
    //     })
    // }

    function DeleteAttachedFiles(targetIdx) {
        setAttachedFiles(arr => {
            
            const newArr = [...arr];
            
            let item = newArr.splice(targetIdx, 1);

            if(cmd === "U") {
                setDeleteAttached(prev => [...prev, item[0]]);
            }

            return newArr;
        }) 

    }

    /**
     * 데이터 셋팅
     * @param {eventTarget} e 
     */
    function Validata(e){

        /** @type {HTMLElement} */
        const self = e.currentTarget;

        switch (self.id) {
            
            case "projectName" : setProjectName(self.value); break;
            case "startYear" : setStartYear(self.value); break;
            case "startMonth" : setStartMonth(self.value); break;
            case "endYear" : 
                if(onGoing) setOnGoing(false);

                setEndYear(self.value);
            break;
            case "endMonth" : 
                if(onGoing) setOnGoing(false);

                setEndMonth(self.value);
            break;
            case "onGoing" : 

                const isChecked = self.checked;

                if(isChecked) {
                    if(endYear) setEndYear("");
                    if(endMonth) setEndMonth(""); 
                }

                setOnGoing(isChecked)

            break;
            case "swiperData" : 
                const swiperData = self.files;

                for(let i = 0; i < swiperData.length; i++){
                    setSwiperFiles(arr => {
                        const newArr = [...arr];
                        newArr.push(swiperData[i]);

                        return newArr
                    })
                }
            break;

            case "attachedFiles" :
                const attachedData = self.files;

                for(let i = 0; i < attachedData.length; i++){
                    setAttachedFiles(arr => {
                        const newArr = [...arr];
                        newArr.push(attachedData[i]);

                        return newArr
                    })
                }

            break;

            case "contentsArea" : setContents(self.value); break;
        
            default: return;
        }

    }

    async function Submit(){

        console.log("deleteAttached",deleteAttached)

        /** 이전의 데이터와 같은 값이면 등록, 수정을 하지않음 */
        if(
            previousData["projectName"] === projectName && 
            previousData["startYear"] === startYear &&
            previousData["startMonth"] === startMonth && 
            previousData["endYear"] === endYear &&
            previousData["endMonth"] === endMonth && 
            previousData["onGoing"] === onGoing && 
            JSON.stringify(previousData["hashTag"]) === JSON.stringify(hashTag) && 
            JSON.stringify(previousData["urls"]) === JSON.stringify(urls) && 
            JSON.stringify(previousData["swiperFiles"]) === JSON.stringify(swiperFiles) && 
            JSON.stringify(previousData["attachedFiles"]) === JSON.stringify(attachedFiles) && 
            previousData["contents"] === contents
            ) 
        {
            return console.log("이전 등록 값과 같은 결과값")
        }


        if(!projectName || !startYear || !startMonth) return setToastStatus("essential");

        /** 진행중 미 체크 */
        if(!onGoing) {

            /** 종료 년, 월 미 선택 */
            if(!endYear || !endMonth) return setToastStatus("essential");

            /** 종료 년, 월 이  시작 년, 월 보다 이전 날짜 일때 */
            if(new Date(`${endYear}.${endMonth}`) < new Date(`${startYear}.${startMonth}`)) return setToastStatus("date check");
        }

        if(swiperFiles.length <= 0) return setToastStatus("essential contents file")

        /** 로딩화면 활성화 */
        loadingShow();

        /** @type {string} 입사 날짜 ex) 2022.04 */
        const startDate = `${startYear}.${startMonth}`;

        /** @type {date} 퇴사 날짜 ex) 2024.11 */
        const endDate = onGoing ? "onGoing" : `${endYear}.${endMonth}`;

        const token = TOKEN.get();

        let swiperArr = [];
        let attachedArr = [];
    
        if(cmd === "U" ) {
            const deleteArr = [
                ...deleteSwipe,
                ...deleteAttached
            ]
            await FILES.deleteFiles(token, deleteArr);

            if(deleteSwipe.length > 0) {
                for(let item of deleteSwipe) {
                    if(!item) continue
                    
                    for(let item2 of swiperFiles) {
                        if(!item2) continue
                        if(item2 instanceof File) continue
                        if(JSON.stringify(item) === JSON.stringify(item2)) continue
                        
                        swiperArr.push(item2);
                    }
                }
            }

            
            if(deleteAttached.length > 0) {
                for(let item of deleteAttached) {
                    if(!item) continue
    
                    for(let item2 of attachedFiles) {
                        if(!item2) continue
                        if(item2 instanceof File) continue
                        if(JSON.stringify(item) === JSON.stringify(item2)) continue
    
                        attachedArr.push(item2);
                    }
                }
            }
        }

        Promise.all([
            FILES.uploadSwiperData(token, swiperFiles),
            FILES.uploadAttachedFiles(token, attachedFiles)
        ])
        .then(async (files) => {

            const swiperData = files[0]["data"];
            const attachedData = files[1]["data"];

            let swiperResult = [
                ...swiperArr,
                ...swiperData
            ];

            let attachedResult = [
                ...attachedArr,
                ...attachedData
            ];

            const result = {
                projectName,
                startDate,
                endDate,
                hashTag,
                urls,
                contents,
                projectId,
                swiperFiles : [...new Set(swiperResult)],
                attachedFiles : [...new Set(attachedResult)],
            }

            // return


            PROJECT[cmd === "C" ? "add" : "update"](token, result)
            .then(rs => {;

                setToastStatus(`${cmd === "C" ? "add" : "update"} project`, projectName)
                endFunc["current"] = refetchCallback;
                
                loadingHide(); /** 로딩화면 비활성화*/
            })
            .catch(err => {
                console.log("err",err);
                loadingHide(); /** 로딩화면 비활성화*/
                setToastStatus(err);
            })
        })
    }

    function AnimEnd() {
        if(transitionStage !== "hide") return

        cancelCallback();

        if(endFunc["current"]) {
            endFunc["current"]();
            endFunc["current"] = null;
        }
    }

    useEffect(() => {

        setPreviousData({
            projectName,
            startYear,
            startMonth,
            endYear,
            endMonth,
            onGoing,
            hashTag,
            urls,
            swiperFiles,
            attachedFiles,
            contents,
        })

        return () => {
            setPreviousData(null);

            if(deleteSwipe.length > 0) setDeleteSwipe([]);
            if(deleteAttached.length > 0) setDeleteAttached([])
        }

        // eslint-disable-next-line
    },[]);

    return (
        <>

            <ToastUpload completeCallback={() => {
                setTransistionStage("hide")
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

                <form onAnimationEnd={AnimEnd} className={`inner project ${transitionStage}`}>

                    <IconElement/>

                    <ul className="inputList">
                        <InputProjectName projectName={projectName} inputCallback={Validata} />
                        <SelectStart startYear={startYear} startMonth={startMonth} selectCallback={Validata}/>
                        <SelectEnd endYear={endYear} endMonth={endMonth} selectCallback={Validata}/>
                        <CheckOnGoing onGoing={onGoing} checkCallback={Validata}/>
                        <li>
                            <label htmlFor="inputHashTag">해시 태그</label>
                            <div className="inputBox">   
                                <InputHashTag placeholder={"프로젝트와 관련된 단어, 문장"} ref={hashTagInput} addCallback={AddHashTag} />
                                <button type="button" className="btnAdd" onClick={AddHashTag}>등록</button>
                            </div>
                            <HashTagList noEmpty={true} data={hashTag} deleteCallback={DeleteHashTag}/>
                        </li>
                        <li>
                            <label htmlFor="inputUrls">첨부 링크</label>
                            <div className="inputBox">
                                <InputUrls ref={UrlsInput} addCallback={AddUrls}/>
                                <button type="button" className="btnAdd" onClick={AddUrls}>등록</button>
                            </div>
                            <UrlsList data={urls} deleteCallback={DelelteUrls} />
                        </li>
                        <li className="swiperBox">
                            <label>대표 이미지</label>
                            <SlideContents files={swiperFiles} maxIdx={swiperFiles.length-1} deleteCallback={DeleteSwiper}/>
                            <div className="btnBox">
                                <label htmlFor="swiperData">이미지 업로드</label>
                                {swiperFiles.length > 0 ? <button onClick={() => {
                                    setSwiperFiles([])
                                }}>이미지 초기화</button> : null}
                            </div>
                            <input 
                                type="file" 
                                id="swiperData"
                                multiple
                                // accept="video/*, image/*"
                                accept="image/*"
                                className="hidden"
                                onChange={Validata}
                            />
                        </li>
                        <li>
                            <label>첨부문서</label>

                            <div className="btnBox">
                                <label htmlFor="attachedFiles">파일업로드</label>
                                <button onClick={() => {

                                    setAttachedFiles([]);

                                    if(cmd === "U" && attachedFiles.length > 0) {
                                        setDeleteAttached([...attachedFiles])
                                    }
                                }} type="button">파일 초기화</button>
                                <input 
                                    type="file" 
                                    id="attachedFiles" 
                                    className="hidden" 
                                    accept=".pdf, .xls, .xlsx, .zip"
                                    multiple
                                    onChange={Validata}
                                />
                            </div>
                            {/* <DragBox dropCallback={AddAttachedFiles}/> */}
                            <FilesList data={attachedFiles} deleteCallback={DeleteAttachedFiles}/>
                        </li>
                        <TextAreaContents data={contents} textAreaCallback={Validata} />
                    </ul>
                    <button type="button" onClick={Submit} className="btnSubmit">{cmd === "C" ? "등록" : "수정"}</button>
                </form>
            </div>
        </>
    )
}

export default UploadProject