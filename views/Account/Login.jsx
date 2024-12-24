import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** logo img */
import logo from "../../img/textLogo.svg"

import useToast from "../../hook/useToast";

import InputId from "../../component/Account/input/InputId";
import InputPw from "../../component/Account/input/InputPw";
import AccountUtilList from "../../component/Account/UtilList";

import ACCOUNT from "../../js/account";
import TOKEN from "../../js/token";


const Login = () => {

    const { ToastAccount, setToastStatus } = useToast();

    const navigation = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    
    function validata(e){
        const self = e.currentTarget;

        switch (self.id) {
            case "inputId": setId(self.value); break;
            case "inputPw": setPw(self.value); break;
        
            default: return;
        }
    }

    function SubmitCallback(){

        if(!id) return setToastStatus("login fail");
        if(!pw) return setToastStatus("login fail");
        if(pw.length < 6) return setToastStatus("login fail");

        ACCOUNT.login(id, pw)
        .then(rs => {
            if(rs["resultCode"] !== 200) return setToastStatus("login fail");
            
            TOKEN.set(rs["data"]);
            navigation("/")

        })
        .catch(err => {
            console.log("api error",err)
            setToastStatus("service error")
        })

    
    }

    function enterKeyCallback(e) {
        if(e.code !== "Enter") return 

        SubmitCallback();
    }

    return (
        <>
            <ToastAccount/>
            <main id="account">
                <dl >
                    <dt>
                        <img src={logo} alt="로고"/>
                    </dt>
                    <dd>
                        <form>
                            <ul className="inputList">
                                <InputId enterKeyEvent={enterKeyCallback} inputCallback={validata} />
                                <InputPw enterKeyEvent={enterKeyCallback} inputCallback={validata} />
                            </ul>
                        </form>

                        <button type="button" id="btnSubmit" onClick={SubmitCallback} >로그인</button>
                    </dd>
                </dl>
                <AccountUtilList/>
            </main>
        </>
    )
}

export default Login