import HomeArt from "./HeroArt.jsx";
import "./projectPlate.css";

export default function ProjectPlate({ project, image = project.image, artCrop = project.artCrop, large = false }) {
  return (
    <div className={`plate ${large ? "plate--large" : ""}`}>
      <div className="plate__art" aria-hidden="true">
        <HomeArt seed={project.seed} viewBox={artCrop} />
      </div>

      <div className="plate__frame">
        <div className="plate__bar">
          <span className="plate__url mono">{project.url}</span>
        </div>
        <img
          className="plate__shot"
          src={image}
          alt={`Screenshot of ${project.title}`}
          width="1600"
          height="1000"
          loading={large ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}