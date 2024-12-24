const InputProjectName = ({projectName, inputCallback}) => {
    return (
        <li className="essential">
            <label htmlFor="projectName">프로젝트 명</label>
            <input 
                type="text" 
                id="projectName" 
                defaultValue={projectName}
                onInput={inputCallback}
                placeholder={"프로젝트 명"}
            />
        </li>
    )
}

export default InputProjectName