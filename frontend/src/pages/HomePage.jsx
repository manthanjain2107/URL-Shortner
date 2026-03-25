import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="hero-layout">
      <section className="hero-copy">
        <p className="eyebrow">Smart links for everyday sharing</p>
        <h1>The best URL shortener in the market.</h1>
        <p>
          URLite helps you turn long messy links into short, clean URLs that are easy to share and
          quick to remember.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/generate">
            Try Now
          </Link>
        </div>
      </section>
      <section className="hero-visual">
        <img src="/vector.jpg" alt="URL shortener illustration" />
      </section>
    </main>
  );
}

export default HomePage;
