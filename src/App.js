import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./component/Navbar";
import Movie from "./component/Movie";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [movies, SetMovies] = useState([]);
  const [price, setPrice] = useState(0);
  const [basket, setBasket] = useState([]);

  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchMovie();

    if (localStorage.getItem("myCart") && localStorage.getItem("totalPrice")) {
      setBasket(JSON.parse(localStorage.getItem("myCart")));
      setPrice(JSON.parse(localStorage.getItem("totalPrice")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(basket));
    localStorage.setItem("totalPrice", JSON.stringify(price));
  }, [basket, price]);

  async function fetchMovie() {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=17afcd74e67796016577244fdca52898&query=a"
      );
      const { results } = res.data;
      console.log(results);
      SetMovies(results);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pushToBasket = (cost, title, id) => {
    const newCost = Math.ceil(cost) * 10;
    setBasket([...basket, { id: id, title: title, price: newCost }]);
    setPrice(Math.ceil(price) + newCost);
  };

  return (
    <div>
      <Nav
        price={price}
        basket={basket}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <Movie movie={movies} pushToBasket={pushToBasket} />
    </div>
  );
}

export default App;
