import React from 'react';
import bcrypt from 'bcryptjs'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import commentReducer from '../../reducers/commentReducer';
import { registerUserTrigger } from '../../actions/index';

import { Form, Field } from 'react-final-form';
import validate from './validation'

import './Register.css';

let dispatchHandler = {}

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ""
        }

        dispatchHandler = this.props.registerUserTrigger
    }

    componentWillReceiveProps(props) {
        if (props.commentReducer.isFetched) {
            switch (props.commentReducer.action) {
                case 'REGISTER_USER_RESPONSE':
                    if (props.commentReducer.response.success) {
                        this.props.history.push('/dashboard')
                    }
                    else {
                        this.setState({ error: props.commentReducer.response.message })
                    }
                    break;

                default:
                    break;
            }
        }
    }

    handleSubmit = (values) => {

        let password = values.password;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                dispatchHandler({
                    email: values.email,
                    password: hash,
                })
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4 offset-md-4">

                        <Form onSubmit={this.handleSubmit}
                            validate={(values) => { return validate(values) }}
                            render={({ handleSubmit, form, submitting, pristine, valid }) => (

                                <form onSubmit={handleSubmit}>
                                    <div className="text-center">
                                        <img className="mb-4" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="" width="72" height="72" />
                                        <h1 className="h3 mb-3 font-weight-normal">User Registration</h1>
                                    </div>

                                    <p className="error">{this.state.error}</p>

                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <Field
                                            name="email"
                                            placeholder='Enter your email'
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
                                                        <input {...input} type="email" placeholder={placeholder} className="form-control" />
                                                        {showToolTip ? <small>{meta.error}</small> : ""}
                                                    </>
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            name="password"
                                            placeholder='Enter your password'
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
                                                        <input {...input} type="password" placeholder={placeholder} className="form-control" />
                                                        {showToolTip ? <small>{meta.error}</small> : ""}
                                                    </>
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm Password</label>
                                        <Field
                                            name="confirmPassword"
                                            placeholder='Enter your password again'
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
                                                        <input {...input} type="password" placeholder={placeholder} className="form-control" />
                                                        {showToolTip ? <small>{meta.error}</small> : ""}
                                                    </>
                                                )
                                            }}
                                        </Field>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={submitting || !valid}>Register</button>
                                    <div className="text-center">
                                        <p className="mb-5 mt-5">
                                            Already a User?
                                            <Link to="/singIn"> Sign In.</Link>
                                        </p>
                                        <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUserTrigger: (data) => {
            return dispatch(registerUserTrigger(data))
        }
    };
}

Register = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(Register);


export default Register;
