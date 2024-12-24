const SelectStart = ({startYear, startMonth, selectCallback, isResume}) => {
    
    return (
        
        <li className="essential">
            <label htmlFor="startYear">{isResume ? "입사" : "시작"}</label>
            <ul className="selectList">
                <li>
                    <select 
                        id="startYear" 
                        value={startYear ? startYear :"선택"}
                        onChange={selectCallback}
                    >
                        <option disabled>선택</option>
                        {
                        
                            [...Array(72)].map((item, i) => {
                                return (
                                    <option key={i} value={new Date().getFullYear()-i}>{new Date().getFullYear()-i}</option>
                                )
                            })
                        }
                    </select>
                    <p>년도</p>
                </li>
                <li>
                    <select 
                        id="startMonth"
                        onChange={selectCallback}
                        value={startMonth ? startMonth : "선택"}
                    >
                        <option disabled>선택</option>
                        {
                            [...Array(12)].map((item, i) => {
                                return (
                                    <option key={i}>
                                        {i+1 < 10 ? `0${i+1}` : i+1}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <p>월</p>
                </li>
            </ul>
        </li>
    )
}

export default SelectStart