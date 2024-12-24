const SelectEnd = ({ endYear, endMonth, selectCallback, isResume}) => {

    return (
        <li className="essential">

            <label htmlFor="endYear">{isResume ? "퇴사" : "종료"}</label>
            <ul className="selectList">
                <li>
                    <select 
                        id="endYear"
                        onChange={selectCallback}
                        value={endYear ? endYear : "선택"}
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
                        id="endMonth"
                        onChange={selectCallback}
                        value={endMonth ? endMonth : "선택"}
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

export default SelectEnd