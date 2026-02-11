function setNavbarHeight() {
  const header = document.querySelector("header")
  if (!header) return
  const height = header.getBoundingClientRect().height
  document.documentElement.style.setProperty("--notes-navbar-height", `${height}px`)
}

function setupSubscribeForm() {
  const forms = document.querySelectorAll<HTMLFormElement>(".notes-navbar__subscribe-form")
  forms.forEach((form) => {
    const input = form.querySelector<HTMLInputElement>("input[type='email']")
    const handler = async (event: Event) => {
      event.preventDefault()
      if (!input) return
      const email = input.value.trim()
      if (!email) return

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            merge: { SOURCE: "Notes Navbar" },
          }),
        })
        const data = await res.json()
        input.value = ""
        input.placeholder = data.message || "Thanks for subscribing!"
        if (data.message === "You are now subscribed!") {
          window.location.assign("/thank-you-subscribe")
        }
      } catch (error) {
        input.value = ""
        input.placeholder = "Something went wrong"
      }
    }

    form.addEventListener("submit", handler)
    window.addCleanup(() => form.removeEventListener("submit", handler))
  })
}

document.addEventListener("nav", () => {
  setNavbarHeight()
  setupSubscribeForm()

  if (typeof ResizeObserver !== "undefined") {
    const header = document.querySelector("header")
    if (!header) return
    const observer = new ResizeObserver(() => setNavbarHeight())
    observer.observe(header)
    window.addCleanup(() => observer.disconnect())
  } else {
    const onResize = () => setNavbarHeight()
    window.addEventListener("resize", onResize)
    window.addCleanup(() => window.removeEventListener("resize", onResize))
  }
})
