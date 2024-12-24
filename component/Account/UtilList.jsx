import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom"

const UtilList = memo(() => {

    
    const location = useLocation();

    const listItems = [
        {
            title : "로그인",
            link : "/account/login"
        },
        {
            title : "아이디 찾기",
            link : "/account/idSearch"
        },
        {
            title : "비밀번호 찾기",
            link : "/account/pwSearch"
        },
        {
            title : "회원가입",
            link : "/account/register"
        }
    ];

    
    const [list, setList] = useState([]);
    
    useEffect(() => {

        setList(arr => {
            let newArr = [...arr];
            
            if(location.pathname === "/account/login") {
                newArr = [
                    listItems[1],
                    listItems[2],
                    listItems[3],
                ]
            }
            else if(location.pathname === "/account/idSearch"){
                newArr = [
                    listItems[0],
                    listItems[2],
                    listItems[3],
                ]
            }
            else if(location.pathname === "/account/pwSearch") {
                newArr = [
                    listItems[0],
                    listItems[1],
                    listItems[3],
                ]
            }
            return newArr
        },location.pathname);
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <ul className="accountUtilList">
            {
                list.map((item, idx) => {
                    return (
                        <li key={idx}>
                            <Link to={item.link}>{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
})

export default UtilList