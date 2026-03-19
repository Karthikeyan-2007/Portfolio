import { useState, useEffect } from "react";
import Style from "./Contact.module.css";
import { supabase } from "../Client";

const ContactPage = () => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Submit to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent double click

    setIsSubmitting(true);

    const { error } = await supabase.from("contacts").insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error("Error:", error.message);
      alert("Failed to send message: " + error.message);
      setIsSubmitting(false);
    } else {
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setIsSubmitting(false);

      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <div className={Style.contact_page}>
      <div
        className={`${Style.contact_container} ${
          animate ? Style.show : ""
        }`}
      >
        <div className={Style.contact_header}>
          <h1 style={{ margin: "0px" }}>Get In Touch</h1>
          <p className={Style.subtitle}>
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </div>

      <div className={Style.section}>
        {/* LEFT SIDE */}
        <div className={Style.side_text}>
          <p>(Contact us)</p>
          <div className={Style.head}>
            LET’S <br />
            WORK <br />
            TOGETHER
          </div>
          <br />
          <br />
          <div className={Style.des}>
            Have a project in mind? We’d love to hear about it. Let’s create
            something great together!
          </div>
          <br />
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ width: "60%", fontSize: "20px", fontWeight: "bold" }}>
              By submitting you agree to our Terms of Service and Privacy Policy
            </p>
            <button className={Style.subscribe_btn}>SUBSCRIBE</button>
          </div>
        </div>

        <br />
        <br />

        {/* FORM */}
        <div className={Style.contact_content}>
          <form className={Style.contact_form} onSubmit={handleSubmit}>
            {/* Name */}
            <div className={Style.form_group}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className={Style.form_group}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject */}
            <div className={Style.form_group}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className={Style.form_group}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={Style.submit_btn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {submitSuccess && (
              <div className={Style.success_message}>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>

          <br />

          {/* CONTACT INFO */}
          <div className={Style.contact_info}>
            <div className={Style.info_card}>
              <h3>Location</h3>
              <p>
                123 Premium Avenue
                <br />
                Luxury District, LD 10001
              </p>

              <h3>Phone</h3>
              <p>+91 9677510704</p>

              <h3>Email</h3>
              <p>Karthikeyan20070422@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;