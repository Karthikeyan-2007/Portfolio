import About from "./About/About";
import Home from "./Home/Home";
import Lastfooter from "./Lastfooter/Lastfooter";
import Header from "./Nav/Nav";

function Main(){
    return(
        <div style={{ background: "linear-gradient(to bottom, black 20%, #ff4400 50%)" }}>
            <Header/>
            <Home/>
            <About/>
            <Lastfooter/>
        </div>
    );
}

export default Main;