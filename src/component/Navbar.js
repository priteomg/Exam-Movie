import React from "react";
import { Navbar, Badge, Form, FormControl, Button } from "react-bootstrap";

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
      <Button variant="primary">
        Basket <Badge variant="light">{props.basket.movieCount}</Badge>
      </Button>
    </Navbar>
  );
};

export default Nav;
