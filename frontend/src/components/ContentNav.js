import "../styles/ContentNav.scss"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useRef, useState, useEffect} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import menBanner from "../headerSvgIcons/WhatsNew_Men.jpg";
import womenBanner from "../headerSvgIcons/WhatsNew_Women.jpg"
import {useParams} from "react-router-dom";
import {isEditable} from "@testing-library/user-event/dist/utils";

export const ContentNav = () => {

    // get parameter value form url
    let params = useParams()
    let {gender} = params
    // console.log(gender)

    const url = (gender === 'Women') ? womenBanner :
        (gender === 'Men') ? menBanner : ""
    const text = (gender === 'Women') ? "Lean into the feeling." :
        (gender === 'Men') ? 'Easy on. Easy off you go.' : ""

    let filters = useSelector(state => state?.productReducer?.allFilters)

    const arrFilters = filters && Object.entries(filters)

    const [allFilters, setAllFilters] = useState(arrFilters)

    useEffect(() => {
            const arrFilters = filters && Object.entries(filters)
            setAllFilters(arrFilters)
        }
        , [filters])

    let sortIndex = useSelector(state => state?.productReducer?.sortIndex)

    // console.log('filter in nav', arrFilters)

    const totalNum = useSelector(state => state?.productReducer?.totalProductNum)

    const dispatch = useDispatch()

    const [display, setDisplay] = useState(false)

    const [sortText, setSortText] = useState('Featured')

    const cbToggleDisplay = () => {
        setDisplay(!display)
    }

    const cbDisplaySortText = text => {
        setSortText(text)
    }

    // Hook that alert clicks outside the passed ref
    const useOutsiderAlerter = ref => {
        useEffect(() => {
            // Alert if clicked outside the element
            const handleClickOutside = event => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDisplay(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    const wrapperRef = useRef(null)
    useOutsiderAlerter(wrapperRef)

    const updateFilters = filter => {

        console.log('arrFilters', arrFilters)

        const newFilters = arrFilters?.map(element => element[1]?.map(item => {
            if (item?.name) {
                (item.name === filter.name) && (item.isChecked = false)
                return item
            } else {
                (item.alt === filter.alt) && (item.isChecked = false)
                return item
            }
        }))

        const filterObject = Object.fromEntries(arrFilters)

        console.log('new filters', newFilters)
        console.log('filter object', filterObject)
        dispatch(actions.productAction.updateFilter(filterObject))
        dispatch(actions.productAction.fetchProductWithFilter(filterObject, 1, sortIndex))
    }

    return (
        <div className="ContentNav">
            <div className="ContentNav_WhatsNew">
                <h2>{gender?.concat(`'s `)}What's New</h2>
            </div>
            <div className="ContentNav_Banner">
                {gender === "Women" ? <h2 className="ContentNav_Banner_Women">{text}</h2> :
                    <h2 className="ContentNav_Banner_Men">{text}</h2>}
                <img src={url} alt=""/>
            </div>
            <div className="ContentNav_Heading">Need it fast? Use <strong>Available Near You</strong> to buy and pick up
                in store.
            </div>
            <div className="ContentNav_Menu">
                <div className="ContentNav_Menu_Select">
                    <div className="ContentNav_Menu_Select_Item">
                        <p>All Items ({totalNum})</p>
                    </div>
                    <div className="ContentNav_Menu_Select_Available">
                        <p>Available Near You</p>
                        <ArrowForwardIosIcon fontSize="20px"/>
                    </div>
                </div>
                <div className="ContentNav_Menu_Sort" ref={wrapperRef}>
                    <div className="ContentNav_Menu_Sort_Btn">
                        <p>Sort by
                            <span onClick={cbToggleDisplay} data-testid="sortText-element">{sortText}</span>
                        </p>
                        <KeyboardArrowDownIcon onClick={cbToggleDisplay} className="ContentNav_Menu_Sort_Btn_Arrow"/>
                    </div>
                    <div className="ContentNav_Menu_Sort_Dropdown">
                        {
                            display &&
                            <ul data-testid="dropdown-element">
                                <li onClick={() => {
                                    dispatch(actions.productAction.fetchProductWithFilter(filters, 1, 1))
                                    cbToggleDisplay()
                                    cbDisplaySortText('Featured')
                                }}
                                    data-testid="featured-element"
                                >
                                    Featured
                                </li>
                                <li onClick={() => {
                                    dispatch(actions.productAction.fetchProductWithFilter(filters, 1, 2))
                                    cbToggleDisplay()
                                    cbDisplaySortText('New Arrivals')
                                }}
                                    data-testid="newArrivals-element"
                                >
                                    New Arrivals
                                </li>
                                <li onClick={() => {
                                    dispatch(actions.productAction.fetchProductWithFilter(filters, 1, 3))
                                    cbToggleDisplay()
                                    cbDisplaySortText('Top Rated')
                                }}
                                    data-testid="topRated-element"
                                >
                                    Top Rated
                                </li>
                                <li onClick={cbToggleDisplay}>Price: High to Low</li>
                                <li onClick={cbToggleDisplay}>Price: Low to High</li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
            <div className="ContentNav_SortFilter">
                <button>FILTER & SORT</button>
            </div>
            <div className="ContentNav_Filters">
                {arrFilters?.map(category => category[1].map((element, index) => {
                        if (element.isChecked === true) {
                            return (
                                <div
                                    className="ContentNav_Filters_Box"
                                    key={index}
                                    onClick={() => updateFilters(element)}
                                >
                                    <button>{element.name} x</button>
                                </div>)
                        }
                    })
                )}
            </div>
        </div>
    )
}
