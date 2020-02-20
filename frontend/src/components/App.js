import React,{Component} from 'react'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import CardList from './CardList'
import SingleSeminar from './SingleSeminar'
import NavBar from './NavBar'
class App extends Component{
	constructor (props) {
		super(props);
		this.loadData = this.loadData.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			data: [],
			isLoading: true,
			hasError: false,
			query: ''
		}
	}

	componentDidCatch (error, info) {
		this.setState({
			hasError: true,
			error: {
				header: error,
				body: info,
			},
		})
	}

	componentDidMount( ) {
		this.loadData();
	}

	loadData () {
		this.setState({
			isLoading: true,
		})
		fetch("/api/cards")
		.then(response => response.json())
		.then(result => {
			const images = result.map(el => ({
				src: this.getImgName(el.image),
                date: el.post_date,
                class_num: el.class_num,
				title: el.title,
				type: el.type_num,
			}));
			this.setState({
				data: images,
				isLoading: false,
			})
		})
		.catch(error => console.log("Error: " + error));
	}

	handleSearch (value) {
		if (this.state.query != value) {
			this.setState({
				query: value,
			})
		}
	}

	getImgName (str) {
		return "/" + str.slice(str.indexOf('media'));
	}

	render () {
		return(
			<div>
				{this.state.hasError ? "Error!" : ""}
				<BrowserRouter>
					<NavBar handleSearch={this.handleSearch} />
					{this.state.isLoading ? "Loading..." : (
						<Switch>
							<Route exact path='/r' render = {
								() => <CardList data={this.state.data} /> 
							}/>
							<Route path='/r/seminar/:id' render = {
								(props) => <SingleSeminar data={this.state.data[props.match.params.id]} id={props.match.params.id}/>
							} />
						</Switch>
					)}
				</BrowserRouter>
			</div>
		);
	}
}
export default App;