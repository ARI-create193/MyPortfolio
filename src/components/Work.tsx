import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
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
    name: "Netflix Data Analysis",
    category: "Machine Learning | Analytics",
    description: "Comprehensive analytics platform for Netflix content with ML-powered recommendations.",
    features: [
      "ML-based personalized content recommendation engine",
      "Predictive analytics dashboard for viewing trends"
    ],
    tools: "Python, Gradio, Machine Learning, Matplotlib",
    link: "https://github.com/ARI-create193/Netflix-data-Analysis-Prediction-Recommendation-Dashboard",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000"
  },
  {
    name: "Google Play Store Analytics",
    category: "Analytics | ML Prediction",
    description: "Analytics platform for Play Store app performance with ML-based rating prediction.",
    features: [
      "App rating prediction using machine learning models",
      "Performance & download trend analysis with web visualization"
    ],
    tools: "Python, Gradio, Machine Learning, Data Analysis",
    link: "https://github.com/ARI-create193/Google-Play-Store-Analysis-Prediction-Dashboard",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1000"
  },
  {
    name: "Customer Satisfaction System",
    category: "NLP & ML System",
    description: "ML + NLP system that predicts customer satisfaction ratings from support data.",
    features: [
      "NLP-based sentiment analysis on customer support data",
      "Real-time satisfaction prediction via interactive web interface"
    ],
    tools: "Python, Gradio, Machine Learning, NLP",
    link: "https://github.com/ARI-create193/Customer-Satisfaction-Prediction-Dashboard",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000"
  }
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p style={{ marginTop: '0', fontSize: '15px' }}>{project.description}</p>
                <ul style={{ margin: '15px 0', paddingLeft: '20px', fontSize: '14px', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {project.features.map((feature, i) => <li key={i}>{feature}</li>)}
                </ul>

                <h4>Tech Stack</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
