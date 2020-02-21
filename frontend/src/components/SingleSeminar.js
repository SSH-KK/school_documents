import React from 'react'

class SingleSeminar extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            adminToken: localStorage.getItem('token'),
        }
    }
    handleClick () {
		let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${this.state.adminToken}`);
        fetch(`/api/card/${this.props.data.slug}/delete`, {
            method: 'DELETE',
            headers: myHeaders,
        });
    }
    render () {
        const {src, date, classNum, title, type } = this.props.data;
        return (
            <div>
                <img src={src} alt={title} />
                <h1>{title}</h1>
                <span>{date}</span>
                <p>{classNum} - {type == "Семинаы" ? "Семинар" : "Семестровые задачи"}</p>
                <button onClick={this.handleClick}>Удалить</button>
            </div>
    );
    }
}
export default SingleSeminar;