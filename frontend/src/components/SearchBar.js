import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { SelectClass } from './Selects'

class SearchBar extends Component {
	constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.returnFilter = this.returnFilter.bind(this);
        this.state = {
            query: '',
            classNum: null,
            toHome: false,
        }
    }

    handleInputChange (e) {
        this.setState({
            query: e.target.value,
        });
    }

    handleSelectChange (e) {
        this.setState({
            classNum: e.target.value,
        });
    }

    returnFilter () {
        this.props.handleSearch({
            query: this.state.query,
            classNum: (this.state.classNum == 'Все' ? false : this.state.classNum),
        });
        this.setState( (state) => ({
            toHome: !state.toHome,
        }));
    }

	render () {
		return(
            <div>
                {this.state.toHome ? <Redirect to='/r/' /> : ''}
                <input type="search" value={this.state.query} onChange={this.handleInputChange}/>
                <SelectClass handleSelectChange={this.handleSelectChange} />
                <button onClick={this.returnFilter}>Поиск</button>
            </div>
		);
	}
}
export default SearchBar;