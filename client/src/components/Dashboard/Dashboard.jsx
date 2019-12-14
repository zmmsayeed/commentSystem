import React, { Component } from 'react'

import './Dashboard.css'

class Dahsboard extends Component {
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

            </div>
        )
    }
}

export default Dahsboard;
