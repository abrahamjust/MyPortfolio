import './Footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer_left">
                <p>Designed and built by Abraham Justin, 2026</p>
            </div>
            <div className="site-footer_right">
                <nav className="site-footer_nav" aria-label="Social links">
                    <a href="https://github.com/abrahamjust" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/abraham-justin-b28184284" target="_blank" rel="noopener noreferrer">
                        Linkedin
                    </a>
                    <a href="mailto:abrahamjustin@gmail.com">
                        Email
                    </a>
                    <a href="https://www.instagram.com/abrahamjust05" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;