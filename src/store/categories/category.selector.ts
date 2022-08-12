import {createSelector} from 'reselect'
import { RootState } from '../store';
import { CategoriesState } from './category.reducer';
import {CategoryMap} from './category.types'

const selectCategorReducer = (state :RootState): CategoriesState =>state.categories;

export const selectCategories = createSelector(
    [selectCategorReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => 
        categories.reduce((acc,category) => {
        const {title, items} = category; 
        acc[title.toLowerCase()] = items;
    return acc;}
        , {} as CategoryMap)


        );

export const selectCategoriesIsLoading = createSelector(
    [selectCategorReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)