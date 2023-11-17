import "../styles/VirtualShopping.scss"
import VirtualImg1 from "../headerSvgIcons/VirtualShopping-left.jpg"
import VirtualImg2 from "../headerSvgIcons/VirtualShopping-right.jpg"

export const VirtualShopping = () => {
    return (

           <div className="VirtualShopping">
               <img className="VirtualShopping_ImgLeft" src={VirtualImg1} alt=""/>
               <img className="VirtualShopping_ImgRight" src={VirtualImg2} alt=""/>

                <div className="VirtualShopping_MainContent">
                    <h2>(Virtual) personal shopping is here</h2>

                 <div className="VirtualShopping_MainContent_Text">
                        <p>Whether you’ve got questions about product or you just <br/>
                          miss us, our educators are online and ready to chat.</p>
                    </div>
                    <button data-testid="TestBtn"
                            // style={{backgroundColor: 'white', color: 'black'}}
                    >Book Now</button>
                </div>
            </div>
        //</div>
    )
}