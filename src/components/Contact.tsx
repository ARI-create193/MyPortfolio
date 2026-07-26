import { MdCopyright } from "react-icons/md";
import { useState } from "react";
import "./styles/Contact.css";

const Contact = () => {
  const [result, setResult] = useState("Send Message");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        target.reset();
        setTimeout(() => setResult("Send Message"), 5000);
      } else {
        console.error("Error", data);
        setResult(data.error || "Failed to send");
        setTimeout(() => setResult("Send Message"), 5000);
      }
    } catch (error) {
      console.error("Email send error:", error);
      setResult("Failed to send");
      setTimeout(() => setResult("Send Message"), 5000);
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-form-section">
          <form onSubmit={onSubmit} className="contact-form-horizontal">
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
