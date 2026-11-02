import ThemeToggle from './ThemeToggle.jsx';

function Header() {
    return (
        <>
            <header>
                <div className="left">
                    <p>Abraham Justin</p>
                </div>
                <div className="right">
                    <a href="#Work">Work</a>
                    <a href="#About">About</a>
                    <a href="#Contact">Contact</a>
                    <ThemeToggle />
                </div>
            </header>
        </>
    );
}

export default Header;