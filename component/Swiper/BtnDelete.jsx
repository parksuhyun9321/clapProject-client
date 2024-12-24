const BtnDelete = ({idx, deleteCallback}) => {
    // 
    return (
        <button type="button" onClick={() => {
            deleteCallback(idx)
        }} className="btnDelete">
            <span></span>
            <span></span>
        </button>
    )
}

export default BtnDelete