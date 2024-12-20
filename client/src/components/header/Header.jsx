import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./Header.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoBagHandleOutline, IoBagCheck } from "react-icons/io5";
import { FaUser, FaHeart, FaUserAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import SearchBar from "./SearchBar";
import logo from "../../pic/Logo.jpg";
import { Typography } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

import loadingGif from "../../assets/Double Ring@1x-1.0s-200px-200px.gif";


import axios from "axios";
import { getUserByToken } from "../../data/api/apiService";
import { useDispatch } from "react-redux";
import UserSlice from "../../redux/userInfo/userSlice";

const Header = () => {
  const [products, setProducts] = useState([]); // State để lưu kết quả tìm kiếm
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const goToCartPage = () => navigate('/cart'); // Navigate to CartPage
  const goToWishlistPage = () => navigate('/wishlist'); // Navigate to WishlistPage
  const goToOrderPage = () => navigate('/orders');
  // Get user data from localStorage
  // const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const Header = () => {
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
                    <NavLink className="dropdown-title" to="/products-men/Men">Others</NavLink>
                    <NavLink className="dropdown-item" to="/products-men/Shoe">All shoes</NavLink>
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
                    <NavLink className="dropdown-title" to="/products-women/Women">Others</NavLink>
                    <NavLink className="dropdown-item" to="/products-women/Shoe">All shoes</NavLink>
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

          <div className="navbar-right-content">
            <span className="icon-bag rounded-circle">
              <FaHeart className="w-100 icon" />
            </span>
            <span className="icon-bag rounded-circle">
              <IoBagHandleOutline className="w-100 icon" />
            </span>
            <span className="icon-bag rounded-circle">
              <IoBagCheck className="w-100 icon" /> 
            </span>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill"
                aria-label="Search"
              />
              <Button className="rounded-circle btn btn-dark">
                <IoMdSearch className="w-100" /> 
              </Button>
            </Form>
          </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  
    );
  };
  // Hàm xử lý kết quả tìm kiếm từ SearchBar
  const handleSearchResults = (searchResults) => {
    setProducts(searchResults); // Cập nhật state với sản phẩm tìm kiếm được
    console.log(searchResults); // Kiểm tra kết quả tìm kiếm
  };
  
  useEffect(() => {
    console.log("token: ", token);

    if (token) {
      fetchUserInfo();
    } else {
      setUser(null);
      dispatch(UserSlice.actions.setUser(null));
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const res = await getUserByToken();
      // console.log(res.data);
      setUser(res.data);
      console.log("USer: ", user);
      dispatch(UserSlice.actions.setUser(res.data));
    } catch (error) {
      console.log("USer: ", "DEo co");

      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDropdownToggle = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.removeItem("user");
      localStorage.clear("token");
      navigate("/");
    }, 3000);
  };

  const signIn = () => navigate("/login");

  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    backgroundColor: "#f1f1f1",
  };

  return (
    <>
      {isLoading ? (
        <div className="Loading-PageLogOut">
          <ClipLoader
            cssOverride={override}
            color={"#000000"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div className="head">
            <div className="container-login">
              {!user ? (
                <span onClick={signIn}>
                  Sign In <FaUserAlt />
                </span>
              ) : (
                // <NavLink to="/login">

                // </NavLink>

                // If user is logged in

                <div
                  className="user-container"
                  onMouseEnter={handleDropdownToggle}
                  onMouseLeave={handleDropdownToggle}
                >
                  {user.role_id === 2 ? (
                    <>
                      <span className="username">Admin, {user.username}</span>
                      <img
                        src={user.user_image}
                        alt="User Avatar"
                        className="user-avatar"
                      />

                      {isDropdownOpen && (
                        <div className="dropdown-profile">
                          <NavLink to="/dashboard/profile">Profile</NavLink>
                          <NavLink to="/setting">Setting</NavLink>
                          <NavLink to="/admins">Admin page</NavLink>
                          <button className="butLogout" onClick={handleLogout}>
                            Log Out
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="username">Hi, {user.username}</span>
                      <img
                        src={user.user_image}
                        alt="User Avatar"
                        className="user-avatar"
                      />

                      {isDropdownOpen && (
                        <div className="dropdown-profile">
                          <NavLink to="/dashboard/profile">Profile</NavLink>
                          <NavLink to="/setting">Setting</NavLink>
                          <button className="butLogout" onClick={handleLogout}>
                            Log Out
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand href="/">
                <img src={logo} alt="logo" className="logo" />
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
                          <NavLink className="dropdown-title">Shop By Sports</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Men's Road Running Shoes">Running</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Football">Football</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Basketball">Basketball</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Men's Workout Shoes">Training And Gym</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Men's Hard Court Tennis Shoes">Tennis</NavLink>
                          <NavLink className="dropdown-item" to="/products-men/Skate">Skateboarding</NavLink>
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
                          <NavLink className="dropdown-title">Shop By Sports</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Women's Trail-Running Shoes">Running</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Football">Football</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Basketball">Basketball</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Women's Workout Shoes">Training And Gym</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Women's Hard Court Tennis Shoes">Tennis</NavLink>
                          <NavLink className="dropdown-item" to="/products-women/Skate">Skateboarding</NavLink>
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
                <div className="navbar-right-content">
                  <span className="icon-bag rounded-circle" onClick={goToWishlistPage}><FaHeart /></span>
                  <span className="icon-bag rounded-circle" onClick={goToCartPage}><IoBagHandleOutline /></span>
                  <span className="icon-bag rounded-circle" onClick={goToOrderPage}><IoBagCheck/></span>
                  <SearchBar onSearchResults={handleSearchResults} />
                </div>
        
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )};
    </>
  );
};

export default Header;
