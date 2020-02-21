import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import Select from '../Selects'

class UploadImage extends Component {
	constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
		this.state = {
            errors: ''
        };
        this.fileInput = React.createRef();
    }

    upload (e) {
        e.preventDefault();
        const data = e.target;
        if (this.fileInput.current.files[0]['type'].split('/')[0] !== 'image') {
            this.setState({
                errors: "Можно загружать только изображения",
            });
        } else {
            let cardProps = new FormData();
            cardProps.append('title', data[1].value);
            cardProps.append('class_num', data[2].value);
            cardProps.append('type_num', data[3].value);
            cardProps.append('image', this.fileInput.current.files[0], this.fileInput.current.files[0].name);
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${this.props.adminToken}`);
            fetch('/api/card/create', {
                method: 'POST',
                headers: myHeaders,
                body: cardProps,
            }).then(response => {
                if (!response.ok) {
                    response.json().then(result => {
                        this.setState({
                            errors: 'Не все поля заполнены верно',
                        })
                    });
                } else {
                    this.props.refresh();
                }
            }).catch(error => console.log('Error: ' + error));
        }
    }

	render () {
		return(
            <div>
                {!this.props.adminToken ? <Redirect to="/r/admin/login/" /> : (
                    <form onSubmit={this.upload} encType="multipart/form-data">
                        <input type='file' ref={this.fileInput} />
                        <input type='text' />
                        <Select type='classes' showAll={false} />
                        <Select type='type' showAll={false} />
                        <input type='submit' value="Отправить" />
                        <br/>
                        {this.state.errors}
                    </form>
                ) } 
            </div>
		);
	}
}
export default UploadImage;