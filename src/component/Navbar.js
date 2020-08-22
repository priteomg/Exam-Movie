import React, { useState, useEffect } from "react";
import {
  Navbar,
  Badge,
  Form,
  FormControl,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";

const Nav = (props) => {
  return (
    <Navbar>
      <Navbar.Brand>Welcome</Navbar.Brand>
      <Form inline>
        <FormControl
          className="mr-sm-2"
          type="text"
          placeholder="Search Movie"
        />
        <Button variant="outline" id="search-button" type="submit">
          Search
        </Button>
      </Form>
      <Button variant="primary" onClick={props.handleShow}>
        Cart <Badge variant="light">{props.basket.length}</Badge>
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Your Shopping Cart
            <div>
              Number of Movie: {props.basket.length}
              <div>Total Price: {props.price}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.basket.map((c, index) => (
            <ListGroup key={index}>
              <ListGroup.Item>
                {c.title}
                <div style={{ float: "right" }}>{c.price} ฿</div>{" "}
              </ListGroup.Item>
            </ListGroup>
          ))}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Nav;
