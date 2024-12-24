import { forwardRef } from "react"

const InputName = ({ inputCallback, enterKeyEvent }, ref) => {
    return (
        <li>
            <label htmlFor="inputName">이름</label>
            <input 
                ref={ref}
                type="text" 
                id="inputName" 
                onInput={inputCallback} 
                onKeyDown={enterKeyEvent}
                placeholder={"이름"} 
                />
        </li>
    )
}

export default forwardRef(InputName)