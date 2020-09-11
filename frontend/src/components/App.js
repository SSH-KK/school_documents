import React,{Component} from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import CardList from './CardList'
import Login from './Login'
import PostCard from './PostCard'

class App extends Component{
	constructor(props){
		super(props)
		this.UpdateToken = this.UpdateToken.bind(this)
		this.state = {
			isAuth:false,
		}
	}
	UpdateToken(){
		this.setState({isAuth: localStorage.token ? true:false})
	}
	componentDidMount(){
		this.UpdateToken()
	}
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path='/' render={() => <CardList isAuth={this.state.isAuth} UpdateToken={this.UpdateToken}/>}/>
					<Route exact path='/login' render={() => <Login isAuth={this.state.isAuth} UpdateToken={this.UpdateToken}/>}/>
					<Route exact path='/post_card' render={() => <PostCard isAuth={this.state.isAuth}/>}/>
					<Route path='*' render={() => <h1>404</h1>}/>
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;
