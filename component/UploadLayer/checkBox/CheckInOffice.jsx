const CheckInOffice = ({ inOffice, checkCallback}) => {
    return (
        <li className="onGoing">
            <div className="checkToggleBox">
                <label htmlFor="inOffice">재직중</label>
                <input 
                    type="checkBox" 
                    id="inOffice"
                    data-type={"inOffice"}
                    onChange={checkCallback}
                    checked={inOffice}
                />
            </div>
        </li>        
    )
}

export default CheckInOffice