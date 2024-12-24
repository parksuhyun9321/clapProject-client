import { useRef } from "react";
import { useParams } from "react-router-dom"
import useToast from "../hook/useToast";
import MESSAGE from "../js/message";

function ContactContents(){
    const { key } = useParams();

    const { ToastContact, setToastStatus } = useToast();

    const elementsRef = useRef({
        name : null,
        phone : null,
        email : null,
        contents : null,
    })
    
    /**
     * input 글자수 제한
     */
    function maxLengthCheck(e){
        if (e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }    
    }

    function PostCallback(){
        const { name, phone, email, contents } = elementsRef["current"];
        const postData = {
            name : name.value,
            phone : phone.value,
            email : email.value,
            contents : contents.value
        }
        MESSAGE.post(key, postData)
        .then(rs => {
            name.value = "";
            phone.value = "";
            email.value = "";
            contents.value = "";

            setToastStatus("post msg success")
        })
        .catch(err => {
            console.log("메세지 전송 실패",err)
            setToastStatus("post fail success")
        })
    }

    function Submit(){
        
        /** 이메일 정규식 */
        const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        /** 폰번호 정규식 */
        const regex_phone =  /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        const { name, phone, email, contents } = elementsRef["current"];


        if(!name.value) return setToastStatus("post value error", "이름");
        if(!phone.value || !regex_phone.test(phone.value)) return setToastStatus("post value error", "폰번호");
        if(!email.value || !regex_email.test(email.value)) return setToastStatus("post value error", "이메일");
        
        if(!contents.value) return setToastStatus("post value error", "보낼 내용");

        setToastStatus("isPost")
    }

    return (
        <>
            <ToastContact postCallback={PostCallback}/>

            <article className="contact">
                <h3>CONTACT</h3>
                <form className="form">
                    <ul className="inputList">
                        <li>
                            <label htmlFor="senderName">이름</label>
                            <input ref={input => elementsRef["current"]["name"] = input} type="text" id="senderName" placeholder="보내는 분 이름"/>
                        </li>
                        <li>
                            <label htmlFor="senderPhone">폰번호</label>
                            <input ref={input => elementsRef["current"]["phone"] = input} type="number" id="senderPhone" placeholder="보내는 분 폰번호 ex) 01094629321" maxLength={11} onChange={maxLengthCheck}/>
                        </li>
                        <li>
                            <label htmlFor="senderEmail">이메일</label>
                            <input ref={input => elementsRef["current"]["email"] = input} type="text" id="senderEmail" placeholder="보내는 분 이메일"/>
                        </li>
                        <li>
                            <label htmlFor="postMessage">보낼 내용</label>
                            <textarea ref={textarea => elementsRef["current"]["contents"] = textarea} id="postMessage" placeholder="메세지 내용"></textarea>
                        </li>
                    </ul>
                </form>
                <button className="btnSubmit" type="button" onClick={Submit}>보내기</button>
            </article>
        </>
    )
}

export default ContactContents