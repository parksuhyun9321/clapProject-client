import btnLink from "../../../img/btnLink.svg"


const UrlsList = ({data}) => {

    if(data.length <= 0) return 

    function LinkOpen(href) {

        if(href.indexOf("https://") < 0 && href.indexOf("http://") < 0) return
        
        window.open(href,"_blank","noopener");
    }

    return (
        <div className="urlsBox box">
            <h3><img src={btnLink} alt="첨부 링크" /> 첨부 링크</h3>
            <ul className="urlsList">
                {data.map((el, i) => {
                    return <li key={i}>
                        <button title={el} onClick={() => LinkOpen(el)}>{el}</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default UrlsList