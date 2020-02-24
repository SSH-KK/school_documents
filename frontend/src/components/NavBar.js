import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
function NavBar (props) {
    return (
        <nav className="nav">
            <Link className="logo" to="/r/" />
            <SearchBar handleSearch={props.handleSearch} />
        </nav>
    );
}
export default NavBar;