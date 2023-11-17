import React, {useEffect, useState} from 'react';
import MenuData from "../MenuData";
import "../styles/FilterClothes.scss"

export default function FilterClothes({largeCheckedState, largeSetCheckedState, kinds, index, cbUpdateFilter}) {
    // console.log("largecheckedState",largeCheckedState)
    // const [checkedState, setCheckedState] = useState(
    //     MenuData.rs.filters[kinds])
    const kinds1 = ["Gender", "Category", "Type", "Activity", "Size", "SizeType", "Colour", "Collection", "Features", "Fabric"]
    const curKinds = kinds1[index]

    const handleOnChange = (position, isChecked) => {
        var larges = {...largeCheckedState}
        larges[curKinds][position]["isChecked"] = !isChecked

        // console.log("surprise",largeCheckedState?.curKinds?.position)
        // const largeupdatedCheckState = ()=>{
        //     (largeCheckedState.length>0)&&( largeCheckedState[curKinds][position]["isChecked"] =!isChecked)}
        // const change = largeCheckedState[curKinds][position]["isChecked"] :!isChecked
        largeSetCheckedState(larges)
        // largeCheckedState=>{
        //     return{...largeCheckedState,[curKinds]:{...largeCheckedState.curKinds,}[position]["isChecked"]:!isChecked}
        //     // ...largeCheckedState,
        //     //     [curKinds][position]["isChecked"]:!isChecked,
        // }
        // const largeupdatedCheckState = largeCheckedState[index].map(
        //     ({name, isChecked, swatch, alt}, index) => {
        //         return {name: name, isChecked: position === index ? !isChecked : isChecked, swatch: swatch, alt: alt}
        //     }
        //
        // )
        //     largeSetCheckedState(...largeCheckedState,largeupdatedCheckState)

        // console.log('handleChange', checkedState)

        // const updatedFilter = checkedState.map(
        //     ({name, isChecked}, index) => {
        //         return {name: name, isChecked: position === index ? !isChecked : isChecked}
        //     }
        // )
        // cbUpdateFilter(updatedFilter)
    }

    // const colorType =
    const [showMore, setShowMore] = useState(false);
    let showMulBoxMessage = (largeCheckedState[curKinds]?.map(({name, isChecked, swatch, alt}, index) => {
        return (
            <div key={index}>
                <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={isChecked}
                    onChange={() => handleOnChange(index, isChecked)}
                />
                <label>{name}</label>
                <img src={swatch} alt=""/>
                <label htmlFor="">{alt}</label>
                {/*<img>{swatch}?{swatch}: </img>*/}
            </div>
        )
    }))
    let cutLength
    let buttonDisplay
    if (largeCheckedState[curKinds].length > 5) {
        cutLength = 5
        buttonDisplay = true
        // console.log("cutlength",cutLength)
    } else {
        cutLength = largeCheckedState[curKinds].length
        buttonDisplay = "none"
        // console.log("cutlength",cutLength)
    }
    let showMulBoxLessMessage =
        (largeCheckedState[curKinds]?.slice(0, cutLength).map(({name, isChecked, swatch, alt}, index) => {
            return (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={isChecked}
                        onChange={() => handleOnChange(index, isChecked)}
                    />
                    <label>{name}</label>
                    <img src={swatch} alt=""/>
                    <label htmlFor="">{alt}</label>
                    {/*<img>{swatch}?{swatch}: </img>*/}
                </div>
            )
        }))
    let showBtnMessage = (largeCheckedState[curKinds]?.map(({name, isChecked, swatch, alt}, index) => {
        return (
            <div key={index}>
                <button
                    style={{backgroundImage: {swatch}, display: name === "sizeDivider" ? "none" : true}}
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    // checked={isChecked}
                    className={isChecked ? "btnChecked" : "btnNotChecked"}
                    onClick={() => handleOnChange(index, isChecked)}
                >{name}
                    <img src={swatch} alt=""/>
                </button>
                <label htmlFor="">{alt}</label>
                <hr style={{display: name === "sizeDivider" ? true : "none"}}/>
                {/*<img>{swatch}?{swatch}: </img>*/}
            </div>
        )

    }))
    let showBtnLessMessage =
        (largeCheckedState[curKinds]?.slice(0, cutLength).map(({name, isChecked, swatch, alt}, index) => {
            return (
                <div key={index}>
                    <button
                        style={{backgroundImage: {swatch}}}
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        className={isChecked ? "btnChecked" : "btnNotChecked"}
                        onClick={() => handleOnChange(index, isChecked)}>
                        {name}
                        <img src={swatch} alt=""/>
                    </button>
                    <label htmlFor="">{alt}</label>
                    <hr style={{display: name === "sizeDivider" ? true : "none"}}/>
                    {/*<img>{swatch}?{swatch}: </img>*/}
                </div>
            )
        }))
    let showMessage, showLessMessage
    if (index === 4 || index === 6) {
        showMessage = showBtnMessage
        showLessMessage = showBtnLessMessage
    } else {
        showMessage = showMulBoxMessage
        showLessMessage = showMulBoxLessMessage
    }
    return (
        <div className="FilterClothes">
            {/*<h2>Show more/less button</h2>*/}
            <div className="FilterClothesContent">{showMore ? showMessage : showLessMessage}</div>
            <button className="ViewMoreButton" type='button' style={{display: buttonDisplay}} onClick={() => setShowMore(!showMore)}>
                {showMore ? "View less -" : "View More +"}</button>
        </div>
    )
};
