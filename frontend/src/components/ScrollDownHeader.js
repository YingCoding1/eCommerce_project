import {useParams} from "react-router-dom";
import "../styles/ScrollDownHeader.scss";
import React from 'react';
import ReactDOM from 'react-dom';

const {useState, useEffect} = React;

export const ScrollDownHeader = ({product}) => {

    // console.log('scroll header', product)

    // get url parameters

    let params = useParams()

    let {productInfo} = params

    // store parameters into array

    productInfo = productInfo.split("&")

    const swatch = product?.swatches?.filter(swatch => swatch.colorId === productInfo[2])

    // console.log('swatch', swatch[0].swatch)

    // show this header when scroll down

    const [isVisible, setIsVisible] = useState(true);

    const [height, setHeight] = useState(0);

    useEffect(() => {

        window.addEventListener("scroll", listenToScroll);

        return () =>

            window.removeEventListener("scroll", listenToScroll);

    }, []);

    const listenToScroll = () => {

        let heightToHideFrom = 900;

        const winScroll = document.body.scrollTop ||

            document.documentElement.scrollTop;

        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {

            isVisible && setIsVisible(false);

        } else {

            setIsVisible(true);

        }

    };

    // show this header when scroll down

    return (

        <>
            {!isVisible && // original: visible; add !, shows up

                <div className="ScrollDownHeader">
                    <h2>{productInfo[0]}</h2>
                    <div className="ScrollDownHeader_AddToBag">
                        <div className="ScrollDownHeader_AddToBag_Color">
                            <p>Color:</p>
                            <img src={swatch && swatch[0]?.swatch} alt=""/>
                        </div>
                        <div className="ScrollDownHeader_AddToBag_Size"><p>Size:</p></div>
                        {/*todo: add size */}
                        <button>ADD TO BAG</button>
                    </div>
                </div>}
        </>

    )

}
