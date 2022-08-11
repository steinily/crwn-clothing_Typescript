import {Category} from "./category.types";
import { AnyAction } from "redux";
import { 
fetchCategoriesFail,
fetchCategoriesSuccess,
fetchCategoriesStart,
 } from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE:CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {

  if(fetchCategoriesStart.match(action)){
    return { ...state, isLoading: true };
  }

  if(fetchCategoriesSuccess.match(action)){
    return { ...state, isLoading: false, categories: action.payload };
  }

  if(fetchCategoriesFail.match(action)){
    return { ...state, error: action.payload, isLoading: false };
  }

  return state ;
};
