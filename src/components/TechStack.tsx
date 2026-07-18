import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { SiGradio, SiMysql, SiNumpy, SiPython, SiScikitlearn, SiSnowflake } from "react-icons/si";


type Tech = {
  name: string;
  icon?: IconType;
  image?: string;
  color?: string;
  mark?: string;
  iconType?: "matplotlib" | "powerbi" | "dax";
  category: string;
  detail: string;
};

const techItems: Tech[] = [
  { name: "Python", icon: SiPython, color: "#3776ab", category: "Core", detail: "Analysis & automation" },
  { name: "Java", icon: FaJava, color: "#e76f00", category: "Core", detail: "Core programming" },
  { name: "SQL", icon: SiMysql, color: "#4479a1", category: "Core", detail: "Databases & queries" },
  { name: "NumPy", icon: SiNumpy, color: "#4dabcf", category: "Analyze", detail: "Numerical computing" },
  { name: "Pandas", image: "/images/pandas.png", category: "Analyze", detail: "Data wrangling" },
  { name: "Matplotlib", iconType: "matplotlib", category: "Analyze", detail: "Data storytelling" },
  { name: "DAX Query", iconType: "dax", category: "Analyze", detail: "Power BI calculations" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#f7931e", category: "Build", detail: "Predictive models" },
  { name: "Gradio", icon: SiGradio, color: "#f97316", category: "Build", detail: "Interactive ML apps" },
  { name: "Power BI", iconType: "powerbi", category: "Visualize", detail: "Business intelligence" },
  { name: "Tableau", image: "/images/tableau.png", category: "Visualize", detail: "Visual analytics" },
  { name: "Snowflake", icon: SiSnowflake, color: "#29b5e8", category: "Visualize", detail: "Cloud data platform" },
];

const TechIcon = ({ tech }: { tech: Tech }) => {
  if (tech.image) return <img className="multicolor-logo" src={tech.image} alt="" />;
  if (tech.icon) {
    const Icon = tech.icon;
    return <Icon color={tech.color} aria-hidden="true" />;
  }
  if (tech.iconType === "powerbi") return <span className="powerbi-icon" aria-hidden="true"><i></i><i></i><i></i></span>;
  if (tech.iconType === "matplotlib") return <span className="matplotlib-icon" aria-hidden="true"><i></i><i></i><i></i></span>;
  if (tech.iconType === "dax") return <span className="dax-icon" aria-hidden="true">ƒx</span>;
  return <span>{tech.mark}</span>;
};

const TechStack = () => (
  <section className="techstack" aria-labelledby="techstack-title">
    <div className="tech-lab-layout">
      <header className="techstack-copy">
        <p>Explore my</p>
        <h2 id="techstack-title">My <span>Toolkit</span></h2>
      </header>

      <div className="tech-lab" aria-label="Technology toolkit">
        <div className="lab-topbar"><span className="lab-light"></span><span className="lab-light"></span><span className="lab-light"></span><p>TECH LAB / DATA &amp; AI</p></div>
        <div className="tech-shelf">
          {techItems.map((tech) => (
            <article className="tech-tile" key={tech.name} tabIndex={0} aria-label={`${tech.name}: ${tech.detail}`}>
              <span className="tile-category">{tech.category}</span>
              <div className="tile-icon">
                <TechIcon tech={tech} />
              </div>
              <h3>{tech.name}</h3>
              <p>{tech.detail}</p>
              <span className="tile-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <div className="lab-base"></div>
      </div>
    </div>
  </section>
);

export default TechStack;
