import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/** custom hook */
import useLoading from "../../hook/useLoading";

/** component */
import UploadHashTag from "../UploadLayer/UploadHashTag";

/** api */
import TOKEN from "../../js/token";
import HASHTAG from "../../js/hashTag";




const EmptyHashTag = () => {
    return ( 
        <li className="empty">
            등록된 해시태그 가 없습니다.
        </li>
    )
}

const HashTagList = ({ isAdmin }) => {
    const { key } = useParams();

    const { loadingShow, loadingHide, IconElement } = useLoading();

    /** @type {array} 해시태그 데이터*/
    const [hashTag, setHashTag] = useState([]);

    const [isChange, setIsChange] = useState(false);

    function Update() { setIsChange(true) };

    function Cancel(){ setIsChange(false) };

    function Setup(){
        loadingShow();

        const token = TOKEN.get();
        
        HASHTAG.get(isAdmin, isAdmin ? token : key)
        .then(rs => {
            setHashTag(rs["data"]["hashTag"]);
            loadingHide();
        })
    }

    useEffect(() => {
        Setup();
        // eslint-disable-next-line
    },[])

    return (
        <>
            <IconElement/>    

            {
            isAdmin ? <button className="btnAdd change" onClick={Update}>해시태그 수정</button> : null
            }

            {
                isChange ? 
                <UploadHashTag 
                    data={hashTag}
                    cancelCallback={Cancel}
                    refetchCallback={Setup}
                /> 
                : null
            }

            <ul className="hashTagList">

                {
                    hashTag.length <= 0 ? <EmptyHashTag/>
                    : 
                    hashTag.map((el, i) => {
                        return (
                            <li key={i}>
                                {el}
                            </li>
                        )
                    })
                }
            </ul>        
        </>
    )
}

export default HashTagList