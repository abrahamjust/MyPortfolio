import "./About.css";

const toolbox = [
  { title: "Frontend", items: ["TypeScript", "React, Next.js", "CSS, design systems"] },
  { title: "Backend",  items: ["Node, Go", "Postgres, Redis", "Docker, AWS"] },
  { title: "ML",       items: ["Python, PyTorch", "scikit-learn", "LLM APIs, RAG"], accent: true },
];

function About() {
  return (
    <section className="about" id="about" data-reveal-line>
      <div className="about__bio" data-reveal>
        <h2>About</h2>
        <p className="lead">
          [Two or three sentences about you: what you like building, where you've
          worked, and what you want to do next.]
        </p>
        <p className="muted">
          [A shorter paragraph for the human side: where you're based, what you do
          away from the keyboard.]
        </p>
        <a href="/resume.pdf" className="about__resume" download>
          Download résumé (PDF)
        </a>
      </div>

      <div className="about__toolbox" data-reveal>
        {toolbox.map((group) => (
          <div
            key={group.title}
            className={`about__group ${group.accent ? "about__group--accent" : ""}`}
          >
            <h3>{group.title}</h3>
            <ul className="mono">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;