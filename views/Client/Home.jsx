/** component */
import Greetings from "../../component/Greetings";
import CopyRight from "../../component/CopyRight";
import ContactContents from "../../component/ContactContents";
import ProjectAnimationCard from "../../component/list/ProjectList.AnimationCard";

/** custom hook */
import useKeyCheck from "../../hook/useKeyCheck";

const Home = () => {    

  const keyCheck = useKeyCheck();

  if(!keyCheck) return 

    return (
      <>
        <section id="index">
            <h2 className="hidden">메인 페이지</h2>
            <article className="scrollContents" >
              <Greetings/>
              <CopyRight/>
              <ProjectAnimationCard/>
            </article>
            
            <ContactContents/>
        </section>
      </>
        
    )
    
}

export default Home