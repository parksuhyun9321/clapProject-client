const TextAreaContents = ({data,textAreaCallback}) => {
    return (
        <li>
            <label>Contents</label>
            <textarea defaultValue={data} id="contentsArea" className="contentsArea" onInput={textAreaCallback}></textarea>
        </li>
    )
}

export default TextAreaContents