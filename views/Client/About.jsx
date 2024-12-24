
/** component */
import ResumeList from "../../component/list/ResumeList";
import ProfileImg from "../../component/ProfileImg";
import HashTagList from "../../component/list/HashTagList";
import MyInfo from "../../component/MyInfo";
import CopyRight from "../../component/CopyRight";

/** custom hook */
import useKeyCheck from "../../hook/useKeyCheck";




const About = () => {

    const keyCheck = useKeyCheck();

    if(!keyCheck) return 

    return (
        <>
            <section id="about">
                <h2 className="hidden">내정보</h2>
                <div className="inner">
                    <article className="myInfoBox">
                        <h2 className="hidden">이름/직업/이력</h2>
                        <MyInfo/>
                        <div className="resume">
                            <h3>이력</h3>
                            <div className="resumeBox">
                                <ResumeList
                                    viewLength={3}
                                    className={"resumeList"}
                                />
                            </div>
                        </div>
                        <div className="hashTag">
                            <HashTagList/>
                        </div>
                    </article>
                    <article className="profileImg">
                        <h2 className="hidden">프로필 사진</h2>
                        <ProfileImg/>
                    </article>
                </div>
                <CopyRight/>
            </section>
        </>
    )  


}

export default About