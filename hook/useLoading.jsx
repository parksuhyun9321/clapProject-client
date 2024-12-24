import { useState } from "react";
import LoadingView from "../component/loadingIcon"

const useLoading = () => {

    /** @type {boolean} true : 로딩화면 활성화, false : 로딩화면 비활성화 */
    const [isLoading, setLoading] = useState(false);

    /** @type {function} 로딩 화면 활성화 */
    const loadingShow = () => setLoading(true);

    /** @type {function} 로딩 화면 비활성화 */
    const loadingHide = () => setLoading(false);

    /** @type {component || null} 로딩 화면 컴포넌트 */
    const IconElement = ({isColor, defaultShow}) => {
        if(defaultShow) {
            return <LoadingView isColor={isColor}/>
        }
        else {
            return isLoading ? <LoadingView isColor={isColor} /> : null   
        }
        
    };
    
    return { loadingShow, loadingHide, IconElement }
}

export default useLoading