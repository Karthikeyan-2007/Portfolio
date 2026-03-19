import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";
import styles from "./Portfoliohero.module.css";
import JellyLoader from "./jelly";

export default function PortfolioHero() {
  const [isHovered, setIsHovered] = useState(false);
  
      const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <JellyLoader/>
      <motion.div 
        className={styles.mainCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Sparkles size={14} className={styles.taglineIcon} />
          <span>TRANSFORM YOUR VISION</span>
        </motion.div>

        <motion.h1 
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Let's Build Something
          <span className={styles.highlight}> Amazing Together</span>
        </motion.h1>

        <motion.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          I craft beautiful, high-performance digital experiences that help businesses grow. 
          From mobile apps to web platforms, I bring expertise in{" "}
          <strong>Flutter, React, and Firebase</strong> to turn your ideas into reality.
        </motion.p>

        <motion.div 
          className={styles.offer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Zap size={18} className={styles.offerIcon} />
          <span>Start your project today and get <strong className={styles.discount}>20% off</strong> on your first engagement</span>
        </motion.div>

        <motion.div 
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <motion.button 
            className={styles.primaryBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/contact")}
          >
            Start Your Project
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div 
          className={styles.trustBadges}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className={styles.badge}>
            <CheckCircle size={16} className={styles.badgeIcon} />
            <span>5+ Projects Delivered</span>
          </div>
          <div className={styles.badge}>
            <CheckCircle size={16} className={styles.badgeIcon} />
            <span>100% Satisfaction</span>
          </div>
          <div className={styles.badge}>
            <CheckCircle size={16} className={styles.badgeIcon} />
            <span>On-Time Delivery</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}