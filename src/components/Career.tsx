import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> Education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>Unified Mentor</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed internship focusing on data science projects including machine learning models, data analysis, and interactive dashboard development.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Virtual Intern</h4>
                <h5>Owl Ai</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed virtual internship focusing on data analysis tasks with hands-on experience in a fast-paced AI startup environment. Worked independently on assigned tasks within deadlines.
            </p>
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
  );
};

export default Career;
