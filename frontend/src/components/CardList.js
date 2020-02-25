import React,{Component} from 'react'
import Card from './Card'
import Navbar from './Navbar'


class CardList extends Component{
	constructor(props){
		super(props)
		this.LoadCardsList = this.LoadCardsList.bind(this)
		this.Filters_teacher_change = this.Filters_teacher_change.bind(this)
		this.Filters_group_num_change = this.Filters_group_num_change.bind(this)
		this.Filters_task_type_change = this.Filters_task_type_change.bind(this)
		this.Get_serachin_url = this.Get_serachin_url.bind(this)
		this.Search_change = this.Search_change.bind(this)
		this.Search_find = this.Search_find.bind(this)
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
	Filters_teacher_change(event){
		event.preventDefault()
		let filt = {...this.state.filters}
		filt.teacher = event.target.value
		this.setState({filters:filt},()=>{this.LoadCardsList()})
	}
	Filters_task_type_change(event){
		event.preventDefault()
		let filt = {...this.state.filters}
		filt.type_num = event.target.value
		this.setState({filters:filt},()=>{this.LoadCardsList()})
	}
	Filters_group_num_change(event){
		event.preventDefault()
		let filt = {...this.state.filters}
		filt.group_num = event.target.value
		this.setState({filters:filt},()=>{this.LoadCardsList()})
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
				<Navbar isAuth={this.props.isAuth} reload_token={this.props.UpdateToken} search_find={this.Search_find} search_change={this.Search_change} serch_value={this.state.value} teacher_change={this.Filters_teacher_change} task_type_change={this.Filters_task_type_change} group_num_change={this.Filters_group_num_change} />
				<div className="container-fluid">
					{this.state.data.length ?(
						<div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-sm-2">
						{this.state.isLoading ? (<h1>LOADING.....</h1>):
							data.map((ob,id)=>{
								return(<Card key={id} data={ob} isAuth={this.props.isAuth} reload={this.LoadCardsList}/>);
							}
						)}
						</div>
					):(<h1>NOTHIG WAS FOUNDED</h1>)}
				</div>
			</div>
		);
	}
}
export default CardList;