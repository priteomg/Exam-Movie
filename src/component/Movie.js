import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
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
    const results = props.movie.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(results);
  }, [search]);

  return (
    <Container>
      <Row className="row">
        <Col xl={12}>
          <Form inline>
            <FormControl
              id="search"
              className="mr-sm-2"
              type="text"
              placeholder="Search Movie"
              onChange={handleChange}
            />
          </Form>
        </Col>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((m) => (
            <Col xl={3} sm={6} lg={4} key={m.id}>
              <Card>
                <Card.Img
                  id="cardImg"
                  src={"https://image.tmdb.org/t/p/w500/" + m.poster_path}
                  variant="top"
                />
                <Card.Body>
                  <Card.Title>{m.title}</Card.Title>
                  <Card.Text>{Math.ceil(m.popularity) * 10} ฿</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.pushToBasket(m.popularity, m.title, m.id)
                    }
                  >
                    Put to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div id="notfound">Not Found</div>
        )}
      </Row>
    </Container>
  );
};

export default Movie;
