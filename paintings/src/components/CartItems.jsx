import React from 'react';
import { Navigationbar } from './Navigationbar';

const CartItems = ({ cart }) => {
  return (
    <>
    <Navigationbar></Navigationbar>
    <div>
      <h2>Cart Items</h2>
      <p>Cart ID: {cart.cartId}</p>
      <p>Date: {cart.date}</p>
      <p>Total Amount: {cart.totalAmount}</p>
      <p>Status: {cart.status}</p>

      <h3>Art Items:</h3>
      <ul>
        {cart.arts.map((art) => (
          <li key={art.artId}>
            {art.title} - {art.artist}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default CartItems;
