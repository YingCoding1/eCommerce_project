import {ProductList} from "./ProductList";
import {ContentNav} from "./ContentNav";
import "../styles/Content.scss"


export const Content = () => {
    return (
        <div className="Content">
            <ContentNav/>
            <ProductList/>
        </div>
    )
}