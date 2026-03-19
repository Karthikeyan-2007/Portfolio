import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>

        {/* LEFT SECTION */}
        <div className={styles.brand}>
          <h2>Karthikeyan<span>.</span></h2>
          <p>
            Building scalable, high-performance applications with modern
            technologies and premium user experience.
          </p>

          <div className={styles.socials}>
            <a href="https://github.com/Karthikeyan-2007"><FaGithub /></a>
            <a href="https://linkedin.com/in/karthikeyan-m-952b0832b?utm_source=share&utm_campaign=share_viva&utm_context=profile&utm_medium="><FaLinkedin /></a>
            <a href="https://instagram.com/mr_karthi__0078?igsh=MTY%d3ZDR2d3N5dA=="><FaInstagram /></a>
          </div>
        </div>
        {/* SERVICES */}
        <div className={styles.links}>
          <h4>Services</h4>
          <a href="/contact">Flutter Apps</a>
          <a href="/contact">Web Development</a>
          <a href="/contact">Firebase Integration</a>
          <a href="/contact">UI/UX Design</a>
        </div>

        {/* CONTACT */}
        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>Email: karthikeyan20070422@email.com</p>

          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Karthikeyan. All rights reserved.</p>

        <button onClick={scrollToTop} className={styles.top_btn}>
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}