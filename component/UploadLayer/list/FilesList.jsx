const FilesList = ({data, deleteCallback}) => {
    return (
        <ul className="list">
                {
                    data.map((el ,i) => {
                        return <li key={i}>
                            <h3>{el["name"]}</h3>
                            <button type="button" className="btnDelete" onClick={() => {
                                deleteCallback(i)
                            }}>
                                <span></span>
                                <span></span>
                            </button>
                        </li>      
                    }) 
                }
        </ul>
    )
}

export default FilesList