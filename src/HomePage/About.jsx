import "./About.css";

const toolbox = [
  { title: "Frontend", items: ["React, TypeScript", "Vite", "HTML, CSS, JavaScript"] },
  { title: "Backend",  items: ["Node.js, Express", "Python, FastAPI", "MongoDB, Redis, BullMQ"] },
  { title: "ML",       items: ["PyTorch, scikit-learn", "XGBoost, SHAP", "BM25, Doc2Vec", "Gemini, Ollama, MCP"], accent: true },
];

function About() {
  return (
    <section className="about" id="about" data-reveal-line>
      <div className="about__bio" data-reveal>
        <h2>About</h2>
        <p className="lead">
          I love building full-stack web apps and connecting them to machine learning
          models and retrieval (RAG).
        </p>
        <p className="muted">
          I’m studying for an integrated MTech in Computer Science and Engineering,
          specialising in Business Analytics, at VIT Chennai, and I graduate in 2028.
        </p>
        <p className="muted">
          One word for me would be “philomath”: I enjoy learning and exploring ideas,
          technical or not. Away from the keyboard I’m a cinephile, I read, I binge the
          occasional web series, and I watch a lot of football. Glory glory Man United!
          Start a conversation with me about almost anything.
        </p>
        <a href="/Abraham_Justin_Resume.pdf" className="about__resume" download>
          Download résumé (PDF)
        </a>
      </div>

      <div className="about__toolbox" data-reveal style={{ "--delay": "120ms" }}>
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