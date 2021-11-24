import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Formatnumber from "../utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class Totalpayment extends Component {
  render() {
    const { dataCart } = this.props;
    let TotalPayment = 0;
    if (dataCart.length !== 0) {
      console.log(dataCart[0].total_harga);
      TotalPayment = dataCart.reduce((result, item) => {
        return result + item.total_harga;
      }, 0);
    }

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }}>
            <h4>
              Total :{" "}
              <strong style={{ float: "right", marginRight: 10 }}>
                Rp.{Formatnumber(TotalPayment)}
              </strong>{" "}
            </h4>
            <div className="d-grid gap-2 mb-2">
              <Button variant="success" size="md" style={{ marginRight: 5 }}>
                <FontAwesomeIcon icon={faShoppingCart} /> BAYAR
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Totalpayment;
