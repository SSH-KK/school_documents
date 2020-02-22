import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Select from './Selects'
import styled from 'styled-components'

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
        const SearchFilter = styled.div`
            display: inline-block;
            float: right;
            width: calc(100% - 10vh);
            height: 100%;
        `
        const SearchButton = styled.img`
            height: 3vh;
            position: absolute;
            top: 2vh;
            border: none;
            outline: none;
            right: 3vh;
            transition: all .2s;
            transition-delay: .1s;
            &:hover {
                cursor: pointer;
            }
        `
        const SearchInput = styled.input`
            font-size: 3vh;
            width: 100%;
            height: 7vh;
            border: none;
            outline: none;
            border-radius: 7vh;
            padding: 3vh;
            padding-right: 8vh;
            transition: all .2s;
            transition-delay: .1s;
            vertical-align: top;
            &::placeholder {
                opacity: .5;
            }
        `
        const SearchBox = styled.div`
            position: relative;
        `

		return(
            <SearchFilter>
                {this.state.toHome ? <Redirect to='/r' /> : ''}
                <SearchBox>
                    <SearchInput type="search" value={this.state.query} onChange={this.handleInputChange}/>
                    <SearchButton src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+ICAgIDxwYXRoIGQ9Ik0gOSAyIEMgNS4xNDU4NTE0IDIgMiA1LjE0NTg1MTQgMiA5IEMgMiAxMi44NTQxNDkgNS4xNDU4NTE0IDE2IDkgMTYgQyAxMC43NDc5OTggMTYgMTIuMzQ1MDA5IDE1LjM0ODAyNCAxMy41NzQyMTkgMTQuMjgxMjUgTCAxNCAxNC43MDcwMzEgTCAxNCAxNiBMIDIwIDIyIEwgMjIgMjAgTCAxNiAxNCBMIDE0LjcwNzAzMSAxNCBMIDE0LjI4MTI1IDEzLjU3NDIxOSBDIDE1LjM0ODAyNCAxMi4zNDUwMDkgMTYgMTAuNzQ3OTk4IDE2IDkgQyAxNiA1LjE0NTg1MTQgMTIuODU0MTQ5IDIgOSAyIHogTSA5IDQgQyAxMS43NzMyNjggNCAxNCA2LjIyNjczMTYgMTQgOSBDIDE0IDExLjc3MzI2OCAxMS43NzMyNjggMTQgOSAxNCBDIDYuMjI2NzMxNiAxNCA0IDExLjc3MzI2OCA0IDkgQyA0IDYuMjI2NzMxNiA2LjIyNjczMTYgNCA5IDQgeiIvPjwvc3ZnPg=="
                        onClick={this.returnFilter} />
                </SearchBox>
                <Select showAll={true} type='classes' handleSelectChange={this.handleSelectChange} />
            </SearchFilter>
		);
	}
}
export default SearchBar;