import gsap from "gsap";
import { smoother } from "../Navbar";
import { splitChars } from "./domSplit";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = splitChars([
    ...Array.from(document.querySelectorAll(".landing-intro h2")),
    ...Array.from(document.querySelectorAll(".landing-intro h1")),
  ]);
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info h3",
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      ease: "power2.out",
      y: 0,
      delay: 0.55,
    }
  );

  gsap.fromTo(
    ".landing-rotator",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const track = document.querySelector(".rotator-track") as HTMLElement | null;
  const items = track?.querySelectorAll(".rotator-item") ?? [];
  if (track && items.length > 1) {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    const hold = 2.2;

    // Start at the first item
    tl.set(track, { yPercent: 0 });

    // Animate down the list (including the duplicate last item), then snap back to 0
    for (let i = 1; i < items.length; i++) {
      tl.to(track, { yPercent: -100 * i, duration: 0.9, ease: "power3.inOut" });
      tl.to({}, { duration: hold });
    }
    tl.set(track, { yPercent: 0 });
  }
}
