import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SignIn from './SignIn/SignIn'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'

class Main extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/signIn" />
                    </Route>
                    <Route path="/signIn" exact component={SignIn} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/dashboard" exact component={Dashboard} />
                </Switch>
            </main>
        )
    }
}

export default Main;