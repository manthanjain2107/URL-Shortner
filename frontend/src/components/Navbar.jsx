import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        URLite
      </Link>
      <div className="nav-links">
        <a href="https://github.com/manthanjain2107" target="_blank" rel="noreferrer">
          <img src="/github.png" alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/manthan-jain-66a37a305?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/linkedin.png" alt="LinkedIn" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
