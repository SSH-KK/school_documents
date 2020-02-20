import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

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
        let items = ['Все', '10А', '10Б', '10В', '11А', '11Б', '11В',];
        const filter = items.map((el, key) => <option key={key}>{el}</option>);

		return(
            <div>
                {this.state.toHome ? <Redirect to='/r/' /> : ''}
                <input type="search" value={this.state.query} onChange={this.handleInputChange}/>
                <select onChange={this.handleSelectChange}>{filter}</select>
                <button onClick={this.returnFilter}>Search</button>
            </div>
		);
	}
}
export default SearchBar;