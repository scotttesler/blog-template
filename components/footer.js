import { MarkGithubIcon } from "@primer/octicons-react";

export default function Footer() {
  return (
    <footer className="pb-8 pt-24 text-center text-sm">
      <a href="https://github.com/scotttesler" target="_href">
      <MarkGithubIcon size={16} /> Scott Tesler
      </a>{" "}
      | Copyright © 2021
    </footer>
  );
}
