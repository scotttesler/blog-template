import Link from "next/link";
import ThemeChanger from "components/theme-changer";

export default function NavBar() {
  return (
    <header className="flex h-24 items-center justify-between">
      <Link href="/">
        <a>
          <svg width="50" height="50" fill="none" viewBox="0 0 24 24">
            <path
              d="M19.25 5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H14C12.8954 4.75 12 5.64543 12 6.75V19.25L12.8284 18.4216C13.5786 17.6714 14.596 17.25 15.6569 17.25H18.25C18.8023 17.25 19.25 16.8023 19.25 16.25V5.75Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H10C11.1046 4.75 12 5.64543 12 6.75V19.25L11.1716 18.4216C10.4214 17.6714 9.40401 17.25 8.34315 17.25H5.75C5.19772 17.25 4.75 16.8023 4.75 16.25V5.75Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </Link>
      <nav>
        <Link href="/about">
          <a className="font-bold mr-12 no-underline text-sm">About</a>
        </Link>
        <Link href="/contact">
          <a className="font-bold mr-12 no-underline text-sm">Contact</a>
        </Link>
        <ThemeChanger />
      </nav>
    </header>
  );
}
