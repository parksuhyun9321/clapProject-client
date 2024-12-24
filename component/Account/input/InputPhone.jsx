import { forwardRef } from "react"

const InputPhone = ({ inputCallback, enterKeyEvent }, ref) => {

    /**
     * input 글자수 제한
     */
    function maxLengthCheck(e){
        if (e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }    
    }

    return (
        <li>
            <label htmlFor="inputPhone">휴대폰 번호</label>
            <input 
                ref={ref}
                type="number" 
                id="inputPhone" 
                onInput={inputCallback}
                onKeyDown={enterKeyEvent}
                placeholder={"휴대폰 번호 ex) 01094629321"} 
                maxLength={11}
                onChange={maxLengthCheck}
            />
        </li>
    )
}

export default forwardRef(InputPhone)