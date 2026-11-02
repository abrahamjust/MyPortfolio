function Hero() {
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
                <HeroArt />
            </div>
        </>
    )
}

export default Hero;