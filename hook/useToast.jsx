import { useState } from "react"


import {
    LoginFail,

    RegisterIdValueNull,
    RegisterIdCheck,
    RegisterPassWordValueNull,
    RegisterPassWordCheck,
    RegisterJobCheck,
    RegisterNameCheck,
    RegisterEmailCheck,
    RegisterPhoneCheck,
    RegisterBirthCheck,
    RegisterGenderCheck,
    RegisterPersnalCheck,
    RegisterIdExists,
    RegisterEmailExists,
    RegisterPhoneExists,
    RegisterComplete,

    UploadDateFail,
    UploadSubmitFail,

    DeleteResumeSuccess,
    UploadResumeSuccess,
    UpdateResumeSuccess,

    UploadProjectContentsFileNull,
    UploadProjectSuccess,
    UpdateProjectSuccess,
    DeleteProjectSuccess,

    JobChangeComplete,
    HashTagUpdateComplete,

    ProfileImgSelectNull,
    ProfileImgChangeComplete,

    DeleteMsgSuccess,
    MsgDeleteNotSelect,

    MsgPostValueAlert,
    MsgPostSuccess,
    MsgPostFail,

    LinkCopySuccess,
    LinkCopyFail,

    IdSearchSuccess,
    AccountSearchFail,
    AccountPwChange,
    AccountPwPreviousSame,
    AccountPwChangeSuccess,

    WithdrawalSuccess,
    WithdrawalFail,

    SetExperienceSuccess,

    ApiError,

    ServiceError,
} from "../component/Alert"

import {
    ConfirmDeleteResume,
    ConfirmDeleteProject,
    ConfirmDeleteMsgSelect,
    ConfirmDeleteTargetProject,
    ConfirmPublic,
    ConfirmPost,
    IsLogout,
    IsWithDrawal
} from "../component/Confirm"



const useToast = () => {
    
    /** @type {string} 팝업 상태 */
    const [isToast, setToast] = useState("");

    /** @type {string} 팝업 에 넣을 타이틀 */
    const [toastTitle, setToastTitle] = useState("");

    /**
     * @param {string} status 팝업 상태 변경
     * @param {string} _title 팝업에 넣을 타이틀
     * @param {callback} _callback 넘겨받아 팝업에서 실행할 콜백
     */
    function setToastStatus(status, _title, _callback) { 
        if(_title) setToastTitle(_title);

        setToast(status); 
    };    

    /** 팝업 닫기 함수 */
    const cancelCallback = () => { 
        if(toastTitle) setToastTitle("");
        setToastStatus("");
    };

    function getToastStatus(){
        return isToast
    }

    /** account 토스트 팝업 */
    const ToastAccount = ({ RegisterCompleteCallback, pwChangeCallback, pwChangeSuccessCallback }) => {
        switch (isToast) {
            case "login fail" : return <LoginFail cancelCallback={cancelCallback} />

            case "register id null" : return <RegisterIdValueNull cancelCallback={cancelCallback}/>;

            case "register idCheck" : return <RegisterIdCheck cancelCallback={cancelCallback}/>;

            case "register pw null" : return <RegisterPassWordValueNull cancelCallback={cancelCallback}/>;

            case "register pwCheck" : return <RegisterPassWordCheck cancelCallback={cancelCallback}/>;

            case "register jobCheck" : return <RegisterJobCheck cancelCallback={cancelCallback}/>

            case "register nameCheck" : return <RegisterNameCheck cancelCallback={cancelCallback}/>;

            case "register emailCheck" : return <RegisterEmailCheck cancelCallback={cancelCallback}/>;

            case "register phoneCheck" : return <RegisterPhoneCheck cancelCallback={cancelCallback}/>;

            case "register birthCheck" : return <RegisterBirthCheck cancelCallback={cancelCallback}/>;

            case "register genderCheck" : return <RegisterGenderCheck cancelCallback={cancelCallback}/>;

            case "register persnalInfoCheck" : return <RegisterPersnalCheck cancelCallback={cancelCallback} />;
            
            case "register id exists" : return <RegisterIdExists cancelCallback={cancelCallback}/>

            case "register email exists" : return <RegisterEmailExists cancelCallback={cancelCallback}/>

            case "register phone exists" : return <RegisterPhoneExists cancelCallback={cancelCallback}/>

            case "register complete" : return <RegisterComplete cancelCallback={() => {
                cancelCallback();
                RegisterCompleteCallback();
            }}/>

            case "id search success" : return <IdSearchSuccess cancelCallback={cancelCallback} searchId={toastTitle} />

            case "account search fail" : return <AccountSearchFail cancelCallback={cancelCallback} />

            case "account pw change" : return <AccountPwChange cancelCallback={() => {
                cancelCallback();
                pwChangeCallback();
            }} />

            case "pw change success" : return <AccountPwChangeSuccess cancelCallback={() => {
                cancelCallback();
                pwChangeSuccessCallback();
            }}/>

            case "same as previous pw" : return <AccountPwPreviousSame cancelCallback={cancelCallback} />

            case "api error" : return <ApiError cancelCallback={cancelCallback} title={toastTitle}/>

            case "service error" : return <ServiceError cancelCallback={cancelCallback} />;

            default : return null;
        }
    }

    /** myInfo 토스트 팝업 */
    const ToastMyInfo = ({birthPublicCallback, emailPublicCallback, phonePublicCallback, jobChangeCompleteCallback}) => {
        switch (isToast) {
            case "birth isPublic true" : return <ConfirmPublic isPublic={"비공개"} title={"생년월일"} contents={"비공개 하시겠습니까?"} btnSubmitTxt={"비공개"} submitCallback={() => {
                birthPublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>

            case "birth isPublic false" : return <ConfirmPublic contents={"공개 하시겠습니까?"} btnSubmitTxt={"공개"} title={"생년월일"} submitCallback={() => {
                birthPublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>

            case "email isPublic true" : return <ConfirmPublic isPublic={"비공개"} title={"이메일"} contents={"비공개 하시겠습니까?"} btnSubmitTxt={"비공개"} submitCallback={() => {
                emailPublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>

            case "email isPublic false" : return <ConfirmPublic contents={"공개 하시겠습니까?"} btnSubmitTxt={"공개"} title={"이메일"} submitCallback={() => {
                emailPublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>

            case "phone isPublic true" : return <ConfirmPublic isPublic={"비공개"} title={"휴대폰 번호"} contents={"비공개 하시겠습니까?"} btnSubmitTxt={"비공개"} submitCallback={() => {
                phonePublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>

            case "phone isPublic false" : return <ConfirmPublic contents={"공개 하시겠습니까?"} btnSubmitTxt={"공개"} title={"휴대폰 번호"} submitCallback={() => {
                phonePublicCallback()
                cancelCallback();
            }} cancelCallback={cancelCallback}/>
            case "job change complete" : return <JobChangeComplete cancelCallback={() => {
                jobChangeCompleteCallback();
                cancelCallback();
            }} />
        
            default: return null
        }
    }

    const ToastUpload = ({completeCallback}) => {
        switch (isToast) {            
            case "essential" : return <UploadSubmitFail cancelCallback={cancelCallback}/>

            case "essential contents file" : return <UploadProjectContentsFileNull cancelCallback={cancelCallback}/>

            case "date check" : return <UploadDateFail cancelCallback={cancelCallback}/>;

            case "add resume" : return <UploadResumeSuccess uploadTitle={toastTitle} cancelCallback={() => {
                cancelCallback()
                completeCallback();
            }}/>

            case "update resume" : return <UpdateResumeSuccess updateTitle={toastTitle} cancelCallback={() => {
                cancelCallback()
                completeCallback();
            }} />

            case "add project" : return <UploadProjectSuccess projectTitle={toastTitle} cancelCallback={() => {
                cancelCallback()
                completeCallback();
            }} />

            case "update project" : return <UpdateProjectSuccess updateTitle={toastTitle} cancelCallback={() => {
                cancelCallback()
                completeCallback();
            }} />

            case "update hashTag" : return <HashTagUpdateComplete cancelCallback={() => {
                cancelCallback()
                completeCallback();
            }} />

            case "profile img null" : return <ProfileImgSelectNull cancelCallback={cancelCallback}/>;

            case "profile img update" : return <ProfileImgChangeComplete cancelCallback={() => {
                cancelCallback();
                completeCallback();
            }}/>;

            case "api error" : return <ApiError cancelCallback={cancelCallback} title={toastTitle}/>

            

            default : return null
        }
    }

    const ToastList = ({ deleteCallback, refetchCallback }) => {
        switch (isToast) {
            case "delete resume confrim" : return <ConfirmDeleteResume deleteTitle={toastTitle} cancelCallback={cancelCallback} submitCallback={deleteCallback} />

            case "delete resume success" : return <DeleteResumeSuccess deleteTitle={toastTitle} cancelCallback={() => {
                cancelCallback();
                refetchCallback();
            }} />

            case "delete project confrim" : return <ConfirmDeleteProject deleteTitle={toastTitle} cancelCallback={cancelCallback} submitCallback={deleteCallback} />

            case "delete project success" : return <DeleteProjectSuccess deleteTitle={toastTitle} cancelCallback={() => {
                cancelCallback();
                refetchCallback();
            }} />

            case "delete msg select confirm" : return <ConfirmDeleteMsgSelect cancelCallback={cancelCallback} submitCallback={deleteCallback}/>

            case "delete msg success" : return <DeleteMsgSuccess cancelCallback={() => {
                cancelCallback();
                refetchCallback();
            }} />

            case "not select msg" : return <MsgDeleteNotSelect cancelCallback={cancelCallback}/>

            default : return null
        }
    }

    const ToastProfileImg = ({ completeCallback }) => {
        switch (isToast) {
            case "profile img null": return <ProfileImgSelectNull cancelCallback={cancelCallback}/>;
        
            default : return null; 
        }
    }

    const ToastDetail = ({deleteCallback, naviCallback}) => {
        switch (isToast) {
            case "delete project confrim" : return <ConfirmDeleteTargetProject cancelCallback={cancelCallback} submitCallback={deleteCallback} />

            case "delete project success" : return <DeleteProjectSuccess deleteTitle={toastTitle} cancelCallback={() => {
                cancelCallback();
                naviCallback();
            }} />
        
            default : return null; 
        }
    }

    const ToastContact = ({ postCallback }) => {
        switch (isToast) {
            case "isPost": return <ConfirmPost receiver={toastTitle} btnSubmitTxt={"보내기"} submitCallback={postCallback} cancelCallback={cancelCallback} />;

            case "post value error" : return <MsgPostValueAlert type={toastTitle} cancelCallback={cancelCallback} />

            case "post msg success" : return <MsgPostSuccess cancelCallback={cancelCallback}/>

            case "post msg fail" : return <MsgPostFail cancelCallback={cancelCallback}/>
        
            default: return
        }

    }

    const ToastAdminHeader = ({logoutCallback, withdrawalCallback, naviToLoginCallback}) => {
        switch (isToast) {
            case "logout" : return <IsLogout cancelCallback={cancelCallback} submitCallback={logoutCallback}/>;

            case "link copy success" : return <LinkCopySuccess cancelCallback={cancelCallback} />

            case "link copy fail" : return <LinkCopyFail cancelCallback={cancelCallback} />

            case "withdrawal" : return <IsWithDrawal cancelCallback={cancelCallback} submitCallback={withdrawalCallback} />

            case "withdrawal success" : return <WithdrawalSuccess cancelCallback={() => {
                cancelCallback()
                naviToLoginCallback();
            }}/>
            
            case "withdrawal fail" : return <WithdrawalFail cancelCallback={cancelCallback} />
        
            default : return
        }
    }

    const ToastExperience = ({ naviCallback }) => {
        switch (isToast) {
            case "set experience success" : return <SetExperienceSuccess cancelCallback={() => {
                setToastStatus("");
                naviCallback();
            }}/>;

            case "service error" : return <ServiceError cancelCallback={cancelCallback} />;
        
            default : return
        }
    }

    return { ToastList, ToastMyInfo, ToastAccount, ToastUpload, setToastStatus, getToastStatus, ToastProfileImg, ToastDetail, ToastContact, ToastAdminHeader, ToastExperience }
}

export default useToast