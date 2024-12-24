import { forwardRef, useState } from "react"

const InputUrls = ({ addCallback }, ref) => {

    const [isComposing, setIsComposing] = useState(false);

    function ComposingStart(){ setIsComposing(true) };

    function CompositionEnd(){ setIsComposing(false) };

    function EnterEvent(e) {
        if(isComposing) return
        if(e.code !== "Enter") return 

        e.preventDefault();

        addCallback();
    }

    return (
        <input 
            ref={ref}
            type="text" 
            id="inputUrls" 
            defaultValue={"https://"}
            onCompositionStart={ComposingStart}
            onCompositionEnd={CompositionEnd}
            onKeyDown={EnterEvent}
            placeholder={"https://"}
        />
    )
}


export default forwardRef(InputUrls)