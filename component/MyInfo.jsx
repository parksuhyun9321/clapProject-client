import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import useToast from "../hook/useToast";

import TOKEN from "../js/token";
import MYINFO from "../js/myInfo";
import useLoading from "../hook/useLoading";


const JobChangeComponent = ({currentJob, submitCallback, cancelCallback}) => {

    const [jobValue, setJobValue] = useState(currentJob);

    const inputElements = useRef(null);

    function validata(e){
        const self = e.currentTarget;

        setJobValue(self.value);
    }

    function submit(){
        submitCallback(jobValue)
        // console.log(jobValue)
    }

    useEffect(() => {

        if(inputElements["current"]) inputElements["current"].focus();

        return () => {
            inputElements["current"] = null;
        }
    },[])
    
    return (
        <div className="changeBox">
            <div className="inner">
                <h3>직업 변경</h3>
                <div className="inputBox">
                    <input type="text" ref={input => inputElements["current"] = input} onInput={validata} defaultValue={jobValue} />
                </div>
                <ul className="btnList">
                    <li>
                        <button onClick={submit} className="btnSubmit">변경</button>
                    </li>
                    <li>
                    <button onClick={() => {
                        cancelCallback();
                        setJobValue("")
                    }} className="btnCancel">취소</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const MyInfo = ({isAdmin}) => {

    const { key } = useParams();

    const [myInfo, setMyInfo] = useState(null);

    const [isJobChange, setIsJobChange] = useState(false);

    const { setToastStatus, ToastMyInfo } =  useToast();

    const { IconElement } = useLoading()
    function reRender(data){

        const { id, name, job, profileImg, birth, phone, email } = data["data"];

        const birth0 = birth["value"].substring(0,4);
        const birth1 = birth["value"].substring(4,6);
        const birth2 = birth["value"].substring(6,8);

        const phone0 = phone["value"].substring(0,3);
        const phone1 = phone["value"].substring(3,7);
        const phone2 = phone["value"].substring(7,11);

        const obj = {
            id,
            name,
            job,
            profileImg,
            birth : {
                value : `${birth0}.${birth1}.${birth2}`,
                isPublic : birth["isPublic"]
            }, 
            email : {
                value : email["value"],
                isPublic : email["isPublic"]
            },
            phone : {
                value : `${phone0}.${phone1}.${phone2}`,
                isPublic : phone["isPublic"]
            } ,
        }

        setMyInfo(obj);
    }

    /**
     * 
     * @param {string} target birth, email, phone
     * @returns {string} 공개중 || 비공개중
     */
    function targetIsPublic(target){
        if(!myInfo) return 
        if(!myInfo[target]) return

        return myInfo[target]["isPublic"] ? "공개중" : "비공개중"
    }

    /**
     * 공개중, 비공개중 여부
     * @param {string} target birth, email, phone
     */
    function targetIsPublicChange (target) {
        if(!myInfo) return 
        if(!myInfo[target]) return 

        const is = myInfo[target]["isPublic"] ? false : true;

        MYINFO.setInfo(TOKEN.get(), target, is).then(reRender);

    }
    

    useEffect(() => {

        const tokenOrKey = isAdmin ? TOKEN.get() : key;

        MYINFO.get(isAdmin, tokenOrKey).then(reRender)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(!myInfo) return <IconElement defaultShow={true} />

    if(isAdmin) {
        return (
            <>
                <ToastMyInfo
                    birthPublicCallback={() => { targetIsPublicChange("birth")}}
                    emailPublicCallback={() => { targetIsPublicChange("email")}}
                    phonePublicCallback={() => { targetIsPublicChange("phone")}}
                    jobChangeCompleteCallback={() => {
                        setIsJobChange(false);
                    }}
                />
    
                {isJobChange ? <JobChangeComponent currentJob={myInfo?.job} 
                submitCallback={(param) => {
                    
                    MYINFO.setInfo(TOKEN.get(),"job",param)
                    .then(rs => {
                        reRender(rs)
                        setToastStatus("job change complete")
                        
                    })
                    
                }} cancelCallback={() => {
                    setIsJobChange(false);
                }} /> : null}
    
                <ul className="infoList">
                    <li>
                        <h3>이름</h3>
                        <p>{myInfo["name"]}</p>
                    </li>
                    <li>
                        <h3>직업</h3>
                        <p>{myInfo["job"]}</p>
                    </li>
                    <li>
                        <h3>생년월일</h3>
                        <p>{myInfo["birth"]["value"]}</p>
                    </li>
                    <li>
                        <h3>이메일</h3>
                        <p>{myInfo["email"]["value"]}</p>
                    </li>
                    <li>
                        <h3>휴대폰 번호</h3>
                        <p>{myInfo["phone"]["value"]}</p>
                    </li>
                </ul>

                <ul className="btnList">
                    <li>
                        <button onClick={() => {
                            setIsJobChange(true);
                        }}>직업 변경</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            const is = myInfo["birth"]["isPublic"];
                            setToastStatus(`birth isPublic ${is}`)
                        }}>생년월일 {targetIsPublic("birth")} </button>
                    </li>
                    <li>
                        <button onClick={() => {
                            const is = myInfo["email"]["isPublic"];
                            setToastStatus(`email isPublic ${is}`)
                        }}>이메일 {targetIsPublic("email")}</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            const is = myInfo["phone"]["isPublic"];
                            setToastStatus(`phone isPublic ${is}`)
                        }} >휴대폰 번호 {targetIsPublic("phone")}</button>
                    </li>
                </ul> 
            </>
        )
    }
    else {
        return (
            <div className="myInfo">
                <dl>
                    <dt>{myInfo["name"]} <span> {myInfo["birth"]["isPublic"] ? `(${myInfo["birth"]["value"]})` : null}</span> </dt>
                    <dd>{myInfo["job"]}</dd>
                    <dd className={"fs-2.5"}>{myInfo["email"]["isPublic"] ? `${myInfo["email"]["value"]}` : null}</dd>
                    <dd className={"phone"}>{myInfo["phone"]["isPublic"] ? myInfo["phone"]["value"] : null}</dd>
                </dl>
            </div>
        )
    }
}

export default MyInfo