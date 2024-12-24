const InputGender = ({gender, inputCallback}) => {
    return (
        <li className="genderBox">
            <label>성별</label>
            <ul>
                <li className={gender === 0 ? "on" : ""}>
                    <label htmlFor="registerGender0">남자</label>
                    <input 
                        checked={ gender === 0 ? true : false} type="checkBox" 
                        id="registerGender0" 
                        onChange={inputCallback} 
                    />
                </li>
                <li className={gender === 1 ? "on" : ""}>
                    <label htmlFor="registerGender1">여자</label>
                    <input 
                        checked={ gender === 1 ? true : false} type="checkBox" 
                        id="registerGender1" 
                        onChange={inputCallback} 
                    />
                </li>
            </ul>
        </li>
    )
}

export default InputGender