const DropBox = ({dropCallback}) => {

    function dragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = e.currentTarget;

        if(self.classList.contains("over")) return

        self.classList.add("over");
    }

    function dragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = e.currentTarget;

        if(!self.classList.contains("over")) return

        self.classList.remove("over");
    }

    function dropFile(e) {
        e.preventDefault();
        e.stopPropagation();
        dropCallback(e);
        e.currentTarget.classList.remove("over")
    }

    return (
        <>
            <div 
                className="dropBox" 
                onDragOver={dragOver} 
                onDragLeave={dragLeave} 
                onDrop={dropFile} 
            >
                <p className="dropBoxTxt">첨부 할 문서를 이곳에 드래그 해주세요.</p>
            </div>
        </>
    )
}

export default DropBox