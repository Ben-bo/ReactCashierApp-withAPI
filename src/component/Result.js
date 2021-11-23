import React, { Component } from "react";
import { Col, ListGroup, Badge, Row } from "react-bootstrap";
import Formatnumber from "../utils/formatNumber";

class Result extends Component {
  render() {
    const { dataCart } = this.props;
    return (
      <Col md={3} mt="2">
        <h5>ShopCart</h5>
        <hr />
        <ListGroup variant="flush">
          {dataCart &&
            dataCart.map((data) => (
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <strong>{data.produk.nama}</strong>
                    <p className="text-success small">
                      Rp.{Formatnumber(data.produk.harga)}
                    </p>
                  </Col>
                  <Col>
                    <Badge bg="success" style={{ float: "right" }}>
                      x{data.jumlah} = Rp {Formatnumber(data.total_harga)}
                    </Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}

export default Result;
