import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MYINFO from "../js/myInfo"

const Greetings = () => {
    const { key } = useParams();

    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        MYINFO.get(false, key)
        .then(rs => {
          setMyInfo(rs["data"])
        })
    },[])

    return (
        <h3>
            반갑습니다. <br/>
            {myInfo?.job} <br/> 
            {myInfo?.name} 입니다.
        </h3>
    )
}

export default Greetings