
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Nav.module.css";

function Header() {
    const [scale, setScale] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth >= 700) {
                const scrollY = window.scrollY;
                const newScale = Math.max(0.3, 1 - scrollY / 500);
                setScale(newScale);
            } else {
                setScale(1);
            }
        };

        window.addEventListener("scroll", handleSize);
        return () => window.removeEventListener("scroll", handleSize);
    }, []);

  return (
    <div className={style.header}>
        <div className={style.Name} style={{ transform: `scale(${scale})` }}>KARTHI</div>
        <button onClick={() => navigate("/contact")}>LET’s CONNECT</button>
    </div>
  );
}

export default Header;
