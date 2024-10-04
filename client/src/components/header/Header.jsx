import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoMdSearch } from "react-icons/io";
import './Header.scss';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import logo from '../../pic/Logo.jpg'
const Header = () => {
  return (
    <>
   
    <div className="head">
        <div className="container-login">
            <span>Sign In</span>
            <FaUser />
        </div>
    </div>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
            <img src={logo} alt="logo" className="logo"/>
           
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className='nav-link' to='/men'>Men</NavLink>
            <NavLink className='nav-link' to='/women'>Women</NavLink>
            <NavLink className='nav-link' to='/'>Sale</NavLink>
            <NavLink className='nav-link' to='/'>Help</NavLink>
            <NavLink className='nav-link' to='/'>Join Us</NavLink>

          </Nav>
          <div className="navbar-right-content">
            <span className="icon-bag rounded-circle">
                <FaHeart className="w-100  icon"/>
                
            </span>
            <span className="icon-bag rounded-circle">
                <IoBagHandleOutline className="w-100 icon "/>
                
            </span>
            
            
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill"
                aria-label="Search"
                />

                <Button className="rounded-circle btn btn-dark"><IoMdSearch className="w-100% "/>
                </Button>
            </Form>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
 
  );
};

export default Header
