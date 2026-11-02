function MisprintHeading({ children, className = "" }) {
  return (
    <h1 className={`misprint ${className}`}>
      <span className="misprint__ink">{children}</span>
      <span className="misprint__copy" aria-hidden="true">{children}</span>
    </h1>
  );
}

export default MisprintHeading;