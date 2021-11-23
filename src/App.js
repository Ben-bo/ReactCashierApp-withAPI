import { Row, Col, Container } from "react-bootstrap";
// import "./App.css";
import { Navbarcomponent, Sidebars, Result, Menu } from "./component";
import { API_URL } from "./utils/constant";
import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      choosenCategory: "Makanan",
      cart: [],
    };
  }
  componentDidMount() {
    //menampilkan menu berdasarkan category default
    axios
      .get(`${API_URL}products?category.nama=${this.state.choosenCategory}`)
      .then((res) => {
        const products = res.data;
        this.setState({ menus: products }); //simpan produk ke state menus
      })
      .catch((e) => {
        console.log(e);
      });

    // menampilkan data yang sudah diinputkan ke keranjang
    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const products = res.data;
        this.setState({ cart: products }); //simpan produk ke state cart
      })
      .catch((e) => {
        console.log(e);
      });
  }
  // menampilkan data cart secara realtime
  componentDidUpdate(prevState) {
    if (this.state.cart !== prevState.cart) {
      axios
        .get(`${API_URL}keranjangs`)
        .then((res) => {
          const products = res.data;
          this.setState({ cart: products }); //simpan produk ke state cart
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  // method untuk mengubah
  changeCategory = (value) => {
    this.setState({
      choosenCategory: value,
      menus: [],
    });
    axios
      .get(`${API_URL}products?category.nama=${value}`)
      .then((res) => {
        const products = res.data;
        this.setState({ menus: products });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  addCartValue = (value) => {
    axios
      .get(`${API_URL}keranjangs?produk.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const dataCart = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value,
          };
          axios
            .post(`${API_URL}keranjangs`, dataCart)
            .then((res) => {
              swal({
                title: "Sucess",
                text: `${dataCart.produk.nama} telah berhasil ditambahkan di keranjang`,
                icon: "success",
                button: "Aww yiss!",
                timer: 1000,
              });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].produk.id === value.id) {
              const dataCart = {
                jumlah: res.data[i].jumlah + 1,
                total_harga: res.data[i].total_harga + value.harga,
                produk: res.data[i].produk,
              };
              axios
                .put(`${API_URL}keranjangs/${res.data[i].id}`, dataCart)
                .then((res) => {
                  swal({
                    title: "Sucess",
                    text: `${dataCart.produk.nama} telah berhasil ditambahkan di keranjang`,
                    icon: "success",
                    button: "Aww yiss!",
                    timer: 1000,
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              const dataCart = {
                jumlah: 1,
                total_harga: value.harga,
                produk: value,
              };
              axios
                .post(`${API_URL}keranjangs`, dataCart)
                .then((res) => {
                  swal({
                    title: "Sucess",
                    text: `${dataCart.produk.nama} telah berhasil ditambahkan di keranjang`,
                    icon: "success",
                    button: "Aww yiss!",
                    timer: 1000,
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { menus, choosenCategory, cart } = this.state;
    return (
      <div className="App">
        <Navbarcomponent />
        <Container fluid>
          <Row>
            <Sidebars
              changeCategory={this.changeCategory}
              choosenCategory={choosenCategory}
            />
            <Col>
              <h4>Daftar produk</h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menu
                      key={menu.id}
                      menuk={menu}
                      cartValue={this.addCartValue}
                    />
                  ))}
              </Row>
            </Col>
            <Result dataCart={cart} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
