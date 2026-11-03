import { useEffect } from 'react';
import Hero from './Hero.jsx';
import Projects from './Projects.jsx';
import About from './About.jsx';
import ContactBand from './ContactBand.jsx';

function Home() {
    useEffect(() => { 
            document.title = "Abraham Justin | Full-stack engineer"; 
        }, []);
    return (
        <>
            <Hero />
            <Projects />
            <About />
            <ContactBand />
        </>
    );
}

export default Home;