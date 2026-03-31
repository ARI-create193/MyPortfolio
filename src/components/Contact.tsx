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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const from =
        (import.meta.env.VITE_RESEND_FROM as string | undefined) ??
        "Acme <onboarding@resend.dev>";
      const toEmail =
        (import.meta.env.VITE_RESEND_TO as string | undefined) ??
        "aryankaminwar@gmail.com";

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [toEmail], // If you’re not using Resend onboarding, set VITE_RESEND_FROM to a verified email.
          subject: `New Portfolio Message from ${name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        })
      });

      if (res.ok) {
        setResult("Message Sent Successfully!");
        target.reset();
        setTimeout(() => setResult("Send Message"), 5000);
      } else {
        const errorData = await res.json();
        setResult(errorData.message || "Failed to send");
      }
    } catch (error) {
      console.error("Email send error:", error);
      setResult("Failed to send");
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
