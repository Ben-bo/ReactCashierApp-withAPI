import React, { Component } from "react";
import { Col, ListGroup, Badge, Row } from "react-bootstrap";
import Formatnumber from "../utils/formatNumber";
import Modalcart from "./ModalCart";
import Totalpayment from "./TotalPayment";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }
  handleShow = (data) => {
    this.setState({
      showModal: true,
      cartDetail: data,
      jumlah: data.jumlah,
      keterangan: data.keterangan,
    });
  };
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
    console.log(this.state.keterangan);
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  summation = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
    });
  };
  subtraction = () => {
    if (this.state.jumlah >= 2) {
      //lakukan pengurangan jika jumlah lebih dari 1
      this.setState({
        jumlah: this.state.jumlah - 1,
      });
    }
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { dataCart } = this.props;
    if (dataCart.length === 0) {
      return (
        <Col md={3} mt="2">
          <h5>ShopCart</h5>
          <hr />
          <h4 className="text-success">Belum ada Pesanan..</h4>
        </Col>
      );
    } else {
      return (
        <Col md={3} mt="2">
          <h5>ShopCart</h5>
          <hr />

          <ListGroup variant="flush">
            {dataCart &&
              dataCart.map((data) => (
                <ListGroup.Item
                  key={data.id}
                  onClick={() => this.handleShow(data)}
                  style={{ cursor: "pointer" }}
                >
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
            <Modalcart
              handleClose={this.handleClose}
              {...this.state}
              summation={this.summation}
              subtraction={this.subtraction}
              handleSubmit={this.handleSubmit}
              changeHandler={this.changeHandler}
            />
          </ListGroup>
          <Totalpayment dataCart={dataCart} {...this.props} />
        </Col>
      );
    }
  }
}

export default Result;
