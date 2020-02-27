import React,{Component} from 'react'
import Card from './Card'
import Navbar from './Navbar'


class CardList extends Component{
	constructor(props){
		super(props)
		this.LoadCardsList = this.LoadCardsList.bind(this)
		this.Get_serachin_url = this.Get_serachin_url.bind(this)
		this.Search_change = this.Search_change.bind(this)
		this.Search_find = this.Search_find.bind(this)
		this.Filters_change = this.Filters_change.bind(this)
		this.state = {
			data: [],
			isLoading: true,
			hasError: false,
			filters:{
				teacher:'',
				type_num:'',
				group_num:'',
			},
			search:'',
		}
	}
	LoadCardsList(){
		this.setState({isLoading:true})
		const endpoint = this.Get_serachin_url()
		let options ={
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		}
		fetch(endpoint,options)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({data:responseData})
			this.setState({isLoading:false})
		})
		.catch(error => console.log('Error: ' + error))
	}
	Get_serachin_url(){
		let main_url = '/api/cards?'
		let filts = this.state.filters
		for(let i in filts){
			if(filts[i]!=''){
				main_url+=`${i}=${filts[i]}&`
			}
		}
		if(this.state.search){
			main_url+=`search=${this.state.search}`
		}
		return(main_url)
	}
	Filters_change(event){
		event.preventDefault()
		let filt = {...this.state.filters}
		filt[event.target.name] = event.target.value
		this.setState({filters:filt},()=>{console.log(this.state.filters);this.LoadCardsList()})
	}
	Search_change(event){
		this.setState({search:event.target.value});
	}
	Search_find(event){
		event.preventDefault()
		this.LoadCardsList()
	}
	componentDidMount(){
		this.props.UpdateToken()
		this.LoadCardsList()
	}
	render() {
		const {data} = this.state
		return(
			<div>
				<p id="coper-btn">Prod. by Артём Стукалов, Дмитрий Шишков</p>
				<Navbar filters_change={this.Filters_change} isAuth={this.props.isAuth} reload_token={this.props.UpdateToken} search_find={this.Search_find} search_change={this.Search_change} serch_value={this.state.value}/>
				<div className="container-fluid">
					{this.state.data.length ?(
						<div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-sm-2">
						{this.state.isLoading ? (<h1>ЗАГРУЗКА.....</h1>):
							data.map((ob,id)=>{
								return(<Card key={id} data={ob} isAuth={this.props.isAuth} reload={this.LoadCardsList}/>);
							}
						)}
						</div>
					):(<h1>Ничего не было найдено</h1>)}
				</div>
			</div>
		);
	}
}
export default CardList;