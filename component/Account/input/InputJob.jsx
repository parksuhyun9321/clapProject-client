const InputJob = ({inputCallback}) => {
    return (
        <li>
            <label htmlFor="inputJob">직업</label>
            <input 
                type="text" 
                id="inputJob"
                onInput={inputCallback}
                placeholder={"ex) 프론트엔드 개발자"} 
            />
        </li>
    )
}

export default InputJob