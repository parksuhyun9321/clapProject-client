const SwiperPagination = ({idx, total, callback}) => {
    if(total < 2) return

    const clickItem = (i) => callback(i);

    return (
        <ol className="swiper-pagination">
            {
                [...Array(total)].map((el, i) => {
                    return (
                        <li key={i} className={idx === i ? "active" : ""} title={`${i+1}번째 아이템 보기`} onClick={() => {
                            clickItem(i)
                        }}>
                            
                        </li>
                    )
                })
            }
        </ol>
    )
}

export default SwiperPagination