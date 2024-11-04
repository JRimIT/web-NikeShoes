import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import "./Footer.scss";

function Footer() {
  return (
    <MDBFooter bgColor="white" className="text-center text-lg-start text-muted">
      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Nike</h6>
              <p>
                We deliver premium sportswear and footwear designed to elevate
                your performance and style.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="/products-men/Men" className="footer-link">
                  Men
                </a>
              </p>
              <p>
                <a href="/products-women/Women" className="footer-link">
                  Women
                </a>
              </p>
              <p>
                <a href="" className="footer-link">
                  Sport
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <a href="#!" className="footer-link">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="footer-link">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="footer-link">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="footer-link">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>FPTU Da Nang, Ngu Hanh Son, Viet Nam</p>
              <p>
                {/* <MDBIcon icon="envelope" className="me-3" /> */}
                fpt@example.com
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="footer-bottom text-center p-4">
        <p>
          © 2024 Nike, Inc. All rights reserved |{" "}
          <a href="#!" className="footer-link">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#!" className="footer-link">
            Terms & Conditions
          </a>
        </p>
        {/* <div className="social-icons">
          <MdOutlineFacebook className="me-3 social-icon" />
          <FaInstagram className="me-3 social-icon" />
          <FaTwitter className="me-3 social-icon" />
          <FaYoutube className="social-icon" />
        </div> */}
      </div>
    </MDBFooter>
  );
}

export default Footer;
