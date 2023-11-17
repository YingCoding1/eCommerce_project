import FilterClothes from "./FilterClothes"
import "../styles/Filter.scss"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import actions from "../actions";
import {useParams} from "react-router-dom";
import MenuData from "../MenuData";

export const Filter = () => {

    let params = useParams()
    let {gender} = params

    let filters = useSelector(state => state?.productReducer?.allFilters)
    let sortIndex = useSelector(state => state?.productReducer?.sortIndex)

    const [largeCheckedState, largeSetCheckedState] = useState(MenuData.rs.filters)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('filter state', largeCheckedState)
        dispatch(actions.productAction.updateFilter(largeCheckedState))
        dispatch(actions.productAction.fetchProductWithFilter(largeCheckedState, 1, sortIndex))
    },[largeCheckedState])


    // update the filter
    const updateObject = updateFilter => {
        const array = Object.entries(filters)
        const updateArray = array.map(element =>
            (element[1].length === updateFilter.length && element[1][0].name === updateFilter[0].name)
                ? [element[0], updateFilter] : element
        )
        return Object.fromEntries(updateArray)
    }

    const cbUpdateFilter = childFilter => {
        const updateFilters = updateObject(childFilter)
        // console.log(updateFilters)
        // dispatch(actions.productAction.updateFilter(updateFilters))
    }

    let kinds = ["Gender", "Category", "Type", "Activity", "Size", "SizeType", "Colour", "Collection", "Features", "Fabric"]
    let dataClassNumber = -1

    const CustomItem = (props) => {
        const [showTheMore, setShowTheMore] = useState(true);
        return (
            <div className={`FilterClothes_${props.dataClassNumber}`}>
                <div className="rowTitle">
                    <h2>{props.item}</h2>
                    <button className="plus_button" onClick={() => setShowTheMore(!showTheMore)}>
                        {showTheMore ? "-" : "+"}</button>
                </div>
                <div>{showTheMore ?
                    <FilterClothes largeCheckedState={largeCheckedState} largeSetCheckedState={largeSetCheckedState}
                                   kinds={props.item} index={props.index} cbUpdateFilter={cbUpdateFilter}/> :
                    <p></p>}</div>
                {/*<FilterClothes kinds={item} index={index}/>*/}
            </div>
        );
    }
    let dataList = kinds.map((item, index) => {
            dataClassNumber++
            // console.log(dataClassNumber)
            return (
                <CustomItem key={index} item={item} index={index} dataClassNumber={dataClassNumber}/>
            )
        }
    )

    return (
        <div className="Filter">
            <div className="left-bar">
                <h2>{gender?.concat(`'s `)}What's New</h2>
                {dataList}
            </div>
        </div>
    )
}
