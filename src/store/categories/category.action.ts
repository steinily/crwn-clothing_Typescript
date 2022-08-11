import { createAction, Action, ActionWhitPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWhitPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS, Category[]>
export type FetchCategoriesFail = ActionWhitPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>


export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categories: Category[]) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCESS, categories));

export const fetchCategoriesFail = withMatcher((error: Error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
