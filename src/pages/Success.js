import React, { Component } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Success extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Card style={{ width: "25rem", border: "none" }} className="mx-auto">
            <Card.Img variant="top" src="assets/images/success.png" />
            <Card.Body>
              <h3 className="text-success text-center">
                <strong>Order Berhasil dilakukan.!!</strong>
              </h3>
              <p className="text-center">Terim kasih telah memesan</p>

              <div className="d-grid gap-2 ">
                <Button
                  variant="success"
                  size="lg"
                  as={Link}
                  to="/"
                  className="shadow"
                >
                  KEMBALI
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Success;
