import { useState } from "react";
import { Link } from "react-router";
import HeroArt from "../components/HeroArt";
import "./Hero.css";

function Hero() {
  const [seed, setSeed] = useState(1027);

  function redraw() {
    setSeed(1 + Math.floor(Math.random() * 9999));
  }

  return (
    <section className="hero">
      <div className="hero__text">
            <h1 className="hero__name">
                <span className="hero__name-ink">
                    <span>Abraham</span>
                    <span>Justin</span>
                </span>
                <span className="hero__name-misprint" aria-hidden="true">
                    <span>Abraham</span>
                    <span>Justin</span>
                </span>
            </h1>

            <p className="lead">Full-stack engineer who also trains the occasional model.</p>

            <p className="hero__intro muted">
                I build web apps end to end, from the database schema to the interface,
                and I like bringing AI and ML into my projects.
            </p>

            <div className="hero__actions">
                <a href="#work" className="btn btn--primary">See the work</a>
                <Link to="/contact" className="btn btn--outline">Get in touch</Link>
            </div>

            <p className="hero__status muted">
                <span className="hero__dot" aria-hidden="true"></span>
                Open to internships, full-time roles and collaborations
            </p>
      </div>

      <div className="hero__art">
            <HeroArt seed={seed} flow />
            <div className="hero__controls">
            <span className="mono">seed {String(seed).padStart(4, "0")}</span>
            <button type="button" className="hero__redraw" onClick={redraw}>
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M13.5 8A5.5 5.5 0 1 1 11.8 4" />
                <path d="M12.5 1.5V4.5H9.5" />
                </svg>
                Redraw
            </button>
            </div>
      </div>
    </section>
  );
}

export default Hero;