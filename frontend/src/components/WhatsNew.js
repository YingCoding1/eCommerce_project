import {Content} from "./Content";
import {Footer} from "./Footer";
import Header from "./Header";
import {Filter} from "./Filter";
import "../styles/Home.scss"

export const WhatsNew = () => {
    return (
        <div className="Home">
            <Header/>
            <div className="Home_Main">
                <Filter/>
                <Content/>
            </div>
            <Footer/>
        </div>

    )
}