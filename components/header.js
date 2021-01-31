import Link from "next/link";
import ThemeChanger from "components/theme-changer";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="left">
          <Link href="/">
            <a>
              <img
                alt="settings.site_name"
                className="logo"
                src="/images/all seeing eye.svg"
              />
            </a>
          </Link>
        </div>
        <nav className="nav right">
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
          <ThemeChanger />
        </nav>
      </div>

      <style jsx>{`
        a {
          text-decoration: none;
        }

        .header {
          position: relative;
          height: 6rem;
          z-index: 10;
        }

        .header.sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
        }

        .header > .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo {
          filter: invert(var(--invert-logo));
          height: 3.5rem;
        }

        .site-name {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          text-transform: uppercase;
        }

        .nav > * {
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: 4px;
          margin-right: 3rem;
          padding-bottom: 4px;
          border-bottom: 1px solid;
          border-color: transparent;
          transition: border 0.15s;
        }

        .nav > *:last-child {
          margin: 0;
        }

        .nav > *:hover {
          border-color: inherit;
        }

        .nav > .active {
          border-color: inherit;
        }
      `}</style>
    </header>
  );
}
