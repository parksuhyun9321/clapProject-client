import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

/** img */
import btnBack from "../../img/btn_back.svg"

/** component */
import SlideContents from "../Swiper/SlideContents"
import FilesList from "./list/FilesList"
import HashTagList from "./list/HashTagList"
import UrlsList from "./list/UrlsList"
import UploadProject from "../UploadLayer/UploadProject"

/** custom hook */
import useToast from "../../hook/useToast"

/** api */
import PROJECT from "../../js/project"
import TOKEN from "../../js/token"


const ProjectDetail = ({isAdmin, item, refetchCallback}) => {

    const navigation = useNavigate();

    /** @type {boolean} true : 업로드 레이어 활성화 */
    const [isUpload, setIsUpload] = useState(false);

    const [updateData, setUpdateData] =  useState(null);

    const { setToastStatus, ToastDetail } = useToast();

    function Cancel() { 
        if(updateData) setUpdateData(null);

        setIsUpload(false);
    };

    function Update(data){
        /** @type {array} 입사 [년도, 월] */
        const start = data["startDate"].split(".");

        /** @type {boolean} true : 재직중 */
        const onGoing = data["endDate"] === "onGoing";

        /** @type {array} 퇴사 [년도, 월] */
        const end = data["endDate"].split(".");

        setUpdateData({
            projectName : data["projectName"],
            startYear : start[0],
            startMonth : start[1],
            endYear : onGoing ? "" : end[0],
            endMonth : onGoing ? "" : end[1],
            onGoing : onGoing,
            swiperFiles : data["swiperFiles"],
            attachedFiles : data["attachedFiles"],
            hashTag : data["hashTag"],
            urls : data["urls"],
            contents : data["contents"],
            projectId : data["_id"],
        })

        setIsUpload(true);
    }

    function Delete() {
        setToastStatus("delete project confrim")
    }

    function DeleteCallback(){
        
        PROJECT.delete(TOKEN.get(), [item["_id"]])
        .then(rs => {
            setToastStatus("delete project success", item["projectName"])
        })
    }

    function createDate(date){
        const createDate = new Date(date);

        const year = createDate.getFullYear(); 
        const month = createDate.getMonth()+1;
        const days = createDate.getDate()

        const hours = createDate.getHours();
        const min = createDate.getMinutes();
        const sec = createDate.getSeconds();
        
        function zero(val){
            return val < 10 ? `0${val}` : val

        }
    
        return `${year}.${zero(month)}.${zero(days)} ${zero(hours)}:${zero(min)}:${zero(sec)}`
    }
    
    return (
        <>
            
            <ToastDetail deleteCallback={DeleteCallback} naviCallback={() => {
                navigation("/project")
            }}/>

            {isUpload ? <UploadProject refetchCallback={refetchCallback} data={updateData} cancelCallback={Cancel} /> : null}

            <Link to={-1} className="btnBack">
                <img src={btnBack} alt="리스트로 가기" />
            </Link>
            <div className="scrollContainer">
                <article className="contents">
                    <h2 className="hidden">설명</h2>
                    <dl>
                        <dt>
                            {item["projectName"]}
                            {isAdmin ? <button className="btnUpdate" onClick={() => Update(item)}>수정</button> : null}
                            {isAdmin ? <button onClick={Delete}>삭제</button> : null}
                        </dt>
                        <dd>진행 기간 : {item["startDate"]} ~ {item["endDate"] === "onGoing" ? "진행중" : item["endDate"]}</dd>
                        {isAdmin ? <dd className="createDate">등록 일자 : {createDate(item["createDate"])}</dd> : null}
                    </dl>
                    <div className="utilBox">
                        <UrlsList data={item["urls"]} />
                        <FilesList data={item["attachedFiles"]} />
                    </div>
                    <HashTagList data={item["hashTag"]} />
                    <textarea id="contentsArea" value={item["contents"]} readOnly={true}/>
                </article>
                <article className="banner">
                    <h2 className="hidden">배너</h2>
                    <SlideContents files={item["swiperFiles"]} maxIdx={item["swiperFiles"].length-1}/>
                </article>
            </div>
        </>
    )
}

export default ProjectDetail