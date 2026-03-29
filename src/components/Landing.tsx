import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ARYAN
              <br />
              <span>KAMINWAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Data Scientist</h3>
            <h2 className="landing-rotator" aria-label="Data Scientist, ML Enthusiast, Analyst">
              <span className="rotator-window" aria-hidden="true">
                <span className="rotator-track">
                  <span className="rotator-item">Data Scientist</span>
                  <span className="rotator-item">ML Enthusiast</span>
                  <span className="rotator-item">Analyst</span>
                  {/* duplicate first item for seamless loop */}
                  <span className="rotator-item" aria-hidden="true">
                    Data Scientist
                  </span>
                </span>
              </span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
