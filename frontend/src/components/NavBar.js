import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function NavBar (props) {
    return (
        <nav>
            <Link to="/r/">
                <img src="../logo.svg" alt="Logo" />
            </Link>
            <Link to="/r/admin/">Admin</Link>
            <SearchBar handleSearch={props.handleSearch} />
        </nav>
    );
}
export default NavBar;