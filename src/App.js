import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Intro from "./Intro/Intro";
import Contact from "./Contact/Contact";
import Main from "./Main";
import ProjectDetail from "./Projectdetail/Projectdetail";
import ProjectsPage from "./Allprojects/Allproject";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [showIntro]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/allprojects" element={<ProjectsPage />} />
      </Routes>
      {showIntro && <Intro />}
    </Router>
  );
}

export default App;
