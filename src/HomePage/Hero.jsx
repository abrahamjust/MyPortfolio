import HeroArt from "../components/HeroArt";
import { useState } from "react";

function Hero() {

    const [seed, setSeed] = useState(1027);

    return (
        <>
            <div className="leftHero">
                <h1>Abraham Justin</h1>
                <h3>Full-stack engineer who also trains the occasional model.</h3>
                <p>
                    I build web apps end to end, from the database schema
                    to the interface. I also like integrating AI/ML into my projects
                </p>

                <div className="leftHero-buttons">
                    <button>
                        <p>See the work</p>
                    </button>
                    <button>
                        <p>Get in touch</p>
                    </button>
                </div>

                <div className="leftHero-end">
                    <div className="pinkDot">

                    </div>
                    <p>Open to full-time roles and collaborations</p>
                </div>
            </div>
            <div className="rightHero">
                <HeroArt seed={seed} flow />
                <div className="hero-art__controls">
                <span className="mono">seed {String(seed).padStart(4, "0")}</span>
                <button type="button" onClick={() => setSeed(1 + Math.floor(Math.random() * 9999))}>
                    Redraw
                </button>
                </div>
            </div>
        </>
    )
}

export default Hero;