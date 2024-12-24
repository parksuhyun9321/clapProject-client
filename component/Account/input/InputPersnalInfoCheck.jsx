const InputPersnalInfoCheck = ({inputCallback}) => {
    return (
        <li className="checkList">
            <ul>
                <li>
                    <label htmlFor="persnalInfoCheck">개인정보 수집 동의</label>
                    <input type="checkbox" id="persnalInfoCheck" onChange={inputCallback}/>
                </li>
            </ul>
        </li>
    )
}

export default InputPersnalInfoCheck