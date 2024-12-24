import { useState } from "react";

/** component */
import InputId from "../../component/Account/input/InputId";
import InputName from "../../component/Account/input/InputName";
import InputEmail from "../../component/Account/input/InputEmail";
import InputPhone from "../../component/Account/input/InputPhone";
import InputPw from "../../component/Account/input/InputPw";
import InputPwCheck from "../../component/Account/input/InputPwCheck"
import AccountUtilList from "../../component/Account/UtilList";

/** custom hook */
import useToast from "../../hook/useToast";
import useLoading from "../../hook/useLoading";

/** api */
import ACCOUNT from "../../js/account";
import { useNavigate } from "react-router-dom";

const PwSearch = () => {

    const navigation = useNavigate();

    const { ToastAccount, setToastStatus } = useToast();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const [postData, setPostData] = useState({
        id : "",
        name : "",
        email : "",
        phone : ""
    });

    const [changeData, setChangeData] = useState({
        pw : "",
        pwCheck : ""
    })

    const [isChange, setIsChange] = useState(false);
    
    function Validata(e){
        const self = e.currentTarget;

        switch (self.id) {
            case "inputId": postData["id"] = self.value; break;
            case "inputName": postData["name"] = self.value; break;
            case "inputEmail": postData["email"] = self.value; break;
            case "inputPhone": postData["phone"] = self.value; break;
        
            default: return
        }

        setPostData(postData);
    }

    function PwValidata(e){
        const self = e.currentTarget;

        switch (self.id) {
            case "inputPw": changeData["pw"] = self.value; break;
            case "inputPwCheck": changeData["pwCheck"] = self.value; break;
        
            default:return
        }

        setChangeData(changeData);
    }

    function PwChangeCallback(){ setIsChange(true) };

    function UserCheckSubmit(){

        /** 아이디 정규식 */
        const regex_id = /^[a-z]+[a-z0-9]{5,19}$/g;

        /** 이메일 정규식 */
        const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        /** 폰번호 정규식 */
        const regex_phone =  /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        if(!postData["id"] || !regex_id.test(postData["id"])) {

            console.log("???",postData)
            return setToastStatus("register idCheck")
        }

        if(!postData["name"] || postData["name"].length < 2) return setToastStatus("register nameCheck");

        if(!postData["email"] || !regex_email.test(postData["email"])) return setToastStatus("register emailCheck")

        if(!postData["phone"] || !regex_phone.test(postData["phone"])) return setToastStatus("register phoneCheck");

        loadingShow();

        ACCOUNT.pwUserSearch(postData)
        .then(rs => {
            loadingHide();

            if(rs["resultCode"] !== 200) {
                setToastStatus("account search fail");
                return 
            }

            setToastStatus("account pw change");
        })
        .catch(err => {
            console.log("err",err);
            loadingHide();
            setToastStatus("service error")
        })
    }

    function PwChangeSubmit(){
       /** 비밀번호를 입력하지않았거나 6자리 이하 일시, 비밀번호 확인값과 비밀번호 값이 다를시 */
       if(!changeData["pw"] || changeData["pw"].length < 6) return setToastStatus("register pw null");

       /** 비밀번호 입력값과 비밀번호 확인 입력값이 다를시 */
       if(changeData["pw"] !== changeData["pwCheck"]) return setToastStatus("register pwCheck");

       loadingShow();

       ACCOUNT.pwChange({
        pw : changeData["pw"],
        id : postData["id"]
       })
       .then(rs => {
        loadingHide();    
        
            if(rs["resultCode"] !== 200) {
                setToastStatus(rs["errorMsg"]);
                return 
            }

            setToastStatus("pw change success");
       })
       .catch(err => {
            console.log("pwchange err", err);
            loadingHide();
            setToastStatus("service error");
       })
    }

    function Submit(){
        if(isChange) {
            PwChangeSubmit();
        }
        else {
            UserCheckSubmit();
        }
    }

    function PwChangeSuccessCallback() { navigation("/account/login") };

    return (
        <>
            <IconElement/>

            <ToastAccount 
                pwChangeCallback={PwChangeCallback}
                pwChangeSuccessCallback={PwChangeSuccessCallback}
            />

            <main id="account">
                <dl>
                    <dt>비밀번호 {isChange ? "변경" : "찾기" } </dt>
                    <dd>
                        <form>
                            <ul className="inputList">

                            {
                             isChange ? 
                                <>
                                    <InputPw isNew={true} inputCallback={PwValidata}/>
                                    <InputPwCheck isNew={true} inputCallback={PwValidata}/>
                                </>
                                :
                                <>
                                    <InputId inputCallback={Validata}/>
                                    <InputName inputCallback={Validata}/>
                                    <InputEmail inputCallback={Validata}/>
                                    <InputPhone inputCallback={Validata}/>                                    
                                </>
                            }
                            </ul>
                        </form>

                        <button id="btnSubmit" onClick={Submit}>비밀번호 {isChange ? "변경" : "찾기"}</button>
                    </dd>
                </dl>
                {isChange ? null : <AccountUtilList/>}
                
            </main>
        </>
    )
}

export default PwSearch