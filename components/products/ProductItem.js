import React from 'react';
import "oneezy-css/dist/oneezy-css.min.css";

export default function ProductItem({ product: {title, description} }) {
  return (
    <div className="margin-b-2">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}