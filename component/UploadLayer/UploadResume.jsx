import { useRef, useState, useEffect } from "react";

/** custom hook */
import useLoading from "../../hook/useLoading";
import useToast from "../../hook/useToast";

/** component */
import InputCompanyName from "./input/InputCompanyName";
import SelectStart from "./select/SelectStart";
import SelectEnd from "./select/SelectEnd";
import CheckInOffice from "./checkBox/CheckInOffice";

/** api */
import TOKEN from "../../js/token";
import RESUME from "../../js/resume";

const UploadResume = ({data, cancelCallback, reFetchCallback}) => {

    const cmd = data ? "U" : "C";
    const resumeId = data ? data["resumeId"] : "";
    const [companyName, setCompanyName] = useState(data ? data["companyName"] : "");
    const [startYear, setStartYear] = useState(data ? data["startYear"] :"");
    const [startMonth, setStartMonth] = useState(data ? data["startMonth"] : "");
    const [endYear, setEndYear] = useState(data ? data["endYear"] : "");
    const [endMonth, setEndMonth] = useState(data ? data["endMonth"] : "");
    const [inOffice, setInOffice] = useState(data ? data["inOffice"] : false);

    const [previousData, setPreviousData] = useState(null);
    
    const { ToastUpload, setToastStatus } =  useToast();

    const { loadingHide, loadingShow, IconElement } = useLoading();

    const [transitionStage, setTransistionStage] = useState("show");

    const endFunc = useRef(null);

    function AnimEnd() {
        if(transitionStage !== "hide") return

        cancelCallback();

        if(endFunc["current"]) {
            endFunc["current"]();
            endFunc["current"] = null;
        }
    }

    /** 데이터 셋팅 */
    function Validata(e) {
        const self = e.currentTarget;

        switch (self.id) {
            
            case "companyName" : setCompanyName(self.value); break;
            case "startYear" : setStartYear(self.value); break;
            case "startMonth" : setStartMonth(self.value); break;
            case "endYear" : 
                if(inOffice) setInOffice(false);

                setEndYear(self.value);
            break;
            case "endMonth" : 
                if(inOffice) setInOffice(false);

                setEndMonth(self.value);
            break;
            case "inOffice" : 

                const isChecked = self.checked;

                if(isChecked) {
                    if(endYear) setEndYear("");
                    if(endMonth) setEndMonth(""); 
                }

                setInOffice(isChecked)

            break;
        
            default: return;
        }
    }

    /** 등록, 수정  */
    function Submit(){

        /** 이전의 데이터와 같은 값이면 등록, 수정을 하지않음 */
        if(
            previousData["companyName"] === companyName && 
            previousData["startYear"] === startYear &&
            previousData["startMonth"] === startMonth && 
            previousData["endYear"] === endYear &&
            previousData["endMonth"] === endMonth && 
            previousData["inOffice"] === inOffice
            ) 
        {
            return console.log("이전 등록 값과 같은 결과값")
        }


        /** 회사명, 입사 년도, 입사 월 미입력, 미선택 */
        if(!companyName || !startYear || !startMonth) return setToastStatus("essential");

        /** 재직중 미 체크 */
        if(!inOffice) {

            /** 퇴사 년, 월 미 선택 */
            if(!endYear || !endMonth) return setToastStatus("essential");

            /** 퇴사 년, 월 이  입사 년, 월 보다 이전 날짜 일때 */
            if(new Date(`${endYear}.${endMonth}`) < new Date(`${startYear}.${startMonth}`)) return setToastStatus("date check");
        }

        /** 로딩화면 활성화 */
        loadingShow();

        /** @type {string} 입사 날짜 ex) 2022.04 */
        const startDate = `${startYear}.${startMonth}`;

        /** @type {date} 퇴사 날짜 ex) 2024.11 */
        const endDate = inOffice ? "inOffice" : `${endYear}.${endMonth}`;

        /** @type {object} 리퀘스트 데이터 */
        const result = {
            companyName,
            startDate,
            endDate,
            resumeId
        }

        /** @type {string} 저장된 토큰 */
        const token = TOKEN.get();

        RESUME[cmd === "C" ? "add" : "update"](token, result)
        .then(rs => {

            setToastStatus(`${cmd === "C" ? "add" : "update"} resume`, companyName)
            endFunc["current"] = reFetchCallback;
            loadingHide(); /** 로딩화면 비활성화*/
        })
        .catch(err => {
            console.log("err",err);
            loadingHide(); /** 로딩화면 비활성화*/
            setToastStatus(err);
            
        })

    }

    useEffect(() => {

        setPreviousData({
            companyName,
            startYear,
            startMonth,
            endYear,
            endMonth,
            inOffice
        })

        return () => {
            setPreviousData(null);
        }

        // eslint-disable-next-line
    },[])
    
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
                <form onAnimationEnd={AnimEnd} className={`inner ${transitionStage}`}>

                <IconElement/>

                    <ul className="inputList">
                        <InputCompanyName 
                            companyName={companyName} inputCallback={Validata}
                        />
                        <SelectStart 
                            startYear={startYear} 
                            startMonth={startMonth} 
                            selectCallback={Validata} 
                            isResume={true}
                        />
                        <SelectEnd 
                            inOffice={inOffice}
                            endYear={endYear} 
                            endMonth={endMonth} 
                            selectCallback={Validata} 
                            isResume={true}
                        />
                        <CheckInOffice 
                            checkCallback={Validata} 
                            inOffice={inOffice}
                        />
                    </ul>
                    <button onClick={Submit} type="button" className="btnSubmit">
                    {cmd === "U" ? "수정" : "등록"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default UploadResume