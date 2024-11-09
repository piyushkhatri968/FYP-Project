import React from "react";

function Footer() {
  return (
    <footer className="footer">
  <div className="container">
    <div className="footer-content">
      {/* Logo and Description */}
      <div className="footer-section logo-description">
        <h2 className="logo">Job Portal</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Sed eiusmod tempor incididunt ut.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook" /></a>
          <a href="#"><i className="fab fa-twitter" /></a>
          <a href="#"><i className="fab fa-pinterest" /></a>
          <a href="#"><i className="fab fa-linkedin" /></a>
        </div>
      </div>
      {/* For Candidate Links */}
      <div className="footer-section">
        <h3>For Candidate</h3>
        <ul>
          <li><a href="#">Browse Jobs</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Browse Categories</a></li>
          <li><a href="#">Resume</a></li>
          <li><a href="#">Job List</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>
      </div>
      {/* Quick Links */}
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      {/* Information */}
      <div className="footer-section">
        <h3>Information</h3>
        <p><i className="fas fa-phone" /> Phone: +101 984 754</p>
        <p><i className="fas fa-envelope" /> Email: FYP@info.com</p>
        <p><i className="fas fa-map-marker-alt" /> Address: Mithi Tharparkar</p>
      </div>
    </div>
  </div>
</footer>


  );
}

export default Footer;
