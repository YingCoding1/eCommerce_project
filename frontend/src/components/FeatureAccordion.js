import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../styles/FeatureAccordion.scss"
import {dividerClasses} from "@mui/material";

export const FeatureAccordion = ({featurePanels}) => {

    const [clicked, setClicked] = useState("0");

    const accordionShow = (index) => {
        // console.log('current index', index)
        if (clicked === index) {
            return setClicked("0");
        }
        setClicked(index);
    }

    return (
        <>
            <div>
                <div className="productFeature">
                    {
                        featurePanels && featurePanels.map((panel, index) => {
                            return (
                                <div className="productFeature_main" key={index}>
                                    <div key={index} className="productFeature_main_title"
                                         onClick={() => accordionShow(index)}>
                                        <div className="productFeature_main_title_pathTitle">
                                            <img src={panel.iconPath} alt=""/>
                                            <h3>{panel.title}</h3>
                                        </div>
                                        <div className="productFeature_main_title_muiIcon">
                                            {!panel.isPanel ? <div></div> : clicked !== index ? <div><AddIcon/></div> :
                                                <div><RemoveIcon/></div>}
                                        </div>
                                    </div>
                                    <div className="productFeature_main_content">
                                        {clicked === index &&
                                            <div>
                                                {panel.content && panel.content.map((contentDes, index) => {
                                                    return (
                                                        <div key={index} className="productFeature_main_content_item">
                                                            <span>{contentDes}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}