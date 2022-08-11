import { 
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  Navlink } from './navigation.styles';

import {Outlet} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import { Fragment } from 'react';
import {ReactComponent as CrwLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

//import { UserContext } from '../../contexts/user.context';
//import { CartContext } from '../../contexts/cart.context';

import { selectIsCartOpen} from '../../store/cart/cart.selector'
import {selectCurrentUser} from '../../store/user/user.selector'
import {signOutStart} from '../../store/user/user.action'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  //const {isCartOpen} = useContext(CartContext)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch();
  const signOutUser = () => dispatch(signOutStart())

    return (
      <Fragment>
        <NavigationContainer>

            <LogoContainer to='/'>
                <CrwLogo />
            </LogoContainer>
            
            <NavLinksContainer>
                <Navlink to='shop'>
                    SHOP
                </Navlink>
                {
                  currentUser ? ( 
                    <Navlink as='span' onClick={signOutUser}>Sign Out</Navlink>) :
                    (
                    <Navlink to='/auth'>
                      Sign In
                  </Navlink>
                    ) 
                  
                }
              <CartIcon />
            </NavLinksContainer>
            {
             isCartOpen && <CartDropdown / >
            }
            
            </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }


export default Navigation;