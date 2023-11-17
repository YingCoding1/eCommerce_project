import {useDispatch, useSelector} from "react-redux";
import "../styles/SwatchCarousel.scss"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useState} from "react";
import actions from "../actions";


export const SwatchCarousel = ({swatch, colorCarousel}) => {
    const dispatch = useDispatch()
    // console.log("this is colorCarousel",colorCarousel)
    const fetchAllProducts = useSelector(state => state?.productReducer?.allProductList)
    // console.log("this from Swatch",colorCarousel)
    const [swatchColorId, setSwatchColorId] = useState(swatch[0].colorId)
    // console.log("this is colorId from swatch",swatchColorId)

    const setList = (cardList) => {
        let newCardList = [];
        for (let i = 0; i < cardList.length; i += 7) {
            newCardList.push(cardList.slice(i, i + 7));
        }
        return newCardList
    }

    // element?.swatch.replaceAll('/', match => ++t >= 7 ? '-' : match)}
    let t
    return (
        <Slider>

            {setList(swatch) && setList(swatch).map((item, index) => {

                return (
                    <div key={index} className="flex-box">
                        {
                            item.map((its, ixs) => {
                                {
                                    t = 0
                                }
                                return (
                                    // <div className="swatchBackground">
                                    <div key={ixs}
                                         onMouseEnter={() => {
                                             setSwatchColorId(its?.colorId)
                                             colorCarousel(its?.colorId)
                                         }}
                                         style={{
                                             background: `url('${its?.swatch?.replaceAll('/', match => ++t >= 7 ? '-' : match)}')`,
                                             width: '24px', height: '24px'
                                         }}>
                                    </div>
                                    // </div>

                                )
                            })
                        }
                    </div>
                )
            })
            }
        </Slider>
    )
}
