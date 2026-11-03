import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router";
import projects from "../data/projects.js";
import ProjectPlate from "../components/projectPlate.jsx";   
import MisprintHeading from "../components/MisprintHeading.jsx";
import HomeArt from "../components/HeroArt.jsx";             
import Footer from "../components/Footer.jsx";
import "./styles/ProjectPage.css";

function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (project) document.title = `${project.title} | Abraham Justin`;
  }, [project]);

  if (!project) {
    return (
      <div className="case case--missing">
        <h1>Project not found</h1>
        <p>There’s no project at this address. It may have been renamed.</p>
        <Link to="/#work" className="btn btn--primary">See all work</Link>
      </div>
    );
  }

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article className="case">
        <header className="case__header">
          <Link to="/#work" className="case__back">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Back to all work
          </Link>

          <span className="case__kind mono">{project.kind}</span>
          <MisprintHeading className="case__title">{project.title}</MisprintHeading>
          <p className="lead case__summary">{project.summary}</p>

          <dl className="case__meta">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
            <div><dt>Stack</dt><dd className="mono">{project.stack}</dd></div>
            <div>
              <dt>Links</dt>
              <dd className="case__links">
                {project.liveUrl && <a href={project.liveUrl}>Live site</a>}
                {project.codeUrl && <a href={project.codeUrl}>Code</a>}
              </dd>
            </div>
          </dl>
        </header>

        <ProjectPlate project={project} image={project.heroImage} artCrop="0 60 900 640" large />

        <div className="case__body">
          <CaseSection title="The problem">
            {project.problem.map((text, i) => <p key={i}>{text}</p>)}
          </CaseSection>

          <CaseSection title="What I built">
            {project.built.map((text, i) => <p key={i}>{text}</p>)}
          </CaseSection>

          <CaseSection title="How it works">
            <p>{project.how}</p>
            <figure className="arch">
              <div className="arch__flow">
                {project.architecture.map((step, i) => (
                  <Fragment key={step.name}>
                    {i > 0 && (
                      <span className={`arch__link ${step.ml ? "arch__link--ml" : ""}`} aria-hidden="true" />
                    )}
                    <div className={`arch__box ${step.ml ? "arch__box--ml" : ""}`}>
                      <strong>{step.name}</strong>
                      <span className="mono muted">{step.tech}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
              <figcaption className="muted">Request flow. The pink link is the ML part.</figcaption>
            </figure>
          </CaseSection>

          <div className="case__gallery" data-reveal>
            {project.gallery.map((shot) => (
              <figure key={shot.src}>
                <img src={shot.src} alt={shot.alt} width="1200" height="900" loading="lazy" />
                <figcaption className="muted">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>

          <CaseSection title="What came of it">
            {project.outcomes.map((text, i) => <p key={i}>{text}</p>)}
          </CaseSection>
        </div>

        <Link to={`/projects/${next.slug}`} className="case__next" data-reveal>
          <div className="case__next-text">
            <span className="case__next-label">Next project</span>
            <span className="case__next-title">{next.title}</span>
            <span className="mono muted">{next.kind}</span>
          </div>
          <div className="case__next-art" aria-hidden="true">
            <HomeArt seed={next.seed} viewBox={next.artCrop} />
          </div>
        </Link>
      </article>
      <Footer />
    </>
  );
}

function CaseSection({ title, children }) {
  return (
    <section className="case__section" data-reveal>
      <h2>{title}</h2>
      <div className="case__prose">{children}</div>
    </section>
  );
}

export default Project;