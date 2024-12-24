import { forwardRef } from "react"

const InputEmail = ({ inputCallback, enterKeyEvent }, ref) => {
    return (
        <li>
            <label htmlFor="inputEmail">이메일</label>
            <input 
                ref={ref}
                type="text" 
                id="inputEmail" 
                onInput={inputCallback}
                onKeyDown={enterKeyEvent}
                placeholder={"이메일"} 
            />
        </li>
    )
}

export default forwardRef(InputEmail)