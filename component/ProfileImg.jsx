import { useEffect, useLayoutEffect, useState } from "react";

import UploadProfileImg from "./UploadLayer/UploadProfileImg";

/** img */
// import imgNull from "../img/img_none.svg"
import defaultFemale from "../img/defaultProfile_female.svg";
import defaultMale from "../img/defaultProfile_male.svg";

/** api */
import TOKEN from "../js/token";
import PROFILE_IMG from "../js/profileImg";
import { useParams } from "react-router-dom";

const ProfileImg = ({isAdmin}) => {
    const [profileImg, setProfileImg] = useState("");

    const [isUpload, setIsUpload] = useState(false);

    const { key } = useParams();
    
    function Setup(){
        
        PROFILE_IMG.get(isAdmin, isAdmin ? TOKEN.get() : key)
        .then(result => {
  
            let src;
            if(result["data"]["img"]) {
                src = `${process.env.REACT_APP_CONTENTS_URL??window.location.origin}/contents/${result["data"]["user"]}/profile/${result["data"]["img"]}`;
            }
            else {
                src = result["data"]["gender"] === 0 ? defaultMale : defaultFemale
            }

            setProfileImg(src)
        })
    }

    useLayoutEffect(() => {
        
        Setup();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            { isUpload ? <UploadProfileImg src={profileImg} cancelCallback={() => setIsUpload(false)} refetchCallback={Setup} /> : null }
            {isAdmin ? <button onClick={() => {
                setIsUpload(true);
            }} className="btnAdd change">이미지 변경</button> : null } 
            <div className="imgBox">
                {profileImg ? <img src={profileImg} alt="프로필 이미지" /> : null}
            </div>
        </>

    )
}

export default ProfileImg