import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./component/Navbar";
import Movie from "./component/Movie";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchMovie();
  }, []);

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

  //ทำ modal รวมราคา รวมของทั้งหม
  //ดึง data จริงจาก api (async await)
  const [search, setSearch] = useState("");
  const [movies, SetMovies] = useState([]);
  const [basket, setBasket] = useState({ price: 0, movieCount: 0 });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pushToBasket = (price) => {
    setBasket({
      price: basket.price + price,
      movieCount: basket.movieCount + 1,
    });
  };

  return (
    <div>
      <Nav
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
