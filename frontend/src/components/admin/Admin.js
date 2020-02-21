import React, {Component} from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import AdminLoginForm from './AdminLogin'
import UploadImageForm from './UploadImage'

class Admin extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.renewToken = this.renewToken.bind(this);
		this.state = {
			adminToken: localStorage.getItem('token'),
		}
    }
	logout () {
		localStorage.removeItem('token');
		let myHeaders = new Headers();
		myHeaders.append("Authorization", `Token ${this.state.adminToken}`);
		fetch("/api/logout", {
			method: 'POST',
  			headers: myHeaders,
		}).then(response => {
			if (!response.ok) {
				console.log("error", response.json().then(result => result));
			} else {
				this.renewToken();
			}
		});
	}
	renewToken () {
		this.setState({
			adminToken: localStorage.getItem('token'),
		});
	}
	render () {
		return(
			<div>
				{ this.state.adminToken ? <button onClick={this.logout}>Выход</button> : '' }
				<Switch>
                	<Route exact path={this.props.path} adminToken={this.state.adminToken} render={
						() => <UploadImageForm adminToken={this.state.adminToken} />
					} />
					<Route path={'/r/admin/login/'} render={
						() => <AdminLoginForm renewToken={this.renewToken} adminToken={this.state.adminToken} />
					} />
            	</Switch>
			</div>
		);
	}
}
export default Admin;