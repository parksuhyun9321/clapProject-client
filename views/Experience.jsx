import { useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/** img */
import logoImg from "../img/logo.svg"

/** api */
import EXPERIENCE from "../js/experience"
import TOKEN from "../js/token"

/** custom hook */
import useLoading from "../hook/useLoading"
import useToast from "../hook/useToast"




const Experience = () => {

    const [account, setAccount] = useState({
        id : "",
        pw : "",
    });

    const navigation = useNavigate();

    const { IconElement, loadingShow, loadingHide } = useLoading();

    const { ToastExperience, setToastStatus} = useToast();

    function BrowerClose(){ window.close() }

    function SetExperience(){

        loadingShow();

        EXPERIENCE.setExperience(account)
        .then(rs => {
            loadingHide();
            
            if(rs["resultCode"] !== 200) {
                return setToastStatus("service error");
            }
            
            setToastStatus("set experience success");
            TOKEN.set(rs["data"])
        })
        .catch(err => {
            loadingHide();
            setToastStatus("service error");
            console.log("err ??",err);
        })
    }

    function NaviCallback(){
        navigation("/");
    }

    useLayoutEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let id = "";
        let pw = "";
 
        let id_length = 6;
        let pw_length = 12
 
        for (let i = 0; i < id_length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
 
        for (let i = 0; i < pw_length; i++) {
            pw += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setAccount(obj => {
            let newObj = {...obj};

            newObj["id"] = id;
            newObj["pw"] = pw;

            return newObj
        });

    },[])

    return (
        <main id="app">
            
            <IconElement/>

            <ToastExperience naviCallback={NaviCallback}/>

            <section id="experience">
                <h2 className="hidden">체험하기</h2>
                <div className="inner">
                    <dl>
                        <dt>
                            <img src={logoImg} alt="사이트 체험 해보기" /> 사이트 체험 해보기
                        </dt>
                        <dd>
                            "체험하기"를 클릭하면 테스트 계정을 생성 후 CMS 페이지로 이동합니다.
                        </dd>
                        <dd>
                            이력과 프로젝트를 등록해 본인의 포트폴리오를 만들어 확인 해보세요.
                        </dd>
                        <dd className="ps">
                            *생성된 테스트 계정은 밤 12시에 일괄 삭제 됩니다.
                        </dd>
                    </dl>
                    <div className="accountBox">
                        <p>아이디 : <span>{account["id"]}</span></p>
                        <p>비밀번호 : <span>{account["pw"]}</span></p>
                    </div>

                    <ul className="btnList">
                        <li><button onClick={SetExperience} title="체험하기 : 테스트 계정 생성">체험하기</button></li>
                        <li><button title="브라우저 닫기" onClick={BrowerClose}>취소</button></li>
                    </ul>
                </div>
            </section>
        </main>
    )
}

export default Experience