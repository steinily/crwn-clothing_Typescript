import { Route,Routes } from "react-router-dom";
import CategoriesPreview from '../categories-preview/categories-preview.component.jsx'
import Category from '../category/category.component'
import { useEffect } from "react";
//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { fetchCategoriesStart } from "../../store/categories/category.action.js";
import {useDispatch} from 'react-redux'

import './shop.styles.scss'


const Shop = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesStart())
        }
    // eslint-disable-next-line    
    , [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop;