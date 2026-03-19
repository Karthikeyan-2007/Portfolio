import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Style from "./Works.module.css";
import { supabase } from '../Client';
import { useNavigate } from "react-router-dom";

function Works() {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  const [projects,setprojects] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchdata();
  },[]);

  async function fetchdata() {
    const {data,error}=await supabase.from("Projects").select("*").order("id", { ascending: true }).range(0,3);

    if(error){
      console.log(error)
    }
    else{
      setprojects(data);
    }
    
  }

  useMotionValueEvent(scrollY, "change", () => {
    projectRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const middle = window.innerHeight * 0.5;
      if (rect.top < middle && rect.bottom > middle) {
        setActiveIndex(index);
      }
    });
  });

  return (
    <>
      <section ref={containerRef} className={Style.works}>
        <div className={Style.right}>
          <div className={Style.projects}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                ref={(el) => (projectRefs.current[index] = el)}
                className={Style.card}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: false, margin: "-50px" }}
              >
                {/* Card Image Section */}
                <div className={Style.cardImageWrapper}>
                  <motion.img 
                    src={project.img} 
                    alt={project.title}
                    className={Style.cardImg}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className={Style.cardOverlay} />
                  <div className={Style.cardNumber}>0{project.id}</div>
                </div>

                {/* Card Content Section */}
                <div className={Style.cardContent}>
                  <div className={Style.cardHeader}>
                    <h2>{project.title}</h2>
                    <motion.div 
                      className={Style.viewBtn}
                      whileHover={{ x: 5 }}
                    >
                      View Case <span>→</span>
                    </motion.div>
                  </div>
                  
                  <p>{project.description}</p>

                  <div className={Style.techStack}>
                    {project.tags?.map((tag, i) => (
                      <span key={i} className={Style.badge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Left Side (Sticky Title) - Unchanged */}
        <div className={Style.left}>
          <h1 className={Style.title}>LATEST WORKS</h1>
          <div className={Style.counter}>
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>{" "}
            / 04
          </div>
        </div>
      </section>
      
      <div className={Style.btn_wrapper}>
        <button className={Style.premium_btn} onClick={() => navigate("/allprojects")}>
          <span className={Style.text}>View All Projects →</span>
        </button>
      </div>
    </>
  );
}

export default Works;