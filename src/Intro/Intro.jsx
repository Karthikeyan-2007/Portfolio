import { useEffect, useState } from "react";
import style from "./Intro.module.css";

export default function Intro() {
  const [show, setShow] = useState(false);
  const [introHide, setIntroHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 2000);
    const t2 = setTimeout(() => setIntroHide(true), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className={`${style.Intro} ${introHide ? style.hide : ""}`}>
      <div className={style.IntroLogo}>
        <span className={`${style.Name} ${show ? style.shift : ""}`}>⏔KARTHI</span>
        <span className={`${style.portfolio} ${show ? style.show : ""}`}>
          Portfolio
        </span>
      </div>
    </div>
  );
}
