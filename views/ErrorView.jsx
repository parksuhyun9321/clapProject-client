// import { Link } from "react-router-dom"

import ErrorViewIcon from "../img/errorViewIcon.svg"

const ErrorView = () => {
    return (
        <section id="errorView">
            <div className="inner">
                <div className="imgBox">
                    <img src={ErrorViewIcon} alt={""} />
                </div>
                <h3>
                    페이지를 <strong>찾을 수 없습니다.</strong>
                </h3>
                <p>
                방문하시려는 페이지의 주소가 잘못 입력되었거나,
                페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
                입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
                </p>
            </div>
        </section>
    )
}

export default ErrorView