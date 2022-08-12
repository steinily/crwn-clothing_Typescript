import '../../routes/category/category.styles.scss'
import {useParams} from 'react-router-dom'
import { useState,useEffect, Fragment} from 'react'
import { useSelector } from 'react-redux'
//import {CategoriesContext} from '../../contexts/categories.context'
import ProductCard from '../../components/productcard/product-card.component'
import { selectCategoriesMap , selectCategoriesIsLoading } from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams ;
    const CategoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    //const { CategoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(CategoriesMap[category]);
  
    useEffect(() => {
      setProducts(CategoriesMap[category]);
    }, [category, CategoriesMap]);
    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>

            {

                isLoading ? (<Spinner />) : (
                    <div className='category-container'>
                    
                    {
                    products &&
                    products.map((product) => {
                        return (
                    <ProductCard key={product.id} product={product}/>
                        )})
                    }
                </div>
            )}
           
        </Fragment>
    ) 
}

export default Category;