import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

/** img */
import btnBack from "../../img/btn_back.svg"

/** component */
import InputId from "../../component/Account/input/InputId"
import InputPw from "../../component/Account/input/InputPw"
import InputPwCheck from "../../component/Account/input/InputPwCheck"
import InputJob from "../../component/Account/input/InputJob"
import InputName from "../../component/Account/input/InputName"
import InputEmail from "../../component/Account/input/InputEmail"
import InputPhone from "../../component/Account/input/InputPhone"
import InputBirth from "../../component/Account/input/InputBirth"
import InputGender from "../../component/Account/input/InputGender"
import InputPersnalInfoCheck from "../../component/Account/input/InputPersnalInfoCheck"



/** custom hook */
import useToast from "../../hook/useToast"
import useLoading from "../../hook/useLoading"

/** api */
import ACCOUNT from "../../js/account"



 
const Register = () => {

    const { ToastAccount, setToastStatus } = useToast();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const navigation = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [job, setJob] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState(-1);
    const [persnalInfoCheck, setPersnalInfoCheck] = useState(false);

    function validata(e) {
        const self = e.currentTarget;

        switch (self.id) {
            case "inputId": setId(self.value); break;
            case "inputPw": setPw(self.value); break;
            case "inputPwCheck": setPwCheck(self.value); break;
            case "inputJob" : setJob(self.value); break;
            case "inputName": setName(self.value); break;
            case "inputEmail": setEmail(self.value); break;
            case "inputPhone": setPhone(self.value); break;
            case "inputBirth": setBirth(self.value); break;
            case "registerGender0" : if(self.checked) setGender(0); break;
            case "registerGender1" : if(self.checked) setGender(1); break;
            case "persnalInfoCheck" : setPersnalInfoCheck(self.checked); break 
        
            default: return;
        }
    }

    /** 
     * 회원가입 절차 체크.
     * 문제가 있을시 문자열을 리턴함
     * @returns {string} 
     *  */
    function check(){

        /** 아이디 정규식 */
        const regex_id = /^[a-z]+[a-z0-9]{5,19}$/g;

        /** 이메일 정규식 */
        const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        /** 폰번호 정규식 */
        const regex_phone =  /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        /** 생년월일 정규식 */
        const regex_birth = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;

        /** 아이디 입력이 없을시 */
        if(!id) return "register id null";

        /** 입력한 아이디가 형식에 맞지 않을시 */
        if(!regex_id.test(id)) return "register idCheck";

        /** 비밀번호를 입력하지않았거나 6자리 이하 일시, 비밀번호 확인값과 비밀번호 값이 다를시 */
        if(!pw || pw.length < 6) return "register pw null";

        /** 비밀번호 입력값과 비밀번호 확인 입력값이 다를시 */
        if(pw !== pwCheck) return "register pwCheck";

        /** 직업을 입력 하지 않았을시 */
        if(!job) return "register jobCheck"

        /** 이름 입력값을 입력 하지 않았거나 이름값이 2자 이하일시 */
        if(!name || name.length < 2) return "register nameCheck";

        /** 이메일을 입력하지않았거나 이메일 형식에 어긋났을시 */
        if(!email || !regex_email.test(email)) return "register emailCheck";

        /** 폰번호를 입력하지않았거나 폰번호 형식에 어긋났을시 */
        if(!phone || !regex_phone.test(phone)) return "register phoneCheck";

        /** 생년 월일을 입력하지않았거나 생년월일 형식에 어긋났을시 */
        if(!birth || !regex_birth.test(birth)) return "register birthCheck";

        /** 성별을 체크하지 않았을시 */
        if(typeof gender !== "number" ) return "register genderCheck";

        /** 개인정보 수집 및 동의에 체크하지 않았을시 */
        if(!persnalInfoCheck) return "register persnalInfoCheck";
    }

    function SubmitCallback(){
        const registerCheck = check();
        
        if(registerCheck) return setToastStatus(registerCheck);

        /** 로딩화면 활성화 */ 
        loadingShow();

        const data = {
            id,
            pw,
            job,
            name,
            email,
            phone,
            birth,
            gender
        }

        ACCOUNT.register(data)
        .then(rs => {
            
            loadingHide();

            switch (rs["resultCode"]) {
                case 403 : setToastStatus(rs["errorMsg"]); break;
                case 404 : setToastStatus("api error", rs["errorMsg"]); break;
                default : setToastStatus("register complete"); break; 
            }
        })
        .catch(err => {
            console.log(err);
            loadingHide();
            setToastStatus("service error")
        })

    }

    return (
        <>
            <ToastAccount RegisterCompleteCallback={() => {navigation("/account/login")}}/>
            <main id="account">
                <IconElement/>

                <dl>
                    <dt>회원가입</dt>
                    <dd className="register">
                        <Link to={"/account/login"} type="button" className="btnBack">
                            <img src={btnBack} alt="로그인 페이지로 돌아가기"/>
                        </Link>
                        <form>
                            <ul className="inputList">
                                <InputId inputCallback={validata} />
                                <InputPw inputCallback={validata} />
                                <InputPwCheck inputCallback={validata} />
                                <InputJob inputCallback={validata}/>
                                <InputName inputCallback={validata} />
                                <InputEmail inputCallback={validata} />
                                <InputPhone inputCallback={validata} />
                                <InputBirth inputCallback={validata} />
                                <InputGender gender={gender} inputCallback={validata} />
                                <InputPersnalInfoCheck inputCallback={validata} />
                            </ul>
                        </form>
                        <button id="btnSubmit" onClick={SubmitCallback}>회원가입</button>
                    </dd>
                </dl>
            </main>
        </>
    )
}

export default Register