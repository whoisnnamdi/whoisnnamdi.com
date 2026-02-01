import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import styles from "./styles/navbar.scss"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/navbar.inline"

const NotesNavbar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const navLinks = [
    { href: "/essays/", label: "Essays" },
    { href: "/notes/", label: "Notes", active: true },
    { href: "/talks/", label: "Talks" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/about-me/", label: "whoami" },
  ]

  return (
    <nav class={classNames(displayClass, "notes-navbar")}>
      <div class="notes-navbar__left">
        <a class="notes-navbar__logo" href="/" data-router-ignore>
          Nnamdi.
        </a>
        <div class="notes-navbar__context">
          <span class="notes-navbar__divider" aria-hidden="true"></span>
          <span class="notes-navbar__code">INDEX 03</span>
          <span class="notes-navbar__line" aria-hidden="true"></span>
          <span class="notes-navbar__label">NOTES.</span>
        </div>
      </div>
      <div class="notes-navbar__right">
        <div class="notes-navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              class={classNames("notes-navbar__link", link.active && "is-active")}
              href={link.href}
              data-router-ignore
            >
              {link.label}
            </a>
          ))}
        </div>
        <details class="notes-navbar__subscribe">
          <summary class="notes-navbar__subscribe-toggle">Subscribe_</summary>
          <form class="notes-navbar__subscribe-form">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              aria-label="Email address"
              required
            />
            <button type="submit">Join</button>
          </form>
        </details>
      </div>
    </nav>
  )
}

NotesNavbar.css = styles
NotesNavbar.afterDOMLoaded = script

export default (() => NotesNavbar) satisfies QuartzComponentConstructor
