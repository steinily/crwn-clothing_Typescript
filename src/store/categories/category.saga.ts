import {takeLatest, all , call ,put } from 'typed-redux-saga/macro'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesFail, fetchCategoriesSuccess } from './category.action'
import { CATEGORIES_ACTION_TYPES } from './category.types'


export function* fetcgCategoriesAsync(){
    try{
        const categoriesArray = yield* call(getCategoriesAndDocuments ,'categories')
        yield* put(fetchCategoriesSuccess(categoriesArray))
        }
        catch (error) {
        yield* put(fetchCategoriesFail(error as Error))
        }
}

export function* onFetchCategories(){
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetcgCategoriesAsync)
}


export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])


}