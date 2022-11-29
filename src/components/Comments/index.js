import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentDetailsList: [],
    name: '',
    comment: '',
    commentCount: 0,
  }

  onChangeUpdateName = event => {
    this.setState({name: event.target.value})
  }

  onChangeUpdateComment = event => {
    this.setState({comment: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    if (name !== '' && comment !== '') {
      let username = name
      username = username[0].toUpperCase().concat(username.slice(1))

      const bgColorListLength = initialContainerBackgroundClassNames.length
      const iconBGColor =
        initialContainerBackgroundClassNames[
          Math.ceil(Math.random() * bgColorListLength - 1)
        ]

      const newComment = {
        id: uuidv4(),
        name: username,
        comment,
        iconBGColor,
        time: formatDistanceToNow(new Date()),
        isLiked: false,
      }

      this.setState(prevState => ({
        commentDetailsList: [...prevState.commentDetailsList, newComment],
        name: '',
        comment: '',
        commentCount: prevState.commentCount + 1,
      }))
      console.log(newComment)
    }
    console.log('empty nothing')
  }

  onClickChangeLikeComment = commentId => {
    this.setState(prevState => ({
      commentDetailsList: prevState.commentDetailsList.map(eachComment => {
        if (eachComment.id === commentId) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onClickDeleteComment = commentId => {
    this.setState(prevState => ({
      commentDetailsList: prevState.commentDetailsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
      commentCount: prevState.commentCount - 1,
    }))
  }

  render() {
    const {commentDetailsList, name, comment, commentCount} = this.state

    const mainEle = (
      <div className="mainBgContainer">
        <div className="commentBgContainer">
          <h1 className="commentHeader">Comments</h1>
          <div className="inputImgContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="commentImg"
            />
            <div className="formContainer">
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <form>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="nameBox"
                  value={name}
                  onChange={this.onChangeUpdateName}
                />
                <textarea
                  rows="8"
                  type="text"
                  placeholder="Your Comment"
                  className="commentBox"
                  value={comment}
                  onChange={this.onChangeUpdateComment}
                />
                <button
                  type="button"
                  className="addBtn"
                  onClick={this.onClickAddComment}
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <hr className="separator" />
          <div className="commentContainer">
            <p className="commentCount">{commentCount}</p>
            <p className="commentName">Comments</p>
          </div>

          <ul className="commentBgContainer">
            {commentDetailsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                onClickChangeLikeComment={this.onClickChangeLikeComment}
                onClickDeleteComment={this.onClickDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )

    return mainEle
  }
}

export default Comments
