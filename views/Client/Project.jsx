// import { useState } from "react"
import CopyRight from "../../component/CopyRight"
import ProjectBoard from "../../component/list/ProjectList.board"

/** custom hook */
import useKeyCheck from "../../hook/useKeyCheck";


const Project = () => {
    const keyCheck = useKeyCheck();

    if(!keyCheck) return 
    
    return(
        <>
            <section id="project">
                <h2 className="hidden">프로젝트</h2>
                <CopyRight/>
                <ProjectBoard viewLength={10}/>
            </section>
        </>
    )
}

export default Project