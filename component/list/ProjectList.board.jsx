import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

/** img */
import btnUpdate from "../../img/btn_update.svg"

/** custom hook */
import useLoading from "../../hook/useLoading";

/** api */
import TOKEN from "../../js/token"
import PROJECT from "../../js/project";

/** component */
import SlideContents from "../Swiper/SlideContents";
import UploadProject from "../UploadLayer/UploadProject";
import useToast from "../../hook/useToast";

const ProjectEmpty = () => {
    return (
        <li className="empty">
            등록된 프로젝트가 없습니다.
        </li>
    )
}

const ProjectBoard = ({viewLength, isAdmin}) => {

    const { key } = useParams();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const { ToastList, setToastStatus } = useToast()

    /** @type {array} 이력데이터 null 일시 "등록된 이력이 없습니다" ui 활성화 */
    const [projectData, setProjectData] = useState([]);

    /** @type {number} 프로젝트 전체 갯수 */
    const [projectTotal, setProjectTotal] = useState(0);

    const scrollOffset = useRef(0);

    const navigation = useNavigate();

    /** @type {boolean} true : 업로드 레이어 활성화 */
    const [isUpload, setIsUpload] = useState(false);

    const [updateData, setUpdateData] =  useState(null);

    const [deleteId, setDeleteId] = useState([]);

    // const [isSelet, setSelect] = useState(false);

    function Setup(){

        if(updateData) setUpdateData(null);

        loadingShow();

        const tokenOrKey = isAdmin ? TOKEN.get() : key;
        
        PROJECT.get(isAdmin, tokenOrKey, scrollOffset["current"] ,viewLength)
        .then(rs => {
            const { total, project } = rs["data"];

            setProjectTotal(total);
            setProjectData(project);

            loadingHide();
        })
    }

    function Add(){ setIsUpload(true) };

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

    function TargetDelete(data){
        deleteId.push(data["_id"]);
        setToastStatus("delete project confrim", data["projectName"]);
    }

    function DeleteCallback() {

        PROJECT.delete(TOKEN.get(), deleteId)
        .then(rs => {
            console.log("rs",rs)
            setDeleteId([]);
            setToastStatus("delete project success");
        })
    }

    function Cancel() { 
        if(updateData) setUpdateData(null);

        setIsUpload(false);
     };

    function ItemDate(date) {
        const createDate = new Date(date);
        
        const year = createDate.getFullYear(); 
        const month = createDate.getMonth()+1;
        const days = createDate.getDate()
    
        const resultMonth = month < 10 ? `0${month}` : month;
        const resultDays = days < 10 ? `0${days}` : days;
    
        return `${year}.${resultMonth}.${resultDays}`
    }
    
    function ScrollCallback(e) {
        const self = e.currentTarget;

        /** @type {boolean} 스크롤 다내렸는지 */
        const isScrollBottom = self.scrollHeight <= (self.scrollTop + self.clientHeight);

        if(!isScrollBottom) return 
        if(projectData.length >= projectTotal) return
    
        scrollOffset["current"]+=1;
        Setup()
    }

    useEffect(() => {
        Setup()
        // eslint-disable-next-line
    },[]);
    
    
    return (
        <>

            <ToastList refetchCallback={Setup} deleteCallback={DeleteCallback}/>
     
            {isUpload ? <UploadProject refetchCallback={Setup} cancelCallback={Cancel} data={updateData}/> : null }
            
    
            <article className="projectBoard">
                <h2 className="hidden">프로젝트 리스트</h2>
                <div className="head">
                    <h3>프로젝트 전체 : {projectTotal}</h3>
                    {isAdmin ? <button onClick={Add} className="btnAdd">프로젝트 등록</button> : null}
                    {/* {isAdmin ? <button className="btnSelectDelete">선택 삭제</button> : null} */}
                </div>
                
                <div className="inner">
                    <div className="scrollContainer">
                    <IconElement/>
                        <ul className="projectList" onScroll={ScrollCallback}>
                            {
                                projectData.length <= 0 ? <ProjectEmpty/> :
                                projectData.map((el, i) => {
                                    
                                    const {projectName, swiperFiles, startDate, endDate, createDate, _id} = el;
                                    return (
                                        <li key={i}>
                                            <div className="contentsBox">
                                                <SlideContents files={swiperFiles} maxIdx={swiperFiles.length-1} />
                                            </div>
                                            <dl>
                                                <dt>{projectName}</dt>
                                                <dd>{startDate} ~ {endDate === "onGoing" ? "진행중" : endDate}</dd>
                                                {isAdmin ? <dd className="date">{ItemDate(createDate)}</dd> : null}
                                                <dd className="more">
                                                    <button className="btnMore" title="프로젝트 정보 더보기" onClick={() => {
                                                        let href;
                                                        
                                                        if(isAdmin) href = `/project/${_id}`;
                                                        else href = `/${key}/project/${_id}`;

                                                        navigation(href)
                                                        
                                                    }}>More</button>
                                                </dd>
                                            </dl>

                                            {isAdmin ? 
                                                <ul className="btnList">
                                                    <li>
                                                        <button className="btnUpdate" onClick={() => Update(el)} >
                                                            <img src={btnUpdate} alt={`${el["title"]} 이력 수정`} />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="btnDelete" onClick={() => TargetDelete(el)}>
                                                            <span></span><span></span>
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
                    </div>
                </div>

                
            </article>
        </>
    )
}

export default ProjectBoard