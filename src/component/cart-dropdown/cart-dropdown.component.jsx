import React from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'

export default function CartDropdown() {
  return (
    
    <div className='cart-dropdown-container'>
        <div className='cart-items'></div>
        <Button>Checkout</Button>
    </div>
  )
}
