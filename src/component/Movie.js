import React from "react";

const Movie = (props) => {
  console.log(props.movie);
  return (
    <div className="container">
      <div className="row">
        {props.movie.map((m) => (
          <div className="col-sm" key={m.id}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={m.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{m.name}</h5>
                <p className="card-text">{m.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => props.pushToBasket(m.price)}
                >
                  Put to Basket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
