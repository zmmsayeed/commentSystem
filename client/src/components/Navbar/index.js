import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing reducder and actions
import commentReducer from '../../reducers/commentReducer';
import { logoutTrigger } from '../../actions/index';

// importing stylesheet
import './style.css';

class Navbar extends Component {

    logOut = () => {
        this.props.logoutTrigger()
    }

    render() {
        let { user } = this.props;

        return (
            <div className="container-fluid">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <span class="navbar-brand" href="#">
                            <img src="/logo.png" width="150px" alt="Comment System" />
                        </span>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto ml-md-4">
                                <li class="nav-item nav-link active">
                                    <b>Welcome, {!user ? "" : user}</b>
                                </li>
                            </ul>
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active nav-link click" onClick={this.logOut}>
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutTrigger: (data) => {
            return dispatch(logoutTrigger(data))
        },
    };
}
Navbar = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(Navbar);


export default Navbar;

