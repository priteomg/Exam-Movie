import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
  CardGroup,
  CardDeck,
} from "react-bootstrap";

const Movie = (props) => {
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setFilteredMovies(props.movie);
  }, [props.movie]);

  useEffect(() => {
    // const results = props.movie.filter((m) =>
    //   m.title.toLowerCase().includes(search.toLowerCase())
    // );
    async function searchMovie() {
      const res = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=17afcd74e67796016577244fdca52898&query=${search}`
      );
      const { results } = res.data;
      setFilteredMovies(results);
    }
    searchMovie();
  }, [search]);

  return (
    <Container>
      <Row className="row">
        <Col xl={12}>
          <div className="formSeacrh">
            <h2>Welcome.</h2>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>

            <Form inline>
              <FormControl
                id="search"
                className="mr-sm-2"
                type="text"
                placeholder="Search Movie"
                onChange={handleChange}
              />
            </Form>
          </div>
        </Col>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((m) => (
            <Col xl={3} xs={12} sm={6} lg={4} key={m.id}>
              <Card className="movie-card">
                <Card.Img
                  id="cardImg"
                  src={"https://image.tmdb.org/t/p/w500" + m.poster_path}
                  variant="top"
                />
                <Card.Body className="card-body">
                  <Card.Title className="movie-title">{m.title}</Card.Title>
                  <Card.Text>Rating: {m.vote_average}</Card.Text>
                </Card.Body>
                <Card.Footer className="card-footer">
                  <Card.Text>{Math.ceil(m.popularity) * 10} ฿</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.pushToBasket(m.popularity, m.title, m.id)
                    }
                    className="material-icons"
                    style={{ float: "right" }}
                  >
                    add_shopping_cart
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <h1 id="notfound">Not Found</h1>
        )}{" "}
      </Row>
    </Container>
  );
};

export default Movie;
