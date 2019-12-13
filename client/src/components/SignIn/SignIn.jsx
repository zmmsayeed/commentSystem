import React from 'react';

import { connect } from 'react-redux';

import commentReducer from '../../reducers/commentReducer';
import { callApi } from '../../actions/index';

import { Form, Field } from 'react-final-form';
import validate from './validation'

import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
    }

    handleSubmit = (values) => {
        console.log(values)
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
                                        <img class="mb-4" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="" width="72" height="72" />
                                        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                                    </div>

                                    <div class="form-group">
                                        <label for="email">Email address</label>
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
                                    <div class="form-group">
                                        <label for="password">Password</label>
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
                                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                    <div className="text-center">
                                        <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
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
        propsToCallApi: (data) => {
            return dispatch(callApi(data)) // this function will come from action file
        }
    };
}
SignIn = connect(
    (state, action) => (
        commentReducer(state, action)),
    mapDispatchToProps,
)(SignIn);


export default SignIn;
