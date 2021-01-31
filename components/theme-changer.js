import "react-toggle/style.css";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import overrides from "blog.config";
import Toggle from "react-toggle";

export default function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  return (
    <div className="theme-changer">
      <Toggle
        checked={resolvedTheme === "dark"}
        icons={{
          checked: (
            <FontAwesomeIcon icon={faMoon} style={{ margin: "-0.16rem 0 0 -0.16rem" }} />
          ),
          unchecked: (
            <img className="icon" src="/images/theme-changer-icon-sun.svg" />
          ),
        }}
        onChange={handleToggle}
      />

      <style global jsx>{`
        .theme-changer .react-toggle-track {
          background-color: var(--theme-changer-background-color, gray) !important;
        }

        .theme-changer .react-toggle-thumb {
          border-color: gray;
          box-shadow: none;
        }
      `}</style>

      <style jsx>{`
        .icon {
          margin: -0.25rem;
          max-width: unset;
          width: 175%;
        }

        .theme-changer {
          display: inline;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
