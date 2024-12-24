import { useState } from "react"

const PwCheck = ({isNew, inputCallback }) => {
    const [type, setType] = useState("password");
    const [txt, setTxt] = useState("비밀번호 확인 보이기");

    
    function toggle(e){
        const self = e.currentTarget;

        setType(self.checked ? "text" : "password");
        setTxt(`비밀번호 확인 ${self.checked ? "가리기" : "보이기"}`)
    }
    return (
        <li>
            <label htmlFor="inputPwCheck">{isNew ? "새" : ""} 비밀번호 확인</label>
            <input 
                id="inputPwCheck" 
                type={type} 
                autoComplete={""} 
                onInput={inputCallback} 
                placeholder={"비밀번호 확인"} 
            />
            <div className="checkToggleBox">
                <label htmlFor="pwCheckToggle">
                    <span>{txt}</span>
                    <input tabIndex="-1" type="checkbox" id="pwCheckToggle" className="hidden"  onChange={toggle}/>
                </label>
            </div>
        </li>
    )
}

export default PwCheck