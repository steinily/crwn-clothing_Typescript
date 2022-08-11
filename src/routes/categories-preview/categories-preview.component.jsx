import {  Fragment } from "react"
import { useSelector } from "react-redux"
//import { CategoriesContext } from "../../contexts/categories.context"
import CategoryPreview from '../../components/category-preview/category-preview.component'
import {selectCategoriesMap , selectCategoriesIsLoading} from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'


const CategoriesPreview = () => {
    //const {CategoriesMap} = useContext(CategoriesContext)
    const CategoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        <Fragment>

            {
                isLoading ? (<Spinner />) : (

            
                Object.keys(CategoriesMap).map((title) => {
                    const products = CategoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            

            )}
        </Fragment>

)}

export default CategoriesPreview