import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import React, { useContext } from 'react'
import { CartContext } from '../../context/cart.context'


export default function CartIcon() {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const toogleIsCartOpen = ()=>{
        setIsCartOpen(!isCartOpen)
    }
    return (
        <div className='cart-icon-container' onClick={toogleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}
