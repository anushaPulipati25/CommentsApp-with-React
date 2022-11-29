import './index.css'

const CommentItem = props => {
  const {commentDetails, onClickChangeLikeComment, onClickDeleteComment} = props
  const {id, name, comment, time, isLiked} = commentDetails

  const likeCommentText = isLiked ? 'Liked' : 'Like'
  const likeClassName = isLiked ? 'likedText' : 'likeText'
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const changeLikeComment = () => {
    onClickChangeLikeComment(id)
  }

  const deleteComment = () => {
    onClickDeleteComment(id)
  }

  const mainEle = (
    <li>
      <div className="nameCommentContainer">
        <div className="nameTimeContainer">
          <p className="icon">{name[0]}</p>
          <h1 className="username">{name}</h1>
          <p className="duration">{time}</p>
        </div>
        <p className="commentDescription">{comment}</p>
      </div>
      <div className="deleteContainer">
        <div className="likeImgContainer">
          <img src={likeImgUrl} alt="like" className="likeImg" />
          <button
            type="button"
            className={`button ${likeClassName}`}
            onClick={changeLikeComment}
          >
            {likeCommentText}
          </button>
        </div>
        <button type="button" className="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="deleteIcon"
            onClick={deleteComment}
          />
        </button>
      </div>
      <hr className="separator" />
    </li>
  )

  return mainEle
}

export default CommentItem
