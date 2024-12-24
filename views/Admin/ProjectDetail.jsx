import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

/** api */
import TOKEN from "../../js/token";
import PROJECT from "../../js/project";

/** component */
import AdminHeader from "../../component/Headers/AdminHeader";
import ProjectDetail from "../../component/DetailPage/ProjectDetail";

/** custom hook */
import useLoading from "../../hook/useLoading";





const AdminProjectDetail = () => {

    const navigation = useNavigate();

    const { itemKey } = useParams();

    const [item, setItem] = useState(null);

    const {IconElement, loadingShow, loadingHide} =  useLoading();

    function Setup(){
        loadingShow();
        PROJECT.searchItem(true, TOKEN.get(), itemKey)
        .then(rs => {
            if(rs["resultCode"] !== 200) return navigation("/error")

            setItem(rs["data"]);
            loadingHide();
        })
        .catch(err => {
            console.log("err",err)
        })        
    }

    useEffect(() => {
        Setup();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(!item) return

    return (
        <>
            <AdminHeader/>
            <section id="projectDetailPage">
                {
                    item ? 
                    <>
                        <h2 className="hidden">프로젝트 {item["projectName"]} 상세 페이지</h2>
            
                        <div className="inner">
                            {
                                item ?
                                <>
                            
                                    <ProjectDetail refetchCallback={Setup} isAdmin={true} item={item} />
                                </> : null
                            }
                        </div>   
                    </> : <IconElement/>
                }
            </section>
        </>
    )
}

export default AdminProjectDetail