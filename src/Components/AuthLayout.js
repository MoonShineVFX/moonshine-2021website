import React from 'react'
import { Route, Switch} from 'react-router-dom';

//page
import Login from './Login';

function AuthLayout() {
  return (
    <div className="dashboard container-fluid">
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </div>
  )
}

export default AuthLayout
