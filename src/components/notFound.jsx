// src/NotFound.jsx
import { useEffect } from "react";
import { Link } from "react-router";

function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Abraham Justin";
  }, []);

  return (
    <div className="case case--missing">
      <h1>Page not found</h1>
      <p>There’s nothing at this address. Check the link, or head back to the work.</p>
      <Link to="/" className="btn btn--primary">Go to the home page</Link>
    </div>
  );
}

export default NotFound;