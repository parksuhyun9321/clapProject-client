import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/** img */
import btnUpdate from "../../img/btn_update.svg"

/** custom hook */
import useLoading from "../../hook/useLoading"
import usePagination from "../../hook/usePagination";
import useToast from "../../hook/useToast";

/** component */
import UploadResume from "../UploadLayer/UploadResume";
import RESUME from "../../js/resume";
import TOKEN from "../../js/token";

const EmptyResume = () => {
    return (
        <li className="empty">
            등록된 이력이 없습니다.
        </li>
    )
}

const ResumeList = ({viewLength, isAdmin}) => {

    const { key } = useParams();

    const { ToastList, setToastStatus } = useToast();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const { PaginationElement, changePaginationList, changePaginationTotal, currPage } = usePagination(viewLength);

    /** @type {array} 이력데이터 */
    const [resumeData, setResumeData] = useState([]);

    /** @type {boolean} true : 업로드 레이어 활성화 */
    const [isUpload, setIsUpload] = useState(false);

    const [updateData, setUpdateData] =  useState(null);

    const [deleteId, setDeleteId] = useState("");

    function Add(){ setIsUpload(true) };

    function Update(data){ 

        /** @type {array} 입사 [년도, 월] */
        const start = data["startDate"].split(".");

        /** @type {boolean} true : 재직중 */
        const inOffice = data["endDate"] === "inOffice";

        /** @type {array} 퇴사 [년도, 월] */
        const end = data["endDate"].split(".");

        setUpdateData({
            companyName : data["companyName"],
            startYear : start[0],
            startMonth : start[1],
            endYear : inOffice ? "" : end[0],
            endMonth : inOffice ? "" : end[1],
            inOffice : inOffice,
            resumeId : data["_id"]
        });

        setIsUpload(true);
    }
    
    function Cancel(){
        if(updateData) setUpdateData(null);
        setIsUpload(false); 
    }

    /** 이력 api 호출 */
    function Setup(){

        if(updateData) setUpdateData(null)

        loadingShow();
        
        const tokenOrKey = isAdmin ? TOKEN.get() : key;
        
        RESUME.get(isAdmin, tokenOrKey, currPage, viewLength)
        .then(rs => {
        
            const { total, resume } = rs["data"];

            changePaginationList(total);
            changePaginationTotal(total);            

            setResumeData(resume);

            loadingHide();            
        })
        .catch(err => {
            
        })
    }

    function TargetDelete(data){
        setDeleteId(data["_id"]);
        setToastStatus("delete resume confrim", data["companyName"]);
    }

    function DeleteCallback(){

        if(!deleteId) return 

        /** @type {string} 저장된 토큰 */
        const token = TOKEN.get();

        RESUME.delete(token, deleteId)
        .then(rs => {
            console.log("rs",rs)
            setToastStatus("delete resume success")
        })
    }

    useEffect(() => {
        Setup()
        // eslint-disable-next-line
    },[currPage])

    return (
        <>
            <IconElement/>

            {isAdmin ? <button className="btnAdd" onClick={Add}>이력 추가</button> : null}

            <ToastList refetchCallback={Setup} deleteCallback={DeleteCallback} />

            {
                isUpload ? 
                <UploadResume 
                    data={updateData} 
                    cancelCallback={Cancel}
                    reFetchCallback={Setup}
                />
                : null                
            }

            <ul className={"resumeList"}>
            {

                resumeData.length <= 0 ? <EmptyResume/> :

                resumeData.map((el, i) => {
                    return (
                        <li key={i}>
                            <dl>
                                <dt>{el["companyName"]}</dt>
                                <dd>{el["startDate"]} ~ {el["endDate"] === "inOffice" ? "재직중" : el["endDate"]}</dd>
                                <dd></dd>
                            </dl>
                            {
                                isAdmin ? 
                                <ul className="btnList">
                                    <li>
                                        <button className="btnUpdate" onClick={() => Update(el)} >
                                            
                                            <img src={btnUpdate} alt={`${el["title"]} 이력 수정`} />
                                        </button>
                                    </li>
                                    <li>
                                        <button className="btnDelete" onClick={() => TargetDelete(el)}>
                                        </button>
                                    </li>
                                </ul> 
                                : null
                            }

                        </li>
                    )
                })
            }
            </ul>
            <PaginationElement/>
        </>
    )
}

export default ResumeList