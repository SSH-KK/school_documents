import React,{Component} from 'react'
import {Link} from 'react-router-dom'
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
  				<a className="navbar-brand" href="#">Navbar</a>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse justify-content-around" id="navbarNav">
					<form id="FilteringForm">
						<div className="form-row">
							<div className="col-sm-12">
								<h5 className="font-weight-bold">FILTERING:</h5>
							</div>
							<div className="col-sm-4">
								<label htmlFor="TeacherFilter">
									<h5>Teacher</h5>
								</label>
								<select className="form-control form-control-md" id="TeacherFilter" onChange={this.props.teacher_change}>
				  					<option defaultValue value="">-</option>
							        <option value="Попов Д.А">Попов Д.А</option>
							        <option value="Ильин А.Б">Ильин А.Б</option>
							        <option value="Пачин И.М">Пачин И.М</option>
								</select>
							</div>
							<div className="col-sm-4">
								<label htmlFor="TypeFilter">
									<h5>Task type</h5>
								</label>
								<select className="form-control form-control-md" id="TypeFilter" onChange={this.props.task_type_change}>
				  					<option defaultValue value=''>-</option>
							        <option value="Семистровки">Семистровки</option>
							        <option value="Семинары">Семинары</option>
							        <option value="Потоковые">Потоковые</option>
								</select>
							</div>
							<div className="col-sm-4">
								<label htmlFor="GroupFilter">
									<h5>Group num</h5>
								</label>
								<select className="form-control form-control-md" id="GroupFilter" onChange={this.props.group_num_change}>
				  					<option defaultValue value=''>-</option>
							        <option value="81">81</option>
							        <option value="82">82</option>
							        <option value="83">83</option>
							        <option value="84">84</option>
							        <option value="85">85</option>
							        <option value="86">86</option>
							        <option value="91">91</option>
							        <option value="92">92</option>
							        <option value="93">93</option>
							        <option value="94">94</option>
							        <option value="95">95</option>
							        <option value="96">96</option>
								</select>
							</div>
						</div>
					</form>
					<form id="SearchingForm" className="ml-5" onSubmit={this.props.search_find}>
						<div className="form-row">
							<div className="col-lg-8 col-md-12">
								<input className="form-control mr-sm-2" onChange={this.props.search_change} value={this.props.serch_value} type="search" placeholder="Search" aria-label="Search"/>
							</div>
							<div className="col-lg-1 col-md-12">
								<button className="btn btn-primary my-2 my-sm-0" type="submit"><i className="fas fa-search"></i> Search</button>
							</div>
							{this.props.isAuth ? (
								<div className="col-lg-1 col-md-12">
									<button className="btn btn-danger my-2 ml-4 my-sm-0" onClick={this.MakeLogout}>Logout</button>
								</div>
							):(
								<div className="col-lg-1 col-md-12">
									<Link to="/r/login"><button className="btn btn-success my-2 ml-4 my-sm-0">Login</button></Link>
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