import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Formatnumber from "../utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constant";

class Totalpayment extends Component {
  bayar = (Totalpayment) => {
    const dataPesanan = {
      total_bayar: Totalpayment,
      menu: this.props.dataCart,
    };

    axios.post(`${API_URL}pesanans`, dataPesanan).then((res) => {
      this.props.history.push("/success");
    });
  };
  render() {
    const { dataCart } = this.props;
    let TotalPayment = 0;
    if (dataCart.length !== 0) {
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
              <Button
                variant="success"
                size="md"
                style={{ marginRight: 5 }}
                onClick={() => this.bayar(TotalPayment)}
              >
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
