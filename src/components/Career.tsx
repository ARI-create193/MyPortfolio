import "./styles/Career.css";

const Career = () => {
  return (
    <>
      <div className="career-section section-container" id="experience">
        <div className="career-container">
          <h2>Experience</h2>
          <div className="career-info">
            <div className="career-timeline">
              <div className="career-dot"></div>
            </div>
            <div className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>Data Analyst AI Intern</h4>
                  <h5>Owl Ai</h5>
                </div>
                <h3>2024</h3>
              </div>
              <p>
                Led data visualization and dashboard design using Power BI and Tableau. Developed analytics reporting tools to turn complex datasets into actionable insights for AI startup operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="career-section section-container education-section" id="education" style={{ marginTop: "0px" }}>
        <div className="career-container">
          <h2>Education</h2>
          <div className="career-info">
            <div className="career-timeline">
              <div className="career-dot"></div>
            </div>
            <div className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>B.Tech Computer Science</h4>
                  <h5>VIT Bhopal</h5>
                </div>
                <h3>2026</h3>
              </div>
              <p>
                Undergraduate student pursuing a degree in Computer Science Engineering, with a focus on machine learning and software development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;

