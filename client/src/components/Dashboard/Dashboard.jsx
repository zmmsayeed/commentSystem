import React, { Component } from 'react'
import { connect } from 'react-redux';

import commentReducer from '../../reducers/commentReducer';
import { logoutTrigger } from '../../actions/index';

import './Dashboard.css'

class Dashboard extends Component {

    // constructor(props) {
    //     super(props);
    // }

    logOut = () => {
        this.props.logoutTrigger()
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
                <div className="postBox">
                    <div className="row">
                        <div className="col-9 col-md-9">
                            <textarea className="customTextarea" placeholder="Start a conversation!"></textarea>
                        </div>
                        <div className="col-3 col-md-3">
                            <div className="rightDiv">
                                <button type="submit" className="btn btn-warning">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Post Box Code */}

                {/* Comment Section Code */}
                <div className="row mt-3">
                    <div className="col-md-12 col-12">
                        <div className="comment-box-wrapper">
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
                        </div>
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
        }
    };
}
Dashboard = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(Dashboard);


export default Dashboard;
