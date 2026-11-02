import { Link } from "react-router";
import HomeArt from "../components/HeroArt.jsx";
import projects from "../data/projects.js";
import "./Projects.css";

function Projects() {
  return (
    <section className="projects" id="work">
      <div className="projects__intro">
        <h2>Selected work</h2>
        <p className="muted">
          Four projects across web, backend and ML. Each one has a short case study.
        </p>
      </div>

      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </section>
  );
}

function ProjectRow({ project }) {
  return (
    <article className="project-row">
      <ProjectPlate project={project} />

      <div className="project-row__text">
        <span className="project-row__kind mono">{project.kind}</span>
        <h3>{project.title}</h3>
        <p className="muted">{project.summary}</p>

        <dl className="project-row__meta">
          <dt>Role</dt>
          <dd>{project.role}</dd>
          <dt>Stack</dt>
          <dd className="mono">{project.stack}</dd>
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </dl>

        <div className="project-row__links">
          <Link to={`/projects/${project.slug}`} className="btn btn--primary">
            Read the case study
          </Link>
          <a href={project.liveUrl}>Live site</a>
          <a href={project.codeUrl}>Code</a>
        </div>
      </div>
    </article>
  );
}

function ProjectPlate({ project }) {
  return (
    <div className="plate">
      <div className="plate__art" aria-hidden="true">
        <HomeArt seed={project.seed} viewBox={project.artCrop} />
      </div>

      <div className="plate__frame">
        <div className="plate__bar">
          <span className="plate__url mono">{project.url}</span>
        </div>
        <img
          className="plate__shot"
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width="1600"
          height="1000"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Projects;