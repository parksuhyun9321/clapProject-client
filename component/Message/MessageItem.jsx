import { memo,useEffect, useState } from "react";

const MessageItem = ({idx, data, isDelete, TargetMessageView}) => { 

    const [readTxt, setReadTxt] = useState(data?.isRead ? "읽음" : "읽지 않음");

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

    useEffect(() => {
        if(data?.isRead) {
            console.log("dd?")
            setReadTxt("읽음");
        }
    },[data])

    return (
        <tr>
            <td className="sender">{data?.sender}</td>
            <td className="phone">{SendPhoneTxt(data?.senderPhone)}</td>
            <td className="email">{data?.senderEmail}</td>
            <td className="contents" onClick={() => {
                TargetMessageView(data);
            }}>{data?.contents}</td>
            <td className="date">{SendDateTxt(data?.sendDate)}</td>
            <td className="isRead">{readTxt}</td>
            {
                isDelete ?
                <td className="delete">
                    <label htmlFor={`chk_${idx}`}>
                        <input type="checkbox" id={`chk_${idx}`} />
                    </label>
                </td> : null
            }
        </tr>
    )
}

export default memo(MessageItem)