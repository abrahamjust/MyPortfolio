import { useState } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle.jsx";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="site-header">
        <Link to="/" className="site-header__name" onClick={close}>
            Abraham Justin
        </Link>

        <div className="site-header__right">
            <nav aria-label="Main" className="site-header__nav" data-open={menuOpen}>
                <Link to="/#work" end onClick={close}>Work</Link>
                <Link to="/#about" onClick={close}>About</Link>
                <NavLink to="/contact" onClick={close}>Contact</NavLink>
            </nav>

            <ThemeToggle />

            <button
                type="button"
                className="site-header__menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "Close" : "Menu"}
            </button>
        </div>
    </header>
  );
}

export default Header;