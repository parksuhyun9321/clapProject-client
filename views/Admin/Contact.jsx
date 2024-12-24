/** custom hook */
import useVerify from "../../hook/useVerify";

/** component */
import AdminHeader from "../../component/Headers/AdminHeader";
import MessageList from "../../component/list/MessageList";

const AdminContact = () => {

    /** @type {boolean} true : 토큰 이 유효함 */
    const isVerify = useVerify()
    
    if(!isVerify) return

    return (
        <>
            <AdminHeader/>
            <section id="adminContact">
                <h2 className="hidden">나에게 온 메세지</h2>
                <MessageList viewLength={15}/>
            </section>
        </>
    )
}

export default AdminContact