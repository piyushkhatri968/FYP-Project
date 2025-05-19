import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import AboutPage from "../../Pages/About/AboutPage";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section logo-description">
            <h2 className="logo">Job Portal</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna. Sed eiusmod
              tempor incididunt ut.
            </p>
            <div className="social-icons">
              <Link to="#">
                <i className="fab fa-facebook" />
              </Link>
              <Link to="#">
                <i className="fab fa-twitter" />
              </Link>
              <Link to="#">
                <i className="fab fa-pinterest" />
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin" />
              </Link>
            </div>
          </div>
          {/* For Candidate Links */}
          <div className="footer-section">
            <h3>For Candidate</h3>
            <ul>
              <li>
                <a to="#">Browse Jobs</a>
              </li>
              <li>
                <a to="#">Account</a>
              </li>
              <li>
                <a to="#">Browse Categories</a>
              </li>
              <li>
                <a to="#">Resume</a>
              </li>
              <li>
                <a to="#">Job List</a>
              </li>
              <li>
                <a to="#">Sign Up</a>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Pricing</Link>
              </li>
              <li>
                <Link to="#">Privacy</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          {/* Information */}
          <div className="footer-section">
            <h3>Information</h3>
            <p>
              <i className="fas fa-phone" /> Phone: +101 984 754
            </p>
            <p>
              <i className="fas fa-envelope" /> Email: FYP@info.com
            </p>
            <p>
              <i className="fas fa-map-marker-alt" /> Address: Mithi Tharparkar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
