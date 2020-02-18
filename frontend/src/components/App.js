import React,{Component} from 'react'
import {Router, Route, BrowserRouter, Switch} from 'react-router-dom'
import CardList from './CardList'
class App extends Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path='/cards' component = {CardList}/>
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;