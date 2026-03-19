import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub, FiExternalLink, FiCopy, FiCheck,
  FiArrowLeft, FiStar, FiBox, FiShare2, FiTwitter,
  FiLinkedin, FiMaximize2, FiX, FiChevronLeft, FiChevronRight,
  FiClock, FiCalendar, FiCode, FiHeart
} from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../Client";
import style from "./Projectdetail.module.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className={style.lightbox}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className={style.lightboxClose} onClick={onClose}>
          <FiX size={24} />
        </button>
        
        <button className={`${style.lightboxNav} ${style.prev}`} onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <FiChevronLeft size={28} />
        </button>
        
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          className={style.lightboxImage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />
        
        <button className={`${style.lightboxNav} ${style.next}`} onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <FiChevronRight size={28} />
        </button>
        
        <div className={style.lightboxCounter}>
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch project data
  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("Projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        const transformed = {
          ...data,
          tags: typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags || [],
          features: typeof data.features === "string" ? JSON.parse(data.features) : data.features || [],
          stats: typeof data.stats === "string" ? JSON.parse(data.stats) : data.stats || [],
          gallery: typeof data.gallery === "string" ? JSON.parse(data.gallery) : data.gallery || []
        };
        setProject(transformed);
        setLikeCount(data.likes || 0);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Copy URL handler
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Share handlers
  const handleShare = useCallback(async (platform) => {
    const url = window.location.href;
    const title = project?.title || "Check out this project";
    
    const shares = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === "copy") {
      handleCopy();
    } else if (shares[platform]) {
      window.open(shares[platform], "_blank", "width=600,height=400");
    }
    setShareOpen(false);
  }, [project, handleCopy]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < (project?.gallery?.length || 1) - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : (project?.gallery?.length || 1) - 1
    );
  };

  // Like handler
  const handleLike = async () => {
    if (!project) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    
    // Optional: Update Supabase
    // await supabase.from("Projects").update({ likes: likeCount + (newLiked ? 1 : -1) }).eq("id", id);
  };

  // Calculate reading time
  const readingTime = project?.description 
    ? Math.ceil(project.description.split(" ").length / 200) 
    : 1;

  // Loading skeleton
  if (loading) {
    return (
      <div className={style.page}>
        <div className={style.skeleton}>
          <div className={style.skeletonNav} />
          <div className={style.skeletonHero}>
            <div className={style.skeletonImage} />
            <div className={style.skeletonInfo}>
              <div className={style.skeletonBadge} />
              <div className={style.skeletonTitle} />
              <div className={style.skeletonTagline} />
              <div className={style.skeletonDesc} />
              <div className={style.skeletonStats} />
              <div className={style.skeletonTags} />
            </div>
          </div>
          <div className={style.skeletonBento}>
            <div className={style.skeletonBox} />
            <div className={style.skeletonBox} />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <motion.div 
        className={style.notFound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={style.notFoundContent}>
          <FiBox size={48} />
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} className={style.primaryBtn}>
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  const allImages = [project.img || project.image, ...(project.gallery || [])].filter(Boolean);

  return (
    <>
      <motion.div
        className={style.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background */}
        <div className={style.bgOrbs}>
          <motion.div 
            className={style.orb} 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className={`${style.orb} ${style.orb2}`} 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Navigation */}
        <motion.nav 
          className={style.nav}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            onClick={() => navigate(-1)} 
            className={style.navBtn}
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft /> <span>Back</span>
          </motion.button>
          
          <div className={style.navActions}>
            {/* Like Button */}
            <motion.button 
              className={`${style.iconBtn} ${liked ? style.liked : ""}`}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={`${likeCount} likes`}
            >
              <FiHeart fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "#fff"} />
              <span className={style.likeCount}>{likeCount}</span>
            </motion.button>

            {/* Share Dropdown */}
            <div className={style.shareWrapper}>
              <motion.button 
                className={style.iconBtn}
                onClick={() => setShareOpen(!shareOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiShare2 />
              </motion.button>
              
              <AnimatePresence>
                {shareOpen && (
                  <motion.div
                    className={style.shareDropdown}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    <button onClick={() => handleShare("twitter")} className={style.shareOption}>
                      <FiTwitter color="#1DA1F2" /> Twitter
                    </button>
                    <button onClick={() => handleShare("linkedin")} className={style.shareOption}>
                      <FiLinkedin color="#0A66C2" /> LinkedIn
                    </button>
                    <button onClick={() => handleShare("copy")} className={style.shareOption}>
                      {copied ? <FiCheck color="#4ade80" /> : <FiCopy />} 
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Copy Button */}
            <motion.button 
              onClick={handleCopy} 
              className={style.iconBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Copy link"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span 
                    key="check" 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiCheck color="#4ade80" />
                  </motion.span>
                ) : (
                  <motion.span 
                    key="copy"
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FiCopy />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>

        <div className={style.container}>
          {/* HERO SECTION */}
          <motion.div 
            className={style.heroGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main Image Card */}
            <motion.div
              className={style.heroCard}
              variants={fadeInUp}
            >
              <div className={style.imageWrap}>
                <motion.img 
                  src={project.img || project.image} 
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Image Actions */}
                <div className={style.imageActions}>
                  {allImages.length > 1 && (
                    <motion.button
                      className={style.actionBtn}
                      onClick={() => openLightbox(0)}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiMaximize2 /> View Gallery
                    </motion.button>
                  )}
                  {project.demo && (
                    <motion.a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`${style.actionBtn} ${style.primary}`}
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(74, 222, 128, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink /> Live Demo
                    </motion.a>
                  )}
                </div>

                {/* Floating Badge */}
                <motion.div 
                  className={style.featuredBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <FiStar /> Featured
                </motion.div>
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              className={style.infoCard}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className={style.metaRow}>
                <span className={style.metaItem}>
                  <FiCalendar /> 
                  {project.date ? new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2024'}
                </span>
                <span className={style.metaItem}>
                  <FiClock /> {readingTime} min read
                </span>
              </div>

              <motion.h1 
                className={style.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h1>
              
              {project.tagline && (
                <motion.p 
                  className={style.tagline}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.tagline}
                </motion.p>
              )}
              
              <motion.p 
                className={style.desc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {project.description}
              </motion.p>

              {/* Enhanced Stats */}
              {project.stats?.length > 0 && (
                <motion.div 
                  className={style.statsRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.stats.map((s, i) => {
                    const Icon = s.icon ? FiStar : FiStar;
                    return (
                      <motion.div 
                        key={i} 
                        className={style.statItem}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={style.statIcon}>
                          <Icon size={18} />
                        </div>
                        <span className={style.statValue}>{s.value}</span>
                        <small className={style.statLabel}>{s.label}</small>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Tech Tags with Gradient Border */}
              <motion.div 
                className={style.techRow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {project.tags?.map((tag, i) => (
                  <motion.span 
                    key={i} 
                    className={style.techPill}
                    whileHover={{ scale: 1.05, borderColor: "rgba(167, 139, 250, 0.6)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className={style.actionRow}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {project.github && (
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className={style.githubBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiGithub size={18} /> View Source
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className={style.demoBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink size={18} /> Try Live
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* BENTO GRID SECTION */}
          <motion.div 
            className={style.bentoGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Features Box */}
            {project.features?.length > 0 && (
              <motion.div
                className={`${style.bentoBox} ${style.featuresBox}`}
                variants={fadeInUp}
                whileHover={{ borderColor: "rgba(167, 139, 250, 0.4)", boxShadow: "0 8px 30px rgba(167, 139, 250, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <h4><FiBox /> Key Features</h4>
                <div className={style.featureList}>
                  {project.features.map((f, i) => (
                    <motion.div 
                      key={i} 
                      className={style.featureItem}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {typeof f === "object" ? (
                        <>
                          <strong>{f.title}</strong>
                          <span>{f.desc}</span>
                        </>
                      ) : (
                        <span>{f}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery Box */}
            {project.gallery?.length > 0 && (
              <motion.div
                className={`${style.bentoBox} ${style.galleryBox}`}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <div className={style.galleryHeader}>
                  <h4><FiCode /> Screenshots</h4>
                  <span className={style.galleryCount}>{project.gallery.length} images</span>
                </div>
                <div className={style.miniGallery}>
                  {project.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      className={style.miniImg}
                      style={{ backgroundImage: `url(${img.trim()})` }}
                      onClick={() => openLightbox(i + 1)} // +1 because main image is index 0
                      whileHover={{ scale: 1.08, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tech Stack Box (New) */}
            {project.technologies && (
              <motion.div
                className={`${style.bentoBox} ${style.techBox}`}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <h4><FiCode /> Tech Stack</h4>
                <div className={style.techGrid}>
                  {project.technologies.map((tech, i) => (
                    <motion.div 
                      key={i}
                      className={style.techItem}
                      whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      {tech.icon && <span className={style.techIcon}>{tech.icon}</span>}
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Footer CTA */}
          {project.github && (
            <motion.div
              className={style.footerCta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p>Ready to explore the codebase?</p>
              <motion.a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className={style.primaryBtn}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FiGithub /> View Repository on GitHub
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox 
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}

export default ProjectDetail;