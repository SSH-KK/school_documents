import React,{Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

class PostCard extends Component{
	constructor(props){
		super(props)
		this.FormsChange = this.FormsChange.bind(this)
		this.fileInput = React.createRef();
		this.MakePost = this.MakePost.bind(this)
		this.state={
			TitleInput:'',
			TeacherInput:'',
			TypeInput:'',
			GroupInput:'',
			errors:false,
			img_error:false,
			img_value:['Выберите файл',false],
			post_success:false,
		}
	}
	MakePost(event){
		event.preventDefault()
		if(this.fileInput.current.files[0]){
			this.setState({img_error:false})
			if (this.fileInput.current.files[0]['type'].split('/')[0] !== 'image') {
            	this.setState({img_error:true})
            	this.setState({img_value:[this.state.img_value[0],false]})
       		}
		    else{
		        const endpoint = '/api/card/create'
				let formdata = new FormData()
				formdata.append('title', this.state.TitleInput);
		        formdata.append('teacher', this.state.TeacherInput);
		        formdata.append('type_num', this.state.TypeInput);
		        formdata.append('group_num', this.state.GroupInput);
		        formdata.append('image', this.fileInput.current.files[0], this.fileInput.current.files[0].name);
				let options = {
					method:'POST',
					body:formdata,
					headers:{
						'Authorization':`Token ${localStorage.token}`
					},
				}
				fetch(endpoint,options)
				.then(response => {	
					if(response.ok){
						response.text().then(responseData =>{
							this.setState({post_success:true})
						})
						.catch(error => console.log('Error: ' + error))
					}
					else{
						this.setState({errors:true})
					}
				})
		    }
		}
		else{
			this.setState({img_error:true})
		}
	}
	FormsChange(event){
		event.preventDefault()
		if(event.target.type == 'file'){
			this.setState({img_value:[this.fileInput.current.files[0].name,true]})
		}	
		else{
			this.setState({[event.target.name]:event.target.value})
			this.setState({errors:false})
		}
	}
	render(){
		return(
			this.props.isAuth ? (
				<div className="container-fluid" id="AuthContainer">
						<div className="row">
							<div className="col-12" id="AuthForm">
			                    <h1 className="font-weight-bold">Добавить Задание</h1>
			                    <form onSubmit={this.MakePost}>
			                     	<div className="form-group row">
								   		<div className="col-sm-12">
								      		<input type="text" className={`form-control ${this.state.errors ? 'is-invalid':''}`} onChange={this.FormsChange} value={this.state.TitleInput} name="TitleInput" id="TitleInput" placeholder="Название"/>
								    		<div className="invalid-feedback">Неверное название</div>
								    	</div>
								  	</div>
								  	<div className="form-group row">
								  		<label htmlFor="TeacherInput" className="col-sm-12 col-form-label">Преподаватель </label>
								   		<div className="col-sm-12">
								      		<select className={`form-control form-control-md ${this.state.errors ? 'is-invalid':''}`} onChange={this.FormsChange} name="TeacherInput" id="TeacherInput">
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
											<div className="invalid-feedback">Неверное выбран преподаватель</div>
								    	</div>
								  	</div>
								  	<div className="form-group row">
								  		<label htmlFor="TypeInput" className="col-sm-12 col-form-label">Тип задания </label>
								   		<div className="col-sm-12">
								      		<select className={`form-control form-control-md ${this.state.errors ? 'is-invalid':''}`} onChange={this.FormsChange} name="TypeInput" id="TypeInput">
							  					<option defaultValue value=''>-</option>
										        <option value="Семестровки">Семестровки</option>
										        <option value="Семинары">Семинары</option>
										        <option value="Потоковые">Потоковые</option>
											</select>
											<div className="invalid-feedback">Неверное выбран тип задания</div>
								    	</div>
								  	</div>
								  	<div className="form-group row">
								  		<label htmlFor="GroupInput" className="col-sm-12 col-form-label">Номер группы </label>
								   		<div className="col-sm-12">
								      		<select className={`form-control form-control-md ${this.state.errors ? 'is-invalid':''}`} onChange={this.FormsChange} name="GroupInput" id="GroupInput">
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
											<div className="invalid-feedback">Неверное выбран номер группы</div>
								    	</div>
								  	</div>
								  	<div className="form-group row">
								  		<label htmlFor="ImageInput" className="col-sm-12 col-form-label">Файл </label>
								   		<div className="col-sm-12">
								      		<div className="custom-file">
    											<input type="file" onChange={this.FormsChange} ref={this.fileInput} disabled={this.state.img_value[1] ? 'disabled':''} className={`custom-file-input ${this.state.img_error ? 'is-invalid':''}`} id="ImageInput" multiple aria-describedby="inputGroupFileAddon01"/>
										    	<div className="invalid-feedback">Неверный формат файла или файл отсутствует</div>
										    	<label className="custom-file-label" htmlFor="ImageInput">{this.state.img_value[0]}</label>
										  	</div>
								    	</div>
								  	</div>
								  	<div className="form-group">
			                            <button type="submit" className={`btn btn-primary ${this.state.post_success ? 'is-valid':''}`}>Создать</button>
			                            <div className="valid-feedback">
									    	Задание успешно создано
									    </div>
			                        </div>
			                    </form>
		                	</div>	
						</div>
					</div>
			):(<Redirect to="/"/>)		
		);
	}
}

export default PostCard;
