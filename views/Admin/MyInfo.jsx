/** custom hook */
import useVerify from "../../hook/useVerify";

/** component */
import AdminHeader from "../../component/Headers/AdminHeader";
import HashTagList from "../../component/list/HashTagList";
import MyInfo from "../../component/MyInfo";
import ProfileImg from "../../component/ProfileImg";
import ResumeList from "../../component/list/ResumeList";


const AdminMyInfo = () => {
    
    /** @type {boolean} true : 토큰 이 유효함 */
    const isVerify = useVerify()
    
    if(!isVerify) return
    
    return (
        <>
            <AdminHeader/>
            <section id="adminMyInfo">
                <h2 className="hidden">관리자 메인페이지</h2>
                
                <div className="inner">
                    <article className="myInfoBox">
                        <h3>내정보</h3>

                        <MyInfo isAdmin={true} />
                    </article>
                    <article className="resumeBox">
                        <h3>이력</h3>
                        <ResumeList
                            viewLength={5}
                            isAdmin={true}
                            className={"resumeList"}
                        />
                    </article>
                    <article className="hashTagBox">
                        <h3>나와 관련된 해시태그</h3>
                        <HashTagList isAdmin={true} />
                    </article>
                    <article className="profileImg">
                        <h3>프로필 사진</h3>
                        <ProfileImg isAdmin={true} />
                    </article>
                </div>
            </section>
        </>
    )
}

export default AdminMyInfo