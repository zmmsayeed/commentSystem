import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'

import { Form, Field } from 'react-final-form';
import validate from './validation'

import commentReducer from '../../reducers/commentReducer';
import { logoutTrigger, postPost, getPosts, editPostTrigger, postComment, getComments, editCommentTrigger } from '../../actions/index';

import './Dashboard.css'

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            userId: !props.commentReducer.response ? "" : props.commentReducer.response.data._id,
            userEmail: !props.commentReducer.response ? "" : props.commentReducer.response.data.email,
            repliedTo: null,
            posts: [],
            buttonText: "Post",
            textareaText: ""
        }
    }

    componentDidMount() {
        this.props.getPosts();
        this.props.getComments();
    }

    componentWillReceiveProps(props) {
        if (props.commentReducer.isFetched) {
            switch (props.commentReducer.action) {
                case 'POST_POST_RESPONSE':
                    if (props.commentReducer.postResponse.success) {
                        this.props.getPosts()
                    }
                    break;
                case 'POST_COMMENT_RESPONSE':
                    if (props.commentReducer.commentResponse.success) {
                        this.setState({ buttonText: "Post", textareaText: "" }, () => {
                            this.props.getComments()
                        })
                    }
                    break;
                case 'GET_POSTS_RESPONSE':
                    if (props.commentReducer.posts && props.commentReducer.posts.success) {
                        this.setState({ posts: props.commentReducer.posts.data })
                    }
                    break;

                case 'GET_COMMENTS_RESPONSE':
                    if (props.commentReducer.comments && props.commentReducer.comments.success) {
                        this.setState({ allComments: props.commentReducer.comments.data })
                    }
                    break;

                case 'EDIT_POST_RESPONSE':
                    if (props.commentReducer.res.success) {
                        this.setState({ buttonText: "Post", textareaText: "" }, () => {
                            this.props.getPosts();
                        })
                    }
                    break;

                case 'EDIT_COMMENT_RESPONSE':
                    if (props.commentReducer.res.success) {
                        this.setState({ buttonText: "Post", textareaText: "" }, () => {
                            this.props.getComments();
                        })
                    }
                    break;

                default:
                    break;
            }
        }
    }

    logOut = () => {
        this.props.logoutTrigger()
    }

    onClick = (value) => {
        this.myInp.focus()
        console.log(value)
        this.setState(value)
    }

    handleSubmit = (values) => {
        switch (this.state.buttonText) {
            case 'Post':
                this.props.postPost({
                    comment: values.comment,
                    commentedById: this.state.userId,
                    commentedByEmail: this.state.userEmail,
                    repliedTo: this.state.repliedTo,
                })
                break;

            case 'Update':
                this.props.editPostTrigger({
                    id: this.state.editPost._id,
                    fieldData: {
                        comment: values.comment
                    }
                })
                break;

            case 'Reply':
                this.props.postComment({
                    commentBody: values.comment,
                    commentedById: this.state.userId,
                    commentedByEmail: this.state.userEmail,
                    postId: this.state.editPost._id,
                })
                break;

            case "Update Comment":
                this.props.editCommentTrigger({
                    id: this.state.editPost._id,
                    fieldData: {
                        commentBody: values.comment
                    }
                })
                break;

            default:
                break;
        }

    }

    render() {
        if (!this.props.commentReducer.userLoggedIn) {
            this.props.history.push('/signIn')
        }
        return (
            <div className="container mt-3">

                <div className="row mt-2">
                    <div className="col-8 col-md-8">
                        <p><b>Welcome, {this.state.userEmail}</b></p>
                    </div>
                    <div className="col-4 col-md-4 text-right">
                        <p className="click" onClick={this.logOut}>Log Out</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 col-md8">
                        <p>
                            {
                                this.state.buttonText === "Post"
                                    ? "You are writing a new post:"
                                    : this.state.buttonText === "Update"
                                        ? "You are editing a post:"
                                        : "You are replying to post:"
                            }
                        </p>
                    </div>
                    <div className="col-4 col-md-4">
                        {
                            (this.state.buttonText === "Update" || this.state.buttonText === "Reply" || this.state.buttonText === "Update Comment")
                                ? <p className="click" onClick={() => this.onClick({ buttonText: "Post", textareaText: "", editPost: "" })}>Cancel</p>
                                : ""
                        }
                    </div>
                </div>

                {/* Post Box Code */}
                <Form onSubmit={this.handleSubmit}
                    validate={(values) => { return validate(values) }}
                    initialValues={{ comment: this.state.textareaText }}
                    render={({ handleSubmit, form, submitting, pristine, valid }) => (

                        <form onSubmit={handleSubmit}>
                            <div className="postBox">
                                <div className="row">
                                    <div className="col-9 col-md-9">
                                        <Field
                                            name="comment"
                                            placeholder='Start a conversation!'
                                        >
                                            {({ input, meta, placeholder }) => {
                                                let showToolTip = false
                                                if (meta.error && meta.visited && !meta.active) {
                                                    showToolTip = true
                                                }
                                                else {
                                                    showToolTip = false
                                                }
                                                return (
                                                    <>
                                                        <textarea {...input} className="customTextarea" placeholder={placeholder}
                                                            ref={(ip) => this.myInp = ip} required></textarea>
                                                        {showToolTip ? <small>{meta.error}</small> : ""}
                                                    </>
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <div className="col-3 col-md-3">
                                        <div className="rightDiv">
                                            <button type="submit" className="btn btn-warning">{this.state.buttonText}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                />
                {/* Post Box Code */}

                {/* Comment Section Code */}
                <div className="row mt-3">
                    <div className="col-md-12 col-12">

                        {
                            Array.isArray(this.state.posts)
                                ? this.state.posts.map((post) =>
                                    <div className="comment-box-wrapper" key={post._id}>
                                        <div className="comment-box">
                                            <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                            <div className="comment-content">
                                                <div className="commenter-head">
                                                    <span className="commenter-name">
                                                        <span>{post.commentedByEmail}</span>
                                                    </span>
                                                    <span className="comment-date">
                                                        <i className="far fa-clock"></i>{moment(post.timestamp).format("MMM DD, YYYY (hh:mm A)")}
                                                    </span>
                                                </div>
                                                <div className="comment-body">
                                                    <span className="comment">{post.comment}</span>
                                                </div>

                                                <div className="comment-footer">
                                                    <span className="comment-likes">
                                                        <span href="" className="comment-action active click" onClick={() => this.onClick({ buttonText: "Reply", textareaText: "", editPost: post })} >
                                                            <i className="fas fa-reply"></i> Reply</span>
                                                    </span>
                                                    {
                                                        (post.commentedById === this.state.userId)
                                                            ? (<span className="comment-reply">
                                                                <span href="" className="comment-action click" onClick={() => this.onClick({ buttonText: "Update", textareaText: post.comment, editPost: post })}>
                                                                    <i className="fas fa-edit"></i> Edit
                                                                </span>
                                                            </span>)
                                                            : ""
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                        {
                                            Array.isArray(this.state.allComments)
                                                ? this.state.allComments.filter(comment => {
                                                    return comment.postId === post._id
                                                }).map(com => {
                                                    return (
                                                        <div className="nested-comments" key={com._id}>
                                                            <div className="comment-box-wrapper">
                                                                <div className="comment-box">
                                                                    <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                                                    <div className="comment-content">
                                                                        <div className="commenter-head">
                                                                            <span className="commenter-name">
                                                                                <span>{com.commentedByEmail}</span>
                                                                            </span>
                                                                            <span className="comment-date">
                                                                                <i className="far fa-clock"></i>{moment(com.timestamp).format("MMM DD, YYYY (hh:mm A)")}
                                                                            </span>
                                                                        </div>
                                                                        <div className="comment-body">
                                                                            <span className="comment">{com.commentBody}</span>
                                                                        </div>
                                                                        <div className="comment-footer">
                                                                            {
                                                                                (com.commentedById === this.state.userId)
                                                                                    ? (<span className="comment-reply">
                                                                                        <span href="" className="comment-action click" onClick={() => this.onClick({ buttonText: "Update Comment", textareaText: com.commentBody, editPost: com })}>
                                                                                            <i className="fas fa-edit"></i> Edit
                                                                                        </span>
                                                                                    </span>)
                                                                                    : ""
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : ""
                                        }
                                    </div>
                                )
                                : ""
                        }
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutTrigger: (data) => {
            return dispatch(logoutTrigger(data))
        },
        postPost: (data) => {
            return dispatch(postPost(data))
        },
        getPosts: (data) => {
            return dispatch(getPosts(data))
        },
        editPostTrigger: (data) => {
            return dispatch(editPostTrigger(data))
        },
        postComment: (data) => {
            return dispatch(postComment(data))
        },
        getComments: (data) => {
            return dispatch(getComments(data))
        },
        editCommentTrigger: (data) => {
            return dispatch(editCommentTrigger(data))
        },
    };
}
Dashboard = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(Dashboard);


export default Dashboard;
