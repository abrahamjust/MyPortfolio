import Header from '../components/Header.jsx';
import Scroll from "../components/Scroll.jsx";
import Hero from './Hero.jsx';
import Projects from './Projects.jsx';
import About from './About.jsx';
import ContactBand from './ContactBand.jsx';

function Home() {
    return (
        <>
            <Scroll />
            <Header />
            <Hero />
            <Projects />
            <About />
            <ContactBand />
        </>
    );
}

export default Home;