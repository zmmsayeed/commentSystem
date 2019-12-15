import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';
import validate from './validation'

import commentReducer from '../../reducers/commentReducer';
import { logoutTrigger, postPost, getPosts, editPostTrigger } from '../../actions/index';

import './Dashboard.css'

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            userId: !props.commentReducer.response.data ? "" : props.commentReducer.response.data._id,
            userEmail: !props.commentReducer.response.data ? "" : props.commentReducer.response.data.email,
            repliedTo: null,
            posts: [],
            buttonText: "Post",
            textareaText: ""
        }
    }

    componentDidMount() {
        this.props.getPosts()
    }

    componentWillReceiveProps(props) {
        if (props.commentReducer.isFetched) {
            switch (props.commentReducer.action) {
                case 'GET_POSTS_RESPONSE':
                    if (props.commentReducer.posts && props.commentReducer.posts.success) {
                        this.setState({ posts: props.commentReducer.posts.data })
                    }
                    break;

                case 'EDIT_POST_RESPONSE':
                    if (props.commentReducer.res.success) {
                        this.setState({ buttonText: "Post", textareaText: "" }, () => {
                            this.props.getPosts();
                        })
                    }

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
                    <div className="col-12 col-md-12 text-right">
                        <p className="click" onClick={this.logOut}>Log Out</p>
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
                                                        <a href="">{post.commentedByEmail}</a>
                                                    </span>
                                                    <span className="comment-date">
                                                        <i className="far fa-clock"></i>2 days ago
                                                    </span>
                                                </div>
                                                <div className="comment-body">
                                                    <span className="comment">{post.comment}</span>
                                                </div>
                                                <div className="comment-footer">
                                                    <span className="comment-likes">
                                                        <span href="" className="comment-action active" onClick={() => this.onClick({ buttonText: "Reply", textareaText: "", editPost: post })} >
                                                            <i className="fas fa-reply"></i> Reply</span>
                                                    </span>
                                                    <span className="comment-reply">
                                                        <span href="" className="comment-action" onClick={() => this.onClick({ buttonText: "Update", textareaText: post.comment, editPost: post })}>
                                                            <i className="fas fa-edit"></i> Edit
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="nested-comments">

                                            <div className="comment-box-wrapper">
                                                <div className="comment-box">
                                                    <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                                    <div className="comment-content">
                                                        <div className="commenter-head"><span className="commenter-name"><a href="" >rafazameri@gmail.com</a></span> <span className="comment-date"><i className="far fa-clock"></i>2 days ago</span></div>
                                                        <div className="comment-body">
                                                            <span className="comment">This is comment content Here is nice comment Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque aliquam quibusdam veniam eaque laboriosam, hic vel consequatur harum excepturi molestias a debitis saepe veritatis error rem unde enim corrupti? Earum. lorem</span>
                                                        </div>
                                                        <div className="comment-footer">
                                                            <span className="comment-likes"><a href="" className="comment-action active"> <i className="fas fa-reply"></i> Reply</a></span> <span className="comment-reply"><a href="" className="comment-action"><i className="fas fa-edit"></i> Edit </a></span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                )
                                : ""
                        }

                        {/* <div className="comment-box-wrapper">
                            <div className="comment-box">
                                <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                <div className="comment-content">
                                    <div className="commenter-head"><span className="commenter-name"><a href="" >zmmsayeed@gmail.com</a></span> <span className="comment-date"><i className="far fa-clock"></i>2 days ago</span></div>
                                    <div className="comment-body">
                                        <span className="comment">This is comment content Here is nice comment And you are beautiful Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid debitis veritatis, eveniet deserunt eligendi asperiores. Architecto odit voluptatem, quos beatae voluptates quae voluptate enim provident commodi eaque quaerat aut quo!</span>
                                    </div>
                                    <div className="comment-footer">
                                        <span className="comment-likes"><a href="" className="comment-action active"> <i className="fas fa-reply"></i> Reply</a></span> <span className="comment-reply"><a href="" className="comment-action"><i className="fas fa-edit"></i> Edit </a></span>
                                    </div>


                                </div>
                            </div>
                            <div className="nested-comments">

                                <div className="comment-box-wrapper">
                                    <div className="comment-box">
                                        <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                        <div className="comment-content">
                                            <div className="commenter-head"><span className="commenter-name"><a href="" >rafazameri@gmail.com</a></span> <span className="comment-date"><i className="far fa-clock"></i>2 days ago</span></div>
                                            <div className="comment-body">
                                                <span className="comment">This is comment content Here is nice comment Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque aliquam quibusdam veniam eaque laboriosam, hic vel consequatur harum excepturi molestias a debitis saepe veritatis error rem unde enim corrupti? Earum. lorem</span>
                                            </div>
                                            <div className="comment-footer">
                                                <span className="comment-likes"><a href="" className="comment-action active"> <i className="fas fa-reply"></i> Reply</a></span> <span className="comment-reply"><a href="" className="comment-action"><i className="fas fa-edit"></i> Edit </a></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-box-wrapper">
                            <div className="comment-box">
                                <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" className="commenter-image" alt="commenter_image" />
                                <div className="comment-content">
                                    <div className="commenter-head"><span className="commenter-name"><a href="" >iamvrl@gmail.com</a></span> <span className="comment-date"><i className="far fa-clock"></i>2 days ago</span></div>
                                    <div className="comment-body">
                                        <span className="comment">This is comment content Here is nice comment Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis magni architecto veritatis laborum porro a magnam at ipsum hic, cumque quo aut quos non sed odit quas nemo ipsam voluptas?</span>
                                    </div>
                                    <div className="comment-footer">
                                        <span className="comment-likes"><a href="" className="comment-action active"> <i className="fas fa-reply"></i> Reply</a></span> <span className="comment-reply"><a href="" className="comment-action"><i className="fas fa-edit"></i> Edit </a></span>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
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
    };
}
Dashboard = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(Dashboard);


export default Dashboard;
