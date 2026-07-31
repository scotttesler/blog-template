import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-lg px-8">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
