import { Link } from "react-router";
import "./ContactBand.css";

function ContactBand() {
  return (
    <section className="contact-band" aria-labelledby="contact-band-title" data-reveal>
      <h2 id="contact-band-title">Have a role or a project in mind?</h2>
      <p className="lead">
        Full-time roles, internships, contract work and open-source collaborations are all welcome.
      </p>
      <div className="contact-band__actions">
        <Link to="/contact" className="btn contact-band__btn">
          Start a conversation
        </Link>
        <a href="mailto:abrahamjust@gmail.com" className="contact-band__email mono">
          abrahamjust@gmail.com
        </a>
      </div>
    </section>
  );
}

export default ContactBand;