const InputBirth = ({inputCallback, enterKeyEvent}) => {

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
            <label htmlFor="inputBirth">생년월일</label>
            <input 
                type="number" 
                id="inputBirth" 
                onInput={inputCallback}
                onKeyDown={enterKeyEvent}
                placeholder={"ex) 19940711"}
                maxLength={8}
                onChange={maxLengthCheck}
            />
        </li>
    )
}

export default InputBirth