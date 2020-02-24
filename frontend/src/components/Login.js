import React,{Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

class Login extends Component{
	constructor(props){
		super(props)
		this.PasswordChange = this.PasswordChange.bind(this)
		this.UsernameChange = this.UsernameChange.bind(this)
		this.MakeLogin = this.MakeLogin.bind(this)
		this.LoginFormSubmit = this.LoginFormSubmit.bind(this)
		this.UpdateToken = this.UpdateToken.bind(this)
		this.state={
			username:'',
			password:'',
			isAuth:false
		}
	}
	MakeLogin(data){
		const endpoint = '/api/login'
		let formdata = new FormData(data)
		let options ={
			method:'POST',
			body:formdata,
		}
		fetch(endpoint,options)
		.then(response => response.json())
		.then(responseData =>{
			localStorage.setItem('token',responseData.token)
			this.UpdateToken()
		})
		.catch(error => console.log('Error: ' + error))
	}
	LoginFormSubmit(event){
		event.preventDefault()
		this.MakeLogin(event.target)
	}
	PasswordChange(event){
		this.setState({password:event.target.value})
	}
	UsernameChange(event){
		this.setState({username:event.target.value})
	}
	UpdateToken(){
		this.setState({isAuth: localStorage.token ? true:false})
	}
	render(){
		return(
			<Route exact path="/r/login">
				{this.state.isAuth ? (<Redirect to="/r"/>) : (
					<div className="container-fluid" id="LoginContainer">
						<div className="row">
							<div className="col-12" id="LoginForm">
			                    <h1 className="font-weight-bold">LOGIN</h1>
			                    <form onSubmit={this.LoginFormSubmit}>
			                        <div className="form-group">
			                            <input type="text" name="username" className="form-control" placeholder="Your Email *" onChange={this.UsernameChange} value={this.state.username} />
			                        </div>
			                        <div className="form-group">
			                            <input type="password" name="password" className="form-control" placeholder="Your Password *" onChange={this.PasswordChange} value={this.state.password} />
			                        </div>
			                        <div className="form-group">
			                            <button type="submit" className="btn btn-primary">Submit</button>
			                        </div>
			                    </form>
		                	</div>	
						</div>
					</div>
				)}
			</Route>
		);
	}
}

export default Login;