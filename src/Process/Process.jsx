import React, { useEffect, useRef, useState } from "react";
import Style from "./Process.module.css";

const steps = [
  {
    id: "01",
    title: "Discovery & Consult",
    desc: "We begin with an immersive dialogue to decode your vision. This isn't just about aesthetics; it's about understanding your lifestyle, functional needs, and the emotional atmosphere you wish to cultivate.",
    features: ["Site Analysis", "Lifestyle Audit", "Budget Framework", "Vision Boarding"],
  },
  {
    id: "02",
    title: "Concept & Design",
    desc: "Our design team translates abstract ideas into tangible reality. We craft detailed spatial layouts, select premium material palettes, and produce photorealistic 3D renderings to visualize the future space.",
    features: ["Spatial Planning", "3D Visualization", "Material Sourcing", "Lighting Design"],
  },
  {
    id: "03",
    title: "Refinement & Validation",
    desc: "Perfection lies in the details. Through iterative feedback loops, we fine-tune every texture, color, and dimension. This phase ensures that the design not only looks stunning but functions flawlessly for your daily life.",
    features: ["Client Review Sessions", "Technical Drawings", "Sample Approvals", "Final Adjustments"],
  },
  {
    id: "04",
    title: "Execution & Handover",
    desc: "We manage the transformation from blueprint to reality. Our project managers oversee contractors, quality control, and timelines, ensuring a stress-free experience and a flawless final reveal.",
    features: ["Contractor Management", "Quality Assurance", "Installation", "Final Walkthrough"],
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const [lightPosition, setLightPosition] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);

    useEffect(() => {
        let animationFrame;
        let current = 0;
        let target = 0;

        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;

            if (viewportCenter >= rect.top && viewportCenter <= rect.bottom) {
            target = viewportCenter - rect.top ;
            }
        };

        const animate = () => {
            // Smooth interpolation (lerp)
            current += (target - current) * 0.08; 
            setLightPosition(current);

            animationFrame = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        animate();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrame);
        };
    }, []);
  // Intersection Observer for Fade-in Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleSteps((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const stepElements = document.querySelectorAll(`.${Style.step}`);
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={Style.timeline} ref={sectionRef}>
      <div className={Style.header}>
        <h1 className={Style.title}>THE ATELIER PROCESS</h1>
        <p className={Style.subtitle}>
          A curated four-step journey transforming initial concepts into <br />
          architectural masterpieces.
        </p>
      </div>

      <div className={Style.center_line_container}>
        {/* The static track line */}
        <div className={Style.line_track}></div>
        
        {/* The moving glow light */}
        <div
          className={Style.scroll_light}
          style={{ top: `${lightPosition}px` }}
        >
          <div className={Style.light_glow}></div>
        </div>
      </div>

      <div className={Style.steps}>
        {steps.map((step, index) => {
          const isVisible = visibleSteps.includes(index);
          return (
            <div
              key={step.id}
              data-index={index}
              className={`${Style.step} ${
                index % 2 === 0 ? Style.left : Style.right
              } ${isVisible ? Style.visible : ""}`}
            >
              <div className={Style.card}>
                <div className={Style.step_header}>
                  <div className={Style.circle}>{step.id}</div>
                  <h2>{step.title}</h2>
                </div>
                
                <p className={Style.description}>{step.desc}</p>
                
                <ul className={Style.features_list}>
                  {step.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}