import { useEffect, useState } from "react";
import Footer from "components/footer";
import NavBar from "components/nav-bar";

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="container max-w-screen-lg mx-auto px-8">
      <NavBar />
      {children}
      <Footer />

      {/* <style jsx>{`
        .layout {
          padding: 0;
        }

        .layout.sticky-header {
          padding: 6rem 0 0 0;
        }
      `}</style> */}
    </div>
  );
}
