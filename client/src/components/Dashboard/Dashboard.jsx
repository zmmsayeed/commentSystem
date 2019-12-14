import React, { Component } from 'react'

import './Dashboard.css'

class Dashboard extends Component {
    render() {
        return (
            <div className="container mt-3">

                {/* Post Box Code */}
                <div className="postBox">
                    <div className="row">
                        <div className="col-9 col-md-9">
                            <textarea className="customTextarea" placeholder="Start a conversation!"></textarea>
                        </div>
                        <div className="col-3 col-md-3">
                            <div className="rightDiv">
                                <button type="submit" className="btn-warning">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Post Box Code */}

                {/* Comment Section Code */}
                <div class="row mt-3">
                    <div class="col-md-12 col-12">
                        <div class="comment-box-wrapper">
                            <div class="comment-box">
                                <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" class="commenter-image" alt="commenter_image" />
                                <div class="comment-content">
                                    <div class="commenter-head"><span class="commenter-name"><a href="" >zmmsayeed@gmail.com</a></span> <span class="comment-date"><i class="far fa-clock"></i>2 days ago</span></div>
                                    <div class="comment-body">
                                        <span class="comment">This is comment content Here is nice comment And you are beautiful Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid debitis veritatis, eveniet deserunt eligendi asperiores. Architecto odit voluptatem, quos beatae voluptates quae voluptate enim provident commodi eaque quaerat aut quo!</span>
                                    </div>
                                    <div class="comment-footer">
                                        <span class="comment-likes"><a href="" class="comment-action active"> <i class="fas fa-reply"></i> Reply</a></span> <span class="comment-reply"><a href="" class="comment-action"><i class="fas fa-edit"></i> Edit </a></span>
                                    </div>


                                </div>
                            </div>
                            <div class="nested-comments">

                                <div class="comment-box-wrapper">
                                    <div class="comment-box">
                                        <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" class="commenter-image" alt="commenter_image" />
                                        <div class="comment-content">
                                            <div class="commenter-head"><span class="commenter-name"><a href="" >rafazameri@gmail.com</a></span> <span class="comment-date"><i class="far fa-clock"></i>2 days ago</span></div>
                                            <div class="comment-body">
                                                <span class="comment">This is comment content Here is nice comment</span>
                                            </div>
                                            <div class="comment-footer">
                                                <span class="comment-likes"><a href="" class="comment-action active"> <i class="fas fa-reply"></i> Reply</a></span> <span class="comment-reply"><a href="" class="comment-action"><i class="fas fa-edit"></i> Edit </a></span>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment-box-wrapper">
                            <div class="comment-box">
                                <img src="https://previews.123rf.com/images/malydesigner/malydesigner1410/malydesigner141000056/32278325-grunge-gray-background-texture.jpg" class="commenter-image" alt="commenter_image" />
                                <div class="comment-content">
                                    <div class="commenter-head"><span class="commenter-name"><a href="" >iamvrl@gmail.com</a></span> <span class="comment-date"><i class="far fa-clock"></i>2 days ago</span></div>
                                    <div class="comment-body">
                                        <span class="comment">This is comment content Here is nice comment</span>
                                    </div>
                                    <div class="comment-footer">
                                        <span class="comment-likes"><a href="" class="comment-action active"> <i class="fas fa-reply"></i> Reply</a></span> <span class="comment-reply"><a href="" class="comment-action"><i class="fas fa-edit"></i> Edit </a></span>
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

export default Dashboard;
