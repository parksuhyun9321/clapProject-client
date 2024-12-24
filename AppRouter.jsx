import { createBrowserRouter } from "react-router-dom";

/** 클라이언트 */
import IndexClient from "./views/Index.Client";
import Home from "./views/Client/Home"
import About from "./views/Client/About"
import Project from "./views/Client/Project"
import ClientProjectDetail from "./views/Client/ProjectDetail";
import Contact from "./views/Client/Contact"

/** 관리자 */
import IndexAdmin from "./views/Index.Admin";
import AdminMyInfo from "./views/Admin/MyInfo";
import AdminProject from "./views/Admin/Project";
import AdminProjectDetail from "./views/Admin/ProjectDetail";
import AdminContact from "./views/Admin/Contact";

/** 로그인, 회원가입, 아이디 찾기, 비밀번호 찾기 */
import IndexAccount from "./views/Index.Account";
import Login from "./views/Account/Login";
import Register from "./views/Account/Register";
import IdSearch from "./views/Account/IdSearch";
import PwSearch from "./views/Account/PwSearch";

/** 에러 페이지 */
import ErrorView from "./views/ErrorView";

/** 체험하기 */
import Experience from "./views/Experience";

/** loader */
import ClientLoader from "./loader/ClientLoader";
import AdminLoader from "./loader/AdminLoader";
import AccountLoader from "./loader/AccountLoader"







const Router = createBrowserRouter(
    [
        {
            name : "clinet", 
            path:"/:key",
            element : <IndexClient/>,
            HydrateFallback : () => {
                        
            },
            children : [
                {
                    name :"home",
                    path:"",
                    element : <Home/>,                    
                    loader : ClientLoader,
                },
                {
                    name :"about",
                    path:"about",
                    element : <About/>,
                    loader : ClientLoader,
                    
                },
                {
                    name :"project",
                    path:"project",
                    children:[
                        {
                            name : "projectList",
                            path:"",
                            element : <Project/>,
                            loader : ClientLoader,
                        },
                        {
                            name : "projectDetail",
                            path : ":itemKey",
                           element : <ClientProjectDetail/>,
                           loader : ClientLoader,
                        }
                    ],
                },
                {
                    name :"contact",
                    path:"contact",
                    element : <Contact/>,
                    loader : ClientLoader,
                }
            ]
        }, 
        {
            name : "admin",
            path:"",
            element : <IndexAdmin/>,
            children : [
                {
                    name :"myInfo",
                    path:"",
                    element : <AdminMyInfo/>,
                    HydrateFallback : () => {
                        
                    },
                    loader:AdminLoader,
                },
                {
                    name :"project",
                    path:"project",
                    children : [
                        {
                            name:"projectList",
                            path:"",
                            element : <AdminProject/>,
                            HydrateFallback : () => {
                        
                            },
                            loader:AdminLoader,
                        },
                        {
                            name:"projectDetail",
                            path:":itemKey",
                            element : <AdminProjectDetail/>,
                            HydrateFallback : () => {
                        
                            },
                            loader:AdminLoader,
                        }
                    ]
                },
                {
                    name:"contact",
                    path:"contact",
                    element : <AdminContact/>,
                    HydrateFallback : () => {
                        
                    },
                    loader:AdminLoader,
                }
            ]
        },
        {
            name : "account",
            path : "/account",
            element : <IndexAccount/>,
            loader : AccountLoader,
            HydrateFallback : () => {
                        
            },
            children : [
                {
                    name : "login",
                    path : "login",
                    element : <Login/>,
                },
                {
                    name : "register",
                    path : "register",
                    element : <Register/>,
                },
                {
                    name : "idSearch",
                    path:"idSearch",
                    element : <IdSearch/>,
                },
                {
                    name : "pwSearch",
                    path:"pwSearch",
                    element : <PwSearch/>,
                }
            ]
        },
        {
            path:"experience",
            element: <Experience/>,
        },
        {
            path:"errorPage",
            element:<ErrorView/>
            
        }
    ],
    {
        future : {
            v7_startTransition : true,
            v7_fetcherPersist : true,
            v7_normalizeFormMethod : true,
            v7_skipActionErrorRevalidation : true,
            v7_relativeSplatPath : true,
            v7_partialHydration : true,
            HydrateFallback : false,
        }
    }
)

export default Router