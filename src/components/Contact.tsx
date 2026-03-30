import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { useState } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const [result, setResult] = useState("Send Message");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    
    // Web3Forms Access Key
    formData.append("access_key", "08e40988-1846-49eb-a15d-58edae163323");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    }).then((res) => res.json());

    if (res.success) {
      setResult("Message Sent Successfully!");
      target.reset();
      // Optional: Reset button text back after a few seconds
      setTimeout(() => setResult("Send Message"), 5000);
    } else {
      setResult(res.message || "Failed to send");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-form-section">
          <form onSubmit={onSubmit} className="contact-form-horizontal">
            <input type="hidden" name="subject" value="New Submission from Portfolio Website" />
            <input type="text" name="name" placeholder="Your Name" required data-cursor="disable"/>
            <input type="email" name="email" placeholder="Your Email" required data-cursor="disable"/>
            <input type="text" name="message" placeholder="Your Message" required data-cursor="disable"/>
            <button type="submit" className="submit-btn" data-cursor="disable">{result}</button>
          </form>
        </div>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:aryankaminwar@gmail.com" data-cursor="disable">
                aryankaminwar@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+91 8446548140" data-cursor="disable">
                +91 8446548140
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/ARI-create193"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://linkedin.com/in/aryan-omprakash-kaminwar"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/iykyk_aarryyaan/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Aryan Kaminwar</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
