const CheckOnGoing = ({ onGoing, checkCallback}) => {
    return (
        <li className="onGoing">
            <div className="checkToggleBox">
                <label htmlFor="onGoing">진행중</label>
                <input 
                    type="checkBox" 
                    id="onGoing"
                    onChange={checkCallback}
                    checked={onGoing}
                />
            </div>
        </li>        
    )
}

export default CheckOnGoing