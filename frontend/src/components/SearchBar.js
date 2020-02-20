import React, {Component} from 'react'

class CardList extends Component {
	constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            query: '',
        }
    }
    handleChange (e) {
        this.setState({
            query: e.target.value,
        })
    }
	render () {
		return(
            <div>
                <input type="search" value={this.state.query}  onChange={this.handleChange}/>
                <button onClick={this.props.handleSearch(this.state.query)}>Search</button>
            </div>
		);
	}
}
export default CardList;