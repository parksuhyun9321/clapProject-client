import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

/** api */
import PROJECT from "../../js/project";

/** component */
import ProjectDetail from "../../component/DetailPage/ProjectDetail";

/** custom hook */
import useLoading from "../../hook/useLoading";
import useKeyCheck from "../../hook/useKeyCheck";

const ClientProjectDetail = () => {

    const navigation = useNavigate();

    const { itemKey, key } = useParams();

    const [item, setItem] = useState();

    const {IconElement, loadingShow, loadingHide} =  useLoading();
    
    useEffect(() => {
        loadingShow();

        PROJECT.searchItem(false, key, itemKey)
        .then(rs => {
            if(rs["resultCode"] !== 200) return navigation("/error")

            setItem(rs["data"]);
            loadingHide();
        })
        .catch(err => {
            console.log("err",err)
        })
        // eslint-disable-next-line
    },[])

    const keyCheck = useKeyCheck();

    if(!keyCheck) return 

    return (
        <section id="projectDetailPage">
            
            {
                item ? <>
                    <h2 className="hidden">프로젝트 {item["projectName"]} 상세 페이지</h2>
                    
                    <div className="inner">
                        {
                            item ?
                            <>
                                <h2 className="hidden">프로젝트 {item["projectName"]} 상세 페이지</h2>
                                <ProjectDetail item={item} />
                            </> : null
                        
                        }
                    </div>
                </> : <IconElement/>
            }

        </section>
    )
}

export default ClientProjectDetail