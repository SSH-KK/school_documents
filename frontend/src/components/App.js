import React,{Component} from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import CardList from './CardList'
import Login from './Login'

class App extends Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path='/r' component={CardList}/>
					<Route exact path='/r/login'>
						{localStorage.token ? <Redirect to="/r"/>:<Login/>}
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;