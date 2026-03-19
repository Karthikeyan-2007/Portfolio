import { useState, useEffect } from "react";
import { supabase } from '../Client';
import styles from "./Allproject.module.css";
import { useNavigate } from "react-router-dom";

// Skeleton Loader Component for the loading state
const SkeletonCard = () => (
  <div className={styles.cardSkeleton}>
    <div className={styles.skeletonHeader}></div>
    <div className={styles.skeletonTitle}></div>
    <div className={styles.skeletonDesc}></div>
    <div className={styles.skeletonTags}>
      <div className={styles.skeletonTag}></div>
      <div className={styles.skeletonTag}></div>
    </div>
    <div className={styles.skeletonButton}></div>
  </div>
);

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [projectsData, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    try {
      const { data, error } = await supabase
        .from("Projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      // Simulate a small delay for smoother animation entrance
      setTimeout(() => setLoading(false), 800);
    }
  }

  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase()) ||
    project.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.gradientText}>Featured Projects</h1>
            <p className={styles.subtitle}>
              Explore a curated collection of innovative solutions, ranging from 
              AI-driven systems to full-stack web applications.
            </p>
          </div>
          
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
          </div>
        </div>

        <div className={styles.grid}>
          {loading ? (
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={styles.card}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconWrapper}>
                    <div className={styles.cardIconBg}></div>
                    <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>

                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.techStack}>
                  {project.tags && project.tags.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <button className={styles.actionButton}>
                  <span>View Case Study</span>
                  <svg className={styles.btnArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p>No projects found matching "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}