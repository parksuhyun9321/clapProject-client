const UrlsList = ({data, deleteCallback}) => {

    function LinkOpen(href) {

        if(href.indexOf("https://") < 0 && href.indexOf("http://") < 0) return
        
        window.open(href,"_blank","noopener");
    }

    return (
        <ul className="list">
        {
            data.map((el, i) => {
                return (
                    <li key={i}>
                        <button type="button" onClick={() => {
                            LinkOpen(el)
                        }}>
                            {el}
                        </button>
                        {/* <a onClick={(e) => {
                            const self = e.currentTarget;

                            const href = self.href;
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(href,"_blank","noopener");
                        }} href={el}>{el}</a> */}
                        <button type="button" onClick={() => {
                            deleteCallback(el)
                        }} className="btnDelete">
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

export default UrlsList