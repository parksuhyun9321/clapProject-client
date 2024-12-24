import { useState } from "react"

const InputPw = ({isNew, inputCallback, enterKeyEvent }) => {
    const [type, setType] = useState("password");
    const [txt, setTxt] = useState("비밀번호 보이기");

    function toggle(e){
        const self = e.currentTarget;

        setType(self.checked ? "text" : "password");
        setTxt(`비밀번호 ${self.checked ? "가리기" : "보이기"}`)
    }
    
    return (
        <li>
            <label htmlFor="inputPw">{isNew ? "새" : ""} 비밀번호</label>
            <input 
                id="inputPw" 
                type={type} 
                autoComplete={""} 
                onInput={inputCallback} 
                onKeyDown={enterKeyEvent}
                placeholder={"비밀번호"} 
            />
            <div className="checkToggleBox">
                <label htmlFor="pwToggle">
                    <span>{txt}</span>
                    <input tabIndex="-1" type="checkbox" id="pwToggle" className="hidden"  onChange={toggle}/>
                </label>
            </div>
        </li>
    )
}

export default InputPw