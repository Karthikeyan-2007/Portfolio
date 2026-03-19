import React, { useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";
import { supabase } from "../Client";


const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

// Category icons mapping
const categoryIcons = {
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Tools: "🔧",
};

// Skill level badges (optional - customize as needed)
const skillLevels = {
  1: "Expert",
  2: "Advanced",
  3: "Pro",
  4: "Pro",
  5: "Expert",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [skillsData,setskillsData] = useState([]);

  useEffect(()=>{
    fetchdata();
  },[])

  async function fetchdata() {
    const {data,error} = await supabase.from("Skills").select("*")
    if(error){
      console.log(error)
    }
    else{
      setskillsData(data);
    }
  }

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  const featuredSkill =
    filteredSkills.find((s) => s.featured) || filteredSkills[0];

  const regularSkills = featuredSkill
    ? filteredSkills.filter((s) => s.id !== featuredSkill.id)
    : filteredSkills;

  // Mouse tracking for glow effect
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef?.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef?.current) return;
    cardRef.current.style.setProperty("--mouse-x", "50%");
    cardRef.current.style.setProperty("--mouse-y", "50%");
  };

  return (
    <section className={styles.blog}>
      <div className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.hero_label}>MY EXPERTISE</span>
          <h1>TECHNICAL SKILLS</h1>
          <p className={styles.hero_desc}>
            Technologies I use to build scalable, high-performance, and modern digital solutions.
          </p>
        </motion.div>
      </div>
      <div className={styles.filters}>
        <div className={styles.filter_track}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filter_btn} ${
                activeCategory === cat ? styles.active : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FEATURED SKILL CARD */}
      <AnimatePresence mode="wait">
        {featuredSkill && (
          <motion.article
            key={`featured-${featuredSkill.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.featured_card}
            onMouseMove={(e) => handleMouseMove(e, { current: e.currentTarget })}
            onMouseLeave={(e) => handleMouseLeave({ current: e.currentTarget })}
          >
            <span className={styles.skill_level}>
              {skillLevels[featuredSkill.id] || "Pro"}
            </span>
            
            <div className={styles.featured_content}>
              <div className={styles.meta_row}>
                <span className={styles.category_tag}>
                  {categoryIcons[featuredSkill.category]} {featuredSkill.category}
                </span>
              </div>

              <h2 className={styles.featured_title}>
                {featuredSkill.title}
              </h2>

              <p className={styles.excerpt}>
                {featuredSkill.description}
              </p>

              <div className={styles.skill_block}>
                <h4>⚙ How It Works</h4>
                <p>{featuredSkill.howItWorks}</p>
              </div>

              <div className={styles.skill_block}>
                <h4>🚀 Client Benefits</h4>
                <p>{featuredSkill.clientBenefit}</p>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>

      {/* SKILL GRID */}
      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {regularSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={styles.card}
                whileHover={{ y: -8 }}
                onMouseMove={(e) => handleMouseMove(e, { current: e.currentTarget })}
                onMouseLeave={(e) => handleMouseLeave({ current: e.currentTarget })}
              >
                {/* Skill Level Badge */}
                <span className={styles.skill_level}>
                  {skillLevels[skill.id] || "Pro"}
                </span>
                
                <div className={styles.card_content}>
                  {/* Category Icon */}
                  <div className={styles.category_icon}>
                    {categoryIcons[skill.category]}
                  </div>
                  
                  <div className={styles.card_meta}>
                    <span className={styles.category_tag}>
                      {skill.category}
                    </span>
                  </div>

                  <h3 className={styles.card_title}>
                    {skill.title}
                  </h3>

                  <p className={styles.card_excerpt}>
                    {skill.description}
                  </p>

                  {/* How It Works */}
                  <div className={styles.skill_block}>
                    <h4>⚙ How It Works</h4>
                    <p>{skill.howItWorks}</p>
                  </div>

                  {/* Client Benefits */}
                  <div className={styles.skill_block}>
                    <h4>🚀 Client Benefits</h4>
                    <p>{skill.clientBenefit}</p>
                  </div>
                </div>
                
                {/* Card Footer with CTA */}
                <div className={styles.card_footer}>
                  <button className={styles.card_read_btn}>
                    Learn More
                    <span className={styles.arrow}>→</span>
                  </button>
                </div>
                
                {/* Animated Progress Bar */}
                <div className={styles.progress_bar}></div>
              </motion.article>
            )
          )
        }
        </AnimatePresence>
      </div>
    </section>
  );
}