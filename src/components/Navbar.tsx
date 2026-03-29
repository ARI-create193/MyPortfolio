import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export const smoother = {
  paused: (_paused: boolean) => {},
};

const Navbar = () => {
  useLayoutEffect(() => {
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let el = e.currentTarget as HTMLAnchorElement;
        let section = el.getAttribute("data-href") || el.getAttribute("href");
        if (!section) return;
        const target = document.querySelector(section);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ 
            background: 'var(--accentColor)', 
            color: '#000', 
            minWidth: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%', 
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '-1px'
          }}>AK</div>
          <div style={{ fontWeight: 600, fontSize: '22px', letterSpacing: '1px', color: '#fff' }}>
            aryan<span style={{ color: 'var(--accentColor)' }}>.</span>
          </div>
        </a>
        <a
          href="mailto:aryankaminwar@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          aryankaminwar@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
