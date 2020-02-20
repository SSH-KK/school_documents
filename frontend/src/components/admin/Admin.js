import React, {Component} from 'react'
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'
import AdminLoginForm from './AdminLogin'

class Admin extends Component {
	constructor(props) {
		super(props);
    }

	render () {
		return(
            <Switch>
				{this.props.isAdmin ? "U R admin" : <Redirect to="/r/admin/login" /> }
                <Route exact path={this.props.path} />
				<Route path={'/r/admin/login/'} render={
					() => <AdminLoginForm isAdmin={this.props.isAdmin} />
				} />
            </Switch>
		);
	}
}
export default Admin;