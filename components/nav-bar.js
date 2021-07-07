import Image from "next/image";
import Link from "next/link";
import ThemeChanger from "components/theme-changer";

export default function NavBar() {
  return (
    <header className="flex h-24 items-center justify-between">
      <div className="w-12">
        <Link href="/">
          <a>
            <img
              className="dark:invert"
              alt="settings.site_name"
              src="/images/all seeing eye.svg"
            />
          </a>
        </Link>
      </div>
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
