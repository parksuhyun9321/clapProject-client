const HashTagList = ({data}) => {
    if(!data || data.length <= 0) return 

    return (
        <ul className="hashTagList">
            {data.map((el, i) => {
                return <li key={i}>
                    {el}
                </li>
            })}
        </ul>
    )
}

export default HashTagList