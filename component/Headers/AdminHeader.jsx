import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/** img */
import logoImg from "../../img/logo.svg";

/** component */
import AdminSideNav from "../../component/Nav/AdminSideNav";
import AdminTopNav from "../../component/Nav/AdminTopNav"

/** custom hook */
import useToast from "../../hook/useToast";

/** api */
import ACCOUNT from "../../js/account";
import TOKEN from "../../js/token";

const AdminHeader = () => {
    const [isMenu, setIsMenu] = useState(false);

    const navigation = useNavigate();

    const { ToastAdminHeader, setToastStatus } = useToast();

    function menuToggle() {
        setIsMenu(isMenu ? false : true);
    }

    function Logout(){ setToastStatus("logout") }

    function Withdrawal() { setToastStatus("withdrawal") }

    function NaviToLoginCallback(){ navigation("/account/login") }

    /**
     * 
     * @param {boolean} is true : 성공 
     */
    function IsCopyLinkToast(is) {
        setToastStatus(`link copy ${is ? "success" : "fail"}`)
    }

    function LogoutCallback(){
        ACCOUNT.logout(TOKEN.get())
        .then(() => {
            TOKEN.remove();
            navigation("/account/login");
        })
        .catch(err => {
            setToastStatus("service err")
        })
    }

    function WithdrawalCallback(){
        
        ACCOUNT.withdrawal(TOKEN.get())
        .then(rs => {
            
            if(rs["resultCode"] !== 200) return setToastStatus("withdrawal fail");

            TOKEN.remove();
            setToastStatus("withdrawal success");
        })
        .catch(err => {
            setToastStatus("service err")
        })
    }

    
    
    return (
        <>
            <header id="adminHeader" className={`header ${isMenu ? "on" : ""}`}> 
                <div className="inner">
                    <h1 className="logo">
                        <Link to={"/admin"}>
                            <img src={logoImg} alt="로고" />
                        </Link>
                    </h1>

                    <nav className="adminNavBox">
                        <AdminTopNav/>
                    </nav>     
                    
                    <button onClick={menuToggle} className={`btnMenu ${isMenu ? "on" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className={`navBox admin ${isMenu ? "show" : ""}`}>
                    <AdminSideNav menuCallback={menuToggle} logoutConfirmCallback={Logout} withdrawalConfirmCallback={Withdrawal} isCopyCallback={IsCopyLinkToast}/>
                </div>
            </header>

            <ToastAdminHeader logoutCallback={LogoutCallback} withdrawalCallback={WithdrawalCallback} naviToLoginCallback={NaviToLoginCallback} />
        </>
    )
}

export default AdminHeader