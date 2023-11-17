import "../styles/Reviews.scss"
import {useEffect, useRef, useState} from "react";
import {FormControl, FormControlLabel, Rating, Typography} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {styled} from '@mui/material/styles';
import {TextareaAutosize} from "@mui/base";
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {getRecentView, getReview, saveReview} from "../Helper";
// import {getReview, saveReview} from "../Helper";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useParams} from "react-router-dom";
import moment from "moment";
import star from "../headerSvgIcons/review-star-black.svg"
import axios from "axios";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000000',
    },
    '& .MuiRating-iconHover': {
        color: '#000000',
    },
});
export const Reviews = ({product}) => {
    let colorId = useSelector(state => state?.productReducer?.updateColorId)

    const images = product?.images?.map(element => {
        const imageList = element?.mainCarousel?.media?.split(" | ")
        element.one = imageList[0]
        element.two = imageList[1]
        return element
    })

    const image = images?.filter(image => image?.colorId === colorId)

    const [value, setValue] = useState(0);
    const [isShow, setIsShow] = useState(false)
    const [reviewTitle, setReviewTitle] = useState("")
    const [reviewContent, setReviewContent] = useState("")
    const [reviewList, setReviewList] = useState([])
    const [review, setReview] = useState({
            reviewTitle: "",
            reviewContent: "",
            reviewRating: "",
            reviewDate: "",
            // reviewImage: "",
            // reviewImageName: ""
        }
    )
    const [isFeedback, setIsFeedback] = useState(true)

    const [isPhoto, setIsPhoto] = useState(false)

    const [uploadImage, setUploadImage] = useState()

    const [previewImage, setPreviewImage] = useState("")

    const [imageName, setImageName] = useState("")

    const [reviewInfo, setReviewInfo] = useState()

    useEffect(() => {

        const getReview = async () => {
            try {
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:3001/review/',
                    params: {
                        productId: product.productId,
                    }
                })
                const {data: {data: {reviews}}} = res
                const {data: {data: {info}}} = res
                // console.log(reviews)
                setReviewList(reviews)
                setReviewInfo(info)
            } catch (e) {
                console.log(e)
            }
        }

        getReview()

    }, [product])

    const getMoreReviews = async (pageNum) => {
        try {
            let res = await axios({
                method: 'get',
                url: 'http://localhost:3001/review/',
                params: {
                    productId: product.productId,
                    page: pageNum
                }
            })
            const {data: {data: {reviews}}} = res
            const {data: {data: {info}}} = res
            console.log(reviews)
            setReviewList(reviewList.concat(reviews))
            setReviewInfo(info)
        } catch (e) {
            console.log(e)
        }
    }

    // let reviews = useSelector(state => state?.productReducer?.reviewList)
    const handleOpen = () => setIsShow(true)
    const handleClose = () => {
        setIsShow(false)
        setReviewTitle("")
        setReviewContent("")
        setValue(0)
        setIsFeedback(true)
        setIsPhoto(false)
        setUploadImage(null)
        setPreviewImage("")

    }
    const getInputTitle = event => {
        // console.log('input', event.target.value)
        setReviewTitle(event.target.value)
    }
    const getInputContent = event => {
        // console.log('content', event.target.value)
        setReviewContent(event.target.value)
    }

    const nextButton = () => {
        const date = new Date()

        setReview(prevState => ({
            ...prevState,
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            reviewRating: value,
            reviewDate: `${date.toDateString()} ${date.toLocaleTimeString()}`,
            // reviewImage: formData,
            // reviewImageName: imageName
        }))

        setIsFeedback(false)
        setIsPhoto(true)
    }

    const uploadFile = async () => {
        const formData = new FormData()
        formData.append("file", uploadImage)
        formData.append("title", review.reviewTitle)
        formData.append("comments", review.reviewContent)
        formData.append("rate", review.reviewRating)
        formData.append("productId", product.productId)

        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:3001/review/create',
                data: formData
            })
            console.log(res)

            try {
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:3001/review/',
                    params: {
                        productId: product.productId,
                    }
                })
                const {data: {data: {reviews}}} = res
                const {data: {data: {info}}} = res
                // console.log(reviews)
                setReviewList(reviews)
                setReviewInfo(info)
            } catch (e) {
                console.log(e)
            }

            handleClose()

        } catch (e) {
            console.log(e)
        }
    }

    const reviewBox = () => {

        return (
            <Modal
                open={isShow}
                onClose={handleClose}
                style={{overflow: 'scroll'}}
            >
                <div className="Reviews_ReviewBox">
                    <form className="Reviews_ReviewBox_Form">
                        <img className="Reviews_ReviewBox_Form_Image" src={image[0]?.one}/>
                        <div className="Reviews_ReviewBox_Form_Section">
                            <div className="Reviews_ReviewBox_Form_Section_Close"
                                 onClick={handleClose}>
                                X
                            </div>
                            <div className="Reviews_ReviewBox_Form_Section_RDHeading">
                                <div className="Reviews_ReviewBox_Form_Section_RDHeading_Title">
                                    Write a review
                                </div>
                                <div className="Reviews_ReviewBox_Form_Section_RDHeading_Content">
                                    <img src={image && image[0]?.one}/>
                                    <div className="Reviews_ReviewBox_Form_Section_RDHeading_Content_Name">
                                        {product?.name}
                                    </div>
                                </div>
                            </div>
                            <div className="Reviews_ReviewBox_Form_Section_Heading">
                                <div className="Reviews_ReviewBox_Form_Section_Heading_Title">
                                    Write a review for
                                </div>
                                <div className="Reviews_ReviewBox_Form_Section_Heading_Name">
                                    {product?.name}
                                </div>
                            </div>
                            <div className="Reviews_ReviewBox_Form_Section_ProgressBar">
                                <div className="Reviews_ReviewBox_Form_Section_ProgressBar_Stepper active"
                                     onClick={() => {
                                         setIsFeedback(true)
                                         setIsPhoto(false)
                                     }}
                                     style={{borderBottom: isFeedback ? '2px red solid' : ''}}>
                                    Feedback
                                </div>
                                <div className="Reviews_ReviewBox_Form_Section_ProgressBar_Stepper">
                                    Size & Fit
                                </div>
                                <div className="Reviews_ReviewBox_Form_Section_ProgressBar_Stepper active"
                                     onClick={() => {
                                         setIsFeedback(false)
                                         setIsPhoto(true)
                                     }}
                                     style={{borderBottom: isPhoto ? '2px red solid' : ''}}>
                                    Photo
                                </div>
                                <div className="Reviews_ReviewBox_Form_Section_ProgressBar_Stepper">
                                    Info
                                </div>
                            </div>
                            {isFeedback &&
                                <>
                                    <div className="Reviews_ReviewBox_Form_Section_Rating">
                                        <Typography component="legend">Your overall rating*</Typography>
                                        <StyledRating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            defaultValue={1}
                                            max={5}
                                            size="large"/>
                                    </div>
                                    <div className="Reviews_ReviewBox_Form_Section_Title">
                                        <label>Review Title*</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder='Eg. "Super comfortable!"'
                                            onInput={getInputTitle}
                                            value={reviewTitle}
                                        />
                                    </div>
                                    <div className="Reviews_ReviewBox_Form_Section_Content">
                                        <label>Review* (25-500 characters)</label>
                                        <TextareaAutosize
                                            className="Reviews_ReviewBox_Form_Section_Content_Textarea"
                                            required
                                            aria-label="minimum height"
                                            minRows={7}
                                            maxLength="500"
                                            minLength="25"
                                            style={{width: 450}}
                                            placeholder="Tell others about your gear. What did you love about it?. How's the fit? What could use improvement?"
                                            onInput={getInputContent}
                                            value={reviewContent}
                                        >
                                        </TextareaAutosize>
                                    </div>
                                    <div className="Reviews_ReviewBox_Form_Section_Guideline">
                                        Writing guidelines +
                                    </div>
                                    <div className="Reviews_ReviewBox_Form_Section_ReviewBtn">
                                        <button onClick={nextButton}
                                                disabled={!reviewTitle || reviewContent.length < 25}
                                                style={{backgroundColor: (!reviewTitle || reviewContent.length < 25) ? '#a9a9a9' : '#000000'}}
                                        >
                                            Next
                                        </button>
                                        <div>Asterisk (*) indicates mandatory field</div>
                                    </div>
                                </>
                            }
                            {isPhoto &&
                                <div className="Reviews_ReviewBox_Form_Section_Photo">
                                    <div className="Reviews_ReviewBox_Form_Section_Photo_Content">
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Content_Add">Add a
                                            photo <span
                                                className="Reviews_ReviewBox_Form_Section_Photo_Content_Add_Optional">(Optional)</span>
                                        </div>
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Content_Upload">Upload a
                                            PNG, GIF, JPG, JPEG, HEIC, or TIFF (Max 10MB)
                                        </div>
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Content_Guidelines">Photo
                                            guidelines +
                                        </div>
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Content_CustomerPhoto">
                                            {previewImage && <img className='CustomerPhoto' src={previewImage}/>}
                                            {/*<img className='CustomerPhoto' src="" alt=""/>*/}
                                            {/*<img className='CustomerPhoto' src="" alt=""/>*/}
                                        </div>
                                    </div>
                                    <div className="Reviews_ReviewBox_Form_Section_Photo_Button">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            id="actual-btn"
                                            hidden
                                            onChange={e => {
                                                if (e.target.files[0].size > 2097152) {
                                                    alert("File is oversize")
                                                } else {
                                                    setUploadImage(e.target.files[0])
                                                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                                    setImageName(e.target.files[0].name)
                                                }
                                            }}
                                        />
                                        <label htmlFor="actual-btn"
                                               className="Reviews_ReviewBox_Form_Section_Photo_Button_Upload">Upload
                                            file</label>
                                        {/*<div className="Reviews_ReviewBox_Form_Section_Photo_Button_Upload">Upload file</div>*/}
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Button_Submit"
                                             onClick={uploadFile}>SUBMIT
                                        </div>
                                        <div className="Reviews_ReviewBox_Form_Section_Photo_Button_Edit">Edit previous
                                            step
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
    // review content
    const reviewBody = () => {
        // console.log(reviewList)
        return (
            <div className="Reviews_Section_Content">
                {reviewInfo.totalReviews > 0 ?
                    <div className="Reviews_Section_Content_Results">
                        Showing {reviewInfo.totalReviews > 5 ? reviewList.length : reviewInfo.totalReviews} of {reviewInfo.totalReviews} results
                    </div> : ""}
                {reviewList.map((review, index) => {
                    console.log(reviewList)
                    return (
                        <div key={index} className="Reviews_Section_Content_Card">
                            <div className="Reviews_Section_Content_Card_UserAndTime">
                                <AccountCircleIcon className="Reviews_Section_Content_Card_UserAndTime_Avatar"/>
                                <div className="Reviews_Section_Content_Card_UserAndTime_Name">Anonymous</div>
                                <div
                                    className="Reviews_Section_Content_Card_UserAndTime_Date">{moment(review.create).startOf('seconds').fromNow()}</div>
                            </div>
                            <div className="Reviews_Section_Content_Card_Rating">
                                {Array.apply(null, Array(review.rate)).map((element, index) =>
                                    <img src={star} key={index}
                                         className="Reviews_Section_Content_Card_Rating_Star"/>
                                )}
                            </div>
                            <div className="Reviews_Section_Content_Card_Title">{review.title}</div>
                            <div className="Reviews_Section_Content_Card_Body">{review.comments}</div>
                            <img className="Reviews_Section_Content_Card_ReviewImage"
                                 src={review.image ? "http://localhost:3001/review/photo/" + review.id : ""}/>
                            <div className="Reviews_Section_Content_Card_Footer">
                                <ThumbUpOffAltIcon className="Reviews_Section_Content_Card_Footer_Icon"/>
                                <ForumOutlinedIcon className="Reviews_Section_Content_Card_Footer_Icon"/>
                                <div className="Reviews_Section_Content_Card_Footer_Comment">Leave a comment</div>
                            </div>
                        </div>
                    )
                })}
                {(reviewInfo.totalReviews > 5 && reviewList.length < reviewInfo.totalReviews) ?
                    <div className="Reviews_Section_Content_LoadMore">
                        <button className="Reviews_Section_Content_LoadMore_Btn"
                                onClick={() => getMoreReviews(reviewInfo.currentPage + 1)}>Load More Reviews
                        </button>
                    </div> : ""}
            </div>
        )
    }

    return (
        <div className="Reviews">
            <div className="Reviews_Heading">
                <div className="Reviews_Heading_Title">Reviews</div>
                <div className="Reviews_Heading_StatusBar">
                    <p>Be the first to review this product</p>
                </div>
                <div className="Reviews_Heading_ReviewBtn">
                    <button
                        onClick={handleOpen}
                    >write a review
                    </button>
                </div>
            </div>
            {isShow && reviewBox()}
            {
                reviewList.length > 0
                &&
                <div className="Reviews_Section">
                    <div className="Reviews_Section_NavBar">
                        <div className="Reviews_Section_NavBar_Filter">
                            Filter Reviews
                        </div>
                        <div className="Reviews_Section_NavBar_Search">
                            <input placeholder="Search Reviews"/>
                            <SearchIcon className="Reviews_Section_NavBar_Search_Icon"/>
                        </div>
                        <div className="Reviews_Section_NavBar_FilterAndSort">
                            <div className="Reviews_Section_NavBar_FilterAndSort_Filter">
                                <button>Filter</button>
                            </div>
                            <div className="Reviews_Section_NavBar_FilterAndSort_Sort">
                                <button>Sort<KeyboardArrowDownIcon
                                    className="Reviews_Section_NavBar_RDFilterAndSort_Sort_Down"/></button>
                            </div>
                        </div>
                        <div className="Reviews_Section_NavBar_Rating">
                            <div>Rating</div>
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="5 stars"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="4 stars"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="3 stars"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="2 stars"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="1 stars"
                                labelPlacement="end"
                            />
                            <hr/>
                            <div className='Photo'>Photos</div>
                            <FormControlLabel
                                control={<Checkbox
                                    style={{
                                        color: "#000000"
                                    }}
                                />}
                                label="Only show posts with images"
                                labelPlacement="end"
                            />
                        </div>
                    </div>
                    {reviewBody()}
                </div>
            }
        </div>
    )
}
