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

        let cardProps = new FormData();
        cardProps.append('title', data[1].value);
        cardProps.append('class_num', data[2].value);
        cardProps.append('type_num', data[3].value);
        cardProps.append('image', this.fileInput.current.files[0], this.fileInput.current.files[0].name);
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${this.props.adminToken}`);

        fetch('/api/card/create'
        , {
            method: 'POST',
            headers: myHeaders,
            body: cardProps,
        }).then(() => this.props.refresh())
        .catch(error => console.log('Error: ' + error));
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