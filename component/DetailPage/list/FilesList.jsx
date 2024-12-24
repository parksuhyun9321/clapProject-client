/** img */
import btnFile from "../../../img/btnFile.svg"

/** api */
import FILES from "../../../js/files"
import TOKEN from "../../../js/token"


const FilesList = ({data}) => {
    if(data.length <= 0) return 

    function FileDownload(data){
        console.log("data",data)
        FILES.download(true, TOKEN.get(), data)
    }
    
    return (
        <div className="filesBox box">
            <h3><img src={btnFile} alt="첨부 링크" /> 첨부 파일</h3>
            <ul className="urlsList">
                {data.map((el, i) => {
                    return <li key={i}>
                        <button title={el["name"]} onClick={() => FileDownload(el)}>{el["name"]}</button>
                    </li>
                })}
            </ul>
        </div> 
    )
}

export default FilesList