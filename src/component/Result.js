import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup, Badge, Row, Card } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from "../utils/constant";
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
      totalHarga: 0,
    };
  }
  handleShow = (data) => {
    this.setState({
      showModal: true,
      cartDetail: data,
      jumlah: data.jumlah,
      keterangan: data.keterangan,
      totalHarga: data.total_harga,
    });
  };
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const dataCart = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      produk: this.state.cartDetail.produk,
      keterangan: this.state.keterangan,
    };
    axios
      .put(`${API_URL}keranjangs/${this.state.cartDetail.id}`, dataCart)
      .then((res) => {
        this.props.getListCart();
        swal({
          title: "Sucess",
          text: `${dataCart.produk.nama} telah berhasil di Update`,
          icon: "success",
          button: false,
          timer: 1000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    this.handleClose();
  };
  deleteOrder = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`${API_URL}keranjangs/${id}`).then((res) => {
          this.props.getListCart(); //setelah delete panggil lg data keranjang
          swal(`${this.state.cartDetail.produk.nama} berhasil di Hapus`, {
            icon: "success",
          }).catch((e) => {
            console.log(e);
          });
          this.handleClose();
        });
      } else {
        swal("Pesanan Tidak jadi dihapus!");
      }
    });
  };
  summation = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.cartDetail.produk.harga * (this.state.jumlah + 1),
    });
  };
  subtraction = () => {
    if (this.state.jumlah >= 2) {
      //lakukan pengurangan jika jumlah lebih dari 1
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.cartDetail.produk.harga * (this.state.jumlah - 1),
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
          <Card className="overflow-auto" style={{ height: 400 }}>
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
                deleteOrder={this.deleteOrder}
              />
            </ListGroup>
          </Card>

          <Totalpayment dataCart={dataCart} {...this.props} />
        </Col>
      );
    }
  }
}

export default Result;
