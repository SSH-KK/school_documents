import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class AdminLoginForm extends Component {
	constructor(props) {
        super(props);
        this.login = this.login.bind(this);
		this.state = {
            errors: ''
		};
    }

    login (e) {
        e.preventDefault();
        const data = e.target;
        let credits = new FormData();
        credits.append('username', data[0].value);
        credits.append('password', data[1].value);
        fetch('/api/login', {
            method: 'POST',
            body: credits,
        })
        .then(response => response.json())
        .then(result => {
            if (result.non_field_errors) {
                this.setState({
                    errors: 'Неправильные имя пользователся или пароль.',
                })
            } else {
                localStorage.setItem('token', result.token);
                this.props.renewToken();
            }
        })
        .catch(error => console.log('Error: ' + error));
    }

	render () {
        console.log(this.props.adminToken);
		return(
            <div>
                {this.props.adminToken ? <Redirect to="/r/admin" /> : (
                    <form onSubmit={this.login}>
                        <input type='text' />
                        <input type='password' />
                        <input type='submit' value="Вход" />
                        <br/>
                        {this.state.errors}
                    </form>
                ) } 
            </div>
		);
	}
}
export default AdminLoginForm;