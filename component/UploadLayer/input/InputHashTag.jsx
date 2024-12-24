import { forwardRef, useState } from "react"

const InputHashTag = ({addCallback, placeholder}, ref) => {

    const [isComposing, setIsComposing] = useState(false);

    function ComposingStart(){ setIsComposing(true) };
    
    function CompositionEnd(){ setIsComposing(false) };

    function EnterEvent(e) {
        if(isComposing) return
        if(e.code !== "Enter") return 

        e.preventDefault();

        addCallback()
    }

    return (
        <input 
            ref={ref}
            type="text" 
            id="inputHashTag" 
            onCompositionStart={ComposingStart}
            onCompositionEnd={CompositionEnd}
            onKeyDown={EnterEvent}
            onInput={(e) => {
                if(isComposing) e.preventDefault();
            }}
            placeholder={placeholder??"나와 관련된 단어, 문장"}
        />
    )
}


export default forwardRef(InputHashTag)