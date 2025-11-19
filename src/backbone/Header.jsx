import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "@/assets/IMG_Logo.png";
import "@/css/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Dataset", to: "/dataset-landing" },
    { name: "Sektoral", to: "/sektoral-landing" },
    { name: "Urusan", to: "/urusan-landing" },
    { name: "Organisasi", to: "/organisasi-landing" },
    { name: "Publikasi", to: "/publikasi-landing" },
    { name: "Contact", to: "/kontak-landing" },
  ];

  return (
    <nav className="navbar-satu">
      <div className="nav-satu">
        <Link to="/" className="nav-logo-satu">
          <img src={Logo} alt="Logo" />
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
