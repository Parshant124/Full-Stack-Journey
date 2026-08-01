import React from 'react'

function Card(props) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img
          src={props.img}
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
}

export default Card