import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SignIn from './SignIn/SignIn'

class Main extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/SignIn" />
                    </Route>
                    <Route path="/SignIn" exact component={SignIn} />
                </Switch>
            </main>
        )
    }
}

export default Main;