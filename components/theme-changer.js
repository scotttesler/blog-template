import "react-toggle/style.css";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toggle from "react-toggle";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <span className="align-middle theme-changer">
      <Toggle
        defaultChecked={resolvedTheme === "dark"}
        icons={{
          checked: (
            <FontAwesomeIcon
              className="mt-[-0.2rem]"
              color="white"
              icon={faMoon}
            />
          ),
          unchecked: (
            <FontAwesomeIcon
              className="ml-[-0.2rem] mt-[-0.2rem]"
              color="yellow"
              icon={faSun}
            />
          ),
        }}
        onChange={handleToggle}
      />

      <style global jsx>{`
        .theme-changer .react-toggle-track {
          background-color: gray !important;
        }

        .theme-changer .react-toggle-thumb {
          border-color: gray;
          box-shadow: none;
        }
      `}</style>
    </span>
  );
}
