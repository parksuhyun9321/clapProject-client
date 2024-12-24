const InputId = ({ inputCallback, enterKeyEvent }) => {
    return (
        <li> 
            <label htmlFor="inputId">아이디</label>
            <input 
                type="text" 
                id="inputId" 
                onInput={inputCallback}
                onKeyDown={enterKeyEvent}
                placeholder={"아이디"}
            />
        </li>
    )
}

export default InputId