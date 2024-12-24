const MessageDetail = ({data, cancelCallback}) => {

    if(!data) return

    function Close(){ cancelCallback(null) };
    
    return (
        <div className="detailMesage">
            <div className="inner">
                <dl>
                    <dt>발신인 : {data?.sender}</dt>
                    <dd>{data?.senderPhone}</dd>
                    <dd>{data?.senderEmail}</dd>
                </dl>
                <textarea readOnly={true} defaultValue={data?.contents}></textarea>
                
                <ul className="btnList">
                    {/* <li><button>삭제</button></li> */}
                    <li><button onClick={Close}>닫기</button></li>
                </ul>
            </div>
        </div>
    )
}

export default MessageDetail