import React, { useEffect } from "react";
import {
  Navbar,
  Badge,
  Button,
  Modal,
  ListGroup,
  Image,
} from "react-bootstrap";

const Nav = (props) => {
  const sales = (price) => {
    let salesPrice = 0;
    if (props.basket.length > 5) {
      return (salesPrice = price - price / 5);
    } else if (props.basket.length > 3) {
      return (salesPrice = price - price / 10);
    } else return price;
  };

  useEffect(() => {
    // if (props.timeLeft === 0) {
    //   props.setTimeLeft(null);
    // }

    // if (!props.timeLeft) return;

    // const interValid = setInterval(() => {
    //   props.setTimeLeft(props.timeLeft - 1);
    // }, 1000);
    let interValid = setInterval(() => tick(), 1000);

    return () => clearInterval(interValid);
  });

  const tick = () => {
    if (props.timeLeft.minutes === 0 && props.timeLeft.seconds === 0) {
      props.setOver(true);
    } else if (props.timeLeft.seconds === 0) {
      props.setTimeLeft({ minutes: props.timeLeft.minutes - 1, seconds: 59 });
    } else {
      props.setTimeLeft({
        minutes: props.timeLeft.minutes,
        seconds: props.timeLeft.seconds - 1,
      });
    }
  };

  return (
    <Navbar>
      <Navbar.Brand>Welcome</Navbar.Brand>
      <Button variant="primary" onClick={props.handleShow}>
        Cart <Badge variant="light">{props.basket.length}</Badge>
      </Button>

      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%" }}>
            Your Shopping Cart
          </Modal.Title>
          <Button
            variant="danger"
            style={{ float: "right" }}
            onClick={props.clearCart}
          >
            Clear
          </Button>
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
          {props.purchase ? (
            <div className="payment">
              <div className="timer">
                {props.over ? (
                  <p>Time up</p>
                ) : (
                  <p>{`${props.timeLeft.minutes
                    .toString()
                    .padStart(
                      2,
                      "0"
                    )}:${props.timeLeft.seconds
                    .toString()
                    .padStart(2, "0")}`}</p>
                )}
              </div>
              <div className="scb">
                <Image
                  id="scbImg"
                  src="https://i.pinimg.com/originals/dd/d0/ee/ddd0ee575cbe0691f917e214d70e6a51.png"
                />
                <p id="credit">เลขที่บัญชี 0000000000</p>
              </div>
              <div className="kbank">
                <Image
                  id="kbankImg"
                  src="https://www.kasikornbank.com/SiteCollectionDocuments/business/sme/digital-banking/kplusshop/img/logo-mainweb.png"
                />
                <p id="credit">เลขที่บัญชี 0000000000</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="numberPrice">
            <p>Number of Movie: {props.basket.length}</p>
            <p>Total Price: {sales(props.price)}</p>
          </div>
          <div className="btns">
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>{" "}
            <Button variant="primary" onClick={props.purchasePopup}>
              Purchase
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Nav;
