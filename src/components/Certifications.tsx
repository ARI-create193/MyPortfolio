import { useState } from "react";
import "./styles/Certifications.css";
import WorkImage from "./WorkImage";

const certifications = [
  {
    name: "Machine Learning with Python",
    issuer: "IBM | Coursera",
    category: "Machine Learning | Validation",
    description: "A professional credential validating core concepts, mathematical principles, and practical application of Machine Learning algorithms using Python.",
    skills: [
      "Supervised learning algorithms (Regression, Decision Trees, SVM, KNN)",
      "Unsupervised learning methods (Clustering, K-Means, Hierarchical)",
      "Model evaluation metrics (MSE, R2-score, F1-score, LogLoss)",
      "Recommender Systems (Content-based and Collaborative filtering)"
    ],
    tools: "Python, Scikit-learn, NumPy, Pandas, Matplotlib, SciPy",
    link: "https://coursera.org/verify/H130D31J87CF",
    image: "/images/ibm_ml_certificate.png"
  }
];

const Certifications = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : certifications.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < certifications.length - 1 ? prev + 1 : 0));
  };

  const currentCert = certifications[activeIdx];

  return (
    <section className="certifications-section" id="certifications" aria-labelledby="certifications-title">
      <div className="certifications-container section-container">
        <div className="certifications-header">
          <h2>
            My <span>Certifications</span>
          </h2>
          {certifications.length > 1 && (
            <div className="certifications-arrows">
              <button onClick={handlePrev} className="certifications-arrow-btn" aria-label="Previous Certificate">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button onClick={handleNext} className="certifications-arrow-btn" aria-label="Next Certificate">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="certifications-slider-container">
          <div className="certifications-slide" key={activeIdx}>
            <div className="certifications-info">
              <div className="certifications-title">
                <h3>0{activeIdx + 1}</h3>
                <div>
                  <h4>{currentCert.name}</h4>
                  <p>{currentCert.issuer}</p>
                </div>
              </div>
              <p className="certifications-description">{currentCert.description}</p>
              <ul className="certifications-features">
                {currentCert.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>

              <h4 className="certifications-tech-title">Skills &amp; Libraries</h4>
              <p className="certifications-tech-list">{currentCert.tools}</p>
              
              {currentCert.link && (
                <a href={currentCert.link} target="_blank" rel="noopener noreferrer" className="certifications-verify-link">
                  Verify Certificate
                </a>
              )}
            </div>

            <div className="certifications-image-container">
              <WorkImage image={currentCert.image} alt={currentCert.name} link={currentCert.link} />
            </div>
          </div>
        </div>

        {certifications.length > 1 && (
          <div className="certifications-dots">
            {certifications.map((_, idx) => (
              <span
                key={idx}
                className={`certifications-dot-indicator ${idx === activeIdx ? "active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
