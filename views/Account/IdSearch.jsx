import { useRef, useState } from "react";

/** component */
import InputName from "../../component/Account/input/InputName";
import InputEmail from "../../component/Account/input/InputEmail";
import InputPhone from "../../component/Account/input/InputPhone";
import AccountUtilList from "../../component/Account/UtilList";

/** custom hook */
import useToast from "../../hook/useToast";
import useLoading from "../../hook/useLoading";

/** api */
import ACCOUNT from "../../js/account";

/** 이메일 정규식 */
const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

/** 폰번호 정규식 */
const regex_phone =  /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

const IdSearch = () => {

    const [postData, setPostData] = useState({
        name : "",
        email : "",
        phone : ""
    });

    const { ToastAccount, setToastStatus } = useToast();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPhoneRef = useRef(null);

    
    function Validata(e){
        const self = e.currentTarget;

        switch (self.id) {
            case "inputName": postData["name"] = self.value; break;
            case "inputEmail": postData["email"] = self.value; break;
            case "inputPhone": postData["phone"] = self.value; break;
        
            default: return
        }

        setPostData(postData);
    }

    function Submit(){
        
        if(!postData["name"] || postData["name"].length < 2) return setToastStatus("register nameCheck");

        if(!postData["email"] || !regex_email.test(postData["email"])) return setToastStatus("register emailCheck")

        if(!postData["phone"] || !regex_phone.test(postData["phone"])) return setToastStatus("register phoneCheck");

        loadingShow();

        ACCOUNT.idSearch(postData)
        .then(rs => {
            if(rs["resultCode"] !== 200) {
                setToastStatus("account search fail");
                return 
            }

            loadingHide();

            inputNameRef["current"].value = "";
            inputEmailRef["current"].value = "";
            inputPhoneRef["current"].value = "";

            setToastStatus("id search success", rs["data"])
        })
        .catch(err => {
            console.log("err",err)
            loadingHide();
            setToastStatus("service error")
        })
    }

    return (
        <>
            <IconElement/>
            
            <ToastAccount/>

            <main id="account">
            <dl>
                <dt>아이디 찾기</dt>
                <dd>
                    <form>
                        <ul className="inputList">
                            <InputName ref={inputNameRef} inputCallback={Validata}/>
                            <InputEmail ref={inputEmailRef} inputCallback={Validata}/>
                            <InputPhone ref={inputPhoneRef} inputCallback={Validata}/>
                        </ul>
                    </form>

                    <button id="btnSubmit" onClick={Submit}>아이디 찾기</button>
                </dd>
            </dl>
            <AccountUtilList/>
            </main>
        </>
    )
}

export default IdSearch