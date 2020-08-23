import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./component/Navbar";
import Movie from "./component/Movie";
import axios from "axios";
import { Button, Badge } from "react-bootstrap";

function App() {
  // const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [price, setPrice] = useState(0);
  const [basket, setBasket] = useState([]);
  const [show, setShow] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    minutes: null,
    seconds: null,
  });
  const [over, setOver] = useState(false);

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
      setMovies(results);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setShow(false);
    setPurchase(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const pushToBasket = (cost, title, id) => {
    const newCost = Math.ceil(cost) * 10;
    setBasket([...basket, { id: id, title: title, price: newCost }]);
    setPrice(Math.ceil(price) + newCost);
  };

  const clearCart = () => {
    setBasket([]);
    setPrice(0);
  };

  const purchasePopup = () => {
    setPurchase(true);
    setTimeLeft({ minutes: 1, seconds: 0 });
  };

  return (
    <div>
      <Nav
        over={over}
        timeLeft={timeLeft}
        purchase={purchase}
        price={price}
        basket={basket}
        show={show}
        setOver={setOver}
        setTimeLeft={setTimeLeft}
        clearCart={clearCart}
        handleShow={handleShow}
        handleClose={handleClose}
        purchasePopup={purchasePopup}
      />
      <Movie movie={movies} pushToBasket={pushToBasket} />
      <Button id="btnCart" onClick={handleShow}>
        <i id="cartIcon" className="material-icons md-48">
          shopping_cart
        </i>
        <Badge id="badgeClass" variant="light">
          {basket.length}
        </Badge>
      </Button>
    </div>
  );
}

export default App;
