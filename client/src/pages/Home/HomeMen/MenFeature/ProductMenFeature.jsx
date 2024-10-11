import React from 'react'

function ProductMenFeature(props) {
  return (
    <div className="card mb-5" key={props.id}>
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>    
    </div>
  )
}

export default ProductMenFeature



