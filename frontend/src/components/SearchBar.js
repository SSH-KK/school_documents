import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Select from './Selects'

class SearchBar extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            query: '',
            classNum: null,
            toHome: false,
        }
    }
    handleClick = e => {
        e.preventDefault();
        this.setState(state => ({
            isCollapsed: !state.isCollapsed,
        }));
    }

    returnFilter = e => {
        e.preventDefault();
        this.props.handleSearch({
            query: this.state.query,
            classNum: (this.state.classNum == 'Все' ? false : this.state.classNum),
        });
        this.setState(state => ({
            toHome: !state.toHome,
        }));
    }

	render () {

		return(
            <form className="searchFilter" onSubmit={this.returnFilter}>
                {this.state.toHome && <Redirect to='/r' />}
                <div className="searchBox">
                    <input className="searchInput" type="search" placeholder="Поиск.." onChange={this.handleInputChange}/>
                    <input className="searchButton" value="" type="submit" />
                </div>
                <button className="filterToggler" onClick={this.handleClick} />
                <div className="filterContainer" style={!this.state.isCollapsed ? { height: '6.5vh' } : {}}>
                    <Select showAll={true} type='classes' handleSelectChange={this.handleSelectChange}>
                        <option disabled hidden>Класс</option>
                    </Select>
                    <Select showAll={true} type='types' handleSelectChange={this.handleSelectChange}>
                        <option disabled hidden>Тип</option>
                    </Select>
                </div>
            </form>
		);
	}
}
export default SearchBar;