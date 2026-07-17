import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    name: "Netflix Analytics Power BI Dashboard",
    category: "Data Analytics | Visualization",
    description: "An interactive Power BI dashboard analyzing Netflix's content library, covering movies, TV shows, genres, ratings, and global content distribution.",
    features: [
      "Dynamic KPI metrics tracking total titles, genres, and geographic availability",
      "Interactive category analysis comparing movies vs TV shows and top genres",
      "Average rating gauges and content addition trends over time"
    ],
    tools: "Power BI, DAX, Excel, ETL, Data Visualization",
    link: "https://github.com/ARI-create193/Netflix-Analytics-Power-BI",
    image: "/images/netflix_powerbi.png"
  },
  {
    name: "Supermarket Grocery Sales Analytics",
    category: "Data Science | Analytics",
    description: "Interactive ML-powered web app for grocery sales analysis and future prediction.",
    features: [
      "Sales trend prediction using machine learning algorithms",
      "Real-time data visualization via interactive Gradio interface"
    ],
    tools: "Python, Gradio, Machine Learning, Pandas, NumPy",
    link: "https://github.com/ARI-create193/Supermart-Grocery-Sales-Retail-Analytics-Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
  },
  {
    name: "Netflix Recommendation & Prediction Dashboard",
    category: "Machine Learning | Analytics",
    description: "Comprehensive analytics platform for Netflix content with ML-powered recommendations.",
    features: [
      "ML-based personalized content recommendation engine",
      "Predictive analytics dashboard for viewing trends"
    ],
    tools: "Python, Gradio, Machine Learning, Matplotlib",
    link: "https://github.com/ARI-create193/Netflix-data-Analysis-Prediction-Recommendation-Dashboard",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000"
  }
];

const Work = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const currentProject = projects[activeIdx];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-arrows">
            <button onClick={handlePrev} className="work-arrow-btn" aria-label="Previous Project">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button onClick={handleNext} className="work-arrow-btn" aria-label="Next Project">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="work-slider-container">
          <div className="work-slide" key={activeIdx}>
            <div className="work-info">
              <div className="work-title">
                <h3>0{activeIdx + 1}</h3>
                <div>
                  <h4>{currentProject.name}</h4>
                  <p>{currentProject.category}</p>
                </div>
              </div>
              <p className="work-description">{currentProject.description}</p>
              <ul className="work-features">
                {currentProject.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <h4 className="work-tech-title">Tech Stack</h4>
              <p className="work-tech-list">{currentProject.tools}</p>
              
              {currentProject.link && (
                <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="work-github-link">
                  View Project
                </a>
              )}
            </div>

            <div className="work-image-container">
              <WorkImage image={currentProject.image} alt={currentProject.name} />
            </div>
          </div>
        </div>

        <div className="work-dots">
          {projects.map((_, idx) => (
            <span
              key={idx}
              className={`work-dot-indicator ${idx === activeIdx ? "active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
