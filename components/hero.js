export default function Hero() {
  return (
    <div className="hero">
      <h1 className="hero-title">Blog template.</h1>
      <div className="hero-subtitle">Put your tagline here.</div>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 2rem 0 7rem 0;
        }

        .hero-title {
          font-size: 3rem;
        }

        .hero-subtitle {
          font-size: 1.15em;
          line-height: 1.68;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
