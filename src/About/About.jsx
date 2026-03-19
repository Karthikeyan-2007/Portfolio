import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Style from "./About.module.css";
import Works from "../Works/Works";
import Process from "../Process/Process";
import Skills from "../Skills/Skills";
import PortfolioHero from "../Portfoliohero/Portfoliohero";
import Footer from "../Footer/Footer";

function About() {

    return(
        <>
        <div className={Style.Full}>
            <div className={Style.about}>
                <div className={Style.side_text}>
                    <p>(About us)</p>
                    <div className={Style.head}>INTRODUCTION <br/>ABOUT MySELF</div><br/><br/>
                    <div className={Style.des}>We combines years of web design and branding expertise to craft meaningful, story-driven experiences.</div><br/><br/>
                </div>
                <div className={Style.context}>
                    <h2 className={Style.heading}>
                        Crafting thoughtful digital experiences
                        with precision and clarity.
                    </h2>

                    <p className={Style.aboutpara}>
                        I craft modern digital experiences with a strong focus on 
                        performance, scalability, and design precision. 
                        I transform complex ideas into clean, maintainable, 
                        and user-centric applications. My approach blends technical 
                        excellence with thoughtful design to deliver products that are both powerful and meaningful.
                    </p>
                    <div className={Style.buttonWrapper}>
                        <a href="https://otjyjexoelbiwiqfbsgz.supabase.co/storage/v1/object/public/resume/Resume.docx" target="_blank" rel="noopener noreferrer" className={Style.cvBtn}>
                            <span>View CV</span>
                        </a>
                        <div className={Style.social_container}>
                            <a href="https://instagram.com/mr_karthi__0078?igsh=MTY%d3ZDR2d3N5dA==" target="_blank" rel="noopener noreferrer" className={Style.social_insta}>
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com/in/karthikeyan-m-952b0832b?utm_source=share&utm_campaign=share_viva&utm_context=profile&utm_medium=" target="_blank" rel="noopener noreferrer" className={Style.social_linkedin}>
                                <FaLinkedinIn />
                            </a>
                            <a href="https://github.com/Karthikeyan-2007" target="_blank" rel="noopener noreferrer" className={Style.social_github}>
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Works/>
            <Process/>
            <Skills/>
            <PortfolioHero/>
            <Footer/>
        </div>
        </>
    );
}

export default About;
