const EmptyHashTag = ({noEmpty}) => {

    if(noEmpty) return

    return <li className="empty">등록된 해시태그가 없습니다.</li>
}

const HashTagList = ({data, deleteCallback, noEmpty}) => {
    return (
        <ul className="hashTagList">
        {
            data.length <= 0 ? <EmptyHashTag noEmpty={noEmpty}/> : 
            data.map((el, i) => {
                return (
                    <li key={i}>
                        {el}
                        <button type="button" className="btnDelete" onClick={() => {
                            deleteCallback(el)
                        }}>
                            <span></span>
                            <span></span>
                        </button>
                    </li>
                )
            })
        }
    </ul> 
    )
}


export default HashTagList