import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class AdminLoginForm extends Component {
	constructor(props) {
        super(props);
        console.log("Hi");
		this.state = {
			login: '',
			password: '',
		};
    }

    handleLoginChange (e) {
        this.setState({
            login: e.target.value,
        });
    }
    handlePasswordChange (e) {
        this.setState({
            password: e.target.value,
        });
    }

    login (e) {
        e.preventDefault();
        const data = e.target;
        let credits = new FormData();
        credits.append("username", data[0].value);
        credits.append("password", data[1].value);
        fetch("/api/login", {
            method: 'POST',
            body: credits,
            redirect: 'follow',
        })
        .then(response => response.json())
        .then(result => {
            console.log(data[2].value);
            data[2].value ? localStorage.setItem('token', result.token) : {};
        });
    }

	render () {
		return(
            <div>
                {this.props.isAdmin ? '' : (
                    <form onSubmit={this.login}>
                        <input type="text" />
                        <input type="password" />
                        <input type="checkbox">Не сохранять вход?</input>
                        <input type="submit" />
                    </form>
                ) } 
            </div>
		);
	}
}
export default AdminLoginForm;