/**
 * confirm 팝업
 * @property {string} title 팝업 타이틀
 * @property {string} txt 팝업 타이틀
 * @property {string} btnTitle 버튼 타이틀
 * @property {callback} confirmCallback 버튼 콜백
 * @property {callback} cancelCallback 팝업 닫기 콜백
 */
const ToastConfirm = ({
    title, 
    contents, 
    btnSubmitTxt, 
    btnCancelTxt,
    submitCallback, 
    cancelCallback
}) => {
    
    return (
        <>
            <div id="toast">
                <div className="container">
                    <div className="inner">
                        <dl className="txtBox">
                            <dt>{title}</dt>
                            <dd dangerouslySetInnerHTML={{__html:contents}}></dd>
                        </dl>
                        <ul className="btnList">
                            <li>
                                <button onClick={() => {
                                    submitCallback()
                                }} className="submit">{btnSubmitTxt}</button>
                            </li>
                            <li>
                                <button onClick={cancelCallback} className="cancle">{btnCancelTxt}</button>
                            </li>
                        </ul>
                    </div> 
                </div>
            </div>
        </>
    )
} 

const ConfirmDeleteResume = ({deleteTitle, cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                title={""} 
                contents={`"${deleteTitle}" <br/> 이력을 삭제 하시겠습니까?`} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"삭제"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmDeleteProject = ({deleteTitle, cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                title={""} 
                contents={`"${deleteTitle}" <br/> 프로젝트 이력을 삭제 하시겠습니까?`} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"삭제"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmDeleteTargetProject = ({cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                title={""} 
                contents={`해당 프로젝트 이력을 삭제 하시겠습니까?`} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"삭제"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmDeleteMsgSelect = ({ cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                title={""} 
                contents={`선택한 메세지들을 <br/> 삭제 하시겠습니까?`} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"삭제"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmDeleteMsgTarget = ({ cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                title={""} 
                contents={`해당 메세지를 <br/> 삭제 하시겠습니까?`} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"삭제"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmPublic = ({title, contents, submitCallback ,cancelCallback, btnSubmitTxt}) => {
    return <ToastConfirm 
                title={title} 
                contents={contents}
                submitCallback={submitCallback} 
                btnSubmitTxt={btnSubmitTxt}
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const ConfirmPost = ({submitCallback, btnSubmitTxt, cancelCallback}) => {
    return <ToastConfirm 
                title={""} 
                contents={`메세지를 보내시겠습니까?`}
                submitCallback={submitCallback} 
                btnSubmitTxt={btnSubmitTxt}
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const IsLogout = ({cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                contents={"로그아웃 하시겠습니까?"} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"로그아웃"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

const IsWithDrawal = ({cancelCallback, submitCallback}) => {

    return <ToastConfirm 
                contents={"회원탈퇴 하시겠습니까?"} 
                submitCallback={submitCallback} 
                btnSubmitTxt={"탈퇴"} 
                cancelCallback={cancelCallback}
                btnCancelTxt={"취소"}
            />
}

export {
    ConfirmDeleteResume,
    ConfirmDeleteProject,
    ConfirmDeleteTargetProject,
    ConfirmDeleteMsgSelect,
    ConfirmDeleteMsgTarget,
    ConfirmPublic,
    ConfirmPost,
    IsLogout,
    IsWithDrawal,
}