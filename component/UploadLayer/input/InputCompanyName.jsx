const InputCompanyName = ({companyName, inputCallback}) => {
    return (
        <li className="essential">
            <label htmlFor="companyName">회사명</label>
            <input 
                type="text" 
                id="companyName" 
                defaultValue={companyName}
                onInput={inputCallback}
                placeholder={"회사명"}
            />
        </li>
    )
}

export default InputCompanyName