import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { CartItem } from "./cart.type";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
  };
  
export  const cartReducer = (state = INITIAL_STATE, action: AnyAction):CartState => {

  if(setIsCartOpen.match(action)){
    return {
      ...state,
      isCartOpen: action.payload,
  };
  }
  
  if(setCartItems.match(action)){
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
  };