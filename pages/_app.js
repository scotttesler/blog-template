import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      // storageKey="nightwind-mode"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
