import '../css/ContentGroup.css'

const contentThumbnail = (titleText, titleTag, onclickHandler, key)=>(
    <button id='thumbnailButton' onClick={() => onclickHandler(key)}>
        <div className="title-text">{titleText}</div>
        <div className="tags-text">{titleTag}</div>
    </button>
)

export default contentThumbnail;