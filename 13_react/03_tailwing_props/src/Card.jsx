import React from 'react'

const Card = ({
    className = "",
  cardTitle = "Title not given",
  productDesc = "No description present",
  productImg = "https://images.pexels.com/photos/34003822/pexels-photo-34003822.jpeg",
}) => {
  return (
    <div className={`card bg-base-100 w-96 shadow-sm ${className}`}>
      <figure>
        <img src={productImg} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
        <p>{productDesc}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary bg-blue-800">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card