import { createContext , useState , useEffect} from "react";

// Database setup import file if need can delete 
//import PRODUCTS from '../shop-data.js'
//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    CategoriesMap: [], 

});
export const CategoriesProvider = ({children}) => {
    // eslint-disable-next-line
    const [CategoriesMap, setCategoriesMap] = useState({});

    // on time use  for set up database in firebase datastorage
    //useEffect(()=> {
    //    addCollectionAndDocuments('categories', PRODUCTS)} , [])
    
    useEffect(() => {
        const getCategoriesMap = async() => {

        const categoryMap = await getCategoriesAndDocuments();

        setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
        
    }, [])


    const value = {CategoriesMap}
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}

