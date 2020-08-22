import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Movie = (props) => {
  return (
    <Container>
      <Row className="row">
        {props.movie.map((m) => (
          <Col sm key={m.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
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
        ))}
      </Row>
    </Container>
  );
};

export default Movie;
