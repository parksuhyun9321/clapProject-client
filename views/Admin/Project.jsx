/** custom hook */
import useVerify from "../../hook/useVerify";

/** component */
import AdminHeader from "../../component/Headers/AdminHeader"
import ProjectBoard from "../../component/list/ProjectList.board"

const AdminProject = () => {

    const isVerify = useVerify()
    

    if(!isVerify) return

    return (
        <>
            <AdminHeader/>
            <section id="adminProject">
                <h2 className="hidden">프로젝트 관리</h2>
                <ProjectBoard viewLength={10} isAdmin={true} />
            </section>
        </>
    )
}

export default AdminProject