import { useState } from "react";
import HomeArt from "../components/HeroArt.jsx";
import MisprintHeading from "../components/MisprintHeading.jsx";
import Footer from "../components/Footer.jsx";
import "./styles/contactPage.css";

const FORM_ENDPOINT = "https://formspree.io/f/xljjoqjp";
const EMAIL = "abrahamjust@gmail.com";

const topics = [
  { id: "role",     label: "Full-time role / internship", org: "Company and role title",        hint: "The team, the role, and what you're building." },
  { id: "contract", label: "Contract work",  org: "Company or project",            hint: "Scope, rough timeline and budget range." },
  { id: "collab",   label: "Collaboration",  org: "Project link (optional)",       hint: "What the project is and where you could use help." },
  { id: "other",    label: "Something else", org: "Company or project (optional)", hint: "What's on your mind?" },
];

function Contact() {
  const [topicId, setTopicId] = useState("role");
  const [status, setStatus] = useState("idle");   // idle | sending | sent | error
  const topic = topics.find((t) => t.id === topicId);

  async function handleSubmit(event) {
    event.preventDefault();               // stop the browser reloading the page
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),         // collects every field by its name
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setTopicId("role");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
        <div className="contact">
            {/* ---- Left: intro ---- */}
            <div className="contact__intro">
                <MisprintHeading className="contact__title">Let's talk</MisprintHeading>

                <p className="lead">
                Hiring for a full-stack or ML-adjacent role, or have a project to build
                together? Tell me a little about it.
                </p>
                <p className="muted">
                I reply within two working days. Based in Chennai, working in IST (Indian Standard Time).
                </p>

                <dl className="contact__details">
                <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${EMAIL}`} className="mono">{EMAIL}</a></dd>
                </div>
                <div>
                    <dt>Elsewhere</dt>
                    <dd className="contact__links">
                    <a href="https://github.com/abrahamjust" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/abraham-justin-b28184284" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="/resume.pdf" download>Résumé (PDF)</a>
                    </dd>
                </div>
                </dl>

                <div className="contact__art" aria-hidden="true">
                <HomeArt seed={417} viewBox="380 150 520 300" />
                </div>
            </div>

            {/* ---- Right: form or confirmation ---- */}
            <div className="contact__panel">
                {status === "sent" ? (
                <div className="contact__sent" role="status">
                    <h2>Message sent</h2>
                    <p>Thanks. I’ll reply to the email you gave within two working days.</p>
                    <button type="button" className="btn btn--outline" onClick={() => setStatus("idle")}>
                    Write another message
                    </button>
                </div>
                ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                    <div className="contact__pair">
                    <div className="field">
                        <label htmlFor="cf-name">Your name</label>
                        <input id="cf-name" name="name" type="text" autoComplete="name" required />
                    </div>
                    <div className="field">
                        <label htmlFor="cf-email">Email</label>
                        <input id="cf-email" name="email" type="email" autoComplete="email" required />
                    </div>
                    </div>

                    <fieldset className="field">
                    <legend>What’s this about?</legend>
                    <div className="chips">
                        {topics.map((t) => (
                        <label key={t.id} className="chip">
                            <input
                            type="radio"
                            name="topic"
                            value={t.label}
                            checked={topicId === t.id}
                            onChange={() => setTopicId(t.id)}
                            />
                            <span>{t.label}</span>
                        </label>
                        ))}
                    </div>
                    </fieldset>

                    <div className="field">
                    <label htmlFor="cf-org">{topic.org}</label>
                    <input id="cf-org" name="organisation" type="text" />
                    </div>

                    <div className="field">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" rows="6" placeholder={topic.hint} required />
                    </div>

                    {/* Spam trap: hidden from people, bots fill it in */}
                    <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="visually-hidden" aria-hidden="true" />

                    {status === "error" && (
                    <p className="contact__error" role="alert">
                        Your message didn’t send. Check your connection and try again,
                        or email me directly at {EMAIL}.
                    </p>
                    )}

                    <div className="contact__submit">
                    <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                    <span className="muted">Goes straight to my inbox.</span>
                    </div>
                </form>
                )}
            </div>
        </div>
        <Footer />
    </>
  );
}

export default Contact;