import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "./navbar.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";
import { Link } from "react-router-dom";
class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      query: null,
      collapseOpen: false,
    }
  }

  toggleNavbar () {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    })
  }
  
  handleChange (element) {
    this.props.getText(element.target.value);
  }

  render () {
    return (
    <Navbar type="dark" theme="primary">
      <NavbarBrand tag={Link} to="/"><img className="logo" src={process.env.PUBLIC_URL + "logo.png"} /></NavbarBrand>
      <Nav navbar className="ml-auto">
      <InputGroup seamless>
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroupText>
        </InputGroupAddon>
        <FormInput className="border-0" placeholder="Search..." onChange={this.handleChange} />
      </InputGroup>
      </Nav>
    </Navbar>
    );
  }
}
export default MyNavbar;