const CheckTermination = ({ isTermination, checkCallback}) => {
    return (
        <li className="isTermination">
            <div className="checkToggleBox">
                <label htmlFor="isTermination">현재 서비스 종료</label>
                <input 
                    type="checkBox" 
                    id="isTermination"
                    onChange={checkCallback}
                    checked={isTermination}
                />
            </div>
        </li>        
    )
}

export default CheckTermination