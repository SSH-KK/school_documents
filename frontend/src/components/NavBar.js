import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import main_logo from '../main_logo.png'

class Navbar extends Component{
	constructor(props){
		super(props)
		this.MakeLogout = this.MakeLogout.bind(this)
	}
	MakeLogout(){
		const endpoint = '/api/logout'
		let options ={
			method:'POST',
			headers:{
				'Authorization':`Token ${localStorage.token}`
			}
		}
		fetch(endpoint,options)
		.then(response => response.text())
		.then(responseData =>{
			localStorage.removeItem('token')
			this.props.reload_token()
		})
		.catch(error => console.log('Error: ' + error))
	}
	render() {
		return(
			<nav className="navbar navbar-expand-lg navbar-light grey lighten-3 mb-3">
  				<a className="navbar-brand" href="#">
  					<img src={main_logo} alt="main_logo"/>
  				</a>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse justify-content-around" id="navbarNav">
					<form id="FilteringForm">
						<div className="form-row">
							<div className="col-sm-12">
								<h4 className="font-weight-bold">ФИЛЬТРАЦИЯ:</h4>
							</div>
							<div className="col-sm-4">
								<label htmlFor="TeacherFilter">
									<h5>Преподаватель</h5>
								</label>
								<select className="form-control form-control-md" name="teacher" id="TeacherFilter" onChange={this.props.filters_change}>
				  					<option defaultValue value="">-</option>
							        <option value="Попов Д.А">Попов Д.А</option>
							        <option value="Ильин А.Б">Ильин А.Б</option>
							        <option value="Пачин И.М">Пачин И.М</option>
							        <option value="Николаева Л.Н">Николаева Л.Н</option>
							        <option value="Ню В.В">Ню В.В</option>
							        <option value="Вишневская Е.А">Вишневская Е.А</option>
							        <option value="Некрасов М.В">Некрасов М.В</option>
							        <option value="Попова Н.А">Попова Н.А</option>
							        <option value="Пачин М.Ф">Пачин М.Ф</option>
							        <option value="Керамов Н.Д">Керамов Н.Д</option>
							        <option value="Новожилова В.И">Новожилова В.И</option>
							        <option value="Шпехт А.Ю">Шпехт А.Ю</option>
							        <option value="Конкина Н.В">Конкина Н.В</option>
								</select>
							</div>
							<div className="col-sm-4">
								<label htmlFor="TypeFilter">
									<h5>Тип задания</h5>
								</label>
								<select className="form-control form-control-md" name="type_num" id="TypeFilter" onChange={this.props.filters_change}>
				  					<option defaultValue value=''>-</option>
							        <option value="Семестровки">Семестровки</option>
							        <option value="Семинары">Семинары</option>
							        <option value="Потоковые">Потоковые</option>
								</select>
							</div>
							<div className="col-sm-4">
								<label htmlFor="PredmetFilter">
									<h5>Предмет</h5>
								</label>
								<select className="form-control form-control-md" name="predmet_type" id="PredmetFilter" onChange={this.props.filters_change}>
				  					<option defaultValue value=''>-</option>
							        <option value="Математика">Математика</option>
							        <option value="Физика">Физика</option>
							        <option value="Информатика">Информатика</option>
								</select>
							</div>
						</div>
					</form>
					<form id="SearchingForm" onSubmit={this.props.search_find}>
						<div className="form-row">
							<div className="col-lg-8 col-md-12">
								<input className="form-control mr-sm-2" onChange={this.props.search_change} value={this.props.serch_value} type="search" placeholder="Поиск" aria-label="Search"/>
							</div>
							<div className="col-lg-1 col-md-12">
								<button className="btn btn-primary my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Поиск</button>
							</div>
							{this.props.isAuth ? (
								<div className="col-lg-1 col-md-12 ml-lg-3">
									<button className="btn btn-danger my-2 ml-4 my-sm-0" onClick={this.MakeLogout}>Выход</button>
									<Link to="/post_card"><button className="btn btn-success my-2 ml-4 my-sm-0">Создать</button></Link>
								</div>
							):(
								<div className="col-lg-1 col-md-12 ml-lg-3">
									<Link to="/login"><button className="btn btn-success my-2 ml-4 my-sm-0">Вход</button></Link>
								</div>
							)}
						</div>
					</form>
				</div>
  			</nav>
		);
	}
}
export default Navbar;
