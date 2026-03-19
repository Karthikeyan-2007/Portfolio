import style from './Lastfooter.module.css';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Lastfooter() {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 0.8], [200, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <footer ref={ref} className={style.lastfooter}>
            <div className={style.contentWrapper}>

                <motion.div
                    className={style.nameContainer}
                    style={{ y, opacity }}
                >
                    <span className={style.mainName}>KARTHI</span>

                    <div className={style.innername}>
                        <div className={style.icon}>⏔</div>
                        <div className={style.subText}>Portfolio</div>
                    </div>
                </motion.div>

                <motion.div
                    className={style.des}
                    style={{ y, opacity }}
                >
                    Beyond <br/> Visuals.<br/> Built with<br/> Vision.
                </motion.div>

            </div>
        </footer>
    );
}

export default Lastfooter;