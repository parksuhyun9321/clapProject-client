import { useEffect, useState, useRef } from "react"

/** custom hook */
import usePagination from "../../hook/usePagination";
import useLoading from "../../hook/useLoading";
import useToast from "../../hook/useToast";

/** api */
import MESSAGE from "../../js/message";
import TOKEN from "../../js/token";

/** component */
import MessageDetail from "../DetailPage/MessageDetail";

const MessageList = ({viewLength}) => {

    const [isDelete, setIsDelete] = useState(false);

    const [messageData, setMessageData] = useState([]);

    const [msgTotal, setMsgTotal] = useState(0);

    const [deleteData, setDeleteData] = useState([]);

    const [targetMail, setTargetMail] = useState(null);

    const chkInputMap = useRef(null);

    const { loadingShow, loadingHide, IconElement } = useLoading();

    const { ToastList, setToastStatus } = useToast();

    const { PaginationElement, changePaginationList, changePaginationTotal, currPage } = usePagination(viewLength);

    function SelectToggle(){ 
        setIsDelete(isDelete ? false : true) ;

        if(isDelete) {
            setIsDelete(false);
            setDeleteData([]);
        }
        else {
            setIsDelete(true);
        }
    };

    function SendDateTxt(date){
        const createDate = new Date(date);

        const year = createDate.getFullYear(); 
        const month = createDate.getMonth()+1;
        const days = createDate.getDate()

        const hours = createDate.getHours();
        const min = createDate.getMinutes();
        const sec = createDate.getSeconds();
        
        function zero(val){
            return val < 10 ? `0${val}` : val

        }
    
        return `${year}.${zero(month)}.${zero(days)} ${zero(hours)}:${zero(min)}:${zero(sec)}`
    }

    function SendPhoneTxt(phoneNumber){
        const first = phoneNumber.substring(0,3);
        const middle = phoneNumber.substring(7,3);
        const last = phoneNumber.substring(7,phoneNumber.length)
        
        return `${first}.${middle}.${last}`
    }

    function DeleteToggle(e, _id){
        const self = e.currentTarget;

        setDeleteData(arr => {
            let newArr = [...arr];

            if(self.checked) {
                newArr.push(_id);
            }
            else {
                const deleteIdx = newArr.findIndex(el => el === _id);

                newArr.splice(deleteIdx, 1);
            }  

            return newArr
        })
    }

    function DeleteCallback(){
        
        if(deleteData.length <= 0) return 
        
        MESSAGE.delete(TOKEN.get(), deleteData)
        .then(rs => {
            setToastStatus("delete msg success");
        })
        .catch(err => {
            console.log("delete err")
            setDeleteData([]);
            chkInputMap["current"] = null;
        })
    }

    function DeleteSelectSubmit(){

        if(deleteData.length <= 0) return setToastStatus("not select msg");

        setToastStatus("delete msg select confirm")
    }

    async function TargetMessageView(data){ 
        if(isDelete) return

        if(data) {
            data["senderPhone"] = SendPhoneTxt(data["senderPhone"])

            if(!data["isRead"]) {
                await MESSAGE.read(TOKEN.get(), data["_id"]);
                Setup()
            }
        }

        setTargetMail(data);
     };

    function Setup(){
        const token = TOKEN.get();

        loadingShow();

        MESSAGE.get(token, currPage, viewLength)
        .then(rs => {
            const { total, message } = rs["data"];
            
            if(deleteData.length > 0) setDeleteData([])

            setMsgTotal(total);
            changePaginationList(total);
            changePaginationTotal(total);   

            setMessageData(message)

            loadingHide();
        })
    }

    useEffect(() => {
        Setup();
        // eslint-disable-next-line
    },[currPage])

    return (
        <>
            <MessageDetail data={targetMail} cancelCallback={TargetMessageView}/>
            
            <ToastList deleteCallback={DeleteCallback} refetchCallback={() => {
                Setup();
                SelectToggle();
                setDeleteData([]);

                chkInputMap["current"] = null;
            }}/>

            <div className="head">
                <h3>메세지 전체 : {msgTotal} </h3>
                <ul className="btnList">
                    {isDelete ? <li><button onClick={() => {                        
                        const map = chkInputMap["current"];

                        let arr = [];

                        map.forEach((input, key) => {
                            input.checked = deleteData.length > 0 ? false : true;
                            
                            if(deleteData.length > 0) {
                                input.checked = false;
                            }
                            else {
                                input.checked = true;
                                arr.push(key);
                            }
                        })
                        
                        setDeleteData(arr);

                    }}>{`전체 체크 ${deleteData.length > 0 ? "해제" : ""}`}</button></li> : null}
                    {isDelete ? <li><button className="btnDeleteSubmit" onClick={DeleteSelectSubmit}>선택한 메세지 삭제</button></li> : null}
                    {messageData.length > 0 ? <li><button onClick={SelectToggle} className="btnSelectCancel">{isDelete ? "취소" : "삭제" }</button></li> : null}
                    
                </ul>
            </div>
            <div className="tableContainer">
                <IconElement/>
                <table  className={isDelete ? "deleteSelect" : ""}>
                    <thead>
                        <tr>
                            <th className="sender">발신인</th>
                            <th className="phone">발신인 폰번호</th>
                            <th className="email">발신인 이메일</th>
                            <th className="contents">내용</th>
                            <th className="date">날짜</th>
                            <th className="isRead">수신</th>
                            {isDelete ? <th className="delete">삭제</th> : null}
                        </tr>
                    </thead>
                
                    <tbody>
                
                        {
                            messageData.length <= 0 ?  <tr className="emptyMsg"><td>메세지가 없습니다.</td></tr> :
                            messageData.map((el, i) => {
                                const {sender, contents, senderEmail, senderPhone, isRead, sendDate, _id} = el;
                                return (
                                    <tr key={i}>
                                        <td className="sender">{sender}</td>
                                        <td className="phone">{SendPhoneTxt(senderPhone)}</td>
                                        <td className="email">{senderEmail}</td>
                                        <td className="contents" onClick={() => {
                                            TargetMessageView(el);
                                        }}>{contents}</td>
                                        <td className="date">{SendDateTxt(sendDate)}</td>
                                        <td className="isRead">{isRead ? "읽음" : "읽지 않음"}</td>
                                        {
                                            isDelete ?
                                            <td className="delete">
                                                <label htmlFor={`chk_${i}`}>
                                                    <input ref={input => {

                                                        if(!chkInputMap["current"]) chkInputMap["current"] = new Map([]);
                                                        
                                                        if(chkInputMap["current"].get(_id)) return
                                                        if(!input) return
                                                        
                                                        chkInputMap["current"].set(_id, input)

                                                    }} type="checkbox" id={`chk_${i}`} onChange={(e) => DeleteToggle(e, _id)} />
                                                </label>
                                            </td> : null
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                
                </table>
            </div>
            <PaginationElement/>
        </>
    )
}

export default MessageList