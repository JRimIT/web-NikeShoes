import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import './Header.scss';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import logo from '../../pic/Logo.jpg'

const Header = () => {
  const [products, setProducts] = useState([]); // State để lưu kết quả tìm kiếm
  const navigate = useNavigate();

// Hàm xử lý kết quả tìm kiếm từ SearchBar
  const handleSearchResults = (searchResults) => {
    setProducts(searchResults); // Cập nhật state với sản phẩm tìm kiếm được
    console.log(searchResults); // Kiểm tra kết quả tìm kiếm
  };

  const goToCartPage = () => navigate('/cart'); // Navigate to CartPage
  const goToWishlistPage = () => navigate('/wishlist'); // Navigate to WishlistPage

  return (
    <>
    <div className="head">
        <div className="container-login">
            {/* <span>Sign In</span> */}
            <NavLink to="/login" className="login-link">Sign In</NavLink>
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

        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
          <div className="dropdown">
            <NavLink className="nav-link" to="/men">Men</NavLink>
            <div className="mega-dropdown">
              <div className="mega-dropdown-content">
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title">Featured (M&W)</NavLink>
                  <NavLink className="dropdown-item" to="/products-men-featured/Bestseller">Bestsellers</NavLink>
                  <NavLink className="dropdown-item" to="/products-men-featured/Sustainable Materials">Sustainable Materials</NavLink>
                  <NavLink className="dropdown-item" to="/products-men-featured/Just In">Just In</NavLink>
                  <NavLink className="dropdown-item" to="/products-men-featured/Promo Exclusion">Promo Exclusion</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title" to="/products-men/Men">Shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Football">Football</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Basketball">Basketball</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Road Running Shoes">Road Running</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Golf">Golf</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Skate">Skate Shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Athletics">Athletics</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Hard Court Tennis Shoes">Tennis</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Road Racing Shoes">Racing</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Workout Shoes">Workout</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Trail-Running Shoes">Trail-Running</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title" to="/shopbysport">Shop By Sports</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/running">Running</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/football">Football</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/baseball">Baseball</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/training-and-gym">Training And Gym</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/tennis">Tennis</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/skateboarding">Skateboarding</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title">Others</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/All">All shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Custom">Custom shoes</NavLink> 
                  <NavLink className="dropdown-item" to="/products-men/Men's Slides">Slide</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Flip-Flops">Flip-Flops</NavLink>
                  <NavLink className="dropdown-item" to="/products-men/Men's Sandals">Sandals</NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <NavLink className="nav-link" to="/women">Women</NavLink>
            <div className="mega-dropdown">
              <div className="mega-dropdown-content">
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title">Featured (M&W)</NavLink>
                  <NavLink className="dropdown-item" to="/products-women-featured/Bestseller">Bestsellers</NavLink>
                  <NavLink className="dropdown-item" to="/products-women-featured/Sustainable Materials">Sustainable Materials</NavLink>
                  <NavLink className="dropdown-item" to="/products-women-featured/Just In">Just In</NavLink>
                  <NavLink className="dropdown-item" to="/products-women-featured/Promo Exclusion">Promo Exclusion</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title" to="/products-women/Women">Shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Football">Football</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Basketball">Basketball</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Road Running Shoes">Road Running</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Golf">Golf</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Skate">Skate Shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Hard Court Tennis Shoes">Tennis</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Athletics">Athletics</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Workout Shoes">Workout</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Trail-Running Shoes">Trail-Running</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Road Racing Shoes">Racing</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title" to="/shopbysport">Shop By Sports</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/running">Running</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/football">Football</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/baseball">Baseball</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/training-and-gym">Training And Gym</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/tennis">Tennis</NavLink>
                  <NavLink className="dropdown-item" to="/shopbysport/skateboarding">Skateboarding</NavLink>
                </div>
                <div className="mega-dropdown-column">
                  <NavLink className="dropdown-title">Others</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/All">All shoes</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Sandals">Sandals</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Slides">Slides</NavLink>
                  <NavLink className="dropdown-item" to="/products-women/Women's Mules">Women's Mules</NavLink>
                </div>
              </div>
            </div>
          </div>
          <NavLink className="nav-link" to="/sale">Sale</NavLink>
          <NavLink className="nav-link" to="/help">Help</NavLink>
          <NavLink className="nav-link" to="/join">Join Us</NavLink>
        </Nav>

        <SearchBar onSearchResults={handleSearchResults} />

        <div className="navbar-right-content">
          <span className="icon-bag rounded-circle" onClick={goToWishlistPage}>
            <FaHeart />
          </span>
          <span className="icon-bag rounded-circle" onClick={goToCartPage}>
            <IoBagHandleOutline />
          </span>
        </div>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

  );
};

export default Header
