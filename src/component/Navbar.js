import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-light">
      <span className="navbar-brand mb-0 h1">Navbar</span>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search Movie"
          aria-label="Search"
        />
        <button
          id="search-button"
          className="btn btn-outline my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
      <button type="button" className="btn btn-primary">
        Basket{" "}
        <span className="badge badge-light">{props.basket.movieCount}</span>
      </button>
    </nav>
  );
};

export default Navbar;
