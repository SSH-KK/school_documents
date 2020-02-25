import React,{Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

class Login extends Component{
	constructor(props){
		super(props)
		this.FormsChange = this.FormsChange.bind(this)
		this.MakeLogin = this.MakeLogin.bind(this)
		this.state={
			username:'',
			password:'',
			errors:false,
		}
	}
	MakeLogin(event){
		event.preventDefault()
		const endpoint = '/api/login'
		let formdata = new FormData(event.target)
		let options = {
			method:'POST',
			body:formdata,
		}
		fetch(endpoint,options)
		.then(response => {	
			if(response.ok){
				response.json().then(responseData =>{
					localStorage.setItem('token',responseData.token)
					this.props.UpdateToken()
					})
					.catch(error => console.log('Error: ' + error))
			}
			else{
				this.setState({errors:true})
			}
		})
	}
	FormsChange(event){
		event.preventDefault()
		this.setState({
			[event.target.name]:event.target.value
		})
		this.setState({errors:false})
	}
	render(){
		return(
			this.props.isAuth ? (<Redirect to="/r"/>) : (
				<div className="container-fluid" id="AuthContainer">
					<div className="row">
						<div className="col-12" id="AuthForm">
			                <h1 className="font-weight-bold">LOGIN</h1>
			                <form onSubmit={this.MakeLogin}>
			                    <div className="form-group">
			                    	<input type="text" name="username" className={`form-control ${this.state.errors ? 'is-invalid':''}`} placeholder="Your Email *" onChange={this.FormsChange} value={this.state.username} />
			                    	<div className="invalid-feedback">Incorrect username</div>
			                    </div>
			                    <div className="form-group">
			                    	<input type="password" name="password" className={`form-control ${this.state.errors ? 'is-invalid':''}`} placeholder="Your Password *" onChange={this.FormsChange} value={this.state.password} />
			                    	<div className="invalid-feedback">Incorrect password</div>
			                    </div>
			                    <div className="form-group">
		                           <button type="submit" className="btn btn-primary">Submit</button>
			                    </div>
			                </form>
		               	</div>	
					</div>
				</div>
			)
		);
	}
}

export default Login;