import React,{Component} from 'react'

class Card extends Component{
	constructor(props){
		super(props)
		this.get_border_color = this.get_border_color.bind(this)
		this.getImgName = this.getImgName.bind(this)
		this.DeleteCard = this.DeleteCard.bind(this)
	}
	get_border_color(color){
		if(color == 'Семестровки'){
			return('danger')
		}
		else if(color == 'Семинары'){
			return('primary')
		}
		else{
			return('warning')
		}
	}
	getImgName(str){
		return '/' + str.slice(str.indexOf('media'));
	}
	DeleteCard(){
		const endpoint = `/api/card/${this.props.data.slug}/delete`
		let options ={
			method:'DELETE',
			headers:{
				'Authorization':`Token ${localStorage.token}`
			}
		}
		fetch(endpoint,options)
		.then(response => response.text())
		.then(responseData =>{
			this.props.reload()
		})
		.catch(error => console.log('Error: ' + error))
	}
	render(){
		const {data} = this.props
		const color = this.get_border_color(data.type_num)
		return(
			<div className="col mb-3">
			   	<div className={'card border-'+color}>
			    	<div className="card-header">{data.title}</div>
			    	<div className="card-body">
			    		<h4 className="card-type">{data.type_num}</h4>
			    		<h4 className="card-type">{data.predmet_type}</h4>
			    		<h4 className="group-num">{data.class_num} Класс</h4>
			       		<h4 className="card-date">{data.post_date}</h4>
			       		<h4 className="card-teacher">{data.teacher}</h4>
			       		<a href={this.getImgName(data.image)} target="_blank">
			       			<button type="button" className={'btn btn-lg mt-2 btn-download btn-outline-'+color}>Просмотр</button>
			       		</a>
			   		</div>
			   		{this.props.isAuth ? (<button type="button" onClick={this.DeleteCard} className={'btn btn-delete btn-'+color}><i className="fas fa-times-circle"></i></button>):('')}
			   	</div>
			</div>
		);
	}
}
export default Card;
