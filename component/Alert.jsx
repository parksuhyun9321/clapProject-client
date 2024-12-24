const ToastAlert = ({
    title,
    contents,
    btnCancelTxt,
    cancelCallback,
    bgLightly
}) => {
    return (
        <div id="toast">
            <div className={`container ${bgLightly ? "lightly" : ""}`}>
                <div className="inner">
                    <dl className="txtBox">
                        <dt>{title}</dt>
                        <dd dangerouslySetInnerHTML={{__html : contents}}></dd>
                    </dl>
                    <ul className="btnList">
                        <li><button onClick={cancelCallback} className="cancle">{btnCancelTxt}</button></li>
                    </ul>
                </div> 
            </div>
        </div>  
    )
}

/**
 * 로그인 페이지 에서 로그인 실패시
 * @param {callback} cancelCallback 버튼 콜백
 */
 const LoginFail = ({cancelCallback}) => {

    return <ToastAlert
        title={"로그인 실패"}
        contents={"입력하신 아이디, 비밀번호를 <br> 확인 해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

/**
 * 회원가입 페이지 에서 아이디를 입력하지 않았을 시
 * @param {callback} callback 취소 콜백
 */
 const RegisterIdValueNull = ({cancelCallback}) => {

    return <ToastAlert
        title={"회원가입 실패"}
        contents={"아이디 를 입력 해 주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

/**
 * 회원가입 페이지에서 아이디가 형식에 어긋 났을 시
 * @param {callback} callback 취소 콜백
 */
 const RegisterIdCheck = ({cancelCallback}) => {

    return <ToastAlert
        title={"로그인 실패"}
        contents={"아이디 형식을 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

/**
 * 회원가입 페이지에서 비밀번호 확인을 입력하지 않았을 시
 * @param {callback} 
 */
 const RegisterPassWordValueNull = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"비밀번호는 최소 6자 이상 <br> 입력해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 비밀번호 확인을 입력하지 않았거나 앞에 입력값과 다를 시
 * @param {callback} 
 */
const RegisterPassWordCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"비밀번호를 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 휴대폰 번호 입력값이 없거나 형식이 맞지 않을때
 * @param {callback} 
 */
const RegisterJobCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"직업을 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 이름 입력값이 없거나 형식이 맞지 않을때
 * @param {callback} 
 */
const RegisterNameCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"이름을 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 이메일 입력값이 없거나 형식이 맞지 않을때
 * @param {callback} 
 */
 const RegisterEmailCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"이메일을 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 휴대폰 번호 입력값이 없거나 형식이 맞지 않을때
 * @param {callback} 
 */
 const RegisterPhoneCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"휴대폰 번호를 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 생년월일을 체크 하지 않았을때
 * @param {callback} 
 */
 const RegisterBirthCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"생년월일을 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 이메일 입력값이 없거나 이름 형식이 맞지 않을때
 * @param {callback} 
 */
 const RegisterGenderCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"성별을 체크해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 페이지에서 개인정보 수집 및 이용 에 동의 하지 않았을 시
 * @param {callback} 
 */
 const RegisterPersnalCheck = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"개인정보 수집 및 이용에 체크 해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 실패 : 이미 가입된 아이디
 * @param {callback} callback 
 */
const RegisterIdExists = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"이미 가입된 아이디 입니다."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 실패 : 이미 가입된 이메일
 * @param {callback} callback 
 */
 const RegisterEmailExists = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"이미 가입된 이메일 입니다."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

/**
 * 회원가입 실패 : 이미 가입된 폰번호
 * @param {callback} callback 
 */
const RegisterPhoneExists = ({cancelCallback}) => {
    
    return <ToastAlert
        title={""}
        contents={"이미 가입된 폰번호 입니다."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

/**
 * 회원가입 성공
 * @param {callback} callback 
 */
 const RegisterComplete = ({cancelCallback}) => {
    
    return <ToastAlert
        title={"회원가입 성공"}
        contents={"가입된 계정으로 로그인 해주세요."}
        btnCancelTxt={"로그인"}
        cancelCallback={cancelCallback}
    />        
}

/**
 * 등록 실패 : 날짜 오류
 * @param {callback} callback 
 */
const UploadDateFail = ({cancelCallback}) => {
    
    return <ToastAlert
        title={"등록 실패"}
        contents={"등록한 날짜를 확인해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />            
}

/**
 * 등록 실패 : 필수값 미입력 등등.. 
 * @param {callback} callback 
 */
 const UploadSubmitFail = ({cancelCallback}) => {
    
    return <ToastAlert
        title={"등록 실패"}
        contents={"등록에 실패 했습니다. <br> 입력한 값들을 확인 해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />            
}

/**
 * 등록 실패 : 프로젝트를 대표하는 이미지, 비디오 미 등록 
 * @param {callback} callback 
 */
const UploadProjectContentsFileNull = ({cancelCallback}) => {
    
    return <ToastAlert
        title={"등록 실패"}
        contents={"프로젝트를 대표하는 이미지, 비디오 를 한개 이상 등록 해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />            
}



/**
 * 이력 등록 성공
 * @param {callback} callback
 */
const UploadResumeSuccess = ({cancelCallback, uploadTitle}) => {

    return <ToastAlert
        title={"등록 성공"}
        contents={`"${uploadTitle}" <br> 이력이 등록됐습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}

    />        
}

/**
 * 이력 수정 성공
 * @param {callback} callback
 */
const UpdateResumeSuccess = ({cancelCallback, updateTitle}) => {
    return <ToastAlert
    title={""}
    contents={`"${updateTitle}" <br/> 이력이 수정 되었습니다.`}
    btnCancelTxt={"확인"}
    cancelCallback={cancelCallback}
    bgLightly={true}
/>            
}

/**
 * 게시물 삭제 성공
 * @param {callback} cancelCallback
 */
const DeleteResumeSuccess = ({cancelCallback, deleteTitle}) => {
    return <ToastAlert
        title={`이력 삭제 성공`}
        contents={`"${deleteTitle}" <br/> 삭제 됐습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

/**
 * 프로젝트 등록 성공
 * @param {callback} 
 */
const UploadProjectSuccess = ({cancelCallback, projectTitle}) => {
    return <ToastAlert
        title={"등록 성공"}
        contents={`"${projectTitle}" <br> 프로젝트 가 등록됐습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}

    />      
}

const UpdateProjectSuccess = ({updateTitle, cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={`"${updateTitle}" <br/> 프로젝트 가 수정 되었습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />
}
/**
 * 프로젝트 삭제 성공
 * @param {callback} cancelCallback
 */
 const DeleteProjectSuccess = ({cancelCallback, deleteTitle}) => {
    return <ToastAlert
        title={`프로젝트 삭제 성공`}
        contents={`"${deleteTitle}" <br/> 삭제 됐습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

/**
 * 프로필 사진 등록 안함
 * @param {callback} callback
 */
const ProfileImgNull = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={"이미지를 업로드 해주세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />
}

/**
 * 프로필 사진 등록, 수정 성공
 * @param {callback} callback
 */
const ProfileImgSuccess = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={"프로필 사진이 변경되었습니다."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
        bgLightly={true}
    />            
}

const JobChangeComplete = ({cancelCallback}) => {
    return <ToastAlert
        title={"직업 변경"}
        contents={`변경 되었습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const HashTagUpdateComplete = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={`해시태그 가 <br/> 수정 되었습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const ProfileImgSelectNull = ({cancelCallback}) => {
    return <ToastAlert
        title={"프로필 이미지 미선택"}
        contents={`이미지를 선택 후 <br/> 버튼을 클릭해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const ProfileImgChangeComplete = ({cancelCallback}) => {
    return <ToastAlert
        title={"프로필 이미지 변경"}
        contents={`변경 되었습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const DeleteMsgSuccess = ({cancelCallback}) => {
    return <ToastAlert
        title={"메세지 삭제 성공"}
        contents={`메세지가 <br/> 삭제 되었습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const MsgDeleteNotSelect = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={`삭제할 메세지를 <br/> 선택 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />        
}

const MsgPostValueAlert = ({cancelCallback, type}) => {
    return <ToastAlert
        title={""}
        contents={`${type} 을(를)<br/>입력 및 확인 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const MsgPostSuccess = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={`메세지를 성공적으로<br/> 전송 했습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const MsgPostFail = ({cancelCallback}) => {
    return <ToastAlert
        title={""}
        contents={`메세지를 전송에 실패했습니다.<br/> 잠시후 다시 시도 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const LinkCopySuccess = ({ cancelCallback }) => {
    return <ToastAlert
        title={""}
        contents={`내 홈페이지 url 을 복사했습니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const LinkCopyFail = ({ cancelCallback }) => {
    return <ToastAlert
        title={""}
        contents={`복사 기능이 지원되지않는 브라우저 입니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const IdSearchSuccess = ({ cancelCallback, searchId }) => {
    return <ToastAlert
        title={"아이디 찾기 성공"}
        contents={`"<span>${searchId}</span>" <br/> 가입된 아이디로 로그인 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const AccountSearchFail = ({ cancelCallback }) => {
    return <ToastAlert
        title={""}
        contents={`가입된 계정이 없습니다.<br/> 입력한 정보를 다시 확인 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const AccountPwChange = ({ cancelCallback }) => {
    return <ToastAlert
        title={"비밀번호 변경"}
        contents={`새로운 비밀번호를 입력해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const AccountPwPreviousSame = ({ cancelCallback }) => {
    return <ToastAlert
        title={"비밀번호 변경 실패"}
        contents={`새 비밀번호는 기존의 비밀번호와 <br/> 다른 비밀번호로 입력해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const AccountPwChangeSuccess = ({ cancelCallback }) => {
    return <ToastAlert
        title={"비밀번호 변경 성공"}
        contents={`변경된 비밀번호로 로그인 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const WithdrawalSuccess = ({ cancelCallback }) => {
    return <ToastAlert
        title={"회원탈퇴 성공"}
        contents={`회원님의 계정이 삭제 되었습니다. <br/> 감사합니다.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const WithdrawalFail = ({ cancelCallback }) => {
    return <ToastAlert
        title={"회원탈퇴 실패"}
        contents={`회원탈퇴에 실패했습니다. <br/> 잠시후 다시 시도 해주세요.`}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

const SetExperienceSuccess = ({cancelCallback}) => {
    return <ToastAlert
        title={"체험 계정 생성 성공"}
        contents={"체험 계정으로 포트폴리오를 만들어 보세요."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}


const ApiError = ({cancelCallback, title}) => {
    return <ToastAlert
        title={title}
        contents={"api error"}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />
}

/**
 * 서버가 원활하지 않음 
 * @param {callback} callback
 */
 const ServiceError = ({cancelCallback}) => {

    return <ToastAlert
        title={"서비스 오류"}
        contents={"서비스가 원활 하지 않습니다."}
        btnCancelTxt={"확인"}
        cancelCallback={cancelCallback}
    />    
}

export {
    ToastAlert,
    LoginFail,

    RegisterIdValueNull,
    RegisterPassWordValueNull,
    
    RegisterIdCheck,
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

    UploadResumeSuccess,
    UpdateResumeSuccess,
    DeleteResumeSuccess,

    UploadProjectContentsFileNull,
    UploadProjectSuccess,
    UpdateProjectSuccess,
    DeleteProjectSuccess,
    
    ProfileImgNull,
    ProfileImgSuccess,

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
}