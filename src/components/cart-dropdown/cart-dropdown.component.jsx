import Button from '../button/button.component';
import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
 } from  './cart-dropdown.styles'
import { useNavigate } from 'react-router-dom';
//import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component';
//import { CartContext } from '../../contexts/cart.context';

import  {useSelector} from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector';


const CartDropdown = () =>{
    const navigate = useNavigate()
    //const { cartItems} = useContext(CartContext)
    const cartItems = useSelector(selectCartItems);


    const goTocheckoutHandler = () => {
        navigate('/checkout')
    }
    
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (<EmptyMessage>Cart is empty</EmptyMessage>)

                }
                

                
                </CartItems>
            <Button onClick= {goTocheckoutHandler}>Go TO CheckOut</Button>
        </CartDropdownContainer>
    )

}

export default CartDropdown;