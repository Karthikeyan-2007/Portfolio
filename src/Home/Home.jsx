import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiFlutter, SiNextdotjs } from "react-icons/si";
import style from "./Home.module.css";
import { useEffect, useState } from "react";


function Home() {

    const [hide, setHide] = useState(false);

    const scrollDown = () => {
        window.scrollBy({
        top: 780,
        behavior: "smooth"
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // 150vh in pixels
            const threshold = window.innerHeight * 1.5;

            if (currentScroll > threshold) {
                setHide(true);
            } else {
                setHide(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${style.body} ${hide ? style.hide : ""}`}>
            <div className={style.section}>
                <div className={style.descrption}>
                    Building thoughtful, responsive, and user-focused digital 
                    <span>products with clarity and care.</span>
                </div>

                <img src="/img/eye.jpeg" alt="eye"/>

                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
                    <div className={style.sidedescrption}>
                        Beyond Visuals.<br/>
                        <span>Built with Vision.</span>
                    </div>

                    <button className={style.explore} onClick={scrollDown}>
                        Explore More →
                    </button>
                </div>
            </div>

            <div className={style.marqueewrapper}>
                <div className={style.marquee}>
                    <div className={style.marqueecontent}>
                        <span><FaHtml5 /> HTML</span>
                        <span><FaCss3Alt /> CSS</span>
                        <span><FaReact /> React.js</span>
                        <span><SiFlutter /> Flutter</span>
                        <span><SiNextdotjs /> Next.js</span>
                    </div>

                    <div className={style.marqueecontent}>
                        <span><FaHtml5 /> HTML</span>
                        <span><FaCss3Alt /> CSS</span>
                        <span><FaReact /> React.js</span>
                        <span><SiFlutter /> Flutter</span>
                        <span><SiNextdotjs /> Next.js</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;