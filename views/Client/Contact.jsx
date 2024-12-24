
/** component */
import ContactContents from "../../component/ContactContents"

/** custom hook */
import useKeyCheck from "../../hook/useKeyCheck";

const Contact = () => {

    const keyCheck = useKeyCheck();

    if(!keyCheck) return 
    
    return (
        <section id="contact" >
            <h2 className="hidden">메세지 보내기</h2>
            <div className="txtBox">
                <p>
                    보내고 싶은 내용을 입력해 보내주세요.
                     <span>* 모든 입력란을 입력해주세요.</span>
                </p>
            </div>
            <ContactContents/>
        </section>
    )
}

export default Contact