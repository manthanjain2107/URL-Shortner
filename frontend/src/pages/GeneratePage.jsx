import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";
const APP_BASE = "http://localhost:5000";

function GeneratePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [recentUrls, setRecentUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [clearingHistory, setClearingHistory] = useState(false);

  async function fetchRecentUrls() {
    try {
      const response = await fetch(`${API_BASE}/urls`);
      const result = await response.json();
      if (response.ok) {
        setRecentUrls(result.data || []);
      }
    } catch {
      setRecentUrls([]);
    }
  }

  useEffect(() => {
    fetchRecentUrls();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setGeneratedUrl("");

    try {
      const response = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl, shortCode }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to generate short URL.");
      }

      setGeneratedUrl(result.data.shortUrl);
      setMessage(result.message);
      setOriginalUrl("");
      setShortCode("");
      fetchRecentUrls();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE}/urls/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete short URL.");
      }

      setRecentUrls((currentUrls) => currentUrls.filter((item) => item._id !== id));
      setMessage(result.message);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setDeletingId("");
    }
  }

  async function handleClearHistory() {
    setClearingHistory(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE}/urls`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to clear history.");
      }

      setRecentUrls([]);
      setMessage(result.message);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setClearingHistory(false);
    }
  }

  return (
    <main className="generator-layout">
      <section className="generator-card">
        <div className="card-header">
          <p className="eyebrow">Create short links</p>
          <h2>Generate your short URL</h2>
        </div>

        <form className="generator-form" onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your long URL"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Preferred short code (optional)"
            value={shortCode}
            onChange={(event) => setShortCode(event.target.value)}
          />
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {message && <p className="status success">{message}</p>}
        {error && <p className="status error">{error}</p>}

        {generatedUrl && (
          <div className="result-box">
            <span>Your short link</span>
            <a href={generatedUrl} target="_blank" rel="noreferrer">
              {generatedUrl}
            </a>
          </div>
        )}
      </section>

      <section className="history-card">
        <div className="card-header history-header">
          <div>
            <p className="eyebrow">Recent links</p>
            <h2>Saved in local MongoDB</h2>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={handleClearHistory}
            disabled={recentUrls.length === 0 || clearingHistory}
          >
            {clearingHistory ? "Clearing..." : "Clear history"}
          </button>
        </div>
        <div className="history-list">
          {recentUrls.length === 0 && <p className="empty-state">No URLs yet. Create your first one.</p>}
          {recentUrls.map((item) => (
            <article className="history-item" key={item._id}>
              <div className="history-item-top">
                <a href={`${APP_BASE}/${item.shortCode}`} target="_blank" rel="noreferrer">
                  {APP_BASE}/{item.shortCode}
                </a>
                <button
                  className="history-action"
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id || clearingHistory}
                >
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              </div>
              <p>{item.originalUrl}</p>
              <span>{item.clicks} clicks</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default GeneratePage;